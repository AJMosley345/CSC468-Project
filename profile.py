import geni.portal as portal
import geni.rspec.pg as pg
import geni.rspec.igext as IG
   
pc = portal.Context()

pc.defineParameter( "n", 
                   "Number of nodes (2 or more)", 
                   portal.ParameterType.INTEGER, 2 )
pc.defineParameter( "userid", 
                   "CloudLab user ID to deploy K8s from (should be your CloudLab ID. Defaulted to none", 
                   portal.ParameterType.STRING, 'none' )
pc.defineParameter( "corecount", 
                   "Number of cores in each node.  NB: Make certain your requested cluster can supply this quantity.", 
                   portal.ParameterType.INTEGER, 2 )
pc.defineParameter( "ramsize", "MB of RAM in each node.  NB: Make certain your requested cluster can supply this quantity.", 
                   portal.ParameterType.INTEGER, 2048 )
params = pc.bindParameters()

request = pc.makeRequestRSpec()

tourDescription = \
"""
This profile provides the template for Docker and Kubernetes installed on Ubuntu 18.04
"""

#
# Setup the Tour info with the above description and instructions.
#  
tour = IG.Tour()
tour.Description(IG.Tour.TEXT,tourDescription)
request.addTour(tour)

prefixForIP = "192.168.1."
link = request.LAN("lan")

num_nodes = params.n
for i in range(num_nodes):
  if i == 0:
    node = request.XenVM("head")
    bs_landing = node.Blockstore("bs_image", "/image")
    bs_landing.size = "500GB"
  else:
    node = request.XenVM("worker-" + str(i))
  node.cores = params.corecount
  node.ram = params.ramsize
  bs_landing = node.Blockstore("bs_" + str(i), "/image")
  bs_landing.size = "500GB"
  node.routable_control_ip = "true" 
  node.disk_image = "urn:publicid:IDN+emulab.net+image+emulab-ops:UBUNTU20-64-STD"
  iface = node.addInterface("if" + str(i))
  iface.component_id = "eth1"
  iface.addAddress(pg.IPv4Address(prefixForIP + str(i + 1), "255.255.255.0"))
  link.addInterface(iface)
  
  # install Docker
  node.addService(pg.Execute(shell="sh", command="sudo bash /local/repository/install_scripts/install_docker.sh"))
  # install Kubernetes
  node.addService(pg.Execute(shell="sh", command="sudo bash /local/repository/install_scripts/install_kubernetes.sh"))
  node.addService(pg.Execute(shell="sh", command="sudo swapoff -a"))
  
  if i == 0:
    # install Kubernetes manager
    node.addService(pg.Execute(shell="sh", command="sudo bash /local/repository/install_scripts/kube_manager.sh " + params.userid + " " + str(num_nodes)))
    # install Helm
    node.addService(pg.Execute(shell="sh", command="sudo bash /local/repository/install_scripts/install_helm.sh"))
  else:
    node.addService(pg.Execute(shell="sh", command="sudo bash /local/repository/install_scripts/kube_worker.sh"))
    
pc.printRequestRSpec(request)

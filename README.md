# CSC468-Project
# How to start project
- Make sure you use this main branch for the Cloudlab experiment
- Once everything is completely set up, do `bash /local/repository/project-startup.sh`. Once that is done you can access the webui by running the following commands:
1. `export NODE_PORT=$(kubectl get --namespace project -o jsonpath="{.spec.ports[0].nodePort}" services webui)`
2. `export NODE_IP=$(kubectl get nodes --namespace project -o jsonpath="{.items[0].status.addresses[0].address}")`
3. `echo http://$NODE_IP:$NODE_PORT`


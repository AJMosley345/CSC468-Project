#!/bin/bash
set -x

# namespaceStatus=$(kubectl get namespaces project -o json | jq .status.phase -r)

# if [ $namespaceStatus == "Active" ]
# then
#      echo "Namespace project exists, need to clean up"
#      kubectl delete namespaces project
# fi

# echo "Creating namespace project"
# kubectl create namespace project
# kubectl create configmap startup --from-file=./webui/startup.sh -n project

echo "Creating pods and services"
kubectl create -f db-deployment.yaml 
sleep 30
kubectl create -f webui-deployment.yaml 
sleep 30
kubectl create -f nginx-deployment.yaml

kubectl get pods -n project

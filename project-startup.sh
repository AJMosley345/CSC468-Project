#!/bin/bash
set -x

docker-compose -f docker-compose.images.yml build
docker-compose -f docker-compose.images.yml push

namespaceStatus=$(kubectl get namespaces project -o json | jq .status.phase -r)

if [ $namespaceStatus == "Active" ]
then
    echo "Namespace project exists, need to clean up"
    kubectl delete namespaces project
fi

echo "Creating namespace project"
kubectl create namespace project 
 
echo "Creating pods"
kubectl create -f project.yaml --namespace project

echo "Creating services"
kubectl create -f project-service.yaml --namespace project


kubectl get pods -n project

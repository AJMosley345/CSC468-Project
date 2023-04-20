#!/bin/bash
set -x
namespaceStatus=$(kubectl get namespaces attendance -o json | jq .status.phase -r)

if [ $namespaceStatus == "Active" ]
then
    echo "Namespace attendance exists, need to clean up"
    kubectl delete namespaces attendance
fi

echo "Creating namespace attendance"
kubectl create namespace attendance 
 
echo "Creating pods"
kubectl create -f attendance.yaml --namespace attendance

echo "Creating services"
kubectl create -f attendance-service.yaml --namespace attendance


kubectl get pods -n attendance
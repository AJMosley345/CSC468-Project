pipeline {
    stages {
        stage('Build'){
            steps {
                echo 'Building images'
                    sh 'docker-compose -f docker-compose.images.yml build'
            }
        }
        stage('Upload'){
            steps {
                echo 'Pushing images'
                    sh 'docker-compose -f docker-compose.images.yml push'
            }
        }
        stage('Deploy'){
            steps{
                sh 'namespaceStatus=$(kubectl get namespaces project -o json | jq .status.phase -r)'
                sh 'if [ $namespaceStatus == "Active" ] then echo "Namespace project exists, need to clean up" kubectl delete namespaces project fi'
                sh 'kubectl create namespace project'
                sh 'kubectl create configMap mysql-init-script --from-file=./webui-db/database/init.sql'
                sh 'kubectl create -f project-deployment.yaml --namespace project'
            }
            
        }
    }
}
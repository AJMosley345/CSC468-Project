pipeline {
    agent none
    stages {
        stage('Build') {
            agent any
            steps {
                echo 'Building images'
                sh 'docker-compose -f docker-compose.images.yml build'
            }
        }
        stage('Upload') {
            agent any
            steps {
                echo 'Pushing images'
                sh 'docker-compose -f docker-compose.images.yml push'
            }
        }
        stage('Deploy') {
            agent any
            steps {
                script {
                    def namespaceStatus = sh(script: 'kubectl get namespaces project -o json | jq .status.phase -r', returnStdout: true).trim()
                    if (namespaceStatus == 'Active') {
                        echo 'Namespace project exists, need to clean up'
                        sh 'kubectl delete namespaces project'
                    }
                    sh 'kubectl create namespace project'
                    sh 'kubectl create configMap mysql-init-script --from-file=./webui-db/database/init.sql'
                    sh 'kubectl create -f project.yaml --namespace project'
                }
            }
        }
    }
}

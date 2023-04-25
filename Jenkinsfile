pipeline {
    agent none
    enviroment {
        docker_app = "project_app"
        regsitry = "155.98.37.29"
        userid = "am950104"
    }
    stages {
        stage('Publish'){
            agent {
                kubernetes {
                    inheritFrom 'docker'
                }
            }
            steps {
                container('docker') {
                    sh 'docker login -u admin -p registry https://${registry}:443'
                    sh 'docker-compose - '
                    sh 'docker build -t ${registry}:443/:$BUILD_NUMBER .'
                    sh 'docker push ${registry}:443/go_app:$BUILD_NUMBER'
                }
            }
        }
    }
}
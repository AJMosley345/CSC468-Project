pipeline {
    agent none
    enviroment {
        docker_app = "project_app"
        regsitry = "155.98.37.29"
        userid = "am950104"
    }
    stages {
        stage('Test'){
            agent {
                kubernetes {
                    inheritFrom ''
                }
            }
        }
    }
}
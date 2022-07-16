pipeline{
    agent any
    tools{
        nodejs 'node16'
    }
    stages{
        stage("Output"){
            steps{
                sh "ls -l"
            }
        }
        stage("build"){
            steps{
                sh "npm ci --only=production"
                sh "CI=false && npm run build"
            }
        }
        stage("deploy"){
            steps{
                withCredentials([gitUsernamePassword(credentialsId: 'AdnenKhGIT',gitToolName: 'git-tool')]){
                    sh "npm run deploy"
                }
            }
        }
    }
}
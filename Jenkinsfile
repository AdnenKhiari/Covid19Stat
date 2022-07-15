pipeline{
    agent any
    tools{
        nodejs 'node16'
    }
    stages{
        stage("build"){
            steps{
                cleanWs()
                sh "npm ci --only=production"
                sh "CI=false && npm run build"
            }
        }
        stage("deploy"){
            steps{
                withCredentials([gitUsernamePassword(credentialsId: 'AdnenKhGIT',gitToolName: 'git-tool')]){
                    git "config user.name 'AdnenKhiari'" 
                    sh "npm run deploy"
                }
            }
        }
    }
}
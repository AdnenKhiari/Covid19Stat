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
                sh "CI=false && NODE_ENV=production && npm run build"
            }
        }
        stage("deploy"){
            steps{
                withCredentials([gitUsernamePassword(credentialsId: 'AdnenKhGIT',gitToolName: 'git-tool')]){
                    sh "git config user.email 'adnenkhiari484@gmail.com' && git config user.name 'AdnenKhiari'"
                    sh "npm run deploy"
                }
            }
        }
    }
}
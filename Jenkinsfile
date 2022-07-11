pipeline{
    agent any
    tools{
        nodejs 'node16'
    }
    stages{
        stage("build"){
            steps{
                sh "npm ci --only=production"
                withCredentials([usernamePassword(credentialsId: 'AdnenKhGIT',usernameVariable: 'USER',passwordVariable:'PASS')]){
                    git "config user.name 'AdnenKhiari' && config user.email '$USER' && git config user.password '$PASS'"                
                }
                sh "CI=false && npm run build"
            }
        }
        stage("deploy"){
            steps{
                sh "npm run deploy"
            }
        }
    }
}
pipeline{
    agent any
    tools{
        nodejs 'node16'
    }
    stages{
        stage("build"){
            steps{
                sh "npm ci --only=production"
                sh "CI=false && npm run build"
            }
        }
        stage("deploy"){
            steps{
                withCredentials([usernamePassword(credentialsId: 'AdnenKhGIT',usernameVariable: 'USER',passwordVariable:'PASS')]){
                    git "config --global user.name 'AdnenKhiari' && config --global user.email '$USER' && git config --global user.password '$PASS'"                
                }
                sh "npm run deploy"
            }
        }
    }
}
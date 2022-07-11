pipeline{
    agent any
    tools{
        nodejs 'node16'
    }
    stages{
        stage("build"){
            steps{
                sh "npm ci --only=production"
                sh "npm run build"
            }
        }
        stage("deploy"){
            steps{
                sh "npm run deploy"
            }
        }
    }
}
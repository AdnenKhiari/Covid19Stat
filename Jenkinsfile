pipeline{
    agent any
    tools{
        nodejs 'node16'
    }
    stages{
        stage("build"){
            steps{
                bash "npm ci --only=production"
                bash "npm run build"
            }
        }
        stage("deploy"){
            steps{
                bash "npm run deploy"
            }
        }
    }
}
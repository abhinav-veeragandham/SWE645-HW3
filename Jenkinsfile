pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    BACKEND_IMAGE = "abhinav31714/swe645-a3-backend:v2"
    FRONTEND_IMAGE = "abhinav31714/swe645-a3-frontend:v2"
  }

  stages {
    stage('Clone Repo') {
      steps {
        git branch: 'main', url: 'https://github.com/abhinav-veeragandham/SWE645-HW3.git'
      }
    }

    stage('Build Backend') {
      steps {
        dir('StudentSurvey') {
          sh 'mvn clean package -DskipTests'
          sh 'docker build -f Dockerfile.backend -t $BACKEND_IMAGE .'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('student-survey-app') {
          sh 'npm install'
          sh 'npm run build'
          sh 'docker build -f Dockerfile -t $FRONTEND_IMAGE .'
        }
      }
    }

    stage('Push Images') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
            sh 'docker push $BACKEND_IMAGE'
            sh 'docker push $FRONTEND_IMAGE'
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh 'kubectl set image deployment/studentsurvey645-backend container-0=$BACKEND_IMAGE -n default'
        sh 'kubectl set image deployment/studentsurvey645-frontend container-0=$FRONTEND_IMAGE -n default'
        sh 'kubectl rollout restart deployment studentsurvey645-backend -n default'
        sh 'kubectl rollout restart deployment studentsurvey645-frontend -n default'
      }
    }
  }
}

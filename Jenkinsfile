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
          sh '''
            echo "🔧 Building Spring Boot Backend..."
            mvn clean package -DskipTests
            docker build -f Dockerfile.backend -t $BACKEND_IMAGE .
          '''
        }
      }
    }

    stage('Build Frontend Docker Image') {
      steps {
        dir('student-survey-app') {
          sh '''
            echo "📦 Using pre-built frontend dist folder..."
            docker build -t $FRONTEND_IMAGE .
          '''
        }
      }
    }

    stage('Push Docker Images') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
            sh "docker push $BACKEND_IMAGE"
            sh "docker push $FRONTEND_IMAGE"
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh '''
          echo "🚀 Deploying backend..."
          kubectl set image deployment/studentsurvey645-backend container-0=$BACKEND_IMAGE -n default
          kubectl rollout restart deployment/studentsurvey645-backend -n default

          echo "🚀 Deploying frontend..."
          kubectl set image deployment/studentsurvey645-frontend container-0=$FRONTEND_IMAGE -n default
          kubectl rollout restart deployment/studentsurvey645-frontend -n default
        '''
      }
    }
  }

  post {
    success {
      echo '✅ Deployment successful!'
    }
    failure {
      echo '❌ Deployment failed. Check the logs above.'
    }
  }
}

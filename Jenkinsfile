pipeline {
  agent any

  environment {
    BACKEND_IMAGE = "abhinav31714/swe645-a3-backend:v3"
    FRONTEND_IMAGE = "abhinav31714/swe645-a3-frontend:v3"
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
            echo "Building Spring Boot Backend..."
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
            echo "Using pre-built frontend dist folder..."
            docker build -t $FRONTEND_IMAGE .
          '''
        }
      }
    }

    stage('Push Docker Images') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
          sh '''
            echo "Logging into Docker Hub..."
            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

            echo "Pushing backend image..."
            docker push $BACKEND_IMAGE

            echo "Pushing frontend image..."
            docker push $FRONTEND_IMAGE

            echo "Logging out from Docker Hub..."
            docker logout
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh '''
          echo "Deploying backend..."
          kubectl set image deployment/studentsurvey645-backend container-0=$BACKEND_IMAGE -n default
          kubectl rollout restart deployment/studentsurvey645-backend -n default

          echo "Deploying frontend..."
          kubectl set image deployment/studentsurvey645-frontend container-0=$FRONTEND_IMAGE -n default
          kubectl rollout restart deployment/studentsurvey645-frontend -n default
        '''
      }
    }
  }

  post {
    success {
      echo 'Deployment successful!'
    }
    failure {
      echo 'Deployment failed.'
    }
  }
}

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
      sh '''
        echo "Node version:" && node -v
        echo "NPM version:" && npm -v
        echo "Cleaning up node_modules and package-lock.json..."
        rm -rf node_modules package-lock.json

        echo "Setting NPM registry to default"
        npm config set registry https://registry.npmjs.org/

        echo "Running npm install..."
        export CI=true
        npm install --legacy-peer-deps --no-audit --no-fund --verbose

        echo "Building frontend..."
        npm run build

        echo "Building Docker image for frontend..."
        docker build -f Dockerfile -t $FRONTEND_IMAGE .
      '''
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

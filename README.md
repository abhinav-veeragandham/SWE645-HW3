# SWE645-HW3

📝 Student Survey Microservices Application

This project is a full-stack microservices-based web application built as part of the SWE 645 coursework. It enables users to submit and view student surveys. The app is composed of a Vue.js frontend and a Spring Boot backend, containerized using Docker and deployed on a Kubernetes cluster using Rancher and Jenkins CI/CD.
📦 Tech Stack

    Frontend: Vue.js (SPA)

    Backend: Spring Boot (Java, REST API, JPA)

    Database: MySQL (Amazon RDS)

    CI/CD: Jenkins (running on EC2)

    Containerization: Docker

    Orchestration: Kubernetes (via Rancher UI)

    Registry: Docker Hub

    Hosting: AWS EC2 + Rancher-managed Kubernetes Cluster

🚀 Features

    Submit and view student survey forms

    RESTful API with CRUD operations

    Built-in frontend routing (SPA)

    Jenkins-based CI/CD pipeline for automated build & deployment

    Scalable and resilient with Kubernetes deployments

    Exposed via NodePort for external access

📂 Project Structure

.
├── StudentSurvey/          # Spring Boot backend (Dockerfile.backend)
├── student-survey-app/    # Vue.js frontend (Dockerfile + dist/)
├── Jenkinsfile            # CI/CD pipeline
├── nginx.conf             # SPA routing support for frontend

📌 Deployment Flow

    Jenkins pulls code from GitHub on push

    Builds backend and frontend Docker images

    Pushes images to Docker Hub

    Deploys updated containers on Kubernetes cluster

    Frontend served via NodePort and Vue SPA handles routing


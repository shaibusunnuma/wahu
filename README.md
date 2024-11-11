# Express Firebase Blog API

A RESTful API built with Express.js and Firebase for managing blog posts and user profiles.

## Features

- Firebase Authentication integration
- Blog post CRUD operations
- User profile management
- Secure endpoints with Firebase token verification

## Prerequisites

- Node.js and npm installed
- Firebase project set up
- Firebase service account key for local development

## Setup

1. Clone the repository
2. Install dependencies
3. Add service account file in root directory for local development


## Deployment

This project supports both local development and production environments with different Firebase initialization strategies:

### Local Development
- Uses local service account key file for Firebase initialization
- Suitable for testing and development purposes

### Production Deployment

#### Google Cloud Platform
- Automatically uses Google Application Default Credentials (ADC)
- No manual credential configuration required
- Recommended for deployments on Google Cloud services

#### Other Cloud Providers/Environments
For secure credential management, choose one of these approaches:

- Store credentials in a secure key vault service
  - AWS Secrets Manager
  - Azure Key Vault
  - HashiCorp Vault
- Use environment variables with proper encryption
  - Set credentials as secure environment variables
  - Ensure variables are encrypted at rest


Env file is not required for local development. However if you choose to use env variables for Firebase, add them to the .env file.

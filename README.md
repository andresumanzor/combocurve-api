# ComboCurve API

## How to run the Project

### 1) Fill the .env file with what is on the .env.example file

### 2) Running the project

1. Install NVM in your machine
2. Install node version `16.15` to fit with Project engine -- `nvm install 16.15`
3. Once you have it, you can run this entire command: `nvm use 16.15 && yarn`
4. Run `yarn prisma:generate`
5. [Install](https://docker-docs.netlify.app/compose/install/) `docker-compose`
6. Run `docker-compose up`
7. Run `yarn prisma:migrate`
8. Run `yarn prisma:seed`
9. Run `yarn dev`

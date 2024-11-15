# Get the base image of Node version 16
FROM node:18

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.48.2-focal

# Set the work directory for the application
WORKDIR /app

# Set the environment path to node_modules/.bin
ENV PATH=/app/node_modules/.bin:$PATH

# COPY the needed files to the app folder in Docker image
COPY package.json /app/
COPY tests/ /app/tests/
COPY playwright.config.ts /app/

# Get the needed libraries to run Playwright
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

# Puerto para correr Playwright
EXPOSE 3000
# Puerto para exponer el informe en HTML
EXPOSE 9323

# Install the dependencies in Node environment
RUN npm install

# Pull Docker Hub base image
FROM node:10
# Set working directory
WORKDIR /usr/app/server
# Install app dependencies
COPY package*.json ./
RUN npm install -qyg nodemon@2.0.12
RUN npm install -qy
# Copy app to container
COPY . .
# Expose the port
EXPOSE  8000
# Run the "dev" script in package.json
CMD ["npm", "start"]
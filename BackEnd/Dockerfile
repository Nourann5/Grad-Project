# Use a Node.js base image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install --production

# Copy the rest of the application code to the container
Copy .env .
COPY . .

# Set the environment variables
ENV PORT=5555
ENV MONGO_URI=mongodb://mongodb:27017/mydb

# Expose the application port
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]


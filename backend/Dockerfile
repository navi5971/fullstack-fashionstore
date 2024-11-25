# Use official Node.js image from Docker Hub
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY backend/ .

# Expose the port the app runs on (adjust the port if needed)
EXPOSE 5000

# Command to run your backend application
CMD ["node", "server.js"]

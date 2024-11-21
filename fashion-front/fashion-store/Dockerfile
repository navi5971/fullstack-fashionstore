# Use the official Node.js image for React
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend code into the container
COPY . .

# Expose the port the app will run on (React's default is 3000)
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]

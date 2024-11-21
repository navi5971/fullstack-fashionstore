# use official Node.js image from Docker Hub
FROM node:16

# set the working directory inside the container
# Set the working directory inside the container to /backend
WORKDIR /backend


#copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

#Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port application runs on 
EXPOSE 5000

# Command to run your backend application (adjust if your entry point is different)
CMD ["node", "server.js"]

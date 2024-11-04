# backend/Dockerfile

# Base image for Node
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5000 for the backend
EXPOSE 5000

# Start the backend with npm run dev
CMD ["npm", "run", "dev"]

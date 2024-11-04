# frontend/Dockerfile

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

# Expose port 3000 for the frontend
EXPOSE 5173

# Start the frontend with npm run dev
CMD ["npm", "run", "dev", "--", "--host"]

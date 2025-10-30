# Use Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Install 'serve' globally to serve the build folder
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the app on port 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
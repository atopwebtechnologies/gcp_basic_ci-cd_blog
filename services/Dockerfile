# Use an official Node runtime as a parent image
FROM node:18 as dev_Builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Use a slim version of Node.js for the runtime image
FROM node:18-slim

# Set the working directory to /app
WORKDIR /app

# Copy the node_modules and dist directories from the builder stage
COPY --from=dev_Builder /app/node_modules /app/node_modules
COPY --from=dev_Builder /app/dist /app/dist

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variables
ENV NODE_ENV=production

# Run app.js when the container launches
CMD ["node", "dist/api/app.js"]

# Stage 1: Build the application
FROM node:20 as builder

RUN apt-get update
RUN apt-get install xsel

RUN xsel --version

WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:20-slim

WORKDIR /usr/src/app

# Install serve to serve the application
RUN npm install -g serve

# Copy built assets from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port serve listens on
EXPOSE 5173

# Run serve
CMD ["serve", "-s", "dist", "-l", "5173"]

# Use a non-root user to run our application (best practice)
USER node

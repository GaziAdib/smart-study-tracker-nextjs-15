# use Node.js base image
FROM node:20

#SET working directory

WORKDIR /STUDY-PROGRESS-TRACKER

# Copy package files and install dependencies

COPY package*.json ./
RUN npm install

# Copy the rest of your project files
COPY . .

# Build the nextjs app
RUN npm run build

# Expose the port 
EXPOSE 3000


# Start the app
CMD ["npm", "start"]
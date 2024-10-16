# Use the official Node.js 14 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY ["package*.json", "yarn.lock", "tsconfig.json",  "./"]

# Install app dependencies
RUN yarn install 

# Copy the rest of the app source code to the working directory
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

CMD ["yarn", "start"]
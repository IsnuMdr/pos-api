FROM node:slim

# Set working directory di dalam container
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua source code ke container
COPY . .

# Build project TypeScript ke JavaScript
RUN npm run build

EXPOSE 3000

# Start aplikasi
CMD ["npm", "run", "start:prod"]

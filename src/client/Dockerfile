FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install @mui/material @emotion/react @emotion/styled axios
COPY . .
RUN npm run build
CMD ["npm", "start"]

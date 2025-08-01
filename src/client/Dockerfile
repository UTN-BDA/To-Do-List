# Etapa de construcción
FROM node:18-alpine

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

EXPOSE 80

CMD [ "npm", "start" ]

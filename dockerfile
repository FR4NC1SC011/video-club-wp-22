FROM node
MAINTAINER Francisco Ortiz
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD npm start

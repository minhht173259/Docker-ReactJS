FROM node:14.17.3-buster

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install 

COPY . .

CMD ["npm", "run", "start"]

# FROM node:16.14.0 as build

# WORKDIR /code

# COPY package.json package.json
# COPY package-lock.json package-lock.json

# RUN npm ci --production 

# COPY . .

# RUN npm run build

# #NGINX Web Server
# FROM nginx:1.12-alpine as prod

# COPY --from=build /code/build /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]


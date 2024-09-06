#   Etapa 01: Build da aplicação React
FROM node:20 AS build

WORKDIR /frontend

COPY package*.json ./

# Intalar as dependencias 
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /frontend/dist /usr/share/nginx/html

# colocar na porta 
EXPOSE 80

# Rodar no primeiro Plano do container
CMD ["nginx", "-g", "daemon off;"]







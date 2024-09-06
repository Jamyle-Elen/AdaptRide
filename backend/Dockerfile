# Usando a Imagem oficial do Node.js como base
FROM node:20

# Criando um diretório do trabalho para o backend
WORKDIR /backend

# Copiando os arquivos package-lock.jason e package.json para dentro do container
COPY package*.json ./

# Apagando a pasta node_modules
RUN rm -rf node_modules

# Instalando as dependências do projeto 
RUN npm install

# Copiando o restante do codigo da aplicação para dentro do container
COPY . .


# Expondo a porta na qual o servidor vai rodar
EXPOSE 3000

# Comando para iniciar o servidor 
CMD ["npm", "start"]

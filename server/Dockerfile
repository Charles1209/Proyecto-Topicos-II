# Usa una imagen oficial de Node.js como base
FROM node:18-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias de producción
RUN npm install --only=production

# Copia el resto del código de tu aplicación
COPY . .

# Expone el puerto en el que corre tu app
EXPOSE 3001

# El comando para iniciar tu servidor
CMD [ "node", "index.js" ]
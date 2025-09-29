# Build backend
FROM maven:3.9-eclipse-temurin-21 AS backend-build
WORKDIR /backend
COPY backend/pom.xml .
RUN mvn dependency:go-offline
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Build frontend
FROM node:18-alpine AS frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# Runtime - requires a process manager like supervisord
FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache nodejs npm supervisor

WORKDIR /app

# Copy backend jar
COPY --from=backend-build /backend/target/*.jar backend.jar

# Copy frontend
COPY --from=frontend-build /frontend /app/frontend

# Supervisor config
RUN echo '[supervisord]' > /etc/supervisord.conf && \
    echo 'nodaemon=true' >> /etc/supervisord.conf && \
    echo '[program:backend]' >> /etc/supervisord.conf && \
    echo 'command=java -jar /app/backend.jar' >> /etc/supervisord.conf && \
    echo '[program:frontend]' >> /etc/supervisord.conf && \
    echo 'command=npm start' >> /etc/supervisord.conf && \
    echo 'directory=/app/frontend' >> /etc/supervisord.conf

EXPOSE 8081 3000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
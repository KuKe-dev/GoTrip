FROM openjdk:21-jdk-slim
WORKDIR /app
# Separar la copia de archivos que cambian poco (pom.xml) de los que cambian mucho (src)
COPY pom.xml .
COPY .mvn/ .mvn
COPY mvnw .
RUN ./mvnw dependency:go-offline -B

# Luego copiar el código fuente
COPY src ./src
CMD ["./mvnw", "spring-boot:run"]
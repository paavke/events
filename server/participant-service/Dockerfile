# Use Maven image to build the project
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml and project files to the container
COPY pom.xml .
COPY src ./src

# Package the application as a JAR
RUN mvn clean package -DskipTests

# Use OpenJDK 17 runtime to run the application
FROM openjdk:17-jdk-slim

# Set the working directory for runtime
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/task-service-1.0-SNAPSHOT.jar app.jar

# Expose the port that your application will run on
EXPOSE 8085

# Set the command to run your application
CMD ["java", "-jar", "app.jar"]

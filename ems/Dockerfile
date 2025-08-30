# syntax=docker/dockerfile:1

# --- Build stage ---
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Copy Maven wrapper and pom.xml first for dependency caching
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src src

# Make sure the Maven wrapper is executable and download dependencies
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Copy the rest of the source code
COPY --link src ./src/

# Build the application (skip tests for faster build)
RUN ./mvnw package -DskipTests

# --- Runtime stage ---
FROM eclipse-temurin:21-jre
WORKDIR /app

# Create a non-root user and group
RUN addgroup --system ems && adduser --system --ingroup ems emsuser

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar /app/app.jar

# Set permissions
RUN chown -R emsuser:ems /app
USER emsuser

# Expose the default Spring Boot port
EXPOSE 8080

# JVM options: container-aware memory settings
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=80.0", "-jar", "/app/app.jar"]

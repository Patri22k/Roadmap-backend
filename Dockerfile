FROM eclipse-temurin:21-alpine AS builder

WORKDIR /home

COPY . .

RUN chmod +x gradlew
RUN ./gradlew bootJar --no-daemon

FROM eclipse-temurin:21-alpine

WORKDIR /app

COPY --from=builder /home/build/libs/*.jar app.jar

CMD ["java", "-jar", "app.jar"]
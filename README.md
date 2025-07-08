# Blogging platform API

This is a simple blogging platform API built with Spring Boot.
It allows you to create, update, delete, and retrieve individual or all posts
stored in a PostgreSQL database. The project includes wildcard filtering, 
model validation, and structured error handling.

The full assignment description is available on the 
[Roadmap.sh website](https://roadmap.sh/projects/blogging-platform-api).

## Prerequisites
- developed on Windows 11
- Docker Desktop installed
- Required Docker Images:
    - `postgresql`

## Build and Run
The application is fully dockerized using a `Dockerfile` and `docker-compose.yml`, 
which means you don’t need to install Java or PostgreSQL manually — Docker 
handles everything for you.

To run the application locally:

**1. Clone the repository:**
```bash
git clone https://github.com/Patri22k/blogging-platform-api
cd blogging-platform-api
```

**2. Create a .env file in the root of the project (if not already present),
and add the following environment variables:**
```dotenv
POSTGRES_DB=yourDatabaseName
POSTGRES_USER=yourUsername
POSTGRES_PASSWORD=yourSecretPassword
```

**3. Build and start the application:**
```bash
docker compose up -d --build
```
This command:
- Builds the Spring Boot app using the Dockerfile
- Pulls the PostgreSQL image
- Creates and starts both containers
- Sets up the necessary environment

**4. Verify it's running:**
- API is available at: `http://localhost:8080`
- PostgreSQL is running inside a container on the default port `5432`

**5. Stop and remove containers (including volumes):**
```bash
docker compose down -v
```
**Note:** No additional configuration is needed. Just make sure:
- Docker Desktop is running
- Port `8080` and `5432` are available
- `.env` is correctly configured before building

## API Endpoints
| Method | Endpoint            | Description                  |
| ------ | ------------------- | ---------------------------- |
| POST   | `/posts`            | Create a new post            |
| PUT    | `/posts/:id`        | Update a post by ID          |
| DELETE | `/posts/:id`        | Delete a post by ID          |
| GET    | `/posts/:id`        | Retrieve a single post by ID |
| GET    | `/posts`            | Retrieve all posts           |
| GET    | `/posts?term=value` | Search posts by term         |

## Tests
The project includes simple integration tests that cover core
operations such as creating, updating, deleting, and retrieving
posts. The tests primarily validate HTTP response status codes,
in line with the requirements of the Roadmap.sh assignment.

### Test Naming Convention

Tests follow the `what_when_then` format (also known as the
**BDD style** — Behavior Driven Development). This convention
improves readability and clearly communicates the intent of
each test.

Example:
```java
@Test
void getRequest_whenPostIdExists_shouldReturnPost();
```
Structure:
- **what:** the action being tested (e.g., `getRequest`)
- **when:** the condition or context (e.g., `whenPostIdExists`)
- **then:** the expected outcome (e.g., `shouldReturnPost`)

This structure helps make test methods self-documenting.


### Run Tests

To run the tests, use the following command:
```
./gradlew test
```

### View Test Report

After running the tests, you can view the test report in:
`build/reports/tests/test/index.html`.

**Note:** The tests use `MockMvc` to simulate HTTP requests,
and require no active database connection.
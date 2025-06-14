# Personal blog

This project is a simple personal blog application with a 
frontend and backend structure. The repository is set up in 
a monorepo structure with separate directories for the frontend 
and backend.

## Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/Patri22k/personal-blog
cd personal-blog
```

## Frontend Setup
The frontend is located in the root of the repository.

### Install Dependencies
Run the following command to install the necessary dependencies:
```bash
npm install
```

### Optional: Update dependencies
If you need to update the dependencies, you can run:
```bash
npm update
```

### Run the Frontend Development Application
To start the frontend application, run:
```bash
npm run dev
```

## Backend Setup
The backend is located in the `backend` directory.
```bash
cd backend
```

### Install Dependencies
Run the following command to install the necessary dependencies:
```bash
npm install
```

You can also use `npm update` to update the dependencies.

### Run the backend development application
To start the backend application, run:
```bash
nodemon index.js
```
This will start the backend server. By default, it should 
run on http://localhost:3000, or you can adjust the port 
in your server configuration if needed.

## URL Endpoints
The backend server exposes the following endpoints:
- `POST /login` - retrieves a JWT token
- `GET /me` - logs with the token
- `GET /admin` - admin page
- `GET /home` - home page
- `PUT /new` - create a new article (admin only)
- `POST /edit/:id` - edit an article (admin only)
- `DELETE /admin` - delete an article via button (admin only)

## License
This project in under ISC license.

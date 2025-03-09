

# Collaborative Code Playground - Backend

A real-time collaborative code editor backend built with Node.js, Express, MongoDB, and Socket.IO.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running locally:
```bash
mongod
```

3. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication

#### Register User
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

Request Body:
{
    "username": "testuser",
    "password": "password123"
}

Response (201):
{
    "message": "User created"
}
```

#### Login User
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

Request Body:
{
    "username": "testuser",
    "password": "password123"
}

Response (200):
{
    "message": "Logged in",
    "userId": "65f1234567890abcdef12345",
    "username": "testuser"
}
```

### Code Projects

#### Create New Project
```http
POST http://localhost:3000/api/code/create
Content-Type: application/json

Request Body:
{
    "content": "function hello() {\n    console.log('Hello World');\n}",
    "language": "javascript"
}

Response (201):
{
    "codeId": "65f1234567890abcdef12346"
}
```

#### Get User's Projects
```http
GET http://localhost:3000/api/code/my-projects

Response (200):
[
    {
        "_id": "65f1234567890abcdef12346",
        "content": "function hello() {...}",
        "language": "javascript",
        "owner": "65f1234567890abcdef12345",
        "collaborators": ["65f1234567890abcdef12345"],
        "lastModified": "2024-03-13T10:30:00.000Z"
    }
]
```

## Real-time Events (Socket.IO)

### Client Events (Emit)

1. Join Room
```javascript
socket.emit("join-room", roomId, userId);
```

2. Send Code Changes
```javascript
socket.emit("code-change", {
    roomId: "room_id",
    content: "updated code",
    userId: "user_id"
});
```

3. Send Message
```javascript
socket.emit("message", {
    roomId: "room_id",
    message: "Hello!",
    userId: "user_id"
});
```

### Server Events (Listen)

1. Initial Code
```javascript
socket.on("initial-code", (content) => {
    // Handle initial code content
});
```

2. Code Updates
```javascript
socket.on("code-update", (content) => {
    // Handle code updates
});
```

3. Messages
```javascript
socket.on("message", ({ message, userId }) => {
    // Handle incoming messages
});
```

4. Errors
```javascript
socket.on("error", (errorMessage) => {
    // Handle error messages
});
```

## Project Structure

```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── codeController.js
├── models/
│   ├── User.js
│   └── Code.js
├── routes/
│   ├── authRoutes.js
│   └── codeRoutes.js
└── server.js
```

## Authentication

- All `/api/code` endpoints require authentication
- Socket.IO operations require valid user authentication
- Sessions are maintained using `express-session`

## Error Handling

- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Database Collections

1. `auth`: User authentication data
2. `codes`: Code projects and collaboration data
```
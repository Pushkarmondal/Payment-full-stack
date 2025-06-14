# WalletCore Backend

A secure and scalable backend API for a digital wallet application built with Node.js, Express, and MongoDB. This project implements user authentication, account management, and money transfer functionality similar to Paytm.

## 🚀 Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Password Security**: Bcrypt hashing for password protection
- **Account Management**: User profile management and balance tracking
- **Money Transfers**: Secure peer-to-peer money transfers with database transactions
- **User Search**: Search users by name for easy transfers
- **Input Validation**: Comprehensive request validation using Zod
- **Transaction Safety**: MongoDB transactions ensure data consistency

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt
- **Validation**: Zod
- **CORS**: Enabled for cross-origin requests

## 📁 Project Structure

```
WalletCore-backend/
├── routes/
│   ├── app.js           # Main router
│   ├── users.js         # User-related routes
│   └── accounts.js      # Account and transfer routes
├── middleware.js        # Authentication middleware
├── userModel.js         # Database models and connection
├── config.js           # Configuration settings
└── app.js            # Main server file
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd WalletCore-backend
   ```

2. **Install dependencies**
   ```bash
   npm install express mongoose bcrypt jsonwebtoken zod cors body-parser
   ```

3. **Configure environment**
   - Update `config.js` with your JWT secret
   - Update `userModel.js` with your MongoDB connection string

4. **Start the server**
   ```bash
   node index.js
   ```

The server will start on port 3006 by default.

## 🔧 Configuration

### Database Connection
Update the MongoDB connection string in `userModel.js`:
```javascript
mongoose.connect("your-mongodb-connection-string");
```

### JWT Secret
Update the JWT secret in `config.js`:
```javascript
module.exports = {
  JWT_SECRET: "your-super-secret-key-here"
};
```

## 📋 API Documentation

### Base URL
```
http://localhost:3006/api/v1
```

### Authentication
Most endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 👤 User Routes

### POST /users/signup
Create a new user account.

**Request Body:**
```json
{
  "userName": "john_doe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "User Created",
  "token": "jwt-token-here"
}
```

### POST /users/login
Authenticate an existing user.

**Request Body:**
```json
{
  "userName": "john_doe",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "userName": "john_doe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### PUT /users/
Update user information (requires authentication).

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com"
}
```

### GET /users/bulk?filter=john
Search users by name.

**Query Parameters:**
- `filter` (optional): Search term for first name or last name

**Response:**
```json
{
  "user": [
    {
      "userName": "john_doe",
      "firstName": "John",
      "lastName": "Doe",
      "_id": "user-id-here"
    }
  ]
}
```

## 💰 Account Routes

### GET /accounts/balance
Get current user's account balance (requires authentication).

**Response:**
```json
{
  "balance": 50000.75
}
```

### POST /accounts/transfer
Transfer money to another user (requires authentication).

**Request Body:**
```json
{
  "to": "recipient-user-id",
  "amount": 1000
}
```

**Response:**
```json
{
  "message": "Transfer successful"
}
```

## 🔒 Security Features

### Password Security
- Passwords are hashed using bcrypt with salt rounds of 10
- Plain text passwords are never stored in the database

### JWT Authentication
- Secure token-based authentication
- Tokens include user ID for session management
- Protected routes verify token validity

### Database Transactions
- Money transfers use MongoDB transactions
- Ensures atomicity - either both debit and credit succeed, or both fail
- Prevents race conditions and data inconsistency

### Input Validation
- All requests validated using Zod schemas
- Type checking and format validation
- Sanitized error messages

## 🗄️ Database Schema

### User Model
```javascript
{
  userName: String (required, unique),
  email: String (unique),
  firstName: String (required, max 30 chars),
  lastName: String (required, max 30 chars),
  password: String (required, hashed)
}
```

### Account Model
```javascript
{
  userId: ObjectId (reference to User, required),
  balance: Number (default: 0, required)
}
```

## 🚨 Error Handling

The API returns appropriate HTTP status codes:

- **200**: Success
- **201**: Created
- **400**: Bad Request (validation errors, insufficient balance)
- **403**: Forbidden (authentication failed)
- **500**: Internal Server Error

## 🧪 Testing the API

You can test the API using tools like Postman, curl, or any HTTP client:

### Example: Complete User Flow
1. **Signup**: `POST /api/v1/users/signup`
2. **Login**: `POST /api/v1/users/login`
3. **Check Balance**: `GET /api/v1/accounts/balance`
4. **Search Users**: `GET /api/v1/users/bulk?filter=john`
5. **Transfer Money**: `POST /api/v1/accounts/transfer`

## 🔄 Account Initialization

When a new user signs up:
- A user account is created with hashed password
- An associated account is automatically created
- Initial balance is randomly set between 1 and 1,000,000 (for demo purposes)

## 🚀 Deployment

For production deployment:

1. **Environment Variables**: Use environment variables for sensitive data
2. **Database**: Ensure MongoDB Atlas is properly configured
3. **HTTPS**: Use HTTPS in production
4. **Rate Limiting**: Implement rate limiting for API endpoints
5. **Logging**: Add comprehensive logging for monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is for educational purposes. Please ensure you comply with all applicable laws and regulations if using in production.

## 🔧 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Verify your connection string
- Check network access in MongoDB Atlas
- Ensure your IP is whitelisted

**JWT Token Issues**
- Verify the JWT_SECRET is consistent
- Check token format in Authorization header
- Ensure token hasn't expired

**Transaction Failures**
- Check MongoDB replica set configuration
- Verify sufficient account balance
- Ensure recipient account exists

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Create an issue in the repository

---

**Note**: This is a demo application. For production use, implement additional security measures, error handling, and testing.

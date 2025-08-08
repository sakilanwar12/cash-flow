
### Digital Wallet API

This application allows users to register, manage wallets, and perform actions such as adding money, withdrawing funds, and sending money.

## 🚀 Features

- ✅ JWT-based login system with three roles: `admin`, `user`, `agent`
- ✅ Secure password hashing using bcrypt
- ✅ Each user and agent must have a wallet automatically created at registration (e.g., initial balance: ৳50)
- ✅ Users should be able to:
    - Add money (top-up)
    - Withdraw money
    - Send money to another user
    - View transaction history
- ✅ Agents should be able to:
    - Add money to any user's wallet (cash-in)
    - Withdraw money from any user's wallet (cash-out)
- ✅ Admins should be able to:
    - View all users, agents, wallets and transactions
    - Block/unblock user wallets
    - Approve/suspend agents
- ✅ Role-based route protection must be implemented

---

## Installation Process

## Installation Process

  1. **Copy the `.env.example` file** and rename it to `.env`.  
   Fill in all the required environment variables in the `.env` file. 

  2. **Install Dependencies**
   ```bash
   pnpm install
  ```
  3. Run Dev Server
```
pnpm run dev
```
### **📁  Project Structure**
```
src/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── wallet/
│   └── transaction/
├── middlewares/
├── config/
├── utils/
├── app.ts
```
---
### Api Descriptions

Authentication

### 1\. Create Or Register User/admin/agent

**POST** `/api/v1/user/register`

#### Request:

```json
{
    "name":"Sakil Anwar",
    "email":"agent@gmail.com",
    "password":"Password123!",
    "role":"ADMIN"  - ADMIN | AGENT | USER
}
```

#### Response:

```json
{
    "statusCode": 201,
    "success": true,
    "message": "User Created Successfully",
    "data": {
        "name": "Sakil Anwar",
        "email": "admin@gmail.com",
        "password": "$2b$10$UcLrhHggUxpZxXUJwVRSPudJJjhBJXzgk6R.ADlzJqQFSkZkg6Mni",
        "role": "ADMIN",
        "isDeleted": false,
        "IsActive": "ACTIVE",
        "isVerified": false,
        "auths": [
            {
                "provider": "credentials",
                "providerId": "admin@gmail.com"
            }
        ],
        "_id": "6895ef0524cce0fbb61dcde7",
        "createdAt": "2025-08-08T12:35:17.322Z",
        "updatedAt": "2025-08-08T12:35:17.322Z"
    }
}
```

* * *

### 2\. Login USER/ADMIN/AGENT

**POST** `/api/v1/auth/login`

#### Request:

```json
{
    "name":"Sakil Anwar",
    "email":"sakilanwar12@gmail.com",
    "password":"Password123!",
    "role":"ADMIN" | AGENT | USER
}
```

```json
{
    "statusCode": 201,
    "success": true,
    "message": "User logged in successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODhmYTE3ZDJmZGJlODliZjY2ZDg5YjgiLCJlbWFpbCI6InNha2lsYW53YXIxMkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTQ2NTc1NjUsImV4cCI6MTc1NDc0Mzk2NX0.LILW1ZoUJ6jG1-d825eWmEEpWLlGPZxLJ5Gcu0YnhZ4",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODhmYTE3ZDJmZGJlODliZjY2ZDg5YjgiLCJlbWFpbCI6InNha2lsYW53YXIxMkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTQ2NTc1NjUsImV4cCI6MTc1NzI0OTU2NX0.6fgaerKyJR_c5ZZPBdTAwPWJCQGQTHEmJphI1Cedyrs",
        "user": {
            "_id": "688fa17d2fdbe89bf66d89b8",
            "name": "Sakil Anwar",
            "email": "sakilanwar12@gmail.com",
            "role": "ADMIN",
            "isDeleted": false,
            "IsActive": "ACTIVE",
            "isVerified": false,
            "auths": [
                {
                    "provider": "credentials",
                    "providerId": "sakilanwar12@gmail.com"
                }
            ],
            "createdAt": "2025-08-03T17:50:53.494Z",
            "updatedAt": "2025-08-03T17:50:53.494Z"
        }
    }
}
```

* * *

### 3\. Logout

**POST** `/api/v1/auth/logout`

#### Response:

```json
{
    "statusCode": 200,
    "success": true,
    "message": "User logged out successfully",
    "data": null
}
```

* * *
* * *

### 4\. GET All users (only admin can get all users)

**GET** `/api/v1/user/all-users?role=ADMIN`

#### Response:

```json
{
    "statusCode": 201,
    "success": true,
    "message": "All Users Retrieved Successfully",
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 6,
        "totalPage": 1
    },
    "data": [
        {
            "_id": "6895ef0524cce0fbb61dcde7",
            "name": "Sakil Anwar",
            "email": "admin@gmail.com",
            "password": "$2b$10$UcLrhHggUxpZxXUJwVRSPudJJjhBJXzgk6R.ADlzJqQFSkZkg6Mni",
            "role": "ADMIN",
            "isDeleted": false,
            "IsActive": "ACTIVE",
            "isVerified": false,
            "auths": [
                {
                    "provider": "credentials",
                    "providerId": "admin@gmail.com"
                }
            ],
            "createdAt": "2025-08-08T12:35:17.322Z",
            "updatedAt": "2025-08-08T12:35:17.322Z"
        },
     .....
    ]
}
```

USERS Mangement

### 1\. GET All users (only admin can get all users)

**GET** `/api/v1/user/all-users?role=ADMIN`

#### Response:

```json
{
    "statusCode": 201,
    "success": true,
    "message": "All Users Retrieved Successfully",
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 6,
        "totalPage": 1
    },
    "data": [
        {
            "_id": "6895ef0524cce0fbb61dcde7",
            "name": "Sakil Anwar",
            "email": "admin@gmail.com",
            "password": "$2b$10$UcLrhHggUxpZxXUJwVRSPudJJjhBJXzgk6R.ADlzJqQFSkZkg6Mni",
            "role": "ADMIN",
            "isDeleted": false,
            "IsActive": "ACTIVE",
            "isVerified": false,
            "auths": [
                {
                    "provider": "credentials",
                    "providerId": "admin@gmail.com"
                }
            ],
            "createdAt": "2025-08-08T12:35:17.322Z",
            "updatedAt": "2025-08-08T12:35:17.322Z"
        },
      ....
    ]
}
```

### 2\. GET A Single user

**GET** `api/v1/user/:userId`

#### Response:

```json
{
    "statusCode": 201,
    "success": true,
    "message": "User Retrieved Successfully",
    "data": {
        "_id": "688fa2e92cd91a2b526ecb03",
        "name": "Sakil Anwar",
        "email": "sakilanwar13@gmail.com",
        "role": "USER",
        "isDeleted": false,
        "IsActive": "ACTIVE",
        "isVerified": false,
        "auths": [
            {
                "provider": "credentials",
                "providerId": "sakilanwar13@gmail.com"
            }
        ],
        "createdAt": "2025-08-03T17:56:57.114Z",
        "updatedAt": "2025-08-03T17:56:57.114Z"
    }
}
```
https://github.com/Apollo-Level2-Web-Dev/B5A5/blob/main/1.%20Digital%20Wallet%20System.md
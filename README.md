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

### **📁 Project Structure**

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

---

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

---

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

## USERS Management

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

#### Wallet Management

Users action

### 1\. Add money (top-up)

**POST** `/api/v1/wallet/top-up`

#### Request:

```json
{
  "user": "688fa2e92cd91a2b526ecb03",
  "balance": 50
}
```

#### Response:

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Top Up Wallet Successfully",
  "data": {
    "_id": "688fa2e92cd91a2b526ecb05",
    "user": "688fa2e92cd91a2b526ecb03",
    "balance": 450,
    "status": "ACTIVE",
    "createdAt": "2025-08-03T17:56:57.131Z",
    "updatedAt": "2025-08-08T17:30:25.247Z"
  }
}
```

### 2\. Withdraw money

**POST** `/api/v1/wallet/withdraw`

#### Request:

```json
{
  "user": "688fa2e92cd91a2b526ecb03",
  "balance": 50
}
```

#### Response:

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Withdraw Wallet Successfully",
  "data": {
    "_id": "688fa2e92cd91a2b526ecb05",
    "user": "688fa2e92cd91a2b526ecb03",
    "balance": 400,
    "status": "ACTIVE",
    "createdAt": "2025-08-03T17:56:57.131Z",
    "updatedAt": "2025-08-08T17:36:37.982Z"
  }
}
```

### 3\. Send money to another user

**POST** `/api/v1/wallet/send-money`

#### Request:

```json
{
  "senderId": "6890edb7545403c84b49be7f",
  "recipientId": "688fa2e92cd91a2b526ecb03",
  "amount": 10
}
```

#### Response:

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Send Money Successfully",
  "data": {
    "_id": "6890edb7545403c84b49be81",
    "user": "6890edb7545403c84b49be7f",
    "balance": 20,
    "status": "ACTIVE",
    "createdAt": "2025-08-04T17:28:23.922Z",
    "updatedAt": "2025-08-08T17:40:10.704Z"
  }
}
```

### 4\. View transaction history

**GET** `/api/v1/transaction/:userId`

#### Response:

```json
{
    "statusCode": 201,
    "success": true,
    "message": "Get Transaction Successfully",
    "data": [
        {
            "_id": "6896367adf0539a9a48a499d",
            "senderId": "6890edb7545403c84b49be7f",
            "recipientId": "688fa2e92cd91a2b526ecb03",
            "amount": 10,
            "type": "transfer",
            "status": "success",
            "createdAt": "2025-08-08T17:40:10.709Z",
            "updatedAt": "2025-08-08T17:40:10.709Z"
        },
     ....
    ]
}
```

## Agents actions (Login as AGENT)

### 1\. Add money to any user's wallet (cash-in)

**POST** `/api/v1/wallet/agent-cash-in`

### Request :

```
{
    "userId":"6890edb7545403c84b49be7f",
    "agentId": "6891fa075097d222c871e1ce",
    "amount": 10
}
```

#### Response:

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Agent Cash In Successfully",
  "data": {
    "_id": "6891fa075097d222c871e1d0",
    "user": "6891fa075097d222c871e1ce",
    "balance": 1860,
    "status": "ACTIVE",
    "createdAt": "2025-08-05T12:33:11.805Z",
    "updatedAt": "2025-08-08T17:51:37.137Z"
  }
}
```

### 2\. Withdraw money from any user's wallet (cash-out)

**POST** `/api/v1/wallet/agent-cash-out`

### Request :

```
{
    "userId":"6890edb7545403c84b49be7f",
    "agentId": "6891fa075097d222c871e1ce",
    "amount": 10
}
```

#### Response:

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Agent Cash Out Successfully",
  "data": {
    "_id": "6891fa075097d222c871e1d0",
    "user": "6891fa075097d222c871e1ce",
    "balance": 1870,
    "status": "ACTIVE",
    "createdAt": "2025-08-05T12:33:11.805Z",
    "updatedAt": "2025-08-08T17:53:47.184Z"
  }
}
```

### Admin Actions

### 1\. View all users, agents,

**GET** `/api/v1/user/all-users?role=USER`
**GET** `/api/v1/user/all-users?role=AGENT`

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
            "_id": "6891fa075097d222c871e1ce",
            "name": "Sakil Anwar",
            "email": "agent1@gmail.com",
            "role": "AGENT",
            "isDeleted": false,
            "IsActive": "ACTIVE",
            "isVerified": false,
            "auths": [
                {
                    "provider": "credentials",
                    "providerId": "agent1@gmail.com"
                }
            ],
            "createdAt": "2025-08-05T12:33:11.797Z",
            "updatedAt": "2025-08-05T12:33:11.797Z"
        },
      ...
    ]
}
```

### 2\. View all wallets

**GET** `/api/v1/wallet/all-wallets`

#### Response:

```json
{
    "statusCode": 201,
    "success": true,
    "message": "Get All Wallet Successfully",
    "data": {
        "data": [
            {
                "_id": "6891fa075097d222c871e1d0",
                "user": "6891fa075097d222c871e1ce",
                "balance": 1870,
                "status": "ACTIVE",
                "createdAt": "2025-08-05T12:33:11.805Z",
                "updatedAt": "2025-08-08T17:53:47.184Z"
            },
           ....
        ],
        "meta": {
            "page": 1,
            "limit": 10,
            "total": 4,
            "totalPage": 1
        }
    }
}
```

### 3\. View all transactions

**GET** `/api/v1/transaction/all-transactions`

#### Response:

```json
{
    "statusCode": 201,
    "success": true,
    "message": "Get All Transaction Successfully",
    "data": [
        {
            "_id": "689639abdf0539a9a48a49ab",
            "senderId": "6890edb7545403c84b49be7f",
            "recipientId": "6891fa075097d222c871e1ce",
            "amount": 10,
            "type": "agentCashOut",
            "status": "success",
            "createdAt": "2025-08-08T17:53:47.189Z",
            "updatedAt": "2025-08-08T17:53:47.189Z"
        },
       ...
    ]
}
```

### 4\. View all transactions

**GET** `/api/v1/transaction/all-transactions`

#### Response:

```json
{
    "statusCode": 201,
    "success": true,
    "message": "Get All Transaction Successfully",
    "data": [
        {
            "_id": "689639abdf0539a9a48a49ab",
            "senderId": "6890edb7545403c84b49be7f",
            "recipientId": "6891fa075097d222c871e1ce",
            "amount": 10,
            "type": "agentCashOut",
            "status": "success",
            "createdAt": "2025-08-08T17:53:47.189Z",
            "updatedAt": "2025-08-08T17:53:47.189Z"
        },
       ...
    ]
}
```

### 5\. Block/unblock user wallets

**POST** `/api/v1/wallet/toggle-wallet-status`

#### Request:

```json
{
  "user": "6890edb7545403c84b49be7f",
  "status": "BLOCKED"
}
```

#### Response:

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Toggle Wallet Status Successfully",
  "data": {
    "_id": "6890edb7545403c84b49be81",
    "user": "6890edb7545403c84b49be7f",
    "balance": 20,
    "status": "BLOCKED",
    "createdAt": "2025-08-04T17:28:23.922Z",
    "updatedAt": "2025-08-08T18:17:27.277Z"
  }
}
```

### 6\. Approve/suspend agents

**POST** `/api/v1/user/update-agent-status`

#### Request:

```json
{
  "agentId": "6891f712966deb3eb7364951",
  "status": "SUSPENDED"
}
```

#### Response:

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Agent Status Updated Successfully",
  "data": {
    "_id": "6891f712966deb3eb7364951",
    "name": "Sakil Anwar",
    "email": "agent@gmail.com",
    "password": "$2b$10$4U1cL58MqHMbCoYOHg74/.h.OWU2TIn1jijdKN3h/WrSjzzlDFUwy",
    "role": "AGENT",
    "isDeleted": false,
    "IsActive": "SUSPENDED",
    "isVerified": false,
    "auths": [
      {
        "provider": "credentials",
        "providerId": "agent@gmail.com"
      }
    ],
    "createdAt": "2025-08-05T12:20:34.956Z",
    "updatedAt": "2025-08-08T18:22:45.952Z"
  }
}
```

# Book Store

## Introduction

This is a Book Store web application where book images are stored in an AWS S3 bucket, the backend is built using Node.js and Express.js, and MongoDB is used as the database. This project allows users to upload, retrieve, and delete book images, with data securely stored and managed through the backend.

## Youtube Video

Link: https://youtu.be/dhSF36aVYwE

![alt text](./images/youtube-tumbnail.png)

### Key features of this project include:

- **Upload Book Images**: Users can upload book images, which are stored in an S3 bucket.
- **Retrieve Book Images**: Fetch stored images from the S3 bucket.
- **Delete Book Images**: Remove images from the S3 bucket as needed.
- **Manage Books**: Add, view, update, and delete book records in the database.

### Technologies Used

- **Backend**: Node.js, Express.js, AWS S3 SDK
- **Database**: MongoDB
- **File Storage**: AWS S3 bucket
- **Frontend**: Next.js

## FlowChart

![alt text](./images/flowchart.png)

## Installation

**1. Clone the repository:**

```
git clone https://github.com/theadiga27/node-s3.git
cd web-hosting
```

**2. Install dependencies:**

1. Backend dependencies

```
npm install
```

2. Frontend dependencies

```
cd client
npm install
```

**3. Change a `.env.example` file to `.env`**

1. Backend `.env` in the root directory
2. Frontend `.env` in the client directory

**4. Run the server**

1. Backend server

```
npm start
```

2. Frontend server

```
cd client
npm run dev
```

**5. Output**:
![alt text](./images/output.png)

# Blackboard Backend

Backend for blackboard app for uploading ecrypted files to s3 and sharing files via link

## AWS Requirements

Generate `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` from IAM and store in .env file

Create a s3 bucket and store it's name in `AWS_S3_BUCKET_NAME`

## Installation
>Make sure you have latest **NodeJs** version installed

Clone repo

```
git clone https://github.com/AshreneRoy/blackboard-be.git
```
Go to `blackboard-be` directory run

```
npm install
```
Now start the server

```
npx nodemon src/index.js
```

which listens to any local file changes, and rebuilds automatically.

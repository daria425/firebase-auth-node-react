## Firebase Auth Template with Node.js & React

This is a template repository I use for creating a React app using Google Firebase for user authentication

### Authentication Flow

**User Signup**:

1. The user fills out the signup form in the React frontend.
2. The frontend sends the user's email, username, and password to Firebase for account creation.
3. After successful creation, the frontend sends the user's data (UID, email, and username) to the Node.js server.
4. The server saves the user's data in the database. If there is an error during this process, the user account in Firebase is deleted to maintain data integrity.
5. If the user data is successfully saved, the user is authenticated and their information is stored in the React app's state.

**User Login**:

1. The user logs in through the React frontend, which sends the email and password to Firebase.
2. Upon successful login, Firebase returns an ID token.
3. The React app sends this ID token to the Node.js server for verification.
4. The server verifies the token and returns user data if the token is valid.
5. The React app updates its state with the authenticated user information.

**Changes to authentication state**:

1. The React app listens for authentication state changes using Firebase's `onAuthStateChanged` method.
2. When a state change is detected, the app retrieves the ID token from Firebase and sends it to the Node.js server for verification.
3. If the server verifies the token successfully, it returns the user data, which is then set in the React app's state.

### Using the repo

Feel free to use the repo by cloning it using

`git clone git@githubcom:daria425firebase-auth-node-react.git`

Set the following `.env` variables in <a href="https://github.com/daria425/firebase-auth-node-react/tree/2f0718a046a73da85485d9a93f9dc60f6f0ae81a/client">/client</a> directory:

```VITE_FIREBASE_API_KEY=<your-firebase-api-key>
VITE_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
VITE_FIREBASE_PROJECT_ID=<your-firebase-project-id>
VITE_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
VITE_FIREBASE_APP_ID=<your-firebase-app-id>
VITE_FIREBASE_MEASUREMENT_ID=<your-firebase-measurement-id>
```

Set the following in the <a href="https://github.com/daria425/firebase-auth-node-react/tree/2f0718a046a73da85485d9a93f9dc60f6f0ae81a/server">/server</a> directory:

```
MONGO_DB_URI=<your-mongo-db-uri>
GOOGLE_APPLICATION_CREDENTIALS=<path-to-your/service-account/key-file.json>
```

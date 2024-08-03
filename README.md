## OAuth 2.0 Flow for Google Authentication

### (A) Redirect the User from the Browser to Google

The user presses a button in the browser and gets redirected to Google where they can grant the application access to their Google account.

1. The user clicks on the "Sign in with Google" button.
2. The browser redirects the user to Google's OAuth 2.0 authorization endpoint.
3. The user logs in to their Google account and grants access to the application.

### (B) Return the User from Google Back to the Browser

After the grant, the user is redirected back to the browser with a code.

1. Google redirects the user back to the application with an authorization code.
2. The browser receives the authorization code.

### (C) Perform the Code-Token Exchange

Send the code from the browser to the server to be exchanged with Google. After the exchange, we should receive an access_token back from the service, and often a refresh_token.

1. The browser sends the authorization code to the server.
2. The server sends a request to Google's token endpoint to exchange the code for an access token and a refresh token.
3. The server receives the access token and refresh token from Google.

### (D) Use the Access Token to Make Requests Against Google APIs

With the access_token, we can now make requests to Google APIs on behalf of the user. If the access_token expires, then we can use the refresh_token to obtain a new access_token.

1. The server stores the access token and refresh token securely.
2. The server uses the access token to make requests to Google APIs on behalf of the user.
3. If the access token expires, the server uses the refresh token to obtain a new access token from Google's token endpoint.

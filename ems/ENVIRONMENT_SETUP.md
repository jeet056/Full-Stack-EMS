# Environment Setup

This application requires Google OAuth2 credentials to be set as environment variables.

## Required Environment Variables

Create a `.env` file in the `ems` directory with the following variables:

```bash
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

## How to get Google OAuth2 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Credentials"
3. Create a new OAuth 2.0 Client ID or use an existing one
4. Add the following redirect URI:
   - For production: `https://full-stack-ems.onrender.com/login/oauth2/authorization/google`
   - For local development: `http://localhost:8080/login/oauth2/authorization/google`

## For Local Development

When running locally, you can set environment variables in several ways:

### Option 1: Create a .env file
Create a `.env` file in the `ems` directory with your credentials.

### Option 2: Set environment variables in your IDE
Set the environment variables in your IDE's run configuration.

### Option 3: Use command line
```bash
export GOOGLE_CLIENT_ID=your-client-id
export GOOGLE_CLIENT_SECRET=your-client-secret
mvn spring-boot:run
```

## For Production (Render)

Set these environment variables in your Render dashboard:
1. Go to your service in Render
2. Navigate to "Environment"
3. Add the environment variables:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

## Security Note

- Never commit the `.env` file to version control
- The `.env` file is already added to `.gitignore`
- Always use environment variables for sensitive credentials

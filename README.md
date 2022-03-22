# Data Application Reference Implementation

## Quick instructions

1. Clone repo
2. Run `yarn install`
3. Run `cp start.example start`
3. Run `./start`
4. Open `http:\\localhost:3001` in browser

## Configuration

- /config.js - variables, menu choices, themes, etx
- /start.example – template to simplify setting env variables at startup

## Repo structure

- Mono-repo. Single project, but each of frontend and backend can be run separately.
- No cross-dependencies EXCEPT:
  - Any API calls built into the front end
  - Shared configuration for easy changes by field engineers in a POC

## Backend - /backend

Express.js server, built using `npx express-generator`

Folder: routes
### index.js
- / serves up the React app

### api.js
- /api/protected  Currently, simply provides a json verifies it has been sent a valid JWT

### auth.js
- /auth/register  Returns a JWT in a JSON response, currently using the default_user

Folder: utils
### jwt.js
- generateToken()
- authenticateToken()

## Frontend -  /frontend

frontend/ : bare React app

_Each page of the app has a folder in **/frontend/src/pages**_

## Development notes

### Adding a new library

`yarn workspace backend add jsonwebtoken`

When adding a new environment variable, add it to:
- /workspace/.env.example
- /start.example

### Adding a new top level route

Update `devServer.proxy.context` in `/frontend/webpack.config.js`:

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: process.env.PBL_DEV_PORT || 3001,
    proxy: {
      context: ['/auth', '/api'],
      target: ['http://localhost', process.env.PBL_PORT || '3000'].join(':')
    }
  },

### Running test API calls

1. Install 'REST Client' VS Code extension
2. Use calls defined in requests.rest for testing
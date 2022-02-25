# Data Application Reference Implementation

## Quick instructions

1. Clone repo
2. Run `yarn install`
3. Run `yarn dev`
4. Open `http:\\localhost:3001` in browser


## Repo structure

- Mono-repo. Single project, but each of frontend and backend can be run separately.
- No cross-dependencies EXCEPT:
  - Any API calls built into the front end
  - Shared configuration for easy changes by field engineers in a POC

## Backend - /backend

Express.js server, built using `npx express-generator`

One single API for structure:

- server.js: `var apiRouter = require('./routes/api')`
- server.js: `app.use('/api', apiRouter)`
- api code: `routes/api.js`

## Frontend -  /frontend

frontend/ : bare React app

_Each page of the app has a folder in **/frontend/src/pages**_

## Configuration

- /config.js - variables, menu choices, themes, etx

- /start.example – template to simplify setting env variables at startup

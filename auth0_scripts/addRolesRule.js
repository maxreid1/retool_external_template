function addRolesToTokens (user, context, callback) {
    const namespace = 'https://retool-external-template.example.com/rules';

    // const namespace = 'https://dev-lekm7di5.us.auth0.com/'; // FAILS
    // https://auth0.com/docs/secure/tokens/json-web-tokens/create-namespaced-custom-claims
    // "Auth0 domains cannot be used as namespace identifiers"

    // https://auth0.com/docs/get-started/apis/scopes/sample-use-cases-scopes-and-claims#add-custom-claims-to-a-token
    // "Auth0 enforces namespacing; any custom claims with non-namespaced identifiers will be silently excluded from tokens."

    context.idToken[`${namespace}/roles`] = (context.authorization || {}).roles;
    context.accessToken[`${namespace}/roles`] = (context.authorization || {}).roles;
  
    callback(null, user, context);
  }
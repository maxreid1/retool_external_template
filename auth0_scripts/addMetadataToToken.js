function addMetadataToTokens (user, context, callback) {
    const namespace = 'https://retool-external-template.example.com';
  
    context.idToken[`${namespace}/app_metadata`] = user.app_metadata;
    context.idToken[`${namespace}/user_metadata`] = user.user_metadata;
    
    context.accessToken[`${namespace}/app_metadata`] = user.app_metadata;
    context.accessToken[`${namespace}/user_metadata`] = user.user_metadata;
  
    callback(null, user, context);
  }
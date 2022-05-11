function setAppMetadataRoles(user, context, callback) {
    user.app_metadata = user.app_metadata || {};
    // short-circuit if the user signed up already
    // if (user.app_metadata.roles) return callback(null, user, context);
  
    // first time login/signup
    // user.app_metadata.roles = user.app_metadata.roles || ['Gold', 'Silver', 'Bronze'];
  
    // Force default roles
    user.app_metadata.roles = ['Gold', 'Silver', 'Bronze'];
    
    auth0.users
      .updateAppMetadata(user.user_id, user.app_metadata)
      .then(function () {
        callback(null, user, context);
      })
      .catch(function (err) {
        callback(err);
      });
  }
function setUserMetadata(user, context, callback) {
    user.user_metadata = user.user_metadata || {};
    user.user_metadata.homepage = 'Home';
    
    auth0.users
      .updateUserMetadata(user.user_id, user.user_metadata)
      .then(function () {
        callback(null, user, context);
      })
      .catch(function (err) {
        callback(err);
      });
  }
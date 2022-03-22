const decodeToken = (token) => {
  let { username, roles } = JSON.parse(atob(token.split('.')[1]))
  let user = { username: username, roles: roles }
  return user
}

module.exports.updateUser = (token) => {
  localStorage.setItem('userJwt', token)
  return decodeToken(token)
} 
module.exports.getUser = () => {
  let token = localStorage.getItem('userJwt')
  if (token && token !== 'undefined') {
    return decodeToken(token)
  } else {
    return null
  }
} 
module.exports.deleteUser = () => localStorage.removeItem('userJwt')

module.exports.login = () => localStorage.setItem('userLoggedIn', true)
module.exports.logout = () => localStorage.removeItem('userLoggedIn')
module.exports.isLoggedIn = () => localStorage.getItem('userLoggedIn')

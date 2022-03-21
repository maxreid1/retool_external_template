module.exports.updateUser = (token) => localStorage.setItem('userJwt', JSON.stringify(token)) 
module.exports.deleteUser = () => localStorage.removeItem('userJwt')
module.exports.getUser = () => JSON.parse(localStorage.getItem('userJwt')) 

module.exports.login = () => localStorage.setItem('userLoggedIn', true)
module.exports.logout = () => localStorage.removeItem('userLoggedIn')
module.exports.isLoggedIn = () => localStorage.getItem('userLoggedIn')
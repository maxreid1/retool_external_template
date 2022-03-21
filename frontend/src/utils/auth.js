module.exports.updateUser = (token) => localStorage.setItem('userJwt', JSON.stringify(token)) 

module.exports.deleteUser = () => localStorage.removeItem('userJwt')

module.exports.getUser = () => JSON.parse(localStorage.getItem('userJwt')) 

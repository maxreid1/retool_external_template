module.exports.updateUser = (token) => {
    localStorage.setItem('userJwt', token)
}

module.exports.getUser = () => {
    return localStorage.getItem('userJwt')
}

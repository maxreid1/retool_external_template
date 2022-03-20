module.exports.updateUser = (token) => {
    localStorage.setItem('userJwt', token)
}

module.exports.getUser = () => {
    return localStorage.getItem('userJwt')
}

module.exports.updateUser = (group) => {
    localStorage.setItem('currentGroup', group)
}

module.exports.getUser = () => {
    return localStorage.getItem('currentGroup')
}

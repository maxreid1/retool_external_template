module.exports.updateGroup = (group) => localStorage.setItem('userGroup', group)
module.exports.getGroup = () => localStorage.getItem('userGroup')
module.exports.deleteGroup = () => localStorage.removeItem('userGroup')
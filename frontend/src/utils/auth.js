export const decodeToken = (token) => {
  return JSON.parse(atob(token.split('.')[1]))
}

export const updateUser = (token) => {
  localStorage.setItem('userJwt', token)
  return decodeToken(token)
} 
export const getUser = () => {
  let token = localStorage.getItem('userJwt')
  if (token && token !== 'undefined') {
    return decodeToken(token)
  } else {
    return null
  }
} 
export const deleteUser = () => localStorage.removeItem('userJwt')

export const login = () => localStorage.setItem('userLoggedIn', true)
export const logout = () => localStorage.removeItem('userLoggedIn')
export const isLoggedIn = () => localStorage.getItem('userLoggedIn')

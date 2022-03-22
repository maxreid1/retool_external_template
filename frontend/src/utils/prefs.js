export const updatePrefs = (prefs) => {
    let currentPrefs = JSON.parse(localStorage.getItem('userPrefs'))
    let newPrefs = {...currentPrefs, ...prefs}
    localStorage.setItem('userPrefs', JSON.stringify(newPrefs))
}
export const getPrefs = () => JSON.parse(localStorage.getItem('userPrefs'))
export const deletePrefs = () => localStorage.removeItem('userPrefs')

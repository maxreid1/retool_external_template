export const updatePref = (pref, value) => {
    let currentPrefs = JSON.parse(localStorage.getItem('userPrefs'))
    let newPrefs = { ...currentPrefs, ...{[pref]: value} }
    localStorage.setItem('userPrefs', JSON.stringify(newPrefs))
}

export const getPref = (pref) => {
    let prefs = JSON.parse(localStorage.getItem('userPrefs'))
    return prefs ? prefs[pref] : null
}

export const deleteAllPrefs = () => localStorage.removeItem('userPrefs')

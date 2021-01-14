export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.log('Error saving data in localStorage', e)
  }
}
export const removeItem = key => {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.log('Error removing data in localStorage', e)
  }
}
export const getItem = key => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    console.log('Error getting data in localStorage', e)
  }
}

export const LSPhotos = state => {
  const LSkeys = Object.keys(localStorage)
  for (const key of LSkeys) {
    const data = getItem(key)
    if (data && data.id === key) {
      state.likedPhotos.photos.push(data)
    }
  }
}

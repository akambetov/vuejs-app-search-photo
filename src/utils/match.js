export function match({ photos, liked, store }) {
  for (let i = 0; i < liked.length; i++) {
    let matching = false
    for (let j = 0; j < photos.length; j++) {
      if (liked[i].id === photos[j].id) {
        matching = true
        break
      }
    }
    if (!matching) {
      store.unshift(liked[i])
    }
  }
}

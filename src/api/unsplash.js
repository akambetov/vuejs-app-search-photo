import axios from '@/api/axios'
const accesKey = process.env.VUE_APP_UNSPLASH
const searchPhotos = (query, orientation) =>
  axios
    .get(
      `/search/photos?client_id=${accesKey}&query=${query}&orientation=${orientation}`
    )
    .then(response => {
      response.data.results.forEach(result => {
        result.LIKED = false
        result.QUERY = query
      })
      return response.data.results
    })

export default {
  searchPhotos
}

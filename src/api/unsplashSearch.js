import axios from '@/api/axios'
const accesKey = 'CLm726DrWmYpdLZNXqFca8gKfO7RZLWT6dtbzByYoNI'
const searchPhotos = (query, orientation) =>
  axios
    .get(
      `/photos?client_id=${accesKey}&query=${query}&orientation=${orientation}`
    )
    .then(response => response.data.results)

export default {
  searchPhotos
}

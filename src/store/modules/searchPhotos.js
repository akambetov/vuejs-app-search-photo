import apiUnsplashSearch from '@/api/unsplash'
import { setItem, removeItem, getItem } from '@/utils/localStorage'

const state = {
  isLoading: false,
  data: null,
  likedPhotos: { photos: [] },
  error: null
}

export const mutationTypes = {
  searchPhotosStart: '[searchPhotos] Search photos start',
  searchPhotosSuccess: '[searchPhotos] Search photos success',
  searchPhotosFailure: '[searchPhotos] Search photos failure',

  likePhotoStart: '[searchPhotos] Like photo start',
  likePhotoSuccess: '[searchPhotos] Like photo success',
  likePhotoFailure: '[searchPhotos] Like photo failure',

  getLocalStorageStart: '[searchPhotos] Initalize Local Storage start',
  getLocalStorageSuccess: '[searchPhotos] Initalize Local Storage success',
  getLocalStorageFailure: '[searchPhotos] Initalize Local Storage failure',

  oldQueryFavorites: '[searchPhotos] Add favorites from old query to state.data'
}

export const actionTypes = {
  searchPhotos: '[searchPhotos] Search photos',
  likePhoto: '[searchPhotos] Like photos',
  getLocalStorage: '[searchPhotos] Initalize Local Storage'
}

export const getterTypes = {
  favorites: '[searchPhotos] Favorites'
}

const mutations = {
  [mutationTypes.searchPhotosStart](state) {
    state.data = null
    state.isLoading = true
    state.error = null
  },
  [mutationTypes.searchPhotosSuccess](state, payload) {
    state.data = payload
    state.isLoading = false

    state.data.photos.forEach(photo => {
      state.likedPhotos.photos.forEach(likedPhoto => {
        if (photo.id === likedPhoto.id) {
          photo.LIKED = likedPhoto.id
        }
      })
    })
  },
  [mutationTypes.searchPhotosFailure](state, payload) {
    state.error = payload
    state.isLoading = false
  },

  [mutationTypes.likePhotoStart]() {},
  [mutationTypes.likePhotoSuccess](state, payload) {
    if (!state.data) state.data = state.likedPhotos.photos
    const likedPhoto = state.data.photos.filter(
      photo => photo.id === payload.id
    )
    if (!likedPhoto[0].LIKED) {
      likedPhoto[0].LIKED = !likedPhoto[0].LIKED
      setItem(likedPhoto[0].id, likedPhoto[0])
      state.likedPhotos.photos.push(getItem(likedPhoto[0].id))
    } else {
      state.likedPhotos.photos = state.likedPhotos.photos.filter(
        photo => photo.id !== getItem(likedPhoto[0].id).id
      )
      likedPhoto[0].LIKED = !likedPhoto[0].LIKED
      removeItem(likedPhoto[0].id)
    }
  },
  [mutationTypes.likePhotoFailure](state, payload) {
    state.error = payload
  },

  [mutationTypes.getLocalStorageStart]() {},
  [mutationTypes.getLocalStorageSuccess](state) {
    const LSkeys = Object.keys(localStorage)
    for (const key of LSkeys) {
      const data = getItem(key)
      if (data && data.id === key) {
        state.likedPhotos.photos.push(data)
      }
    }
  },
  [mutationTypes.getLocalStorageFailure]() {},

  [mutationTypes.oldQueryFavorites](state) {
    state.likedPhotos.photos.forEach(photo => {
      state.data.photos.push(photo)
    })
  }
}

const getters = {
  [getterTypes.favorites]: state => {
    return state.likedPhotos.photos
  }
}

const actions = {
  [actionTypes.searchPhotos](context, { query, orientation }) {
    return new Promise(resolve => {
      context.commit(mutationTypes.searchPhotosStart)
      apiUnsplashSearch
        .searchPhotos(query, orientation)
        .then(photos => {
          const result = {
            photos,
            query,
            orientation
          }
          context.commit(mutationTypes.searchPhotosSuccess, result)
          context.commit(mutationTypes.oldQueryFavorites)
          resolve(result)
        })
        .catch(e => {
          console.log(e)
          context.commit(mutationTypes.searchPhotosFailure, e)
        })
    })
  },

  [actionTypes.likePhoto](context, { id }) {
    return new Promise(() => {
      context.commit(mutationTypes.likePhotoStart)
      if (id) {
        context.commit(mutationTypes.likePhotoSuccess, { id })
      } else {
        context.commit(mutationTypes.likePhotoFailure, 'no id of photo')
      }
    })
  },

  [actionTypes.getLocalStorage](context) {
    context.commit(mutationTypes.getLocalStorageStart)
    context.commit(mutationTypes.getLocalStorageSuccess)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}

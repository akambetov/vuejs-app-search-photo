import apiUnsplashSearch from '@/api/unsplash'
const state = {
  isLoading: false,
  data: null,
  error: null
  // 1
  // queries: [],
}

export const mutatuionTypes = {
  searchPhotosStart: '[searchPhotos] Search photos start',
  searchPhotosSuccess: '[searchPhotos] Search photos Success',
  searchPhotosFailure: '[searchPhotos] Search photos start'
}

export const actionTypes = {
  searchPhotos: '[searchPhotos] Search photos'
}

const mutations = {
  [mutatuionTypes.searchPhotosStart](state) {
    state.data = null
    state.isLoading = true
    state.error = null
  },
  [mutatuionTypes.searchPhotosSuccess](state, payload) {
    state.data = payload
    state.isLoading = false
    // 1
    // const queryData = `${state.data.query}-${state.data.orientation}`
    // if (!state.queries.includes(queryData)) {
    //   state.queries.push(`${state.data.query}-${state.data.orientation}`)
    // }
  },
  [mutatuionTypes.searchPhotosFailure](state, payload) {
    state.error = payload
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.searchPhotos](context, { query, orientation }) {
    return new Promise(resolve => {
      context.commit(mutatuionTypes.searchPhotosStart)
      apiUnsplashSearch
        .searchPhotos(query, orientation)
        .then(photos => {
          const result = {
            photos,
            query,
            orientation
          }
          context.commit(mutatuionTypes.searchPhotosSuccess, result)
          // console.log(result)
          resolve(result)
        })
        .catch(e => {
          console.log(e)
          context.commit(mutatuionTypes.searchPhotosFailure, e)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}

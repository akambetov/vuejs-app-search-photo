import { setItem, getItem, removeItem } from '@/utils/localStorage'
const state = {
  history: []
}
export const mutationTypes = {
  initHistory: '[history] Initialize history',
  putHistory: '[history] Put history',
  removeHistory: '[history] Remove history',
  removeAllHistory: '[history] Remove all history'
}
export const actionTypes = {
  putHistory: '[history] Put history action',
  initHistory: '[history] Initialize history action',
  removeHistory: '[history] Remove history action',
  removeAllHistory: '[history] Remove all history action'
}

const mutations = {
  [mutationTypes.putHistory](state, payload) {
    const queryParams = getItem('queryParams')
    console.log(queryParams)
    let matching = false
    if (queryParams) {
      for (let i = 0; i < queryParams.length; i++) {
        if (
          queryParams[i].query === payload.query &&
          queryParams[i].orientation === payload.orientation
        ) {
          matching = true
          break
        }
      }
      if (!matching) {
        state.history.push(payload)
        setItem('queryParams', state.history)
      }
    } else {
      state.history.push(payload)
      setItem('queryParams', state.history)
    }
  },
  [mutationTypes.initHistory](state) {
    const queryParams = getItem('queryParams')
    state.history = queryParams
  },
  [mutationTypes.removeHistory](state, payload) {
    const queryParams = getItem('queryParams')
    queryParams.splice(payload, 1)
    state.history = queryParams
    setItem('queryParams', state.history)
    if (state.history.length === 0) {
      removeItem('queryParams')
    }
  },
  [mutationTypes.removeAllHistory]() {
    removeItem('queryParams')
    state.history = []
  }
}
const actions = {
  [actionTypes.putHistory]({ commit }, link) {
    commit(mutationTypes.putHistory, link)
  },
  [actionTypes.initHistory]({ commit }) {
    commit(mutationTypes.initHistory)
  },
  [actionTypes.removeHistory]({ commit }, idx) {
    commit(mutationTypes.removeHistory, idx)
  },
  [actionTypes.removeAllHistory]({ commit }) {
    commit(mutationTypes.removeAllHistory)
  }
}

export default {
  state,
  mutations,
  actions
}

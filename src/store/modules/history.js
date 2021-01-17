import { setItem, getItem /*, removeItem */ } from '@/utils/localStorage'
const state = {
  history: []
}
export const mutationTypes = {
  initHistory: '[history] Initialize history',
  putHistory: '[history] Put history'
}
export const actionTypes = {
  putHistory: '[history] Put history action',
  initHistory: '[history] Initialize history action'
}

const mutations = {
  [mutationTypes.putHistory](state, payload) {
    const queryParams = getItem('queryParams')
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
  }
}
const actions = {
  [actionTypes.putHistory]({ commit }, link) {
    commit(mutationTypes.putHistory, link)
  },
  [actionTypes.initHistory]({ commit }) {
    commit(mutationTypes.initHistory)
  }
}

export default {
  state,
  mutations,
  actions
}

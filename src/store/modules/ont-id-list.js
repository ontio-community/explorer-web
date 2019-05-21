import $httpService from '../../common/utils'
import * as types from "../mutation-type"

export default {
  state: {
    LatestOntIdList: {
      info: ''
    }
  },
  mutations: {
    [types.SET_ONT_ID_LIST](state, payload) {
      state.LatestOntIdList.info = payload.info
    }
  },
  actions: {
    getOntIdList({dispatch, commit}, $param) {
      return $httpService.get('/latest-ontids?count=5').then(response => {
        commit({
          type: types.SET_ONT_ID_LIST,
          info: response.result
        })
      }).catch(error => {
        console.log(error)
      })
    },
  }
}

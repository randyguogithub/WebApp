import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  list: [],
  car: {},
});

export const mutations = {
  set(state, car) {
    state.list = car
  },
  add(state, value) {
    merge(state.list, value)
  },
  remove(state, {car}) {
    state.list.filter(c => car.id !== c.id)
  },
  mergedeals(state, form) {
    assign(state.car, form)
  },
  setdeals(state, form) {
    state.car = form
  }
};

export const actions = {
  async get({commit}) {
    await this.$axios.get(`/deals`)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data)
        }
      })
  },
  async show({commit}, params) {
    await this.$axios.get(`/deals/${params.car_id}`)
      .then((res) => {
        if (res.status === 200) {
          commit('mergedeals', res.data)
        }
      })
  },
  async set({commit}, deals) {
    await commit('set', deals)
  },
  async form({commit}, form) {
    await commit('mergedeals', form)
  },
  async add({commit}, car) {
    await commit('add', car)
  },
  create({commit}, params) {
    return this.$axios.post(`/deals`, {car: params})
  },
  update({commit}, params) {
    return this.$axios.put(`/deals/${params.id}`, {car: params})
  },
  delete({commit}, params) {
    return this.$axios.delete(`/deals/${params.id}`)
  }
};
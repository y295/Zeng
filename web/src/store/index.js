import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state={
     music:{},
     autoplay: false
   };
const getters = {
    getMusic(){
       return state.music
    },
    getAutoplay(){
        return state.autoplay
    }
};
const mutations = {
    nowMusic(state,item){
       state.music = item;
    },
    nowAutoplay(state){
       state.autoplay = true
    }
};
 const actions = {

    getNowMusic(context,item){
        context.commit('nowMusic',item)
     },
     getNoWAutoplay(context){
        context.commit('nowAutoplay')
     }

};
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;
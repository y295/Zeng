import store from '@/store'
import context from '../main.js'

export default {
   setNowMusic(item) {
     let nItem = {
        _id : item._id,
       music_name: item.music_name,
       music_address: item.music_address,
       singers_list: item.singers_list
     }
     var nowMusic = JSON.stringify(nItem)
     localStorage.setItem("nowMusic", nowMusic);
     store.dispatch('getNowMusic', nItem);
     store.dispatch('getNoWAutoplay');
     store.dispatch('getNoWAutoplay',nItem);
   },

   singer(id){
     context.$router.push(`/singers/${id}`)
   }
}
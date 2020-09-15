<template>
  <div class="all_wrap">
    <div class="header_wrap">
      <div class="header">
        <div class="logo">
          <img src="../assets/logo.png" height="50" width="200">
        </div>
        <div class= "mune_wrap">
          <el-menu class="el-menu-demo" mode="horizontal"  router :default-active="$route.path">
            <el-menu-item index="/main">首页</el-menu-item>
            <el-menu-item index="/musics/musicbook">曲库</el-menu-item>
            <el-menu-item index="/musics/singerbook">歌手</el-menu-item>
            <el-menu-item index="/musics/ranking">排行榜</el-menu-item>
          </el-menu>
        </div>
        <div class="login_wrap">
          <el-dropdown>
            <span class="user">{{username||"未登录"}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="!username">
                <a @click="login">登录</a>
              </el-dropdown-item>
              <el-dropdown-item v-if="!username">
                <a @click="register">注册</a>
              </el-dropdown-item>
              <el-dropdown-item v-else>
                <a @click="logout">退出</a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class= "search_warp">
          <el-input placeholder="音乐/歌手" v-model="input" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search" ></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <div class="container2_wrap">
      <div class="container2">
        <el-container>
          <el-aside width="280px">
            <div id="music">
              <div id="music_container">
                <div class="collection" v-if="music_name">
                  <span v-if="isCollected">已收藏</span>
                  <span @click="collection(username, music_id)" v-else>收藏</span>
                </div>
                <div><h3 id="musicName">{{music_name}}</h3></div>
                <img src="../../static/img/yuan.png" id="musicImg" class="rotate" :style="{'animation-play-state': controlRotate}">
                <audio :src="music_address" controls id="audio" :autoplay="autoplay"  @play="rotate" @pause="noRotate" @ended="next" ref="audio"></audio>
                <div class="btn">
                  <button id="play" @click="play">play</button>
                  <button id="pause" @click="pause">pause</button>
                  <button id="prev" @click="prev">prev</button>
                  <button id="next" @click="next">next</button>
                </div>
              </div>
            </div>
          </el-aside>
          <el-main>
            <router-view :key="$route.path" @func="getInput"></router-view>
          </el-main>
          <el-aside width="250px" style="background-color: #f3f3f3">
            <div class="music_collection" v-model="modelCollection">
              <div class="title"><span><b>收藏列表</b></span></div>
              <ul>
                <li v-for="item in modelCollection" class="music_li">
                  <span class="music_name" ><a @click="common.setNowMusic(item)">{{item.music_name}}</a>
                  </span>
                  <span class="del" @click="del(username, item._id)"><a >删除</a>
                  </span>
                  <span v-for="item in item.singers_list" class="singers_list"> <a class="singer_name" @click="common.singer(item._id)">{{item.singer_name}}</a>
                  </span>
                </li>
             </ul>
            </div>
          </el-aside>
        </el-container>
      </div>
    </div>
    <div class="footer_wrap">
      <div class="footer">
        <div class="link">
          <div class="title"><span><b>友情链接</b></span></div>
           <ul>
             <li><a href="http://www.kugou.com/">酷狗音乐</a></li>
             <li><a href="https://music.163.com/">网易云音乐</a></li>
             <li><a href="http://www.kuwo.cn/">酷我音乐</a></li>
             <li><a href="http://5sing.kugou.com/">5SING</a></li>
             <li><a href="https://www.bilibili.com/">哔哩哔哩</a></li>
             <li><a href="http://www.yue365.com/">365音乐网</a></li>
             <li><a href="https://www.1ting.com/">一听音乐网</a></li>
           </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
*{
  padding: 0;
  margin: 0;
}
@keyframes rotatae{
  0%{
    transform:rotate(0deg);
  }
  100%{
    transform:rotate(360deg);
  }
}
body{
  min-width: 1120px;
  background-color: #e9e3d3;
}
.all_wrap{
  width: 100%;
  min-width: 1120px;
  clear: both;
  display: hidden;
}
.header_wrap{
  width: 100%;
  min-width: 1120px;
  background-color: white;
  position: absolute;
  top: 0;
}
.container2_wrap{
  width: 100%;
  min-width: 1120px;
  background-color: #e9e3d3;
  position: absolute;
  top: 90px;
}
.footer_wrap{
  width: 100%;
  min-width: 1120px;
  background-color: white;
  position: absolute;
  top: 585px;
}
.header{
  width: 1120px;
  height: 60px;
  margin: 0 auto;
}
.container2{
  width: 1120px;
  margin: 0 auto;
}
.footer{
  width: 1120px;
  height: 60px;
  margin: 0 auto;
}
.el-header {
  background-color: white;
  color: #333;
}
.el-menu--horizontal>.el-menu-item.is-active{
  border-bottom: 0px
}
.el-menu.el-menu--horizontal{
  border-bottom: 0px
}
.el-menu--horizontal>.el-menu-item{
  border-bottom: 0px
}
.el-aside {
  background-color: white;
}
.el-aside:nth-child(1) {
  margin-right: 20px;
}
.el-main{
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  margin-right: 20px;
  background-color: white;
  font: 13px/1.5 "Microsoft Yahei", Tahoma, Helvetica, Arial, sans-serif;
}
.el-footer{
  background-color: white;
}
.logo{
  float: left;
  margin-left: 20px;
}
.mune_wrap{
  float: left;
  margin-left: 1%;
  margin-right: 3%;
}
.search_warp{
  float: left;
  margin-top: 10px;
  height:40px;
}
.el-input {
  width: 300px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.login_wrap{
  float: right;
  margin-top: 20px;
  margin-right: 20px;
}
.user{
  cursor: pointer;
  float: right;
}
#music {
  font: 12px/1.5 "Microsoft Yahei",Helvetica,Arial,sans-serif;
  color: #666;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  position: relative;
  background: url(../../static/img/music.jpeg) no-repeat center 0px;
  text-align: center;
  padding: 0;
  margin: 0
 }
#music_container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background:rgba(255,255,255,0.7);
}
.collection{
  height: 20px;
  float: left;
  text-align: left;
  margin: 15px 15px;
  cursor: pointer;
}
#musicName{
  clear: both;
  display: block;
}
#audio{
  width: 100%;
  margin-top: 50px;
}
#musicImg{
  margin-top: 70px;
  width: 150px;
  height: 150px;
}
.rotate{
  animation-name:rotatae;
  animation-duration:20s;
  animation-timing-function:linear;
  animation-iteration-count:infinite;
  animation-play-state: play
}
.btn{
  margin-top: 10px;
}
#play #pause #prev #next{
  background:rgba(255,255,255,0);
}
.music_collection{
  clear: both;
  overflow: hidden;
  width: 100%;
  margin-right: 10px;
  font: 13px/1.5 "Microsoft Yahei", Tahoma, Helvetica, Arial, sans-serif;
  height: 460px;
  overflow-y: scroll;
}
.title{
  clear: both;
  font-size: 18px;
  color: #2a2a2a;
  margin-left: 10px;
}
a{
  cursor: pointer;
}
ul {
  list-style: none;
  display: block;
  overflow: hidden;
  clear: both;
}
ul .music_li{
  padding-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  display: block;
  clear: both;
}
.music_collection .singers_list{
  display: inline-block;
  float: right;
  color: #929292;
}
.singer_name{
  margin-right: 5px;
}
.del{
  display: inline-block;
  float: right;
}
.link{
  margin-left: 4%;
  margin-right: 4%;
  margin-top: 5px;
}
.link li{
  margin-top:5px;
  margin-right: 4%;
  margin-left: 4%;
  float: left;
  font: 14px/1.5 "Microsoft Yahei", Tahoma, Helvetica, Arial, sans-serif;
}
.link li a{
  color: #929999;
  text-decoration: none;
}
</style>

<script>
export default {
data() {
  return {
    input: '',
    username:"",
    controlRotate: "paused",
    modelCollection: [],
    music: {},
    localMusic:{},

  }
},
computed: {
  nowMusic: {
    get: function() {
      this.localMusic = JSON.parse(localStorage.getItem("nowMusic")) || "";
      return this.$store.getters.getMusic;
    },
    set: function(newValue) {
      this.common.setNowMusic(newValue)
    }
  },
  autoplay() {
    return this.$store.getters.getAutoplay;
  },
  music_name: {
    get: function() {
    if(this.nowMusic.music_address||this.localMusic.music_address){
      return (this.nowMusic.music_address||this.localMusic.music_address).substring(35).replace(".mp3","")
    }else{
      return ""
    }
  },
  set: function() {

  }
  },
  music_address() {
    return this.nowMusic.music_address||this.localMusic.music_address||""
  },
  music_id(){
    return this.nowMusic._id||this.localMusic._id||""
  },
  isCollected() {
     let isHave1 = JSON.stringify(this.modelCollection).indexOf(JSON.stringify(this.nowMusic));
     if(isHave1 != -1){
      return true
     }else{
      let isHave2 = JSON.stringify(this.modelCollection).indexOf(JSON.stringify(this.localMusic));
      if(isHave2 != -1){
        return true
      }else{
        return false
       }
     }
  }
},
methods: {
  login() {
    this.$router.push("/login");
  },
  logout() {
    this.username = "";
    localStorage.removeItem("username");
    location.reload()
  },
  register() {
    this.$router.push("/register");
  },
  rotate() {
    this.controlRotate = "running";

  },
  noRotate() {
     this.controlRotate = "paused";
  },
  async fetchMyMusics() {
    if(this.username){
      const res = await this.$http.get(`/musics/collection/${this.username}`+'?data=' + new Date().getTime());
      this.modelCollection = res.data;
    }
  },
  async collection(username, id) {
    if(username){
      const res = await this.$http.put(`/musics/collection/${username}/${id}`, id);
     // const res2 = await this.$http.get(`/musics/collection/${this.username}`+'?data=' + new Date().getTime());
     // this.modelCollection = res2.data;
      this.fetchMyMusics()
    }else {
      this.$router.push("/login");
    }
  },
  async del(username, id) {
     const res = await this.$http.delete(`/musics/delete/${username}/${id}`, id);
     this.fetchMyMusics()
  },
  play() {
     let audio = this.$refs.audio
     if(audio.paused){
        audio.play();
     }
  },
  pause() {
    let audio = this.$refs.audio
     if(audio.played) {
        audio.pause();
     }
  },
  next() {
    var num;
    if(this.nowMusic._id) {
      let item = this.nowMusic
      num = this.modelCollection.findIndex(function(x){
        return x._id == item._id
      })
    }else {
      let item = this.localMusic
      num = this.modelCollection.findIndex(function(x){
        return x._id == item._id
      })
    }
    num = (num + 1) % this.modelCollection.length
    this.nowMusic = this.modelCollection[num]
  },
  prev() {
    var num;
    if(this.nowMusic._id) {
      let item = this.nowMusic
      num = this.modelCollection.findIndex(function(x){
        return x._id == item._id
      })
    }else {
      let item = this.localMusic
      num = this.modelCollection.findIndex(function(x){
        return x._id == item._id
      })
    }
    num = (num + this.modelCollection.length - 1) % this.modelCollection.length
    this.nowMusic = this.modelCollection[num]
  },
  search() {
    if(this.input){
      this.$router.push(`/musics/search/${this.input}`)
    }
  },
  getInput(data) {
    this.input = data
  }
},
created() {
  this.username = localStorage.getItem("username") || "";
  this.localMusic = JSON.parse(localStorage.getItem("nowMusic")) || "";
  this.fetchMyMusics()
},
};
</script>

<template>
  <div class="mian_wrap">
    <div class="new_music">
      <div class="title"><span><b>最新音乐</b></span></div>
      <ul>
        <li v-for="item in modelNew" class="music_li">
          <span class="music_name"><a @click="common.setNowMusic(item)">{{item.music_name}}</a>
          </span>
          <span v-for="item in item.singers_list" class="singers_list"><a class="singer_name" @click="common.singer(item._id)">{{item.singer_name}}</a>
          </span>
        </li>
      </ul>
    </div>
    <div class="music_recommend">
      <div class="title"><span><b>音乐推荐</b></span></div>
      <ul>
        <li v-for="item in modelRecommend" class="music_li">
          <span class="music_name"><a @click="common.setNowMusic(item)">{{item.music_name}}</a>
          </span>
          <span v-for="item in item.singers_list" class="singers_list"><a class="singer_name" @click="common.singer(item._id)">{{item.singer_name}}</a>
          </span>
        </li>
      </ul>
    </div>
    <div class="singer_recommend">
      <div class="title"><span><b>歌手推荐</b></span></div>
      <ul>
        <li v-for="item in modelSingers" class="singerR_li">
          <span class="singerR_name"><a @click="common.singer(item._id)">{{item.singer_name}}</a>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.mian_wrap{
  padding: 0;
  margin: 0;
}
.new_music{
  width: 45%;
  background-color: #fafafa;
  float:left;
  padding-bottom: 10px;
}
.music_recommend{
  width: 45%;
  background-color: #fafafa;
  float:right;
  padding-bottom: 10px;
  margin-bottom: 20px;

}

.singer_recommend{
  clear: both;
  background-color: #fafafa;
  padding-bottom: 22px;
  overflow: hidden;
}
.music_name{
  display: inline-block;
  float: left;
  margin-left: 10px;

}
.singer_name{
 display: inline-block;
 margin-right: 10px;
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
}
ul .music_li{
  padding-top: 10px;
  display: block;
  clear: both;

}
.singerR_li{
  display: block;
  float: left;
  margin-left: 10px;
  padding-top: 10px;
  width: 100px;
}
.singers_list{
  display: inline-block;
  float: right;
  color: #929292;

}
</style>

<script>
  export default {
    data() {
      return {

        modelRecommend: [],
        modelNew: [],
        modelSingers: []
      }
    },
    methods: {
      async fetchRecommendMusics() {
        const res = await this.$http.get("/musics/recommend");
        this.modelRecommend = res.data;
      },
     async fetchNewMusics() {
        const res = await this.$http.get("/musics/new");
        this.modelNew = res.data;
      },
     async fetchRecommendSingers() {
        const res = await this.$http.get("/singers/recommend");
        this.modelSingers = res.data;
      }
    },
    created() {
      this.fetchRecommendMusics(),
      this.fetchNewMusics(),
      this.fetchRecommendSingers()
    }
  };
</script>

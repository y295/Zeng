<template>
  <div class="intro_wrap">
    <div class="singer_wrap">
    <div class="title"><span><b>歌手介绍</b></span></div>
      <img :src="model.photo_address" id="singer_photo">
      <div id="singer_introduce">&nbsp;&nbsp;&nbsp;&nbsp;{{model.introduce}}</div>
    </div>
    <div class="music_list">
      <div class="title"><span><b>推荐歌曲</b></span></div>
      <el-table
      :data="music_list"
      style="width: 100%"
       max-height="240"
       :header-cell-style="{background:'#fafafa'}"
       :row-style="{height:0+'px', background:'#fafafa'}"
       :cell-style="{padding:2+'px'}">
      <el-table-column prop="music_name" label="歌曲名" type="index" width="200">
        <template slot-scope="scope">
          <a @click="common.setNowMusic(scope.row)">{{scope.row.music_name}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="singers_list"
        label="歌手">
        <template slot-scope="scope">
          <li v-for="item in scope.row.singers_list" @click="common.singer(item._id)">{{item.singer_name}}</li>
        </template>
      </el-table-column>
      <el-table-column
        prop="categories"
        label="类型">
        <template slot-scope="scope">
          <li v-for="item in scope.row.categories" @click="() => $router.push(`/musics/musicbook/${item._id}`)">{{item.title}}</li>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { require: true }
  },
  data() {
    return {
      model: {},
      music_list: []
    };
  },
 methods: {
   async fetchDetail() {
      const res = await this.$http.get(`/singers/introduce/${this.id}`);
      this.model = res.data[0];
    },
    async fetchMusicList() {
      const res = await this.$http.get(`/singers/music_list/${this.id}`);
      this.music_list = res.data;
    }
 },
created() {
  this.fetchDetail();
  this.fetchMusicList();
  }
};
</script>

<style>

.singer_wrap{
  background-color: #fafafa;
  overflow: hidden;
  clear: both;
  padding: 0;
  margin: 0;
}

#singer_photo{
  width: 120px;
  height: 120px;
  padding: 10px;
  float: left;
}

#singer_introduce{
  padding: 10px;
}

.intro_wrap .music_list{
  overflow: hidden;
  clear: both;
  margin-top: 20px;
  background-color: #fafafa;
}

.el-table{
    margin-bottom: 20px
}

.el-table .cell{
  cursor: pointer;

}

.title{
  clear: both;
  font-size: 18px;
  color: #2a2a2a;
  margin-left: 10px;
}

.music_list li{
    float: left;
    list-style: none;
    margin-right: 10px;
}
</style>
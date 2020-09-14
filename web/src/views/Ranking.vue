<template>
  <div class="ranking_wrap">
  <div class="title"><span><b>音乐排行榜</b></span></div>
  <div class="music_list">
      <el-table
      :data="music_list"
      style="width: 100%"
      max-height="420"
      :header-cell-style="{background:'#fafafa'}"
      :row-style="{height:0+'px', background:'#fafafa'}"
      :cell-style="{padding:1+'px'}">
        <el-table-column  label="排名" type="index" width="50">
        </el-table-column>
        <el-table-column prop="music_name" label="音乐名" type="index" width="150">
        <template slot-scope="scope">
          <a @click="common.setNowMusic(scope.row)">{{scope.row.music_name}}</a>
        </template>
        </el-table-column>
      <el-table-column
      prop="singers_list"
      label="歌手" >
      <template slot-scope="scope">
        <li v-for="item in scope.row.singers_list" @click="common.singer(item._id)">{{item.singer_name}}</li>
      </template>
    </el-table-column>
    <el-table-column
      prop="categories"
      label="类型" >
      <template slot-scope="scope">
        <li v-for="item in scope.row.categories" @click="() => $router.push(`/musics/musicbook/${item._id}`)">{{item.title}}</li>
      </template>
    </el-table-column >
    <el-table-column  label="收藏量" prop="collection_num">
    </el-table-column>
  </el-table>
  </div>
  </div>
</template>

<style>
.ranking_wrap{
   padding: 0;
   margin: 0;
   border: 0;
   overflow: hidden;
   clear: both;
   background-color: #fafafa;
   height: 100%;
}
.ranking_wrap .music_list{
  overflow: hidden;
  clear: both;
  padding: 0;
  background-color: #fafafa;
  margin: 0
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
.el-table{
  margin-left: 10px;
  margin-right: 10px
}
</style>

<script>
export default {
  data() {
    return {
      music_list: []
    };
  },
 methods: {
    async fetchMusicList() {
      const res = await this.$http.get('/musics/ranking/');
      this.music_list = res.data;
    }
 },
created() {
  this.fetchMusicList();
  }
};
</script>
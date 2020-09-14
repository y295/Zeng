<template>
  <div class="MusicBook_wrap">
    <div class="title"><span><b>音乐库</b></span></div>
    <div class="tags">
      <ul>
        <li :class="{'tag-current': !id }" @click="change()"><a>全部</a></li>
        <li v-for="item in tags" :key="item._id" :class="{'tag-current': id == item._id}" @click="change(item._id)"><a>{{item.title}}</a></li>
      </ul>
    </div>
    <div class="music_list">
      <el-table
        :data="music_list"
        style="width: 100%"
        max-height="420"
        :header-cell-style="{background:'#fafafa'}"
        :row-style="{height:0+'px', background:'#fafafa'}"
        :cell-style="{padding:2+'px'}">
          <el-table-column prop="music_name" label="音乐名" type="index" width="200">
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
    <div class="block">
      <el-pagination
      layout="prev, pager, next"
      :page-count="pagination.totalPage"
      :current-page="pagination.currentPage"
      @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<style>
  .MusicBook_wrap{
    padding: 0;
    margin: 0;
    border: 0;
    overflow: hidden;
    clear: both;
    background-color: #fafafa;
    height: 100%;
}
  .title{
  clear: both;
  font-size: 18px;
  color: #2a2a2a;
  margin-left: 10px;
}
 .tags{
    margin-top: 10px;
 }
 .tags ul{
  list-style: none;
  display: block;
  overflow: hidden;
  clear: both;
 }
 .tags ul li{
    display: block;
    width: 60px;
    float: left;
    margin-left: 10px;
 }
  .tags ul li a{
    display: block;
    text-align: center;
  }
  .music_list li{
    float: left;
    list-style: none;
    margin-right: 10px;
}
 .tag-current {
    background-color: white;

  }
  .block{
    text-align: center;
    margin: 15px 0;
  }
  .el-table{
  margin-left: 10px;
  margin-right: 10px
}
</style>

<script>
export default {
  props: {
    id: {require: true}
  },
  data() {
    return {
      tags: [],
      music_list: [],
      pagination: {
        totalPage: 1,
        currentPage: 1
      }
    };
  },
 methods: {
    async fetchTags() {
      const res = await this.$http.get('/tags');
      this.tags = res.data;
    },
    async fetchMusicList() {
      if(!this.id){
        const res = await this.$http.get(`/musics/musicbook/${this.pagination.currentPage}`);
        this.music_list = res.data.list;
        this.pagination.totalPage = res.data.totalPage;
      }else {
        const res = await this.$http.get(`/musics/musicbook/${this.id}/${this.pagination.currentPage}`);
        this.music_list = res.data.list;
        this.pagination.totalPage = res.data.totalPage
      }
    },
    change(id) {
      //this.id = id;
      if(id){
        this.$router.push(`/musics/musicbook/${id}`)
      }else {
        this.$router.push(`/musics/musicbook`)
      }
    },
    handleCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchMusicList();
    }

 },
created() {
  this.fetchTags();
  this.fetchMusicList()
  }
};
</script>
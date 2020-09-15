<template>
  <div class="search_wrap">
    <div class="title"><span><b>搜索结果</b></span></div>
    <div class="music_list">
      <el-table
        :data="music_list"
        style="width: 100%"
        max-height="420"
        :header-cell-style="{background:'#fafafa'}"
        :row-style="{height:0+'px', background:'#fafafa'}"
        :cell-style="{padding:3+'px'}">
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
            <li v-for="item in scope.row.categories" @click="() => $router.push(`/musics/musicbook/${item._id}`)">
            {{item.title}}</li>
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
.search_wrap{
  border: 0;
  overflow: hidden;
  clear: both;
  background-color: #fafafa;
  padding: 0;
  margin: 0;
  height: 100%;
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
    input: {require: true}
  },
  data() {
    return {
      music_list: [],
      pagination: {
        totalPage: 1,
        currentPage: 1
      }
    };
  },
 methods: {
    async fetchMusicList() {
        const res = await this.$http.get(`/musics/search/${this.input}/${this.pagination.currentPage}`+'?data=' + new Date().getTime());
        this.music_list = res.data.list;
        this.pagination.totalPage = res.data.totalPage;
        this.$emit('func', this.input)

    },
    handleCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchMusicList();
    }

 },
created() {
  this.fetchMusicList()
  }
};
</script>

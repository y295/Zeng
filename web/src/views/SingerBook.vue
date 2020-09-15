<template>
  <div class="SingerBook_wrap">
    <div class="title"><span><b>歌手库</b></span></div>
    <div class="singer_list">
      <ul>
        <li v-for="item in singer_list" >
          <span class="singerR_name"><a @click="common.singer(item._id)">{{item.singer_name}}</a></span>
        </li>
      </ul>
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
.SingerBook_wrap{
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
.block{
  text-align: center;
  margin: 15px 0;
}
.el-table{
  margin-left: 10px;
  margin-right: 10px
}
ul {
  list-style: none;
  display: block;
}
.SingerBook_wrap .singer_list li {
  overflow: hidden;
  display: block;
  float: left;
  margin-left: 10px;
  padding-bottom: 10px;
  padding-top: 10px;
  width: 100px;
}
</style>

<script>
export default {
  data() {
    return {
      singer_list: [],
      pagination: {
        totalPage: 1,
        currentPage: 1
      }
    };
  },
 methods: {
    async fetchSingerList() {
      const res = await this.$http.get(`/musics/singerbook/${this.pagination.currentPage}`+'?data=' + new Date().getTime());
      this.singer_list = res.data.list;
      this.pagination.totalPage = res.data.totalPage;
    },
    handleCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchSingerList();
    }
 },
created() {
  this.fetchSingerList()
  }
};
</script>

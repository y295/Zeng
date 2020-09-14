<template>
  <div class="page-cat-list">
    <div class= "search_warp">
      <el-input placeholder="音乐名/歌手名/分类" v-model="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search" ></el-button>
      </el-input>
      <span class="prev" v-if="prev" @click="returned">返回</span>
    </div>
    <h3>音乐列表</h3>
    <el-table :data="model" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="280"></el-table-column>
      <el-table-column prop="music_name" label="音乐名"></el-table-column>
      <el-table-column prop="singers_list" label="歌手">
        <template slot-scope="scope">
          <div v-for="item in scope.row.singers_list">{{item.singer_name}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="recommend" label="推荐">
        <template slot-scope="scope">{{scope.row.recommend}}</template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间">
         <template slot-scope="scope">{{scope.row.createdAt | date('YYYY-MM-DD HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="最后更新时间">
        <template slot-scope="scope">{{scope.row.updatedAt | date('YYYY-MM-DD HH:mm:ss')}}</template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="() => $router.push(`/music/create/${scope.row._id}`)"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      model: [],
      prev : false
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/rest/music"+'?data=' + new Date().getTime());
      this.model = res.data;
    },
    async del(row) {
      const res = await this.$http.delete(`/rest/music/${row._id}`);
      if (res.data.status === 0) {
        this.fetch();
      }
    },
    async search() {
      if(this.input){
        const res = await this.$http.get(`/rest/music/search/${this.input}`);
        this.model = res.data;
        this.prev = true;
      }
    },
    returned() {
      this.fetch();
      this.prev = false;
    }
  },
  created() {
    this.fetch();

  }
};
</script>

<style>
  .search_warp{
    height:40px;
    width: 450px;
  }
 .el-input {
    width: 300px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;

  }
  .prev {
    display: inline-block;
    margin-left: 50px;
    color: #878d99;
    cursor: pointer;
  }
</style>
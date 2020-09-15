<template>
  <div class="page-cat-list">
    <div class= "search_warp">
      <el-input placeholder="用户名" v-model="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search" ></el-button>
      </el-input>
      <div class="prev" v-if="prev" @click="returned">返回</div>
    </div>
    <h3>用户列表</h3>
    <el-table :data="model" style="width: 100%">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
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
      const res = await this.$http.get("/rest/users"+'?data=' + new Date().getTime());
      this.model = res.data;
    },
    async del(row) {
      const res = await this.$http.delete(`/rest/users/${row._id}`);
      this.fetch();
    },
    async search() {
      if(this.input){
        const res = await this.$http.get(`/rest/users/search/${this.input}`);
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

  padding: 0;
  margin: 0;
}
.el-input {
  width: 300px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.prev {
  height: 40px;
  display: inline-block;
  margin-left: 50px;
  color: #878d99;
  cursor: pointer;
}
</style>

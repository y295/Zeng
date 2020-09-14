<template>
  <div class="page-cat-create">
    <h3>{{id ? "编辑" : "上传"}}音乐</h3>
    <el-form label-width="80px">
      <el-form-item label="音乐名">
        <el-input v-model="model.music_name" placeholder="请填入音乐名"></el-input>
      </el-form-item>
      <el-form-item label="歌手">
        <el-select multiple filterable v-model="model.singers" placeholder="请选择歌手">
          <el-option
            v-for="item in singers"
            :key="item._id"
            :label="item.singer_name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类">
        <el-select multiple v-model="model.categories" placeholder="请选择音乐分类">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.title"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推荐">
        <el-switch v-model="model.recommend" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
      <el-form-item label="音乐地址">
        <el-input v-model="model.music_address" placeholder="例：http://127.0.0.1:3000/static/music/xxx.mp3"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: { require: true }
  },
  data() {
    return {
      categories: [],
      singers: [],
      model: {
        recommend:false
      }
    };
  },
  methods: {
    async save() {
      let res;
      if (!this.id) {
        res = await this.$http.post("/rest/music", this.model);
      } else {
        res = await this.$http.put(`/rest/music/${this.id}`, this.model);
      }
      if (res.data.status === 0) {
        this.$message({
          type: "success",
          message: res.data.message
        });

        this.$router.push("/music/list");
      }
    },
    async fetchDetail() {
      const res = await this.$http.get(`/rest/music/${this.id}`);
      this.model = res.data;
    },
    async fetchSingers() {
      const res = await this.$http.get("/rest/singer");
      this.singers = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get("/rest/categories");
      this.categories = res.data;
    }
  },
  created() {
    this.fetchSingers();
    this.fetchCategories();
    this.id && this.fetchDetail();
  }
};
</script>
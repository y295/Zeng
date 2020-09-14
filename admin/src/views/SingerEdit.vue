<template>
  <div class="page-cat-create">
    <h3>{{id ? "编辑" : "添加"}}歌手</h3>
    <el-form label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="model.singer_name" placeholder="请输入歌手名"  ></el-input>
      </el-form-item>
      <el-form-item label="推荐">
        <el-switch v-model="model.recommend" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8}"
          placeholder="请输入歌手的介绍"
          v-model="model.introduce">
        </el-input>
      </el-form-item>
      <el-form-item label="照片地址">
        <el-input v-model="model.photo_address" placeholder="例：http://127.0.0.1:3000/static/singer_photo/xxx.jpg"></el-input>
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
      model: {
        recommend:false
      }
    };
  },
  methods: {
    async save() {
      let res;
      if (!this.id) {
        res = await this.$http.post("/rest/singer", this.model);
      } else {
        res = await this.$http.put(`/rest/singer/${this.id}`, this.model);
      }
      if (res.data.status === 0) {
        this.$message({
          type: "success",
          message: res.data.message
        });

        this.$router.push("/singer/list");
      }
    },
    async fetchDetail() {
      const res = await this.$http.get(`/rest/singer/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetchDetail();
  }
};
</script>
<template>
  <div class="page-register">
    <div>
      <el-card class="card-view" :body-style="{ padding: '0px' }">
        <div slot="header">
          <span>请注册</span>
        </div>
        <!-- card body -->
        <el-form class="card-body" ref="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="model.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="model.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type="password" v-model="model.again_password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
        <div class="go_login" @click="() => $router.push('/login')"><span>登录账号</span></div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async register() {
           const res = await this.$http.post("/register", this.model);
           if (res.data.status === 0) {
             this.$router.push("/login");
             this.$message({
             type: "success",
             message: "注册成功"
           });

        }
    }
  },
};
</script>

<style lang="scss" scoped>
.page-register {
  .card-view {
    width: 40%;
    padding: 2rem;
    margin: 7% auto;

    .card-body {
      margin-top: 2rem;
    }

    .go_login{
      float: right;
      cursor: pointer;
    }
  }
}
</style>
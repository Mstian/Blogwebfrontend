
<template>
  <div class="login">
    <div class="input">
      <el-input v-model="form.userName" size="large" placeholder="请输入用户名"></el-input>
    </div>
    <div class="input">
      <el-input v-model="form.passWord" size="large" show-password placeholder="请输入密码"></el-input>
    </div>
    <div class="btn">
      <el-button @click="loginApp()" type="danger" round>登录</el-button>
    </div>
  </div>
</template>

<script>
import dynamicArr from "../router/routeArr";
import router from "../router/index";
import { login } from "../api/request/user";
export default {
  components: {},
  data() {
    return {
      form: {
        userName: "",
        passWord: ""
      },
      formLabelWidth: "120px"
    };
  },
  computed: {},
  watch: {},
  methods: {
    loginApp() {
      if (this.form.userName.length < 3) {
        this.$message("请输入至少3位用户名");
        return;
      }
      if (this.form.passWord.length < 6) {
        this.$message("请输入至少6位数字密码");
        return;
      }
      login({ us: this.form.userName, ps: this.form.passWord }).then(data => {
        if (data.err == 0) {
          this.$message({
            message: "登录成功",
            type: "success",
            center: true,
            offset: 50
          });
          localStorage.setItem("uid", data.uid);
          localStorage.setItem("userName", data.us);
          this.$store.commit("SETUID", data.uid);
          this.$store.commit("SETUNAME", data.us);
          this.$store.dispatch("addRoutes", dynamicArr.dynamicArr);
          this.$store.dispatch("isShowLogin");
        } else {
          this.$message({
            message: data.msg,
            type: "error",
            center: true,
            offset: 50
          });
        }
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='scss'>
.login {
  width: 60%;
  margin: 0 auto;
}
.login .input {
  margin: 40px 30px;
  .el-input__inner {
    height: 50px;
  }
}
.btn {
  // width: 60%;
  position: absolute;
  bottom: 100px;
  left: 50%;
  // margin: 30px;
  transform: translateX(-50%);
}

.el-button.is-round {
  width: 350px;
}
</style>
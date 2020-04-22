
<template>
  <div class="register">
    <div class="input">
      <el-input v-model="form.userName" size="large" placeholder="请输入用户名"></el-input>
    </div>
    <div class="input">
      <el-input v-model="form.passWord" size="large" show-password placeholder="请输入密码"></el-input>
    </div>
    <div class="input">
      <el-input v-model="form.repassWord" size="large" show-password placeholder="请再次输入密码"></el-input>
    </div>
    <div class="btn">
      <el-button @click="registerApp()" type="danger" round>注册</el-button>
    </div>
  </div>
</template>

<script>
import { register } from "../api/request/user";
export default {
  components: {},
  data() {
    return {
      form: {
        userName: "",
        passWord: "",
        repassWord: ""
      },
      formLabelWidth: "120px"
    };
  },
  computed: {},
  watch: {},
  methods: {
    registerApp() {
      if (this.form.userName.length < 3) {
        this.$message("请输入至少3位用户名");
        return;
      }
      if (this.form.passWord.length < 6) {
        this.$message("请输入至少6位数字密码");
        return;
      }
      if (this.form.passWord != this.form.repassWord) {
        this.$message("请保持两次输入密码保持一致");
        return;
      }
      register({
        us: this.form.userName,
        ps: this.form.passWord,
        rps: this.form.repassWord
      }).then(data => {
        if (data.err == 0) {
          this.$message({
            message: "注册成功，请登录",
            type: "success",
            center: true,
            offset: 50
          });
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
.register {
  width: 60%;
  margin: 0 auto;
}
.register .input {
  margin: 40px 30px;
  .el-input__inner {
    height: 50px;
  }
}
.btn {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
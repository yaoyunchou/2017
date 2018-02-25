<template>
  <div>
    <header class="login-header">
      <div class="logo">小飞鱼设计</div>
      <router-link class="el-icon-arrow-left back_index" to="/admin">返回首页</router-link>
    </header>
    <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm1.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm1.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-row>
          <el-col :span="14"> <el-input v-model="ruleForm1.code"></el-input></el-col>
          <el-col :span="10"> <el-button class="code">获取验证</el-button></el-col>
        </el-row>          
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm1')">登陆</el-button>
          <el-button @click="resetForm('ruleForm1')">重置</el-button>
          <span class="register fr">注册</span>
      </el-form-item>
    </el-form>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm2.name"></el-input>
      </el-form-item> 
      <el-form-item label="手机" prop="phone">
          <el-input v-model="ruleForm2.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="checkPass">
        <el-row>
          <el-col :span="14"> <el-input v-model="ruleForm2.code"></el-input></el-col>
          <el-col :span="10"> <el-button class="code">获取验证</el-button></el-col>
        </el-row>          
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
          <span class="register fr">注册</span>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm1: {
        name: "",
        pass: "",
        code: ""
      },
      ruleForm2: {
        name: "",
        phone: "",
        pass: "",
        checkPass: "",
        email: "",
        age: ""
      },
       rules1: {
        name:[ { required: true, message: '请输入用户名', trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: checkAge, trigger: "blur" }]
      },
      rules2: {
        name:[ { required: true, message: '请输入用户名', trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.login-header {
  height: 60px;
  background: #545c64;
  .back_index {
    float: right;
    height: 60px;
    line-height: 60px;
    margin-right: 20px;
    color: #fff;
    font-size: 16px;
  }
}
.demo-ruleForm {
  width: 30%;
  min-width: 400px;
  max-width: 520px;
  margin: 100px auto;
  .code {
    width: 80%;
    float: right;
  }
}
</style>

<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像-->
<!--      <div class="avatar_box">-->
<!--        <img src="/img/comment-avatar/3.jpg" alt="">-->
<!--      </div>-->
      <!--注册表单-->
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" class="register_form">
        <el-form-item prop="username">
          <el-input  v-model="registerForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input v-model="registerForm.nickname" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" prefix-icon="el-icon-lock" show-password @keyup.native.enter="register"></el-input>
        </el-form-item>
        <el-form-item prop="password1">
          <el-input v-model="registerForm.password1" prefix-icon="el-icon-lock" show-password @keyup.native.enter="register"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="returnLogin">返回登录</el-button>
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {login,register} from "@/api/login";

export default {
  name: "Register",
  data() {
    return {
      registerForm: {
        username: '',
        nickname:'',
        password: '',
        password1:'',
        email:'',
      },
      registerFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur',placeholder:'用户名'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur',placeholder:'密码'},
        ],
        password1:[
          {required: true, message: '请再次输入密码', trigger: 'blur',placeholder:'重复密码'}
        ],
        nickname: [
          {
            required:true,message:"请输入昵称",trigger:'blur',placeholder:'昵称'
          }
        ],
        email:[
          {
            required:true,message:"请输入电子邮箱",trigger:'blur',placeholder:'昵称'
          }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    returnLogin(){
      this.$router.push('/')
    },
    register(){
      this.$refs.registerFormRef.validate(valid=>{
        if(valid){
          register(this.registerForm).then(res=>{
            if(res.code===200){
              this.msgSuccess(res.msg)
              window.localStorage.setItem("adminToken",res.data.token)
              this.$router.push('/')
            }else{
              this.msgError(res.msg)
            }
          }).catch(()=>{
            this.msgError("请求失败")
          })
        }
      })
    }

  }
}
</script>

<style scoped>
.login_container {
  box-sizing: unset !important;
  height: 100%;
  background-image: url("https://cdn.jsdelivr.net/gh/buyanne/JsDelivr@3.7/BlogImage/47.jpg");
  background-size: 2048px 1268px;
  background-position-x: -0;
}

.login_box {
  width: 450px;
  height: 450px;
  background-color: #fff;
  border-radius: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login_box .avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

.login_box .avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.register_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>

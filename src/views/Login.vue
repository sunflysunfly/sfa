<template>
  <div class="login">
    <h1>欢迎登录宝洁SFA系统</h1>
    <div class="top_hat"></div>
    <div class="login_box">
      <div class="logo_box"></div>

      <!-- 登录的表单 -->
      <div class="input_group" :class="{active:act_index==1,error:errors.has('cno')}">
        <label for="cm_code">公司编号：</label>
        <input name="cno" v-validate="{required:true,max:6,min:4}" type="number" id="cm_code" @focus="act_index=1;" v-model="cm_code">
      </div>

      <div class="input_group" :class="{active:act_index==2,error:errors.has('pno')}">
        <label for="PNO">员工编号：</label>
        <input name="pno" v-validate="{required:true,max:12,min:4}" type="number" id="PNO" @focus="act_index=2;" v-model="PNO">
      </div>

      <div class="input_group" :class="{active:act_index==3,error:errors.has('pwd')}">
        <label for="Password">用户密码：</label>
        <input type="number" name="pwd" v-validate="{required:true,max:12,min:4}" id="Password" @focus="act_index=3;" v-model="passwd">
      </div>

      <div class="ck_row">
        <div class="ckbox_wrap" @click="remembSet" :class="{active:rememb}">
          <i class="iconfont" :class="{'icon-check-square':rememb,'icon-border':!rememb}"></i>
          <span>记住密码</span>
        </div>
        <div class="ckbox_wrap" @click="autologinSet" :class="{active:autologin}">
          <i class="iconfont" :class="{'icon-check-square':autologin,'icon-border':!autologin}"></i>
          <span>自动登录</span>
        </div>
      </div>
    </div>
    <div class="btn_wrap" @click="loginBtnClick">
      <p>登录</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Indicator,Toast } from 'mint-ui';
import "../assets/font/iconfont.css";
import service from '../service/index';

export default {
  name: "login",
  data() {
    return {
      act_index: 1,
      cm_code: "",
      PNO: "",
      passwd: "",
      rememb: false,
      autologin: false
    };
  },
  components: {},
  mounted(){
    // 强制执行校验
    this.$validator.validate();
    let user=JSON.parse(localStorage.getItem('user'));
    if(user.rememb){
      this.cm_code=user.cm_code;
      this.PNO=user.PNO;
      this.passwd=user.passwd;
      this.rememb=user.rememb;
      this.autologin=user.autologin;
      if(user.autologin){
        this.loginBtnClick();
      }
    }
  },
  methods: {
    autologinSet() {
      this.autologin = !this.autologin;
      this.autologin && (this.rememb = true);
    },
    remembSet() {
      this.rememb = !this.rememb;
      this.rememb || (this.autologin = false);
    },
    loginBtnClick(){
      // 判断校验是否全部通过
      if(this.errors.any()){
        console.log('有错误');
        return;
      }
      // 弹出等待遮罩，防止二次点击
      Indicator.open('正在登陆...');
      // setTimeout(function(){
      //   Indicator.close();
      // },2000)
      // 发送ajax请求
      service.login('/login.json')
      .then(res=>{
        if(res.data.code == 1){
          if(this.rememb){
            let data={
                cm_code:this.cm_code,
                PNO:this.PNO,
                passwd:this.passwd,
                rememb:this.rememb,
                autologin:this.autologin
              }
              console.log(data);
            localStorage.setItem('user',JSON.stringify(data));
          }
          this.$router.push('/home');
        }else{
          // 登录失败
        }
        Indicator.close();
      })
      .catch(e=>{
        Toast({
          message:'登录异常失败!',
          duration:2000
        })
      })
    }
  }
};
</script>
<style lang="css">
html,
body,
#app {
  height: 100%;
}
</style>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: px2rem(36);
  height: px2rem(36);
  padding: px2rem(148-36-44) 0 px2rem(44);
  line-height: px2rem(36);
  color: #fff;
}
@mixin login_wrap(){
    width: px2rem(600);
    background-color: #fff;
    margin: 0 auto;
    border-radius: px2rem(20);
}
.login {
  background: #2ade69;
  height: 100%;
  .top_hat {
    width:px2rem(537);
    height: px2rem(18);
    margin: 0 auto;
    background: #eee;
    border-top-left-radius: px2rem(18);
    border-top-right-radius: px2rem(18);
  }
  .login_box {
    height: px2rem(836);
    @include login_wrap();
    overflow: hidden;
    .logo_box {
      width: px2rem(190);
      height: px2rem(190);
      margin: px2rem(80) auto;
      background: url(../assets/logo.jpg);
      background-size: cover;
    }
    @mixin rowStyle() {
      padding: 0 px2rem(36);
      color: $text-color;
      width: px2rem(400);
    }
    .input_group {
      border: 2px solid #e2e2e2;
      border-radius: px2rem(45);
      font-size: $text-size-mid;
      line-height: px2rem(90);
      @include rowStyle();
      margin: 0 auto px2rem(30);
      input {
        border: 0;
        font-size: $text-size-mid;
        line-height: px2rem(90);
        width: px2rem(200);
        padding-left: 1em;
      }
    }
    .input_group.active {
      color: $act-color;
      border: 2px solid $act-color;
    }
    .input_group.error {
      color: red;
      border: 2px solid red;
    }
    .ck_row {
      @include rowStyle();
      font-size: $text-size;
      display: flex;
      justify-content: space-around;
      .ckbox_wrap {
        padding-top: px2rem(8);
        padding-left: px2rem(36);
        i {
          display: inline-block;
          font-size: px2rem(30);
        }
      }
      .ckbox_wrap.active {
        color: $act-color;
      }
    }
  }
  .btn_wrap{
    @include login_wrap();
    font-weight:700;
    letter-spacing:px2rem(10);
    height:px2rem(100);
    text-align:center;
    line-height:px2rem(100);
    font-size:$text-size-imp;
    color:$act-color;
    margin-top:px2rem(20);
  }
}
</style>


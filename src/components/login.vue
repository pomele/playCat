<template>
  <div class="background">
    <nav>
      <p style="float:left">
        <img src="../assets/camera.png">
      </p>
    </nav>
    <div class="main">
      <div class="cat">
        <img src="../assets/todayPlay.png" class="todayPlay">
        <img src="../assets/cat.png" class="catPng">
      </div>
      <div class="login">
        <div class="login_title">SenseMeow</div>
        <div class="login_body">
          <p class="login_type">密码登陆</p>
          <p class="login_type">邀请码登陆</p>
          <div class="g-username">
            <input name="loginPhoneOrEmail" maxlength="64" placeholder="手机号/用户名" class="input">
          </div>
          <div class="g-password">
            <input name="loginPassword" type="password" maxlength="64" placeholder="密码" class="input">
          </div>
          <button class="button_login">
            登录
          </button>
          <p class="signIn">忘记密码|注册账号</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style scoped>
  body,div,ul,li,h1{margin:0;padding:0;font-size:18px}
  .background {
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 0;
    width:100%;
    background-color: rgba(255,194,45,0.82);
    background-size: auto;
  }
  nav {
    height: 15%;
    width: 100%;
    line-height: 10%;
    color: #fff;
    font-weight:bold;
  }
  nav::after {
    content: '';
    height: 15%;
    width: 100%;
    background-color: red;
    z-index: 100;
  }
  .main {
    height: 80%;
    width: 90%;
    display: flex;
    flex-wrap: wrap-reverse;
    margin: 0 5%;
    position: absolute;
    /*background: pink;*/
  }
  /*手机*/
  @media only screen and (max-width: 800px) {
    .login {
      width: 60%;
      height: 40%;
      /*background: white;*/
      margin-left: 20%;
      float: right;
    }
    .cat {
      width: 60%;
      height: 40%;
      /*background: #e9e9e9;*/
      margin-left: 20%;
      float: left;
    }
  }
  @media only screen and (min-width: 800px) {
    .login {
      width: 32%;
      height: 85%;
      /*background: #e9e9e9;*/
      margin-bottom: 5%;
      margin-left: 5%;
      float: right;
    }
    .cat {
      width: 32%;
      height: 85%;
      /*background: #e9e9e9;*/
      margin-left: 18%;
      margin-bottom: 5%;
      float: left;
    }
  }
  .login_title {
    width: 100%;
    height: 16%;
    font-size: 0.43rem;
    color: #fff;
    font-weight: bold;
    margin: auto;
    margin-top: 1%;
    text-align: center;
  }
  .login_body {
    width: 90%;
    height: 66%;
    color: #351900;
    margin-top: 4%;
    background-color: #fff;
    border: 0px solid red;
    border-radius: 0.3rem;
    font-size: 0.16rem;
    padding: 6%;
  }
  .login_type {
    display: inline;
    float: left;
    margin: 4%;
    /*margin-left: 7%;*/
  }
  .input {
    outline: none;
    padding: 3%;
    width: 90%;
    height: 7%;
    border: 1px solid #e9e9e9;
    border-radius: 0.02rem;
    box-sizing: border-box;
    font-size: 0.13rem;
  }
  .g-username {
    margin-top: 18%;
    margin-bottom: 3%;
  }
  .g-username:focus-within input {
    border-color: #007fff;
  }
  .g-password {
    margin-bottom: 0.2%;
  }
  .g-password:focus-within input {
    border-color: #007fff;
  }
  .button_login {
    width: 40%;
    height: 15%;
    background-color: #FF9F00;
    color: #fff;
    font-size: 0.15rem;
    border-radius: 1rem;
    margin-top: 13%;
  }
  .signIn {
    margin-top: 4%;
    color: #351900;
    font-size: 0.12rem;
  }
  .todayPlay {
    position: relative;
    margin: auto;
    /*left: 10%;*/
    top: 15%;
    width: 70%;
    height: 8%;
  }
  .catPng {
    position: relative;
    margin: auto;
    /*left: 10%;*/
    top: 20%;
    width: 80%;
    height: 70%;
  }

</style>

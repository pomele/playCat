<template>
  <div class="background">
    <nav>
      <p style="float:left; margin-left: 1rem; font-size: 0.3rem">senseMeow</p>
      <p style="float:right; margin-right:0.2rem">
        <router-link :to="{path: '/'}" tag="div">登陆/注册</router-link>
      </p>
      <p style="float:right; margin-right:0.2rem">
        <router-link :to="{path: '/'}" tag="div">控制台</router-link>
      </p>
    </nav>
    <div class="main">
      <div class="display">
      </div>
      <div class="display_upper">
      </div>
      <div class="control">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style scoped>
  body,div,ul,li,h1{margin:0;padding:0;font-size:18px;}
  .background {
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 0;
    width:100%;
    /*background: url("../assets/2.jpg");*/
    background: rgba(255,194,45,0.82);
    background-size: auto;
  }
  nav {
    height: 10%;
    width: 100%;
    line-height: 10%;
    color: #fff;
    font-weight:bold;
  }
  nav::after {
    content: '';
    height: 10%;
    width: 100%;
    background-color: red;
    z-index: 100;
  }
  .main {
    height: 90%;
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 5%;
    background: pink;
    position: absolute;
  }
  @media only screen and (max-width: 800px) {
    .display {
      width: 90%;
      height: 50%;
      background: orange;
      margin-left: 5%;
      position: absolute;
    }
    .control {
      width: 90%;
      height: 10%;
      background: #e9e9e9;
      margin-left: 5%;
      margin-top: -30%;
      position: relative;
    }
    /*透明色*/
    .display_upper {
      width: 90%;
      height: 50%;
      margin-left: 5%;
      position: relative;
      background: hsla(0, 0%, 100%, .5);
    }
  }
  @media only screen and (min-width: 800px) {
    .display {
      width: 80%;
      height: 90%;
      position: absolute;
      background: rosybrown;
      margin-left: 5%;
    }
    .control {
      width: 5%;
      height: 90%;
      background: #e9e9e9;
      margin-left: 5%;
    }
    /*透明色*/
    .display_upper {
      width: 80%;
      height: 90%;
      margin-left: 5%;
      position: relative;
      background: hsla(0, 0%, 100%, .5);
    }
  }

</style>

<template>
  <div class="background">
    <nav>
      <p style="float:left; margin-left: 1rem; font-size: 0.3rem">
        <router-link :to="{path: '/'}" tag="div" style="font-size: 0.3rem; cursor: pointer">SenseMeow</router-link>
      </p>
      <p style="float:right; margin-right:0.2rem">
        <router-link :to="{path: '/login'}" tag="div" style="cursor: pointer;">注销</router-link>
      </p>
      <p style="float:right; margin-right:0.2rem">
        <router-link :to="{path: '/control'}" tag="div" style="cursor: pointer;">控制台</router-link>
      </p>
    </nav>
    <div class="main">
      <div id="display" class="display">
<!--        这个div层展示摄像头内容-->
        <img src="http://34.80.201.30:8080/?action=stream" class="screenImg">
      </div>
      <div id="display_upper" class="display_upper">
        <div class="cavasScreen" @click="clickScreen($event)">
<!--          鼠标点击图片-->
<!--          <canvas id="canvas"></canvas>-->
        </div>
        <div class="controlScreen">
          <button class="controlButton">
            <img src="../assets/screenshot.png" class="controlImg">
          </button>
          <button class="controlButton">
            <img src="../assets/video.png" class="controlImg">
          </button>
          <button class="controlButton">
            <img src="../assets/microphone.png" class="controlImg">
          </button>
          <button class="controlButton">
            <img src="../assets/voice.png" class="controlImg">
          </button>
          <button class="controlButton">
            <img src="../assets/record.png" class="controlImg">
          </button>
        </div>
      </div>
      <div id="control" class="control">
        <div id="autoTime" class="autoTime">
          <p style="text-align: left">设置运动时间</p>
          <p style="text-align: left; font-size: 0.24rem; font-weight: bold; align-items: center;">
            分钟
            <input style="width: 30%;height: 0.2rem; margin-left: 5%; margin-top: 0; border:1px dashed #000;" />
            <button class="buttonStart">开始</button>
          </p>
        </div>
        <div id="manualTime" class="manualTime">
          <p style="text-align: left">运动时间</p>
          <p style="text-align: left; font-size: 0.24rem; font-weight: bold">00：15：00</p>
        </div>
        <div class="call" @click="clickCall"><span>呼叫</span></div>
        <div class="auto" @click="clickAuto"><span>自动逗猫</span></div>
        <div class="manual" @click="clickManual"><span>手动逗猫</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import playCat from './playCat.vue'
export default {
  name: 'home',
  Components: {playCat: playCat},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      path: 'ws://34.80.201.30:8087/user_action',
      socket: '',
      type: 0,
      opId: 0,
      id: 'wenchaer',
      is_open: false
    }
  },
  mounted () {
    this.updateSize()
    this.initSocket()
    window.onresize = function () {
      this.updateSize()
    }
    this.drawDot()
  },
  methods: {
    updateSize () {
      // pc
      if (document.body.clientWidth > 800) {
        let display = document.getElementById('display')
        let style = window.getComputedStyle(display)
        let heightString = style.height
        let temp = heightString.indexOf('px')
        let height = heightString.slice(0, temp)
        console.log(height)
        display.style.width = ((Number(height) * 4) / 3) + 'px'
        // 遮罩层
        let displayUpper = document.getElementById('display_upper')
        displayUpper.style.width = ((Number(height) * 4) / 3) + 'px'
      } else {
        let display = document.getElementById('display')
        let style = window.getComputedStyle(display)
        let WidthString = style.width
        let temp = WidthString.indexOf('px')
        let width = WidthString.slice(0, temp)
        console.log(width)
        display.style.height = ((Number(width) * 3) / 4) + 'px'
        // 遮罩层
        let displayUpper = document.getElementById('display_upper')
        displayUpper.style.height = ((Number(width) * 3) / 4) + 'px'
      }
    },
    clickAuto () {
      document.getElementById('autoTime').style.display = 'block'
      document.getElementById('manualTime').style.display = 'none'
    },
    clickManual () {
      document.getElementById('autoTime').style.display = 'none'
      document.getElementById('manualTime').style.display = 'block'
      // 打开websocket
      // 处理发送的数据
      this.type = 1
      this.opId += 1
      let firstSend = {'type': this.type, 'id': this.id, 'opid': this.opId}
      this.socket.send(JSON.stringify(firstSend))
      console.log('first成功')
    },
    clickScreen (e) {
      // 获取元素宽高大小
      let width = document.getElementById('display').offsetWidth
      let height = document.getElementById('display').offsetHeight
      let x = width - e.offsetX
      let y = height - e.offsetY
      console.log(x + y)
      this.is_open = true
      this.type = 2
      this.opId += 1
      let secondSend = {'type': this.type, 'id': this.id, 'opid': this.opId, 'x': x, 'y': y, 'w': width, 'h': height, 'is_open': this.is_open}
      this.socket.send(JSON.stringify(secondSend))
      console.log('second成功')
    },
    clickCall () {
      console.log('')
    },
    drawDot () {
      let canvas = document.getElementById('canvas')
      let context = canvas.getContext('2d')
      context.fillRect(0, 0, 100, 100)
      context.strokeRect(120, 0, 100, 100)
    },
    initSocket () {
      console.log('hello')
      if (typeof (WebSocket) === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    open () {
      // let firstSend = {'type': this.type, 'id': this.id, 'opid': this.opId}
      // this.socket.send(JSON.stringify(firstSend))
      console.log('socket连接成功')
    },
    error () {
      console.log('socket连接错误')
    },
    getMessage (msg) {
      console.log(msg.data)
    },
    send () {
      this.socket.send()
    },
    close () {
      console.log('socket关闭')
    }
  },
  destroyed () {
    // 销毁监听
    this.socket.onclose = this.close
  }
}
</script>
<style scoped>
  body,div,ul,li,h1{margin:0;padding:0;font-size:18px;}
  .background {
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 0;
    width:100%;
    background: url('../assets/bg.png');
    /*background: red;*/
    background-size: auto;
  }
  nav {
    height: 8%;
    width: 100%;
    line-height: 10%;
    color: #fff;
    background: #FFB400;
    font-weight:bold;
    margin-bottom: 2%;
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
    /*background: pink;*/
    position: absolute;
  }
  @media only screen and (max-width: 800px) {
    .display {
      width: 90%;
      height: 50%;
      background: greenyellow;
      margin-left: 5%;
      position: absolute;
    }
    .control {
      width: 90%;
      height: 40%;
      /*background: #e9e9e9;*/
      margin-left: 5%;
      margin-top: -40%;
      position: relative;
    }
    /*透明色*/
    .display_upper {
      width: 90%;
      height: 50%;
      margin-left: 5%;
      position: relative;
      /*background: hsla(0, 0%, 100%, .5);*/
    }
    .controlImg {
      width: 0.15rem;
      transform: translate(-30%, -20%);
      /*background: red;*/
    }
    .controlScreen {
      width: 100%;
      height: 10%;
      /*background: #000;*/
      /*top: 90%;*/
      position: relative;
    }
    .controlButton {
      outline: none;
      width: 5%;
      border: 0px;
      border-radius: 1rem;
      padding-bottom: 5%;/* padding百分比相对父元素宽度计算 */
      height: 0rem; /*避免被内容撑开多余的高度*/
      float: left;
      margin-left: 2.5%;
      background: rgba(0, 0, 0, 0.3);
    }
    .controlButton:active {
      /*border-top: 1px solid #9cc;*/
      background: #9cc;
      box-shadow: 0 0 1rem gold;
    }
    .autoTime .manualTime {
      width: 90%;
      height: 20%;
      margin: auto;
      font-size: 0.03rem;
      /*background: red;*/
    }
    .manualTime {
      display: none;
    }
    .call {
      width: 50%;
      height: 15%;
      margin: auto;
      margin-top: 20%;
      background: #FF861B;
      text-align: center;
      color: #fff;
      border-radius: 0.5rem;
      position: relative;
      cursor: pointer;
    }
    .call span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .auto {
      width: 50%;
      height: 15%;
      margin: auto;
      margin-top: 10%;
      background: #FF861B;
      text-align: center;
      color: #fff;
      border-radius: 0.5rem;
      position: relative;
      cursor: pointer;
    }
    .auto span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .manual {
      width: 50%;
      height: 15%;
      margin: auto;
      margin-top: 10%;
      background: #6173FF;
      text-align: center;
      color: #fff;
      border-radius: 0.5rem;
      position: relative;
      cursor: pointer;
    }
    /*写到这里了*/
    .manual:focus-within {
      background: yellow;
      box-shadow: 0 0 1em #000;
    }
    .manual span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .buttonStart {
      float: right;
      width: 1rem;
      height: 0.5rem;
      outline: none;
      background: #FFB400;
      color: #fff;
      border: 0px;
      border-radius: 0.6rem;
      cursor: pointer;
    }
  }
  @media only screen and (min-width: 800px) {
    .display {
      width: 80%;
      height: 90%;
      position: absolute;
      background: rosybrown;
      margin-left: 10%;
    }
    .control {
      width: 20%;
      height: 90%;
      /*background: #e9e9e9;*/
      /*box-shadow: 0 0 1em white;*/
      border-radius: 0.3rem;
      margin-left: 7%;
    }
    /*透明色*/
    .display_upper {
      width: 80%;
      height: 90%;
      margin-left: 10%;
      position: relative;
      /*background: hsla(0, 0%, 100%, .5);*/
    }
    .controlImg {
      width: 100%;
      margin-top: 30%;
      /*background: red;*/
    }
    .controlScreen {
      width: 100%;
      height: 10%;
      /*background: #000;*/
      /*top: 90%;*/
      position: relative;
    }
    .controlButton {
      outline: none;
      width: 5%;
      border: 0px;
      border-radius: 1rem;
      padding-bottom: 5%;/* padding百分比相对父元素宽度计算 */
      height: 0rem; /*避免被内容撑开多余的高度*/
      float: left;
      margin-left: 2.5%;
      background: rgba(0, 0, 0, 0.3);
    }
    .controlButton:active {
      /*border-top: 1px solid #9cc;*/
      background: #9cc;
      box-shadow: 0 0 1rem gold;
    }
    .autoTime .manualTime {
      width: 90%;
      height: 20%;
      margin: auto;
      font-size: 0.10rem;
      /*background: red;*/
    }
    .manualTime {
      display: none;
    }
    .call {
      width: 60%;
      height: 10%;
      margin: auto;
      margin-top: 90%;
      background: #FF861B;
      text-align: center;
      color: #fff;
      border-radius: 1rem;
      position: relative;
      cursor: pointer;
    }
    .call span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .auto {
      width: 60%;
      height: 10%;
      margin: auto;
      margin-top: 10%;
      background: #FF861B;
      text-align: center;
      color: #fff;
      border-radius: 1rem;
      position: relative;
      cursor: pointer;
    }
    .auto span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .manual {
      width: 60%;
      height: 10%;
      margin: auto;
      margin-top: 10%;
      background: #6173FF;
      text-align: center;
      color: #fff;
      border-radius: 1rem;
      position: relative;
      cursor: pointer;
    }
    .manual span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    /*写到这里了*/
    .manual:focus-within {
      background: yellow;
      box-shadow: 0 0 1em #000;
    }
    .buttonStart {
      float: right;
      width: 0.5rem;
      height: 0.3rem;
      outline: none;
      background: #FFB400;
      color: #fff;
      border: 0px;
      border-radius: 0.2rem;
      cursor: pointer;
    }
  }
  /*pc结束*/
  .cavasScreen {
    width: 100%;
    height: 90%;
    /*background: pink;*/
    position: relative;
  }
  .screenImg {
    width: 100%;
    height: 100%;
    transform:rotate(180deg)
  }
</style>

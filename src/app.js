import React from 'react';
import StyleEditor from './styleEditor';
import Heart from './heart';
import HeartRain from './heartRain';

const isPc = (function () {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}());

export default class App extends React.Component {

    fullStyle = [
        `/*
* Hi。宝贝！
* 每年你过生日都要给你做一个生日礼物呀！
* 宝宝我呀，已经要才尽了，太难了。
* 今年只能以创意取胜了！！！
* 教你怎么写代码，你要好好学呀，明年你做了送给我吧，哈哈哈
*/

/* 首先给所有元素加上过渡效果 */
* {
  -webkit-transition: all .5s;
  transition: all .5s;
}
/* 白色背景太单调了。来点背景 */
body, html {
  color: #fff;
  background-color: darkslategray;
}

/* 文字太近了 */
.styleEditor {
  overflow: auto;
  ${ isPc ? `width: 48vw;
  height: 96vh;` : `width: 96vw;
  height: 48vh;` }
  border: 1px solid;
  font-size: 14px;
  line-height: 1.5;
  padding: 10px;
}

/* 这些代码颜色都一样。加点儿高亮区别来 */
.token.selector{ color: rgb(133,153,0) }
.token.property{ color: rgb(187,137,0) }
.token.punctuation{ color: yellow }
.token.function{ color: rgb(42,161,152) }
.token.comment{ color: rgb(177,177,177) }

/* 加个 3D 效果 */
html{
  perspective: 1000px;
  -webkit-perspective: 1000px;
}

.styleEditor {
  ${ isPc ? `transform: rotateY(10deg) translateZ(-100px) ;
  -webkit-transform: rotateY(10deg) translateZ(-100px);` : `transform: rotateX(-10deg) translateZ(-100px);
  -webkit-transform: rotateX(-10deg) translateZ(-100px);` } ${ isPc ? '' : `
  transform-origin: 50% 0% 0;
  -webkit-transform-origin: 50% 0% 0;` }
}

/*
* 宝贝，今天我要把我的真心送给你呀。
* 接下来，就是见证奇迹的时刻！！！
*/

/* 首先，来一个画板 */
.heartWrapper {
  ${ isPc ? `width: 48vw;
  height: 96vh;` : `width: 96vw;
  height: 48vh;`}
  position: relative;
  border: 1px solid;
  background-color: white;
  ${ isPc ?
  `transform: rotateY(-10deg) translateZ(-100px);
  -webkit-transform: rotateY(-10deg) translateZ(-100px);` :
  `transform: rotateX(10deg) translateZ(-100px);
  -webkit-transform: rotateX(10deg) translateZ(-100px);`}${ isPc ? '' :`
  transform-origin: 50% 0% 0;
  -webkit-transform-origin: 50% 0% 0;`}
}

/* 画一个方块，当左心室和右心室 */
.heart {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
  border-radius: 20px;
  background: #E88D8D;
  transform: rotate(45deg);
}

/* 画上左心房 */
.heart::before {
  content: '';
  background: #E88D8D;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  left: -38px;
  top: 1px;
}

/* 再画上右心房 */
.heart::after {
  content: '';
  background: #E88D8D;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  right: -1px;
  top: -38px;
}

/* 我的心交给你啦，因为你而让我心动起来 */
@keyframes throb {
  0% {
    transform: scale(1) rotate(45deg);
    opacity: 1;
  }

  100% {
    transform: scale(1.65) rotate(45deg);
    opacity: 0
  }
}

.bounce {
  opacity: 0.2;
  animation: throb 1s infinite linear;
}
/*
* Ok，完结！散花花啦
* 我爱你，其心可鉴！！！
*/

`
    ]

    state = {
        currentStyleCode: '',
        finished: false,
        heartRains: []
    }

    interval = 30;
    // interval = 0;

    async progressiveShowStyle(n = 0) {
        const {
            interval,
            fullStyle
        } = this;
        const showStyle = i => new Promise((resolve) => {
            const style = fullStyle[n];
            const char = style[i];
            if (!style || !char) {
                resolve();
                return;
            }
            let {
                currentStyleCode
            } = this.state;
            currentStyleCode += char;
            this.setState({
                currentStyleCode
            });
            if (char === '\n' && this.styleEditor) {
                this.styleEditor.toBottom();
            }
            setTimeout(() => {
                resolve(showStyle(i + 1))
            }, interval);
        });
        return showStyle(0);
    }

    async componentDidMount() {
        await this.progressiveShowStyle(0);
        this.setState({finished: true});
        this.rain();
    }

    saveStyleEditorRef = child => this.styleEditor = child;
    
    rain = () => {
        let { heartRains } = this.state;
        const rainNum = 30;
        const stayTime = rainNum * 200 + 1000 + 4000;
        const time = (new Date()).getTime();
        if (!heartRains.length || (time - heartRains[heartRains.length - 1].time > (stayTime / 2))) {
            heartRains.push({time, rainNum});
            this.setState({heartRains});
            setTimeout(() => {
                this.removeRain(time);
				this.openUrl();
            }, stayTime);
        }
    }
	
	openUrl() {
        window.open("https://522622504.github.io/love2023/");
    }

    removeRain(time) {
        let { heartRains } = this.state;
        heartRains = heartRains.filter(item => item.time !== time);
        this.setState({heartRains});
    }

    render() {
        const { currentStyleCode, finished, heartRains } = this.state;
        return <div>
            <div style = {{display: isPc ? 'flex' : ''}}>
                <StyleEditor ref={this.saveStyleEditorRef} code={currentStyleCode}/>
                <Heart click={finished ? this.rain: null}/>
            </div>
            {
                heartRains.map(item => <HeartRain num={item.rainNum} key={item.time}/>)
            }
        </div>;
    }
}

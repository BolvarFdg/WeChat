//获取应用实例
const app = getApp()

Page({
  data: {
    displayValue: 0, //面板显示
    hasDot: false,   //是否有小数点
    keysign: 0,      //正负值0代表正 -1代表负
    operation: null, //运算操作
    firstNum: null,  //第一个数字
    numContinue: false  //是否续写数字
  },
  onLoad: function() {

    //初始化运算操作
    this.operator = {
      'key-divide': (prevValue, nextValue) => Number(prevValue) / Number(nextValue),
      'key-multiply': (prevValue, nextValue) => Number(prevValue) * Number(nextValue),
      'key-add': (prevValue, nextValue) => Number(prevValue) + Number(nextValue),
      'key-subtract': (prevValue, nextValue) => Number(prevValue) - Number(nextValue)
    }
  },
  //定义数字按键
  onTapDigit: function(event) {
    const key = event.target.dataset.key;
    if (key == 'key-dot') {
      if (!this.data.hasDot) {
        this.setData({
          displayValue: this.data.displayValue + '.',
          hasDot: true,
          numContinue: true
        })
      }
    } else {
      const digitKey = key[key.length - 1];
      if (this.data.numContinue) {
        this.setData({
          displayValue: this.data.displayValue + digitKey
        })
      } else {
        this.setData({
          displayValue: digitKey,
          numContinue:true
        })
      }

    }
  },

  //三大功能按键
  onTapFunction: function(event) {
    const key = event.target.dataset.key;
    switch (key) {
      case 'key-clear':
        if (this.data.displayValue != '0') {
          this.clearDisplay();
        } else {
          this.clearAll();
        }
        break;

      case 'key-sign':
        if (this.data.keysign == 0) {
          this.setData({
            keysign: -1,
            displayValue: '-' + this.data.displayValue
          })
        } else {
          this.setData({
            keysign: 0,
            displayValue: this.data.displayValue.slice(1)
          })
        }
        break;

      case 'key-percent':
        if (this.data.displayValue != 0) {
          this.setData({
            displayValue: this.data.displayValue / 100,
          })
        }

    }
  },

  //运算操作
  onTapOperator: function(event) {
    const key = event.target.dataset.key;
    if (this.data.operation == null) {
      this.setData({
        firstNum: this.data.displayValue,
        operation: key,
        numContinue:false
      })
    } else {
      const secondNum = this.data.displayValue;
      const result = this.operator[this.data.operation](this.data.firstNum, secondNum);
      this.setData({
        displayValue: result,
        operation: null,
        hasDot: false,
        firstNum: null,
        keysign: 0,
        numContinue:false
      })
    }

  },

  //AC操作 清除所有
  clearAll: function() {
    this.setData({
      displayValue: 0,
      hasDot: false,
      keysign: 0,
      operation: null,
      firstNum: null
    })
  },
  //C操作，清屏
  clearDisplay: function() {
    this.setData({
      displayValue: 0,
      numContinue:false,
      keysign:0,
      hasDot:false
    })
  }
})
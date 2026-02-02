<template>
    <div id="app">
      <p class="tag">仪表盘标题<el-input v-model="title" class="empty" placeholder="例如：完成率"></el-input></p>
      <p class="tag">当前值<el-input v-model="value" class="empty" type="number" placeholder="75"></el-input></p>
      <p class="tag">最小值<el-input v-model="min" class="empty" type="number" placeholder="0"></el-input></p>
      <p class="tag">最大值<el-input v-model="max" class="empty" type="number" placeholder="100"></el-input></p>
      <p class="tag">显示进度<el-switch style="margin-left: 10px;" v-model="showProgress"/></p>
      <el-button type="primary" @click="sendOptions" class="run">运行</el-button>
    </div>
  </template>
  
  <style scoped>
  #app {
    color: #e6edf3;
    font-family: 'Courier New', monospace;
  }
  
  .run {
    margin: 20px auto;
    display: block;
    background: linear-gradient(135deg, #00d9ff 0%, #00ff88 100%);
    border: none;
    color: #0a0e27;
    font-weight: bold;
    padding: 12px 40px;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    box-shadow: 0 4px 15px rgba(0, 217, 255, 0.4);
    transition: all 0.3s ease;
  }
  
  .run:hover {
    box-shadow: 0 6px 25px rgba(0, 217, 255, 0.6);
    transform: translateY(-2px);
  }
  
  .tag {
    padding: 10px 15px;
    color: #7ee787;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .empty {
    margin: 10px;
    width: 250px;
  }
  
  :deep(.el-input__wrapper) {
    background-color: #161b22;
    border: 1px solid #30363d;
    box-shadow: none;
    transition: all 0.3s ease;
  }
  
  :deep(.el-input__wrapper:hover) {
    border-color: #00d9ff;
  }
  
  :deep(.el-input__wrapper.is-focus) {
    border-color: #00ff88;
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  }
  
  :deep(.el-input__inner) {
    color: #e6edf3;
  }
  
  :deep(.el-switch.is-checked .el-switch__core) {
    background-color: #00ff88;
    border-color: #00ff88;
  }
  
  :deep(.el-switch__core) {
    background-color: #30363d;
    border-color: #30363d;
  }
  </style>
  
  <script>
  export default {
    data() {
      return {
        title: '完成率',
        value: 75,
        min: 0,
        max: 100,
        showProgress: true,
        option: ""
      };
    },
    methods: {
      generateOption() {
        this.option = {
          series: [
            {
              type: 'gauge',
              min: parseInt(this.min),
              max: parseInt(this.max),
              progress: {
                show: this.showProgress,
                width: 18
              },
              axisLine: {
                lineStyle: {
                  width: 18,
                  color: [
                    [0.3, '#ff6b9d'],
                    [0.7, '#ffd93d'],
                    [1, '#00ff88']
                  ]
                }
              },
              axisTick: {
                distance: -25,
                splitNumber: 5,
                lineStyle: {
                  width: 2,
                  color: '#30363d'
                }
              },
              splitLine: {
                distance: -30,
                length: 14,
                lineStyle: {
                  width: 3,
                  color: '#30363d'
                }
              },
              axisLabel: {
                distance: 25,
                color: '#7ee787',
                fontSize: 14
              },
              anchor: {
                show: true,
                showAbove: true,
                size: 20,
                itemStyle: {
                  borderWidth: 10,
                  borderColor: '#00d9ff'
                }
              },
              title: {
                show: true,
                offsetCenter: [0, '70%'],
                color: '#e6edf3',
                fontSize: 16
              },
              detail: {
                valueAnimation: true,
                fontSize: 40,
                offsetCenter: [0, '0%'],
                color: '#00d9ff',
                formatter: '{value}%'
              },
              data: [
                {
                  value: parseFloat(this.value),
                  name: this.title
                }
              ],
              pointer: {
                itemStyle: {
                  color: '#00d9ff'
                }
              }
            }
          ]
        };
      },
      sendOptions(){
        this.generateOption();
        this.$emit('listen', this.option);
      }
    },
    mounted() {
      this.sendOptions();
    }
  };
  </script>

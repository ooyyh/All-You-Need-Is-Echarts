<template>
    <div id="app">
      <p class="tag">X轴数据(List列表)<el-input v-model="xData" class="empty" placeholder="例如：10,20,30,40,50"></el-input></p>
      <p class="tag">Y轴数据(List列表)<el-input v-model="yData" class="empty" placeholder="例如：15,25,35,45,55"></el-input></p>
      <p class="tag">点大小<el-input v-model="symbolSize" class="empty" type="number" placeholder="20"></el-input></p>
      <p class="tag">点颜色<el-input v-model="pointColor" class="empty" placeholder="例如：#00d9ff"></el-input></p>
      <p class="tag">提示信息<el-switch style="margin-left: 10px;" v-model="tooltips"/></p>
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
        xData: '10.5,20.3,30.8,40.2,50.7,60.1,70.5,80.9,90.2,100.4',
        yData: '15.2,25.8,35.1,45.9,55.3,65.7,75.2,85.6,95.1,105.8',
        symbolSize: 20,
        pointColor: '#00d9ff',
        tooltips: true,
        option: ""
      };
    },
    methods: {
      generateOption() {
        const xValues = this.xData.split(',').map(Number);
        const yValues = this.yData.split(',').map(Number);
        const data = xValues.map((x, index) => [x, yValues[index]]);
  
        this.option = {
          tooltip: {
            show: this.tooltips,
            trigger: 'item',
            backgroundColor: 'rgba(13, 17, 23, 0.9)',
            borderColor: '#00d9ff',
            textStyle: {
              color: '#e6edf3'
            },
            formatter: (params) => {
              return `X: ${params.value[0]}<br/>Y: ${params.value[1]}`;
            }
          },
          xAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#30363d'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#21262d'
              }
            },
            axisLabel: {
              color: '#7ee787'
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#30363d'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#21262d'
              }
            },
            axisLabel: {
              color: '#7ee787'
            }
          },
          series: [
            {
              data: data,
              type: 'scatter',
              symbolSize: parseInt(this.symbolSize),
              itemStyle: {
                color: this.pointColor,
                shadowBlur: 10,
                shadowColor: this.pointColor + '80',
                shadowOffsetY: 2
              }
            }
          ],
          grid: {
            left: '10%',
            right: '10%',
            top: '10%',
            bottom: '10%'
          }
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

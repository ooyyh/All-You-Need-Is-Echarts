<template>
    <div id="app">
      <p class="tag">行数<el-input v-model="rows" class="empty" type="number" placeholder="7"></el-input></p>
      <p class="tag">列数<el-input v-model="cols" class="empty" type="number" placeholder="7"></el-input></p>
      <p class="tag">最小值<el-input v-model="minValue" class="empty" type="number" placeholder="0"></el-input></p>
      <p class="tag">最大值<el-input v-model="maxValue" class="empty" type="number" placeholder="100"></el-input></p>
      <p class="tag">显示标签<el-switch style="margin-left: 10px;" v-model="showLabel"/></p>
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
        rows: 7,
        cols: 7,
        minValue: 0,
        maxValue: 100,
        showLabel: false,
        tooltips: true,
        option: ""
      };
    },
    methods: {
      generateOption() {
        const xData = [];
        const yData = [];
        const data = [];
        
        for (let i = 0; i < this.cols; i++) {
          xData.push('列' + i);
        }
        for (let i = 0; i < this.rows; i++) {
          yData.push('行' + i);
        }
        
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
            const value = Math.floor(Math.random() * (this.maxValue - this.minValue + 1)) + this.minValue;
            data.push([j, i, value]);
          }
        }
  
        this.option = {
          tooltip: {
            show: this.tooltips,
            position: 'top',
            backgroundColor: 'rgba(13, 17, 23, 0.9)',
            borderColor: '#00d9ff',
            textStyle: {
              color: '#e6edf3'
            },
            formatter: (params) => {
              return `${xData[params.value[0]]}, ${yData[params.value[1]]}: ${params.value[2]}`;
            }
          },
          grid: {
            height: '70%',
            top: '10%',
            left: '10%',
            right: '10%'
          },
          xAxis: {
            type: 'category',
            data: xData,
            splitArea: {
              show: true
            },
            axisLine: {
              lineStyle: {
                color: '#30363d'
              }
            },
            axisLabel: {
              color: '#7ee787'
            }
          },
          yAxis: {
            type: 'category',
            data: yData,
            splitArea: {
              show: true
            },
            axisLine: {
              lineStyle: {
                color: '#30363d'
              }
            },
            axisLabel: {
              color: '#7ee787'
            }
          },
          visualMap: {
            min: this.minValue,
            max: this.maxValue,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '5%',
            inRange: {
              color: ['#0a0e27', '#00d9ff', '#00ff88']
            },
            textStyle: {
              color: '#e6edf3'
            }
          },
          series: [
            {
              name: '热力图',
              type: 'heatmap',
              data: data,
              label: {
                show: this.showLabel,
                color: '#e6edf3'
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 217, 255, 0.5)'
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

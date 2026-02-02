<template>
    <div id="app">
      <p class="tag">指标名称(List列表)<el-input v-model="indicators" class="empty" placeholder="例如：销售,管理,技术"></el-input></p>
      <p class="tag">数据系列1(List列表)<el-input v-model="series1Data" class="empty" placeholder="例如：4300,10000,28000"></el-input></p>
      <p class="tag">数据系列2(List列表)<el-input v-model="series2Data" class="empty" placeholder="例如：5000,14000,28000"></el-input></p>
      <p class="tag">最大值(List列表)<el-input v-model="maxValues" class="empty" placeholder="例如：6500,16000,30000"></el-input></p>
      <p class="tag">显示区域填充<el-switch style="margin-left: 10px;" v-model="showArea"/></p>
      <p class="tag">提示信息<el-switch style="margin-left: 10px;" v-model="tooltips"/></p>
      <p class="tag">显示图例<el-switch style="margin-left: 10px;" v-model="showLegend"/></p>
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
        indicators: '销售,管理,信息技术,客服,研发,市场',
        series1Data: '4300,10000,28000,35000,50000,19000',
        series2Data: '5000,14000,28000,31000,42000,21000',
        maxValues: '6500,16000,30000,38000,52000,25000',
        showArea: true,
        tooltips: true,
        showLegend: true,
        option: ""
      };
    },
    methods: {
      generateOption() {
        const indicatorNames = this.indicators.split(',');
        const maxVals = this.maxValues.split(',').map(Number);
        const data1 = this.series1Data.split(',').map(Number);
        const data2 = this.series2Data.split(',').map(Number);
        
        const indicator = indicatorNames.map((name, index) => ({
          name: name,
          max: maxVals[index]
        }));
  
        this.option = {
          tooltip: {
            show: this.tooltips,
            backgroundColor: 'rgba(13, 17, 23, 0.9)',
            borderColor: '#00d9ff',
            textStyle: {
              color: '#e6edf3'
            }
          },
          legend: {
            show: this.showLegend,
            data: ['预算分配', '实际支出'],
            textStyle: {
              color: '#e6edf3'
            },
            top: 20
          },
          radar: {
            indicator: indicator,
            shape: 'polygon',
            splitNumber: 5,
            name: {
              textStyle: {
                color: '#7ee787'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#30363d'
              }
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(0, 217, 255, 0.05)', 'rgba(0, 255, 136, 0.05)']
              }
            },
            axisLine: {
              lineStyle: {
                color: '#30363d'
              }
            }
          },
          series: [
            {
              name: '预算 vs 支出',
              type: 'radar',
              data: [
                {
                  value: data1,
                  name: '预算分配',
                  lineStyle: {
                    color: '#00d9ff'
                  },
                  areaStyle: this.showArea ? {
                    color: 'rgba(0, 217, 255, 0.3)'
                  } : null
                },
                {
                  value: data2,
                  name: '实际支出',
                  lineStyle: {
                    color: '#00ff88'
                  },
                  areaStyle: this.showArea ? {
                    color: 'rgba(0, 255, 136, 0.3)'
                  } : null
                }
              ]
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

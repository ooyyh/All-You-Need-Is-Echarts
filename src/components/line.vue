<template>
    <div id="app">
      <p class="tag">X轴行标签(List列表)<el-input v-model="xAxisLabels" class="empty" placeholder="例如：Mon,Tue,Wed,Thu,Fri"></el-input></p>
      <p class="tag">Data数据(List列表)<el-input v-model="dataValues" class="empty" placeholder="例如：150,230,224,218,135"></el-input></p>
      <p class="tag">颜色<el-input v-model="lineColor" class="empty" placeholder="例如：#00d9ff"></el-input></p>
      <p class="tag">显示区域填充<el-switch style="margin-left: 10px;" v-model="showArea"/></p>
      <p class="tag">平滑曲线<el-switch style="margin-left: 10px;" v-model="smooth"/></p>
      <p class="tag">显示数据点<el-switch style="margin-left: 10px;" v-model="showSymbol"/></p>
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
        xAxisLabels: 'Mon,Tue,Wed,Thu,Fri,Sat,Sun',
        dataValues: '150,230,224,218,135,147,260',
        lineColor: '#00d9ff',
        showArea: false,
        smooth: false,
        showSymbol: true,
        tooltips: true,
        showLegend: false,
        option: ""
      };
    },
    methods: {
      generateOption() {
        const xAxisData = this.xAxisLabels.split(',');
        const data = this.dataValues.split(',').map(Number);
  
        this.option = {
          tooltip: {
            show: this.tooltips,
            trigger: 'axis',
            backgroundColor: 'rgba(13, 17, 23, 0.9)',
            borderColor: '#00d9ff',
            textStyle: {
              color: '#e6edf3'
            }
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
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
              type: 'line',
              smooth: this.smooth,
              showSymbol: this.showSymbol,
              symbolSize: 8,
              itemStyle: {
                color: this.lineColor
              },
              lineStyle: {
                color: this.lineColor,
                width: 3
              },
              areaStyle: this.showArea ? {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: this.lineColor + '80' },
                    { offset: 1, color: this.lineColor + '00' }
                  ]
                }
              } : null
            }
          ],
          legend: {
            show: this.showLegend,
            textStyle: {
              color: '#e6edf3'
            }
          },
          grid: {
            left: '10%',
            right: '10%',
            top: '15%',
            bottom: '15%'
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

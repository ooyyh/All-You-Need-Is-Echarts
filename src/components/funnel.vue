<template>
    <div id="app">
      <p class="tag">阶段名称(List列表)<el-input v-model="stageNames" class="empty" placeholder="例如：展现,点击,访问,咨询,订单"></el-input></p>
      <p class="tag">数据值(List列表)<el-input v-model="dataValues" class="empty" placeholder="例如：100,80,60,40,20"></el-input></p>
      <p class="tag">漏斗排序<el-select v-model="sortType" class="empty">
        <el-option label="降序" value="descending"></el-option>
        <el-option label="升序" value="ascending"></el-option>
        <el-option label="不排序" value="none"></el-option>
      </el-select></p>
      <p class="tag">显示标签<el-switch style="margin-left: 10px;" v-model="showLabel"/></p>
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
  
  :deep(.el-select) {
    --el-select-input-focus-border-color: #00ff88;
  }
  
  :deep(.el-select .el-input__wrapper) {
    background-color: #161b22;
    border-color: #30363d;
  }
  
  :deep(.el-select .el-input__inner) {
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
        stageNames: '展现,点击,访问,咨询,订单',
        dataValues: '100,80,60,40,20',
        sortType: 'descending',
        showLabel: true,
        tooltips: true,
        showLegend: true,
        option: ""
      };
    },
    methods: {
      generateOption() {
        const names = this.stageNames.split(',');
        const values = this.dataValues.split(',').map(Number);
        const data = names.map((name, index) => ({
          name: name,
          value: values[index]
        }));
        
        const colors = ['#00d9ff', '#00e5ff', '#00f0ff', '#00f9ff', '#00ff88'];
  
        this.option = {
          tooltip: {
            show: this.tooltips,
            trigger: 'item',
            backgroundColor: 'rgba(13, 17, 23, 0.9)',
            borderColor: '#00d9ff',
            textStyle: {
              color: '#e6edf3'
            },
            formatter: '{b}: {c}'
          },
          legend: {
            show: this.showLegend,
            textStyle: {
              color: '#e6edf3'
            }
          },
          color: colors,
          series: [
            {
              name: '漏斗图',
              type: 'funnel',
              left: '10%',
              top: 60,
              bottom: 60,
              width: '80%',
              min: 0,
              max: 100,
              minSize: '0%',
              maxSize: '100%',
              sort: this.sortType,
              gap: 2,
              label: {
                show: this.showLabel,
                position: 'inside',
                color: '#0a0e27',
                fontSize: 14,
                formatter: '{b}: {c}'
              },
              labelLine: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              },
              itemStyle: {
                borderColor: '#0a0e27',
                borderWidth: 2
              },
              emphasis: {
                label: {
                  fontSize: 18
                },
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 217, 255, 0.5)'
                }
              },
              data: data
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

<template>
    <div id="app">
      <p class="tag">X轴行标签(List列表)<el-input v-model="xAxisLabels" class="empty"></el-input></p>
      <p class="tag">Y轴列标签(List列表)<el-input v-model="yAxisLabels" class="empty" placeholder="Type:Value" onlyread></el-input></p>
      <p class="tag">Data数据(List列表)<el-input v-model="dataValues" class="empty"></el-input></p>
      <p class="tag">颜色(List列表，使用逗号分隔)<el-input v-model="barColors" class="empty" placeholder="例如：#ff0000,#00ff00,#0000ff"></el-input></p>
      <p class="tag">提示信息<el-switch  style="margin-left: 10px;" v-model="tooltips"  @click="changeTool"/></p>
      <el-select v-model="chartType" placeholder="选择图表类型" class="empty">
        <el-option label="柱状图" value="bar"></el-option>
        <el-option label="折线图" value="line"></el-option>
      </el-select>
      <p class="tag">X轴类型<el-select v-model="xAxisType" placeholder="选择X轴类型" class="empty">
        <el-option label="类目" value="category"></el-option>
        <el-option label="数值" value="value"></el-option>
      </el-select></p>
      <p class="tag">Y轴类型<el-select v-model="yAxisType" placeholder="选择Y轴类型" class="empty">
        <el-option label="类目" value="category"></el-option>
        <el-option label="数值" value="value"></el-option>
      </el-select></p>
      <p class="tag">显示图例<el-switch style="margin-left: 10px;" v-model="showLegend" @click="changeLegend"/></p>
      <p class="tag">图例位置<el-select v-model="legendPosition" placeholder="选择图例位置" class="empty">
        <el-option label="顶部" value="top"></el-option>
        <el-option label="底部" value="bottom"></el-option>
        <el-option label="左侧" value="left"></el-option>
        <el-option label="右侧" value="right"></el-option>
      </el-select></p>
      <el-button type="primary" @click="sendOptions" class="run">运行</el-button>
      <!-- <pre>{{ option }}</pre> -->
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
        xAxisLabels: 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', // X轴标签的输入
        yAxisLabels: '', // Y轴标签的输入
        dataValues: '120,200,150,80,70,110,130', // 数据值的输入
        barColors: '#00d9ff,#00e5ff,#00f0ff,#00f9ff,#00ff88,#7ee787,#a78bfa', // 单个柱子颜色的输入
        option: "", // 图表配置对象
        tooltips: false, // 提示信息开关
        chartType: 'bar', // 图表类型
        xAxisType: 'category', // X轴类型
        yAxisType: 'value', // Y轴类型
        showLegend: false, // 图例显示开关
        legendPosition: 'top' // 图例位置
      };
    },
    methods: {
      generateOption() {
        const xAxisData = this.xAxisLabels.split(','); // 将X轴标签拆分为数组
        const data = this.dataValues.split(',').map(Number); // 将数据值拆分为数组并转换为数字类型
        const colors = this.barColors.split(','); // 将颜色值拆分为数组
  
        this.option = {
          tooltip: {
            show: this.tooltips
          },
          xAxis: {
            type: this.xAxisType,
            data: xAxisData
          },
          yAxis: {
            type: this.yAxisType
          },
          series: [
            {
              data: data.map((value, index) => ({
                value,
                itemStyle: { color: colors[index] }
              })),
              type: this.chartType
            }
          ],
          legend: {
            show: this.showLegend,
            orient: 'horizontal',
            top: this.legendPosition === 'top' ? 'top' : null,
            bottom: this.legendPosition === 'bottom' ? 'bottom' : null,
            left: this.legendPosition === 'left' ? 'left' : null,
            right: this.legendPosition === 'right' ? 'right' : null,
          }
        };
  
        console.log("生成的Option对象:", this.option);
      },
      sendOptions(){
        this.generateOption();
        this.$emit('listen', this.option);
      },
      changeTool() {
        this.tooltips == !this.tooltips;
        console.log('Tool tips status:', this.tooltips);
      },
      changeLegend() {
        this.legendPosition == !this.legendPosition;
        console.log('Tool tips status:', this.legendPosition);
      }
    },
    mounted() {
      this.sendOptions();
    }
  };
  </script>
  
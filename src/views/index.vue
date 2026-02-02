<template>
    <div class="container">
      <div class="left">
        <div class="top">
          <el-popover placement="bottom" :width="600" trigger="click">
            <template #reference>
              <el-button type="primary" id="popover">选择图表类型 | SELECT CHART</el-button>
            </template>
            <div class="chart-menu">
              <h4 class="menu-title">📊 基础图表 / Basic Charts</h4>
              <div class="chart-buttons">
                <el-button @click="routerto('bar')" class="chart-btn">柱状图 Bar</el-button>
                <el-button @click="routerto('line')" class="chart-btn">折线图 Line</el-button>
                <el-button @click="routerto('pie')" class="chart-btn">饼图 Pie</el-button>
                <el-button @click="routerto('scatter')" class="chart-btn">散点图 Scatter</el-button>
              </div>
              <el-divider />
              <h4 class="menu-title">📈 高级图表 / Advanced Charts</h4>
              <div class="chart-buttons">
                <el-button @click="routerto('radar')" class="chart-btn">雷达图 Radar</el-button>
                <el-button @click="routerto('gauge')" class="chart-btn">仪表盘 Gauge</el-button>
                <el-button @click="routerto('funnel')" class="chart-btn">漏斗图 Funnel</el-button>
                <el-button @click="routerto('heatmap')" class="chart-btn">热力图 Heatmap</el-button>
              </div>
            </div>
          </el-popover>
        </div>
        <div class="bottom">
          <router-view @listen="updateOptions"></router-view>
        </div>
      </div>
      <div class="right">
        <div ref="echartsContainer" class="echarts-container"></div>
      </div>
    </div>
  </template>
  
  <script>
  import { ElPopover, ElButton, ElDivider } from 'element-plus';
  import * as echarts from 'echarts';
  
  export default {
    components: {
      ElPopover,
      ElButton,
      ElDivider
    },
    data() {
      return {
        options: {}
      };
    },
    mounted() {
      this.initEcharts();
    },
    methods: {
      routerto(pageName) {
        this.$router.push({ name: pageName });
      },
      updateOptions(option) {
        this.options = option;
        this.updateEcharts();
      },
      initEcharts() {
        this.echartsInstance = echarts.init(this.$refs.echartsContainer);
        this.updateEcharts();
      },
      updateEcharts() {
        // 使用 options 更新 Echarts 实例
        if (this.echartsInstance && this.options) {
          this.echartsInstance.setOption(this.options);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    height: 100vh;
    background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
    font-family: 'Courier New', monospace;
  }
  
  .left, .right {
    flex: 1;
  }
  
  .left {
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, #0d1117 0%, #161b22 100%);
    border-right: 2px solid #30363d;
    box-shadow: 4px 0 20px rgba(0, 255, 255, 0.1);
  }
  
  .top {
    flex: 0 1 auto;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 20px;
    background: rgba(13, 17, 23, 0.8);
    border-bottom: 1px solid #30363d;
  }
  
  .bottom {
    flex: 1;
    margin-top: 0;
    background: transparent;
    overflow-y: auto;
    padding: 20px;
  }
  
  .right {
    background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
    position: relative;
    padding: 20px;
  }
  
  .right::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
  }
  
  #popover {
    margin-top: 0;
    background: linear-gradient(135deg, #00d9ff 0%, #00ff88 100%);
    border: none;
    color: #0a0e27;
    font-weight: bold;
    font-family: 'Courier New', monospace;
    padding: 12px 24px;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 4px 15px rgba(0, 217, 255, 0.4);
    transition: all 0.3s ease;
  }
  
  #popover:hover {
    box-shadow: 0 6px 25px rgba(0, 217, 255, 0.6);
    transform: translateY(-2px);
  }
  
  .echarts-container {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    border-radius: 10px;
    background: rgba(13, 17, 23, 0.5);
    box-shadow: 0 8px 32px rgba(0, 255, 255, 0.1);
  }
  
  .chart-menu {
    background: #0d1117;
    padding: 10px;
    border-radius: 8px;
  }
  
  .menu-title {
    color: #00d9ff;
    margin: 10px 0;
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .chart-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 15px 0;
  }
  
  .chart-btn {
    background: linear-gradient(135deg, #161b22 0%, #21262d 100%);
    border: 1px solid #30363d;
    color: #7ee787;
    transition: all 0.3s ease;
    font-family: 'Courier New', monospace;
  }
  
  .chart-btn:hover {
    background: linear-gradient(135deg, #00d9ff 0%, #00ff88 100%);
    color: #0a0e27;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 217, 255, 0.4);
  }
  
  :deep(.el-divider) {
    background-color: #30363d;
  }
  </style>
  
<template>
  <el-row>
    <select v-model='selectedName'>
      <option v-for='name in names' :value='name'>{{name}}</option>
    </select>
    <el-col :span="12" >
      <!-- 询价单量曲线 -->
      <el-card>
        <div ref="chart1" class="chart"></div>
      </el-card>
      <!-- 配件转化率 -->
      <el-card>
        <div ref="chart4" class="chart"></div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <!-- 直供单量曲线 -->
      <el-card>
        <div ref="chart2" class="chart"></div>
      </el-card>
      <!-- 直供金额曲线 -->
      <el-card>
        <div ref="chart3" class="chart"></div>
      </el-card>
    </el-col>
  </el-row>

  
</template>
<script>
import * as echarts from 'echarts'
// import data1 from './assets/询价单量.json'
import data1 from './assets/单量转化率.json5'
// import data2 from './assets/直供单量.json'
import data2 from './assets/直供单量.json5'
// import data3 from './assets/直供金额.json'
import data3 from './assets/直供金额.json5'
// import data4 from './assets/单量转化率.json'
import data4 from './assets/单量转化率.json5'
export default{
  mounted () {
  this.initChart()
  },
  data() {
    return {
      selectedName: null,
      names: ['大地保险公司（四川分公司）','大地财产保险股份有限公司（重庆分公司）','太平保险（四川分公司）','太平保险（重庆分公司）','亚太财产保险有限公司（四川分公司）','永诚财产保险股份有限公司（四川分公司）','中国大地财产保险股份有限公司（西藏分公司）','中华联合财产保险股份有限公司（四川分公司）','紫金财产保险股份有限公司（四川分公司）','永诚财产保险股份有限公司（重庆分公司）','华农财产保险股份有限公司（四川分公司）']
    }
  },
  methods: {
    initChart () {
      const {selectedName} = this;
      this.initChart1(selectedName)
      this.initChart2(selectedName)
      this.initChart3(selectedName)
      this.initChart4(selectedName)
    },
  initChart1(filteredName) {
    const chart = echarts.init(this.$refs.chart1);
    let sourceData = data1.Sheet1;
    if(filteredName){
      sourceData = sourceData.filter(item => item.name === filteredName);
    }
    const names = [...new Set(sourceData.map(item => item.name))];
    const months = [...new Set(sourceData.map(item => item.month))];
    const groupedData = names.map(name => {
      const data = months.map(month => {
      const item = sourceData.find(item => item.month === month && item.name === name);
      return item ? item.askOrder : null;
      });
      return { name, data };
    });
    // 构造echarts需要的series数据
    const series = groupedData.map(item => ({
      name: item.name,
      type: 'line',
      smooth:true,
      data: item.data
    }));
    const option = {
      title:{
        text:'询价单量变化情况',
        top:20
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
        type: 'line'
        }
      },
      grid:{
        top: 70,
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      legend:{
        data:names,
        type: 'scroll',
        orient: 'horizontal',
        pageIconSize: 10,
        pageTextStyle: {
          fontSize: 12
        },
      },
      xAxis:{
        type: 'category',
        boundaryGap: false,
        data: months
      },
      yAxis: {
        type: 'value'
      },
      series: series
    };
    chart.setOption(option);
  },
  initChart2(filteredName) {
    const chart = echarts.init(this.$refs.chart2);
    let sourceData = data2.Sheet1;
    if(filteredName){
      sourceData = sourceData.filter(item => item.name === filteredName);
    }
    const names = [...new Set(sourceData.map(item => item.name))];
    const months = [...new Set(sourceData.map(item => item.month))];
    const groupedData = names.map(name => {
      const data = months.map(month => {
      const item = sourceData.find(item => item.month === month && item.name === name);
      return item ? item.supplyCount : null;
      });
      return { name, data };
    });
    // 构造echarts需要的series数据
    const series = groupedData.map(item => ({
      name: item.name,
      type: 'line',
      smooth:true,
      data: item.data
    }));
    const option = {
      title:{
        text:'直供单量变化情况',
        top:20
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
        type: 'line'
        }
      },
      grid:{
        top: 70,
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      legend:{
        data:names,
        type: 'scroll',
        orient: 'horizontal',
        pageIconSize: 10,
        pageTextStyle: {
          fontSize: 12
        },
      },
      xAxis:{
        type: 'category',
        boundaryGap: false,
        data: months
      },
      yAxis: {
        type: 'value'
      },
      series: series
    };
    chart.setOption(option);
  },
  initChart3(filteredName) {
    const chart = echarts.init(this.$refs.chart3);
    let sourceData = data3.Sheet1;
    if(filteredName){
      sourceData = sourceData.filter(item => item.name === filteredName);
    }
    const names = [...new Set(sourceData.map(item => item.name))];
    const months = [...new Set(sourceData.map(item => item.month))];
    const groupedData = names.map(name => {
      const data = months.map(month => {
      const item = sourceData.find(item => item.month === month && item.name === name);
      return item ? item.supplyMoney : null;
      });
      return { name, data };
    });
    // 构造echarts需要的series数据
    const series = groupedData.map(item => ({
      name: item.name,
      type: 'line',
      smooth:true,
      data: item.data
    }));
    const option = {
      title:{
        text:'直供金额变化情况',
        top:20
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
        type: 'line'
        }
      },
      grid:{
        top: 70,
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      legend:{
        data:names,
        type: 'scroll',
        orient: 'horizontal',
        pageIconSize: 10,
        pageTextStyle: {
          fontSize: 12
        },
      },
      xAxis:{
        type: 'category',
        boundaryGap: false,
        data: months
      },
      yAxis: {
        type: 'value'
      },
      series: series
    };
    chart.setOption(option);
  },
  initChart4(filteredName) {
    const chart = echarts.init(this.$refs.chart4);
    let sourceData = data4.Sheet1;
    if(filteredName){
      sourceData = sourceData.filter(item => item.name === filteredName);
    }
    const names = [...new Set(sourceData.map(item => item.name))];
    const months = [...new Set(sourceData.map(item => item.month))];
    const groupedData = names.map(name => {
      const data = months.map(month => {
      const item = sourceData.find(item => item.month === month && item.name === name);
      return item ? item.rate : null;
      });
      return { name, data };
    });
    // 构造echarts需要的series数据
    const series = groupedData.map(item => ({
      name: item.name,
      type: 'line',
      smooth:true,
      data: item.data
    }));
    const option = {
      title:{
        text:'配件转化率',
        top:20
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
        type: 'line'
        }
      },
      grid:{
        top: 70,
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      legend:{
        data:names,
        type: 'scroll',
        orient: 'horizontal',
        pageIconSize: 10,
        pageTextStyle: {
          fontSize: 12
        },
      },
      xAxis:{
        type: 'category',
        boundaryGap: false,
        data: months
      },
      yAxis: {
        type: 'value'
      },
      series: series
    };
    chart.setOption(option);
  },
},
  watch:{
    selectedName() {
      this.initChart()
    }
  }
}
</script>
<style>
  .chart {
    height: 280px;
  }
  .el-col {
    padding-right: 10px
  }
</style>


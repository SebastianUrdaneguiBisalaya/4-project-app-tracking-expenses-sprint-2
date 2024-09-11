// export async function createBarChart(data) {
//   const dataX = data.map((item) => Object.keys(item)).flat();
//   const dataY = data.map((item) => Object.values(item)).flat();
//   const echarts = await loadECharts();
//   const chartDom = document.getElementById("mainPlot");
//   const myChart = echarts.init(chartDom);
//   const option = {
//     title: {
//       text: "Total Expenses By Category",
//     },
//     tooltip: {},
//     xAxis: {
//       type: "category",
//       data: dataX,
//     },
//     yAxis: {
//       type: "value",
//     },
//     series: [
//       {
//         name: "Expenses by Category",
//         type: "bar",
//         data: dataY,
//       },
//     ],
//   };
//   myChart.setOption(option);
//   window.addEventListener("resize", () => {
//     myChart.resize();
//   });
// }

// async function loadECharts() {
//   const echartsModule = await import(
//     "https://cdn.jsdelivr.net/npm/echarts@5.4.0/dist/echarts.esm.min.js"
//   );
//   return echartsModule;
// }

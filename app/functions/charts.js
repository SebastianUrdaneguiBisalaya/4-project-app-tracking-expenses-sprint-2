export function createExpensesChart(labels, data) {
    const ctx = document.getElementById("expensesChart").getContext("2d");
  
    return new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Expenses Over Time",
            data: data,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Time",
              color: "white",
            },
            ticks: {
              color: "white",
            },
          },
          y: {
            title: {
              display: true,
              text: "Expenses (S/.)",
              color: "white",
            },
            ticks: {
              color: "white",
              beginAtZero: true,
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "white",
            },
          },
        },
      },
    });
  }
  
  export function createCategoryExpensesChart(labels, data) {
    const ctx = document.getElementById("categoryExpensesChart").getContext("2d");
  
    return new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Expenses by Category",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Categories",
              color: "white",
            },
            ticks: {
              color: "white",
            },
          },
          y: {
            title: {
              display: true,
              text: "Expenses (S/.)",
              color: "white",
            },
            ticks: {
              color: "white",
              beginAtZero: true,
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "white",
            },
          },
        },
      },
    });
  }
  
  export function updateChart(chart, newLabels, newData) {
    chart.data.labels = newLabels;
    chart.data.datasets[0].data = newData;
    chart.update();
  }
  
  export function renderTotalExpenses(totalExpenses) {
    const expensesTotalElement = document.getElementById("expensesTotal");
    expensesTotalElement.innerText = "S/. " + totalExpenses.toFixed(2);
  }
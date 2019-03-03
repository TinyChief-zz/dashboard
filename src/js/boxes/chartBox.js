import { Block } from '../block.js'
import Chart from 'chart.js'
import { mockData } from './mock/chart-mock'

export default function (params) {
  const block = new Block(params)
  block.container.children[1].innerHTML += "<canvas id='myChart' height='150px'/>"
  const ctx = block.container.children[1].children[0]
  const chart = initChart(ctx)
  let i = 24
  setInterval(() => {
    updateChart(chart, mockData, i++)
  }, 2000)

  return block
}

function updateChart (chart, data, i) {
  chart.data.labels.push(data.hours[i])
  chart.data.labels.shift()

  chart.data.datasets[0].data.push(data.values[i])
  chart.data.datasets[0].data.shift()
  chart.update()
}

function initChart (ctx) {
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: mockData.hours.slice(0, 24),
      datasets: [
        {
          label: '# of Votes',
          data: mockData.values.slice(0, 24),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  })

  return myChart
}

import { Block } from '../block.js'

export default function (params) {
  const block = new Block(params)

  initChart(block.container.children[1])

  return block
}

function initChart (target) {
  const xValues = Array.from({ length: 24 }, (v, k) => k)
  const yValues = xValues.map(el => {
    return direction()
      ? 40 - round(Math.random() * 10)
      : 40 + round(Math.random() * 10)
  })
  const trace1 = {
    x: xValues,
    y: yValues,
    fill: 'tozeroy',
    type: 'line',
    line: { shape: 'spline' }
  }
  let data = [trace1]

  const layout = {
    showlegend: false,
    height: 200,
    margin: {
      l: 40,
      r: 20,
      b: 40,
      t: 20,
      pad: 4
    },
    dragmode: 'pan',
    selectdirection: 'h',
    autorange: true,
    xaxis: {
      title: 'Time, hours',
      zeroline: false,
      tickvals: xValues
    },
    yaxis: {
      title: 'Users',
      showline: false
    }
  }

  const options = {
    responsive: true
  }

  /* eslint-disable */
  Plotly.react(target, data, layout, options)
  // Plotly.purge(target)
  /* eslint-enable */
  // let step = 0
  // setInterval(() => {
  //   yValues.push(direction()
  //     ? 40 - round(Math.random() * 10)
  //     : 40 + round(Math.random() * 10))
  //   xValues.push((xValues[xValues.length - 1] + 1) % 24)

  //   Plotly.react(target, [
  //     {
  //       ...trace1,
  //       x: xValues.slice(step, step + 24),
  //       y: yValues.slice(step, step + 24)
  //     }
  //   ], layout, options)

  //   step++
  // }, 2000)
}

function round (val) {
  return Math.round(val)
}

function direction () {
  return round(Math.random()) === 0
}

function newValue () {
  return direction()
    ? 40 - round(Math.random() * 10)
    : 40 + round(Math.random() * 10)
}

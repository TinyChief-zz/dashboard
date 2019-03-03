function generateMockData () {
  const now = new Date()
  now.setHours(now.getHours() - 24)
  const data = {
    hours: [],
    values: []
  }
  for (let i = 0; i < 100; i++) {
    now.setHours(now.getHours() + 1)
    data.hours.push(now.getHours())
    data.values.push(getRandomValue(0, 100))
  }
  return data
}

function getRandomValue (s, f) {
  return Math.round(Math.random() * (f - s) - s)
}

export const mockData = generateMockData()

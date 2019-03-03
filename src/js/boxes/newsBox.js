import { Block } from '../block.js'

const agencyIcons = {
  'Lenta': 'lenta',
  'Www.mk.ru': 'mk',
  'Ria.ru': 'ria',
  'Rsport.ria.ru': 'ria',
  'RBC': 'rbk',
  'Vesti.ru': 'vesti',
  'Itar': 'itar',
  'Rt': 'rt2',
  'Izvestiya': 'izvestiya',
  'Regnum': 'regnum',
  'Gazeta.ru': 'gazetaru',
  'Interfaks.ru': 'interfaks',
  'Rg.ru': 'rgru2',
  'Www.aif.ru': 'aif',
  'Championat.com': 'championat',
  'Kommersant.ru': 'kommersant',
  'Sport-express.ru': 'sportexpress'
}

export default function (params) {
  const block = new Block(params)
  const inner = block.container.children[1]

  getNews().then(data => {
    const newsList = document.createElement('ul')
    data.articles.forEach(item => {
      const listItem = document.createElement('li')
      const iconURL = `https://yastatic.net/s3/home/news/desktop/multicolor/${agencyIcons[item.source.name]}.svg`
      console.log(item.source)
      listItem.innerHTML = `
        <a href=${item.url} target="_blank">
          <div class="agency" style="background-image: url(${iconURL})"></div>
          <p>
            ${item.title}
          </p>
        </a>
      `

      newsList.appendChild(listItem)
    })

    inner.appendChild(newsList)
  })

  return block
}

async function getNews () {
  const url = 'https://newsapi.org/v2/top-headlines?' +
  'country=ru&' +
  'pageSize=5&' +
  'apiKey=b88a27ab31564a88b703bd6f5f37960c'

  const res = await window.fetch(url)
  const data = await res.json()

  return data
}

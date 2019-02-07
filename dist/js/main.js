import { Block } from './block.js'
import chartBox from './boxes/chartBox.js'
import mapBox from './boxes/mapBox.js'
import messagesBox from './boxes/messagesBox.js'
import notesBox from './boxes/notesBox.js'
import newsBox from './boxes/newsBox.js'
import chatBox from './boxes/chatBox.js'

const blocks = ['chart', 'map', 'messages', 'notes', 'news', 'chat']

let lastActive = null

// const chartBox = new Block({ target: 'chart', name: 'Chart' })
// const mapBox = new Block({ target: 'map', name: 'Map' })
// const messagesBox = new Block({ target: 'messages', name: 'Messages' })
// const notesBox = new Block({ target: 'notes', name: 'Notes' })
// const newsBox = new Block({ target: 'news', name: 'News' })
// const chatBox = new Block({ target: 'chat', name: 'Chat' })

const boxes = [
  chartBox({ target: 'chart', name: 'Chart' }),
  mapBox({ target: 'map', name: 'Map' }),
  messagesBox({ target: 'messages', name: 'Messages' }),
  notesBox({ target: 'notes', name: 'Notes' }),
  newsBox({ target: 'news', name: 'News' }),
  chatBox({ target: 'chat', name: 'Chat' })
]

boxes.forEach(box => {
  box.container.addEventListener('click', function (e) {
    console.log(lastActive)
    if (lastActive) {
      lastActive.classList.remove('active')
    }
    lastActive = this
    this.classList.add('active')
  })
})

Block.prototype.hello = () => console.log('hello')

console.log(Block)

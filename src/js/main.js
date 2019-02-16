import chartBox from './boxes/chartBox.js'
import mapBox from './boxes/mapBox.js'
import messagesBox from './boxes/messagesBox.js'
import notesBox from './boxes/notesBox.js'
import newsBox from './boxes/newsBox.js'
import chatBox from './boxes/chatBox.js'

export function bootstrap () {
  const blocks = ['chart', 'map', 'messages', 'notes', 'news', 'chat']

  let lastActive = null

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
      if (lastActive) {
        lastActive.classList.remove('active')
      }
      lastActive = this
      this.classList.add('active')
    })
  })
}

import { Block } from '../block.js'

export default function (params) {
  const block = new Block(params)
  const inner = block.container.children[1]
  const list = document.createElement('ul')

  const inputWrapper = document.createElement('div')
  inputWrapper.className = 'input-wrapper'

  const input = document.createElement('input')
  const button = document.createElement('button')
  button.innerHTML = 'Add'

  inputWrapper.appendChild(input)
  inputWrapper.appendChild(button)
  inner.appendChild(inputWrapper)

  const notes = [
    {
      text: 'Hello World!',
      created: '2019/05/15',
      tags: ['important', 'feature'],
      done: true
    },
    {
      text: 'Delete DB',
      created: '2019/05/15',
      tags: ['response', `don't miss`],
      done: false
    },
    {
      text: 'Hello World!',
      created: '2019/05/15',
      tags: ['important', 'feature'],
      done: false
    },
    {
      text: 'Delete DB',
      created: '2019/05/15',
      tags: ['response', `don't miss`],
      done: true
    },
    {
      text: 'Hello World!',
      created: '2019/05/15',
      tags: ['important', 'feature'],
      done: true
    },
    {
      text: 'Delete DB',
      created: '2019/05/15',
      tags: ['response', `don't miss`],
      done: false
    }
  ]

  function addToNotesList (item) {
    const listItem = document.createElement('li')

    if (item.done) { listItem.className = 'done' }

    listItem.innerHTML = `
        <h3>
          ${item.text}
          <span>${item.created}</span>
        </h3>
        <p>${item.tags.map(el => `#${el}`).join(' ')}</p>
      `

    listItem.addEventListener('click', function () {
      this.classList.toggle('done')
    })

    list.appendChild(listItem)
  }

  notes.forEach(addToNotesList)
  inner.insertBefore(list, inputWrapper)

  button.addEventListener('click', function () {
    let noteText = input.value
    if (!noteText) {
      console.log('Enter some note!')
      return
    }
    const newNoteItem = {
      text: noteText,
      created: new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/'),
      tags: ['devops', 'hosting']
    }

    addToNotesList(newNoteItem)
    input.value = ''
  })

  return block
}

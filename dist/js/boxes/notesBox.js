import { Block } from '../block.js'

export default function (params) {
  const block = new Block(params)
  const inner = block.container.children[1]

  const list = document.createElement('ul')
  const inputWrapper = document.createElement('div')
  inputWrapper.className = 'input-wrapper'
  inputWrapper.innerHTML = `
    <input type="text" />
    <button>Add</button>
  `
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
  notes.forEach(item => {
    const listItem = document.createElement('li')
    if (item.done) { listItem.className = 'done' }
    listItem.innerHTML = `
      <h3>
        ${item.text}
        <span>${item.created}</span>
      </h3>
      <p>${item.tags.map(el => `#${el}`).join(' ')}</p>
    `
    list.appendChild(listItem)
  })
  inner.insertBefore(list, inputWrapper)
  console.dir(inner)
  return block
}

export class Block {
  constructor ({ target, name, last }) {
    // this.container = document.querySelector(`#${target}`)
    this.container = this._initDOM(target, name, last)
    this.name = name
    console.log(`${name} block has been initialized`)
  }

  _initDOM (target, name, lastActive) {
    const container = document.querySelector(`#${target}`)
    if (!container) {
      console.log(`No element with id ${target}`)
      return
    }
    container.innerHTML += `
      <h1>${name}</h1>
      <div id="${target}-inner"></div>
    `
    return container
  }
}

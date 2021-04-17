"use strict";
document.addEventListener('DOMContentLoaded', () => {

  class DomElement {
    constructor(selector, height, width, bg, fontSize) {
      this.selector = selector;
      this.height = height;
      this.width = width;
      this.bg = bg;
      this.fontSize = fontSize;
    }
    createNewElement() {
      if (this.selector[0] === '.') {
        let newElem = document.createElement("div");
        newElem.innerHTML = `<p>Hello World!!!<p/>`;
        document.body.append(newElem);
        newElem.setAttribute('class', `${this.selector.slice(1)}`);
        newElem.style.cssText = `height: ${this.height}px; width: ${this.width}px; background-color: ${this.bg};
        font-size: ${this.fontSize}px`;
      }
      if (this.selector[0] === '#') {
        let newElem = document.createElement("p");
        newElem.innerHTML = `<span>Hello World!!!<span>`;
        document.body.append(newElem);
        newElem.setAttribute('id', `${this.selector.slice(1)}`);
        newElem.style.cssText = `height: ${this.height}px; width: ${this.width}px; background-color: ${this.bg};
      font-size: ${this.fontSize}px`;
      }
    }
  }

  let domElement = new DomElement('.select', '100', '100', 'red', '25');
  //let domElement1 = new DomElement('#dsfk', '150', '150','blue','25');
  domElement.createNewElement();
  //domElement1.createNewElement();

  let select = document.querySelector('.select');
  select.style.position = 'absolute';

  let top = 0,
    right = 0,
    left = 0,
    bottom = 0;
  document.addEventListener('keydown', (event) => {
    event.preventDefault()

    if (event.code === 'ArrowDown') {
      top += 10;
    }
    if (event.code === 'ArrowLeft') {
      right = right + 10;
    }
    if (event.code === 'ArrowRight') {
      left = left + 10;
    }
    if (event.code === 'ArrowUp') {
      bottom = bottom + 10;
    }
    select.style.top = top + 'px';
    select.style.right = right + 'px';
    select.style.left = left + 'px';
    select.style.bottom = bottom + 'px';
  });
})
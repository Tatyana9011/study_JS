"use strict";

const DomElement = function (selector,  height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.createNewElement = function () {
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
};

let domElement = new DomElement('.select', '50', '200','red','25');
console.log('domElement: ', domElement);
domElement.createNewElement();
class addToDo {
  constructor(element) {
    this.node = document.createElement('div');
    this.node.setAttribute('id', 'addnew');
    element.appendChild(this.node);
  }
}

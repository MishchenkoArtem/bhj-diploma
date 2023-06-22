class Modal {
  constructor(element){
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.button = this.element.querySelectorAll(`[data-dismiss="modal"]`);

    this.button.forEach(element => {
      element.addEventListener('click', (event) => {
        this.onClose(event);
      });
    });
  }

  onClose(event) {
    event.preventDefault();
    this.close();
  }
  
  open() {
    this.element.style.display = 'block';
  }

  close() {
    this.element.style = 'display: none';
  }
}
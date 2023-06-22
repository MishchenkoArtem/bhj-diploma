// --- Класс AsyncForm управляет всеми формами приложения, которые не должны быть отправлены с перезагрузкой страницы. Вместо этого данные с таких форм собираются и передаются в метод onSubmit для последующей обработки

class AsyncForm {
  // --- Если переданный элемент не существует, необходимо выкинуть ошибку. Сохраняет переданный элемент и регистрирует события через registerEvents()
  
  constructor(element) {
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();

      this.submit();
    });
  }

  getData() {
    const formData = new FormData(this.element);
    return formData;
  }

  onSubmit(options) {
    
  }

  submit() {
    this.onSubmit(this.getData());
  }
}
// --- Класс TransactionsWidget отвечает за открытие всплывающих окон для создания нового дохода или расхода

class TransactionsWidget {
  // --- Устанавливает полученный элемент в свойство element. Если переданный элемент не существует, необходимо выкинуть ошибку.
  
  constructor(element) {
    try {
      this.element = element;
      this.registerEvents();
    } catch (error) {
      console.log(error);
    }
  }
  // --- Регистрирует обработчики нажатия на кнопки «Новый доход» и «Новый расход». При нажатии вызывает Modal.open() одля экземпляра кна

  registerEvents() {
    const incomeButton = this.element.querySelector('.create-income-button');
    const expenseButton = this.element.querySelector('.create-expense-button');

    incomeButton.addEventListener('click', event => {
      event.preventDefault();
      App.getModal('newIncome').open();
    });

    expenseButton.addEventListener('click', event => {
      event.preventDefault();
      App.getModal('newExpense').open();
    });
  }
}

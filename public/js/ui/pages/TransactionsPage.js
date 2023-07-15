// --- Класс TransactionsPage управляет страницей отображения доходов и расходов конкретного счёта

class TransactionsPage {
  // --- Если переданный элемент не существует, необходимо выкинуть ошибку. Сохраняет переданный элемент и регистрирует события через registerEvents()

  constructor(element) {
    try {
      this.element = element;
      this.registerEvents();
    } catch (error) {
      console.log(error);
    }
  }

  // --- Вызывает метод render для отрисовки страницы

  update() {
    this.render(this.lastOptions);
  }

  // --- Отслеживает нажатие на кнопку удаления транзакции и удаления самого счёта. Внутри обработчика пользуйтесь методами TransactionsPage.removeTransaction и TransactionsPage.removeAccount соответственно

  registerEvents() {
    this.element.addEventListener('click', event => {
      event.preventDefault();

      const removeAccount = event.target.closest('.remove-account');
      const transactionRemove = event.target.closest('.transaction__remove');

      if (removeAccount) {
        this.removeAccount();
      }

      if (transactionRemove) {
        const transactionId = transactionRemove.dataset.id;
        this.removeTransaction(transactionId);
      }

    });
  }

  // --- Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm()) Если пользователь согласен удалить счёт, вызовите Account.remove, а также TransactionsPage.clear с пустыми данными для того, чтобы очистить страницу. По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(), либо обновляйте только виджет со счетами и формы создания дохода и расхода для обновления приложения

  removeAccount() {
    if (this.lastOptions) {
      if (confirm('Вы действительно хотите удалить счёт?')) {
        let formData = new FormData();
        formData.append('id', this.lastOptions.account_id);

        Account.remove(formData, (error, response) => {
          if (response.success) {
            App.update();
            App.updateWidgets();
            App.updateForms();
          }
        });

        this.clear();
      }
    }
  }

  // --- Удаляет транзакцию (доход или расход). Требует подтверждеия действия (с помощью confirm()). По удалению транзакции вызовите метод App.update(), либо обновляйте текущую страницу (метод update) и виджет со счетами

  removeTransaction(id) {
    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove(id, {}, (error, response) => {
        if (response && response.success) {
          App.update();
        }
      });
    }
  }

  // --- С помощью Account.get() получает название счёта и отображает его через TransactionsPage.renderTitle. Получает список Transaction.list и полученные данные передаёт в TransactionsPage.renderTransactions()

  render(options) {
    if (options) {
      Account.get(options.account_id, (error, response) => {
        this.renderTitle(response);
      });

      Transaction.list(options.account_id, (error, response) => {
        if (response.success) {
          console.log(response.data);
          this.renderTransactions(response.data);
        }
      });
    }
  }

  // --- Очищает страницу. Вызывает TransactionsPage.renderTransactions() с пустым массивом. Устанавливает заголовок: «Название счёта»

  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  // --- Устанавливает заголовок в элемент .content-title

  renderTitle(name) {
    const elementTitle = this.element.querySelector('.content-title');
    elementTitle.textContent = name;
  }

  // --- Форматирует дату в формате 2019-03-10 03:20:41 (строка) в формат «10 марта 2019 г. в 03:20»

  formatDate(date) {
    const data = new Date(date);
    const format = new Intl.DateTimeFormat('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const time = data.toLocaleTimeString('ru', {
      hour: 'numeric',
      minute: 'numeric'
    });

    return `${format.format(data)} в ${time}`;
  }

  // --- Формирует HTML-код транзакции (дохода или расхода). item - объект с информацией о транзакции

  getTransactionHTML(item) {
    return `<div class='transaction transaction_${item.type.toLowerCase()} row'>
              <div class='col-md-7 transaction__details'>
                <div class='transaction__icon'>
                  <span class='fa fa-money fa-2x'></span>
                </div>
                  <div class='transaction__info'>
                  <h4 class='transaction__title'>${item.name}</h4>           
                  <div class='transaction__date'>${this.formatDate(item.created_at)}</div>
                </div>
              </div>
              <div class='col-md-3'>
                <div class='transaction__summ'>      
                  ${item.sum}<span class='currency'>₽</span>
                </div>
              </div>
              <div class='col-md-2 transaction__controls'>        
                <button class='btn btn-danger transaction__remove' data-id=${item.id}>
                  <i class='fa fa-trash'></i>  
                </button>
              </div>
            </div>`;
  }

  // --- Отрисовывает список транзакций на странице используя getTransactionHTML

  renderTransactions(data) {
    const content = document.querySelector('.content');
    content.innerHTML = '';
    
    const arr = Array.from(data);
    arr.forEach(item => {
      this.element.querySelector('.content').insertAdjacentHTML('beforeend', this.getTransactionHTML(item));
    });
  }
}
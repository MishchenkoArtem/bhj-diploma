// --- Класс AccountsWidget управляет блоком отображения счетов в боковой колонке

class AccountsWidget {
  // --- Устанавливает текущий элемент в свойство element Регистрирует обработчики событий с помощью AccountsWidget.registerEvents() Вызывает AccountsWidget.update() для получения списка счетов и последующего отображения Если переданный элемент не существует, необходимо выкинуть ошибку.
  
  constructor(element) {
    try {
      this.element = element;
      this.registerEvents();
      this.update();
    } catch (error) {
      console.log(error);
    }
  }

  // --- При нажатии на .create-account открывает окно #modal-new-account для создания нового счёта При нажатии на один из существующих счетов (которые отображены в боковой колонке), вызывает AccountsWidget.onSelectAccount()
  
  registerEvents() {
    document.querySelector('.create-account').addEventListener('click', (event) => {
      event.preventDefault();
      
      App.getModal('createAccount').open();
    });
    
    document.querySelector('.accounts-panel').addEventListener('click', (event) => {
      event.preventDefault();

      let item = event.target.closest('.account');

      if (item) {
        this.onSelectAccount(item);
      }
    });
  }

  // --- Метод доступен только авторизованным пользователям (User.current()). Если пользователь авторизован, необходимо получить список счетов через Account.list(). При успешном ответе необходимо очистить список ранее отображённых счетов через AccountsWidget.clear(). Отображает список полученных счетов с помощью метода renderItem()
  
  update() {
    const user = User.current()
    if (user) {
      Account.list(user, (error, response) => {
        if (response.success) {
          this.clear();
          this.renderItem(response.data);
        }
      });
    }
  }

  // --- Очищает список ранее отображённых счетов. Для этого необходимо удалять все элементы .account в боковой колонке
  
  clear() {
    const account = document.querySelectorAll('.account');
    account.forEach(item => {
      item.remove();
    });
  }

  // --- Срабатывает в момент выбора счёта Устанавливает текущему выбранному элементу счёта класс .active. Удаляет ранее выбранному элементу счёта класс .active. Вызывает App.showPage( 'transactions', { account_id: id_счёта });
  
  onSelectAccount(element) {
    this.element.querySelectorAll('.active').forEach(item => {
      item.classList.remove('active');
    });

    element.classList.add('active');

    App.showPage('transactions', { account_id: element.dataset.id });
  }

  // --- Возвращает HTML-код счёта для последующего отображения в боковой колонке. item - объект с данными о счёте

  getAccountHTML(item) {
    const account = document.createElement('li');
    account.classList.add('account');
    account.dataset.id = item.id

    const link = document.createElement('a');
    link.href = '#';

    const span1 = document.createElement('span');
    span1.textContent = item.name;
    const span2 = document.createElement('span');
    span2.textContent = ` / ${item.sum} р`;

    link.append(span1);
    link.append(span2);
    account.append(link);

    return account;
  }

  // --- Получает массив с информацией о счетах. Отображает полученный с помощью метода AccountsWidget.getAccountHTML HTML-код элемента и добавляет его внутрь элемента виджета

  renderItem(data) {
    data.forEach(element => {
      this.element.append(this.getAccountHTML(element));
    });
  }
}

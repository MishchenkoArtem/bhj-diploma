class Entity {
  static url = '';

  // --- Запрашивает с сервера список данных. Это могут быть счета или доходы/расходы (в зависимости от того, что наследуется от Entity)
  
  static list(data, callback) {
    createRequest({
      method: 'GET',
      url: '',
      data: data,
      callback: callback
    });
  }

  // --- Создаёт счёт или доход/расход с помощью запроса на сервер. (в зависимости от того, что наследуется от Entity)

  static create(data, callback) {
    createRequest({
      method: 'PUT',
      url: '',
      data: data,
      callback: callback
    });
  }

  // --- Удаляет информацию о счёте или доходе/расходе (в зависимости от того, что наследуется от Entity)

  static remove(data, callback ) {
    createRequest({
      method: 'DELETE',
      url: '',
      data: data,
      callback: callback
    });
  }
}

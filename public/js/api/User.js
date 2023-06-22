// --- Класс User управляет авторизацией, выходом и регистрацией пользователя из приложения Имеет свойство URL, равное '/user'.

class User {

  static url = '/user';
  
  static setCurrent(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  static unsetCurrent() {
    localStorage.removeItem('currentUser');
  }

  static current() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  // --- Получает информацию о текущем авторизованном пользователе. 
  
  static fetch(callback) {
    createRequest({
      url: this.url + '/current',
      method: 'GET',
      responseType: 'json',
      callback: (error, response) => {
        if (response.success) {
          this.setCurrent(response.user);
        }
        if (response.success === false) {
          this.unsetCurrent();
        }
        
        callback(error, response);
      }
    });
  }

  // --- Производит попытку авторизации. После успешной авторизации необходимо сохранить пользователя через метод User.setCurrent.
  
  static login(data, callback) {
    createRequest({
      url: this.url + '/login',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback: callback
    });
  }

  // --- Производит попытку регистрации пользователя. После успешной авторизации необходимо сохранить пользователя через метод User.setCurrent.

  static register(data, callback) {
    createRequest({
      method: 'POST',
      url: this.url + '/register',
      data: data,
      callback: callback
    });
  }

  // --- Производит выход из приложения. После успешного выхода необходимо вызвать метод User.unsetCurrent

  static logout(callback) {
    createRequest({
      method: 'POST',
      url: this.url + '/logout',
      callback: callback
    });
  }
}

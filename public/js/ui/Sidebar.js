class Sidebar {
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const bodySidebar = document.querySelector('.sidebar-mini');
    const sidebar = document.querySelector('.sidebar-toggle');

    sidebar.addEventListener('click', () => {
      bodySidebar.classList.toggle('sidebar-open');
      bodySidebar.classList.toggle('sidebar-collapse');
    });
  }

  static initAuthLinks() {
    const register = document.querySelector('.menu-item_register');
    const login = document.querySelector('.menu-item_login');
    const logout = document.querySelector('.menu-item_logout');
    
    register.addEventListener('click', (event) => {
      event.preventDefault();

      const modal = App.getModal('register');
      modal.open();
    });

    login.addEventListener('click', (event) => {
      event.preventDefault();

      const modal = App.getModal('login');
      modal.open();
    });

    logout.addEventListener('click', (event) => {
      event.preventDefault();

      User.logout((error, response) => {
        if (response.success) {
          User.unsetCurrent();
        } else {
          console.log(error);
        }
      });

      App.setState();
    });
  }
}
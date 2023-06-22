class RegisterForm extends AsyncForm {
  onSubmit(data) {
    User.register(data, (error, response) => {
      if (response && response.user) {
        User.setCurrent(response.user);
      }
      if (response.success === false) {
        console.log('User not found');
      } else {
        console.log(error);
      }

      if (response.success) {
        this.element.reset();
        App.setState('user-logged');

        const modalId = this.element.closest('.modal').dataset.modalId;
        App.getModal(modalId).close();
      }
    });
  }
}
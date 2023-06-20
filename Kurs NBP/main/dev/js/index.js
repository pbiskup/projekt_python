
import Form from './form'

document.addEventListener('DOMContentLoaded', () => {
  

if (document.querySelector('.js-login-area') != null) {
  const form = new Form()
  form.init()
}

})

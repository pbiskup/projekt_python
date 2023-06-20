class Form {
  constructor() {
    this.DOM = {
      formLogin: document.querySelector('.js-form-login'),
      formRegister: document.querySelector('.js-form-register'),
      formStatus: document.querySelector('.js-form-status'),
      password: document.querySelector('#passwd'),
      confirmPassword: document.querySelector('#second_passwd'),
    }
  }

  init() {
    this.formActions()
    this.validate()
  }

  formActions() {
    this.DOM.formLogin.addEventListener('submit', (e) => {
      e.preventDefault()
      this.sendForm(this.DOM.formLogin)
    })
    this.DOM.formRegister.addEventListener('submit', (e) => {
      e.preventDefault()
      this.sendForm(this.DOM.formRegister)
    })
  }

  // eslint-disable-next-line class-methods-use-this
  changeTabs(target) {
    document
      .querySelectorAll('[aria-selected="true"]')
      .forEach((t) => t.setAttribute('aria-selected', false))

    target.setAttribute('aria-selected', true)
    document
      .querySelectorAll('[role="tabpanel"]')
      .forEach((p) => p.setAttribute('hidden', true))

    document
      .querySelector(`#${target.getAttribute('aria-controls')}`)
      .removeAttribute('hidden')
  }

  validate() {
    const validatePassword = () => {
      if (this.DOM.password?.value !== this.DOM.confirmPassword?.value) {
        this.DOM.confirmPassword.setCustomValidity('Hasła nie są indentyczne')
      } else {
        this.DOM.confirmPassword.setCustomValidity('')
      }
    }

    this.DOM.password.addEventListener('change', validatePassword)
    this.DOM.confirmPassword.addEventListener('keyup', validatePassword)
  }

  sendForm(form) {
    const formData = new FormData(form)

    fetch(form.getAttribute('data-url'), {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
        csrf_token: formData.get('csrf_token'),
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        this.DOM.formStatus
          .querySelector(`.${resp.status}`)
          .classList.add('visible')
        // form.reset()
        if (resp.status === 'ok') {
          // eslint-disable-next-line no-restricted-globals
          location.reload()
        }
        if (resp.status === 'ok_register') {
          this.changeTabs(document.querySelector('#tab-1'))
        }
      })

      .then(() => {
        setTimeout(() => {
          this.DOM.formStatus
            .querySelector('.visible')
            .classList.remove('visible')
        }, 2000)
      })

      .catch((error) => console.log(error))
  }
}

export default Form

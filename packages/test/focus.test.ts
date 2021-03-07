import { setFocusToFirstItem, useFocusTrap, useRestoreFocus } from '../focus'

describe('focus.ts test', () => {
  beforeAll(() => {
    // mock offsetHeight and offsetWith so they are considered visible during test
    Object.defineProperties(window.HTMLElement.prototype, {
      offsetHeight: {
        get() {
          return 10
        },
      },
      offsetWidth: {
        get() {
          return 10
        },
      },
    })
  })

  describe('set focus to first item', () => {
    test('child with autofocus attribute will be focused if exists', () => {
      document.body.innerHTML = `
      <div id="container">
        <input type="text" id="name">
        <input type="text" id="gender" autofocus>
      </div>
    `
      const container = document.querySelector('#container')
      const shouldAutoFocusItem = document.querySelector('#gender')
      const spy = jest.spyOn(shouldAutoFocusItem as HTMLElement, 'focus')
      setFocusToFirstItem(container)
      expect(spy).toHaveBeenCalled()
    })

    test('first focusable will be focused when not child with autofocus attribute', () => {
      document.body.innerHTML = `
      <div id="container">
        <input type="text" id="name">
        <input type="text" id="gender">
      </div>
    `
      const container = document.querySelector('#container')
      const shouldAutoFocusItem = document.querySelector('#name')
      const spy = jest.spyOn(shouldAutoFocusItem as HTMLElement, 'focus')
      setFocusToFirstItem(container)
      expect(spy).toHaveBeenCalled()
    })
  })

  test('trap focus within container', () => {
    document.body.innerHTML = `
      <div id="container">
        <input type="text" id="name">
        <input type="text" id="gender">
      </div>
    `
    const container = document.querySelector('#container')
    const nameInput = document.querySelector('#name') as HTMLElement
    const genderInput = document.querySelector('#gender') as HTMLElement
    const spyNameInput = jest.spyOn(nameInput, 'focus')
    const event = new KeyboardEvent('keydown', { key: 'Tab' })
    const focusTrap = useFocusTrap()
    focusTrap.on(container)
    genderInput.focus()
    document.dispatchEvent(event)
    // tab event in jsDom does not change active element:  https://github.com/jsdom/jsdom/issues/2102
    // assert focus moved from last to first element
    expect(spyNameInput).toHaveBeenCalledTimes(1)
  })

  test('trap focus is disposable', () => {
    document.body.innerHTML = `
      <div id="container">
        <input type="text" id="name">
        <input type="text" id="gender">
      </div>
    `
    const container = document.querySelector('#container')
    const nameInput = document.querySelector('#name') as HTMLElement
    const genderInput = document.querySelector('#gender') as HTMLElement
    const spyNameInput = jest.spyOn(nameInput, 'focus')
    const event = new KeyboardEvent('keydown', { key: 'Tab' })
    const focusTrap = useFocusTrap()
    focusTrap.on(container)
    genderInput.focus()
    focusTrap.dispose()
    document.dispatchEvent(event)
    expect(spyNameInput).not.toHaveBeenCalled()
  })

  test('restore focus', () => {
    document.body.innerHTML = `
      <input type="text" id="focus1">
      <input type="text" id="focus2">
  `
    const focus1 = document.querySelector('#focus1') as HTMLElement
    const spyFocus1 = jest.spyOn(focus1, 'focus')
    focus1.focus()
    const restoreFocus = useRestoreFocus()
    const focus2 = document.querySelector('#focus2') as HTMLElement
    focus2.focus()
    restoreFocus()
    expect(spyFocus1).toHaveBeenCalledTimes(2)
  })
})

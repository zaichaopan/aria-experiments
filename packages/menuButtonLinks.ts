import { EVENT_KEY } from './keyboard'
import useClickOutside, { clickOutside } from './useClickOutside'
import { randomString } from './string'
import { findNextSibiling, findPreviousSibiling, useFindItemMatchingChar, findItemMatchingChar } from './dom'

export default class MenuButtonLinks {
  protected button: HTMLElement
  protected menu: HTMLElement
  protected findMatchingItem: findItemMatchingChar
  protected clickOutside: clickOutside

  constructor({
    button,
    menu
  }: {
    button: HTMLElement | null,
    menu: HTMLElement | null
  }) {

    if (!button || !menu) {
      throw new Error("Menu or button is missing!")
    }

    this.button = button
    this.menu = menu
    this.setupAriaAttribute()
    this.setupMenuItems()
    this.registerbuttonEvents()
    this.findMatchingItem = useFindItemMatchingChar()
    this.clickOutside = useClickOutside()
  }

  setupAriaAttribute() {
    if (!this.button.id) {
      this.button.id = randomString()
    }

    if (!this.menu.id) {
      this.menu.id = randomString()
    }

    if (!this.button.hasAttribute('aria-haspopup')) {
      this.button.setAttribute('aria-haspopup', 'true')
    }

    if (this.button.getAttribute('aria-controls') !== this.menu.id) {
      this.button.setAttribute('aria-controls', this.menu.id)
    }

    if (this.menu.getAttribute('aria-labelledby') !== this.button.id) {
      this.menu.setAttribute('aria-labelledby', this.button.id)
    }

    Array.from(this.menu.querySelectorAll('[disabled="true"]')).forEach(item => {
      item.setAttribute('aria-disabled', 'true')
    })
  }

  setupMenuItems() {
    Array.from(this.getAllAvailableMenuitems()).forEach(node => {
      const menuitem = node as HTMLElement
      menuitem.tabIndex = -1
      menuitem.addEventListener('keydown', this.onMenuitemKeydown.bind(this))
      menuitem.addEventListener('mouseover', this.onMenuitemMouseover.bind(this))
    })
  }

  registerbuttonEvents() {
    this.button?.addEventListener('keydown', this.onButtonKeydown.bind(this))
    this.button?.addEventListener('click', this.onButtonClick.bind(this))
  }

  setFocusToMenuitem(newMenuitem: HTMLElement | null) {
    this.getAllAvailableMenuitems().forEach(function (item) {
      if (item === newMenuitem) {
        item.tabIndex = 0
        newMenuitem.focus()
      } else {
        item.tabIndex = -1
      }
    })
  }

  setFocusToFirstMenuitem() {
    const firstMenuitem = this.getAllAvailableMenuitems()[0]
    this.setFocusToMenuitem(firstMenuitem)
  }

  setFocusToLastMenuitem() {
    const allMenuitems = this.getAllAvailableMenuitems()
    this.setFocusToMenuitem(allMenuitems[allMenuitems.length - 1])
  }

  setFocusToPreviousMenuitem(currentMenuitem: HTMLElement) {
    const allMenuitems = this.getAllAvailableMenuitems()
    const newMenuitem = findPreviousSibiling(allMenuitems, currentMenuitem)
    this.setFocusToMenuitem(newMenuitem)
  }

  setFocusToNextMenuitem(currentMenuitem: HTMLElement) {
    const allMenuitems = this.getAllAvailableMenuitems()
    const newMenuitem = findNextSibiling(allMenuitems, currentMenuitem)
    this.setFocusToMenuitem(newMenuitem)
  }

  setFocusByFirstCharacter(currentMenuitem: HTMLElement, char: string) {
    const allMenuitems = this.getAllAvailableMenuitems()
    const matchingItem = this.findMatchingItem(allMenuitems, currentMenuitem, char)
    this.setFocusToMenuitem(matchingItem)
  }

  getAllAvailableMenuitems(): HTMLElement[] {
    return Array.from(this.menu.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"]')).map(menuitem => {
      return menuitem as HTMLElement
    })
  }

  openPopup() {
    if (this.menu && this.button) {
      this.menu.style.display = 'block'
      this.button.setAttribute('aria-expanded', 'true')
      this.clickOutside.on(this.button.parentElement, this.closePopup.bind(this))
    }
  }

  closePopup() {
    if (this.isOpen()) {
      if (this.menu && this.button) {
        this.button.removeAttribute('aria-expanded')
        this.menu.style.display = 'none'
        this.clickOutside.dispose()
      }
    }
  }

  isOpen() {
    return this.button?.getAttribute('aria-expanded') === 'true'
  }

  onButtonKeydown(event: KeyboardEvent) {
    const key = event.key
    let flag = false


    switch (key) {
      case EVENT_KEY.SPACE:
      case EVENT_KEY.RETURN:
      case EVENT_KEY.ARROW_DOWN:
      case EVENT_KEY.DOWN:
        this.openPopup()
        this.setFocusToFirstMenuitem()
        flag = true
        break
      case EVENT_KEY.ESC:
      case EVENT_KEY.ESCAPE:
        this.closePopup()
        this.button?.focus()
        flag = true
        break
      case EVENT_KEY.UP:
      case EVENT_KEY.ARROW_UP:
        this.openPopup()
        this.setFocusToLastMenuitem()
        flag = true
        break
      default:
        break
    }

    if (flag) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  onButtonClick(event: MouseEvent) {
    if (this.isOpen()) {
      this.closePopup()
      this.button?.focus()
    } else {
      this.openPopup()
      this.setFocusToFirstMenuitem()
    }

    event.stopPropagation()
    event.preventDefault()
  }

  onMenuitemKeydown(event: KeyboardEvent) {
    const tgt = <HTMLElement>event.currentTarget
    const key = event.key
    let flag = false

    function isPrintableCharacter(str: string) {
      return str.length === 1 && str.match(/\S/)
    }

    if (event.ctrlKey || event.altKey || event.metaKey) {
      return
    }

    switch (key) {
      case EVENT_KEY.SPACE:
        this.closePopup()
        if ((<HTMLAnchorElement>tgt)?.href) {
          window.location.href = (<HTMLAnchorElement>tgt)?.href
        }
        break
      case EVENT_KEY.ESC:
      case EVENT_KEY.ESCAPE:
        this.closePopup()
        this.button?.focus()
        flag = true
        break
      case EVENT_KEY.UP:
      case EVENT_KEY.ARROW_UP:
        this.setFocusToPreviousMenuitem(tgt)
        flag = true
        break
      case EVENT_KEY.DOWN:
      case EVENT_KEY.ARROW_DOWN:
        this.setFocusToNextMenuitem(tgt)
        flag = true
        break
      case EVENT_KEY.HOME:
      case EVENT_KEY.PAGE_UP:
        this.setFocusToFirstMenuitem()
        flag = true
        break
      case EVENT_KEY.END:
      case EVENT_KEY.PAGE_DOWN:
        this.setFocusToLastMenuitem()
        flag = true
        break
      case EVENT_KEY.TAB:
        this.closePopup()
        break
      default:
        if (isPrintableCharacter(key)) {
          this.setFocusByFirstCharacter(tgt, key)
          flag = true
        }
        break
    }

    if (flag) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  onMenuitemMouseover(event: MouseEvent) {
    const tgt = <HTMLElement>event.currentTarget
    tgt?.focus()
  }
}

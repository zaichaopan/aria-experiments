import {EVENT_KEY} from './keyboard'
import { findNextSibiling, findPreviousSibiling, useFindItemMatchingChar, findItemMatchingChar } from './dom'
import {randomString} from './string'

interface OnSelectFunc {
  (selectedValue: string[]): void
}

export default class Listbox {
  protected listbox: HTMLElement
  protected button: HTMLElement
  protected label: HTMLElement
  protected activeDescendant: string | null
  protected multiselectable: boolean
  protected startRangeIndex: number | null
  protected onSelect: () => void = () => { }
  protected findMatchingItem: findItemMatchingChar
  protected classNameOnFocus: string

  constructor({
    listbox,
    button,
    label,
    classNameOnFocus
  }: {
      listbox: HTMLElement | Element | null,
      button: HTMLElement | Element | null,
      label: HTMLElement | Element | null,
      classNameOnFocus?: string
  }) {


    if (!listbox || !button || !label) {
      throw new Error("please provide listbox, buton and label")
    }

    this.listbox = listbox as HTMLElement
    this.button = button as HTMLElement
    this.label = label as HTMLElement
    this.classNameOnFocus = classNameOnFocus?? 'focused'
    this.setupAria()
    this.setupOptionValue()
    this.activeDescendant = null
    this.multiselectable = this.listbox.hasAttribute('aria-multiselectable')
    this.startRangeIndex = 0
    this.registerbuttonEvents()
    this.registerListBoxEvents()
    this.registerListItemEvents()
    this.findMatchingItem = useFindItemMatchingChar()
  }

  setupAria() {
    if (!this.label.id) {
      this.label.id = randomString()
    }

    if (!this.button.id) {
      this.button.id = randomString()
    }

    if (!this.listbox.id) {
      this.listbox.id = randomString()
    }

    this.button.setAttribute('aria-haspopup', 'listbox')
    this.button.setAttribute('aria-labelledby', `${this.label.id} ${this.button.id}`)
    this.listbox.setAttribute('tabindex', '-1')
    this.listbox.setAttribute('aria-labelledby', `${this.label.id}`)

    if (this.listbox.getAttribute('multiselectable') === 'true') {
      this.listbox.setAttribute('aria-multiselectable', 'true')
    }

    if (this.listbox.getAttribute('role') !== 'listbox') {
      this.listbox.setAttribute('role', 'listbox')
    }

    this.getAvailableListItems().forEach(option => {
      if (option.getAttribute('disabled') === 'true') {
        option.setAttribute('aria-disabled', "true")
      }

      if (option.getAttribute('selected') === 'true') {
        option.setAttribute('aria-selected', "true")
      }
    })
  }

  setOnSelect(onSelect: OnSelectFunc) {
    this.onSelect = () => {
      const value = Array.from(this.listbox.querySelectorAll('[aria-selected="true"]'))
        .map(item => item.getAttribute('data-value') || '')
      onSelect(value)
    }
  }

  registerbuttonEvents() {
    this.button.addEventListener('click', this.showListbox.bind(this))
    this.button.addEventListener('keyup', this.checkListboxShow.bind(this))
  }

  registerListBoxEvents() {
    this.listbox.addEventListener('blur', () => { this.hideListbox(false) })
    this.listbox.addEventListener('keydown', this.checkKeyPress.bind(this))
    this.listbox.addEventListener('focus', this.setupListboxFocus.bind(this))
    this.listbox.addEventListener('click', this.checkClickItem.bind(this))
    if (this.multiselectable) {
      this.listbox.addEventListener('mousedown', this.checkMouseDown.bind(this))
    }
  }

  registerListItemEvents() {
    this.getAvailableListItems().forEach(option => {
      option.addEventListener('mouseover', () => this.focusItem(option, { setSelected: false }))
      option.addEventListener('mouseout', () => this.defocusItem(option, { deSelected: false }))
    })
  }

  showListbox() {
    this.listbox.classList.remove('hidden')
    this.button.setAttribute('aria-expanded', 'true')
    this.listbox.focus()
  }

  setupListboxFocus(): void {
    const firstSelectedItem = this.listbox.querySelector('[aria-selected="true"]')

    if (firstSelectedItem) {
      this.focusItem(firstSelectedItem, { setSelected: false })
    } else {
      this.focusFirstItem({ setSelected: false })
    }

    this.updateScroll()
  }

  setupOptionValue() {
    this.getAvailableListItems().forEach(option => {
      if (!option.id) {
        option.id = `option-${randomString()}`
      }
    })
  }

  getAvailableListItems(): HTMLElement[] {
    return Array.from(this.listbox.querySelectorAll('[role="option"]:not([aria-disabled="true"]')).map(item => item as HTMLElement)
  }

  hideListbox(focusbutton = true) {
    this.listbox.classList.add('hidden')
    this.button.removeAttribute('aria-expanded')
    if (focusbutton) {
      this.button.focus()
    }
  }

  checkListboxShow(event: KeyboardEvent) {
    const key = event.key
    switch (key) {
      case EVENT_KEY.UP:
      case EVENT_KEY.ARROW_UP:
      case EVENT_KEY.DOWN:
      case EVENT_KEY.ARROW_DOWN:
        event.preventDefault()
        this.showListbox()
        this.checkKeyPress(event)
        break
    }
  }

  defocusItem(element: Element | null, { deSelected = true }: { deSelected: boolean }) {
    if (element) {
      element.classList.remove(this.classNameOnFocus)
      if (deSelected) {
        const selected = this.listbox.querySelector('[aria-selected="true"]')
        if (selected) {
          selected.removeAttribute('aria-selected')
        }
      }
    }
  }

  focusItem(element: Element | null, { setSelected = false }: { setSelected: boolean }): void {
    if (!element) {
      return
    }
    if (this.activeDescendant) {
      this.defocusItem(document.getElementById(this.activeDescendant), { deSelected: setSelected })
    }

    if (setSelected) {
      element.setAttribute('aria-selected', 'true')
    }

    element.classList.add(this.classNameOnFocus)
    this.listbox.setAttribute('aria-activedescendant', element.id)
    this.activeDescendant = element.id
  }

  checkClickItem(event: MouseEvent) {
    if (!event.target) {
      return
    }

    const target = <HTMLElement>event?.target

    if (target.getAttribute('role') !== 'option' || target.getAttribute('aria-disabled') === 'true') {
      return
    }

    if (!this.multiselectable) {
      this.focusItem(target, { setSelected: true })
      this.onSelect()
      this.hideListbox()
      return
    }

    if (!event.shiftKey) {
      this.toggleSelectItem(target)
    } else {
      this.selectRange(this.startRangeIndex, target)
    }
  }

  getSelectedOptionValues(): (string)[] {
    return Array.from(this.listbox.querySelectorAll('[aria-selected="true"]'))
      .map(item => item.getAttribute('data-value') || '')
  }

  focusFirstItem({ setSelected = false }: { setSelected: boolean }): void {
    const firstItem = this.getAvailableListItems()[0]

    if (firstItem) {
      this.focusItem(firstItem, { setSelected })
    }
  }

  focusLastItem({ setSelected = false }: { setSelected: boolean }): void {
    const itemList = this.getAvailableListItems()

    if (itemList.length) {
      this.focusItem(itemList[itemList.length - 1], { setSelected })
    }
  }

  findPreviousOption(currentOption: HTMLElement): HTMLElement | null {
    const allOptions = this.getAvailableListItems()
    return findPreviousSibiling(allOptions, currentOption)
  }

  findNextOption(currentOption: HTMLElement): HTMLElement | null {
    const allOptions = this.getAvailableListItems()
    return findNextSibiling(allOptions, currentOption)
  }


  selectRange(start: number | Element | null, end: number | Element): void {
    if (start === null) {
      return
    }

    const allOptions = this.getAvailableListItems()
    const startIndex = typeof start === 'number'
      ? start
      : this.getElementIndex(start, allOptions)
    const endIndex = typeof end === 'number'
      ? end
      : this.getElementIndex(end, allOptions)


    if (startIndex === null || endIndex === null) {
      return
    }

    for (let index = 0; index < allOptions.length; index++) {
      const selected = this.checkInRange(index, startIndex, endIndex)
      allOptions[index].setAttribute('aria-selected', selected + '')
    }

    this.onSelect()
  }

  getElementIndex(option: Element, allOptions: Element[]) {
    const optionIndex = allOptions.indexOf(option)
    return typeof optionIndex === 'number' ? optionIndex : null
  }

  checkInRange(index: number, start: number, end: number): boolean {
    const rangeStart = start < end ? start : end
    const rangeEnd = start < end ? end : start
    return index >= rangeStart && index <= rangeEnd
  }

  /**
  * Prevent text selection on shift + click for multi-select listboxes
  *
  * @param evt
  */
  checkMouseDown(event: MouseEvent) {
    const target = <HTMLElement>event?.target

    if (!event.target) {
      return
    }

    if (
      this.multiselectable &&
      event.shiftKey &&
      target.getAttribute('role') === 'option'
    ) {
      event.preventDefault()
    }
  }

  updateScroll() {
    if (!this.activeDescendant) {
      return
    }

    const selectedOption = document.getElementById(this.activeDescendant)

    if (
      selectedOption &&
      this.listbox.scrollHeight > this.listbox.clientHeight
    ) {
      const scrollBottom = this.listbox.clientHeight + this.listbox.scrollTop
      const elementBottom = selectedOption.offsetTop + selectedOption.offsetHeight

      if (elementBottom > scrollBottom) {
        this.listbox.scrollTop = elementBottom - this.listbox.clientHeight
      } else if (selectedOption.offsetTop < this.listbox.scrollTop) {
        this.listbox.scrollTop = selectedOption.offsetTop
      }
    }
  }

  toggleSelectItem(element: Element | null) {
    if (!element) {
      return
    }

    if (this.multiselectable) {
      element.setAttribute(
        'aria-selected',
        element.getAttribute('aria-selected') === 'true' ? 'false' : 'true'
      )
      this.onSelect()
      this.hideListbox()
    } else {
      this.focusItem(element, { setSelected: true })
      this.onSelect()
      this.hideListbox()
    }
  }

  checkKeyPress(event: KeyboardEvent): void {
    const key = event.key
    const lastActiveId = this.activeDescendant
    const allOptions = this.getAvailableListItems()
    const currentItem = this.activeDescendant
      ? document.getElementById(this.activeDescendant) || allOptions[0]
      : null
    let nextItem = currentItem

    if (!currentItem) {
      return
    }

    switch (key) {
      case EVENT_KEY.UP:
      case EVENT_KEY.ARROW_UP:
      case EVENT_KEY.DOWN:
      case EVENT_KEY.ARROW_DOWN:
        if (!this.activeDescendant) {
          this.focusItem(currentItem, { setSelected: false })
          break
        }

        if (key === EVENT_KEY.UP || key === EVENT_KEY.ARROW_UP) {
          nextItem = this.findPreviousOption(currentItem)
        } else {
          nextItem = this.findNextOption(currentItem)
        }

        if (nextItem && this.multiselectable && event.shiftKey) {
          this.selectRange(this.startRangeIndex, nextItem)
        }

        if (nextItem) {
          this.focusItem(nextItem, { setSelected: false })
          event.preventDefault()
        }

        break
      case EVENT_KEY.HOME:
        event.preventDefault()
        this.focusFirstItem({ setSelected: false })
        if (this.multiselectable && event.shiftKey && event.ctrlKey) {
          this.selectRange(this.startRangeIndex, 0)
        }
        break
      case EVENT_KEY.END:
        event.preventDefault()
        this.focusLastItem({ setSelected: false })
        if (this.multiselectable && event.shiftKey && event.ctrlKey) {
          this.selectRange(this.startRangeIndex, allOptions.length - 1)
        }
        break
      case EVENT_KEY.SHIFT:
        this.startRangeIndex = this.getElementIndex(currentItem, allOptions)
        break
      case EVENT_KEY.SPACE:
        event.preventDefault()
        this.toggleSelectItem(nextItem)
        break
      case EVENT_KEY.ENTER:
        event.preventDefault()
        this.toggleSelectItem(nextItem)
        break
      case EVENT_KEY.RETURN:
      case EVENT_KEY.ESC:
      case EVENT_KEY.ESCAPE:
        event.preventDefault()
        this.hideListbox()
        break
      default:
        const target = event.target as HTMLElement
        const itemToFocus = this.findMatchingItem(this.getAvailableListItems(), target, key)
        this.focusItem(itemToFocus, { setSelected: false })
        break
    }

    if (this.activeDescendant !== lastActiveId) {
      this.updateScroll()
    }
  }
}

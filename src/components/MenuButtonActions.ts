class MenuButtonActions {
  protected domNode: HTMLElement
  protected performMenuAction: (element: HTMLElement) => void
  protected buttonNode: HTMLElement | null
  protected menuNode: HTMLElement | null
  protected menuitemNodes: HTMLElement[]
  protected firstMenuitem: HTMLElement | null
  protected lastMenuitem: HTMLElement | null
  protected firstChars: string[]



  constructor(domNode: HTMLElement, performMenuAction: () => {}) {
    this.domNode = domNode;
    this.performMenuAction = performMenuAction;
    this.buttonNode = domNode.querySelector('button');
    this.menuNode = domNode.querySelector('[role="menu"]');
    this.menuitemNodes = [];
    this.firstMenuitem = null;
    this.lastMenuitem = null;
    this.firstChars = [];

    this.setUpMenuItems()
    this.registerButtonNodeEvents()
    this.registerDomNodeEvents()
    // window.addEventListener('mousedown', this.onBackgroundMousedown.bind(this), true);
  }

  registerButtonNodeEvents() {
    if (this.buttonNode) {
      this.buttonNode.addEventListener('keydown', (event: KeyboardEvent) => this.onButtonKeydown(event));
      this.buttonNode.addEventListener('click', (event: MouseEvent) => this.onButtonClick(event));
    }

  }

  registerDomNodeEvents() {
    this.domNode.addEventListener('focusin', () => this.onFocusin());
    this.domNode.addEventListener('focusout', () => this.onFocusout());
  }

  setUpMenuItems() {
    let nodes = this.domNode.querySelectorAll('[role="menuitem"]')

    for (let i = 0; i < nodes.length; i++) {
      let menuitem = <HTMLElement>nodes[i];
      this.menuitemNodes.push(menuitem);
      menuitem.tabIndex = -1;
      if (menuitem.textContent) {
        this.firstChars.push(menuitem.textContent.trim()[0].toLowerCase());
      }

      menuitem.addEventListener('keydown', this.onMenuitemKeydown.bind(this));
      menuitem.addEventListener('click', (event: MouseEvent) => this.onMenuitemClick(event));
      menuitem.addEventListener('mouseover',(event: MouseEvent) => this.onMenuitemMouseover(event));

      if (!this.firstMenuitem) {
        this.firstMenuitem = menuitem;
      }
      this.lastMenuitem = menuitem;
    }
  }

  setFocusToMenuitem(newMenuitem: HTMLElement | null) {
    if (!newMenuitem) {
      return
    }

    this.menuitemNodes.forEach(function (item) {
      if (item === newMenuitem) {
        item.tabIndex = 0;
        newMenuitem.focus();
      } else {
        item.tabIndex = -1;
      }
    });
  }

  setFocusToFirstMenuitem() {
    this.setFocusToMenuitem(this.firstMenuitem);
  }

  setFocusToLastMenuitem() {
    this.setFocusToMenuitem(this.lastMenuitem);
  }

  setFocusToPreviousMenuitem(currentMenuitem: HTMLElement) {
    let newMenuitem, index;

    if (currentMenuitem === this.firstMenuitem) {
      newMenuitem = this.lastMenuitem;
    } else {
      index = this.menuitemNodes.indexOf(currentMenuitem);
      newMenuitem = this.menuitemNodes[index - 1];
    }

    this.setFocusToMenuitem(newMenuitem);

    return newMenuitem;
  }

  setFocusToNextMenuitem(currentMenuitem: HTMLElement) {
    let newMenuitem, index;

    if (currentMenuitem === this.lastMenuitem) {
      newMenuitem = this.firstMenuitem;
    } else {
      index = this.menuitemNodes.indexOf(currentMenuitem);
      newMenuitem = this.menuitemNodes[index + 1];
    }
    this.setFocusToMenuitem(newMenuitem);

    return newMenuitem;
  }

  setFocusByFirstCharacter(currentMenuitem: HTMLElement | null, char: string) {
    if (!currentMenuitem) {
      return
    }

    let start;
    let index;

    if (char.length > 1) {
      return;
    }

    char = char.toLowerCase();

    // Get start index for search based on position of currentItem
    start = this.menuitemNodes.indexOf(currentMenuitem) + 1;
    if (start >= this.menuitemNodes.length) {
      start = 0;
    }

    // Check remaining slots in the menu
    index = this.firstChars.indexOf(char, start);

    // If not found in remaining slots, check from beginning
    if (index === -1) {
      index = this.firstChars.indexOf(char, 0);
    }

    // If match was found...
    if (index > -1) {
      this.setFocusToMenuitem(this.menuitemNodes[index]);
    }
  }

  // Utilities

  getIndexFirstChars(startIndex: number, char: string) {
    for (let i = startIndex; i < this.firstChars.length; i++) {
      if (char === this.firstChars[i]) {
        return i;
      }
    }
    return -1;
  }

  // Popup menu methods

  openPopup() {
    if (this.menuNode && this.buttonNode) {
      this.menuNode.style.display = 'block';
      this.buttonNode.setAttribute('aria-expanded', 'true');
    }

  }

  closePopup() {
    if (this.isOpen()) {
      if (this.menuNode && this.buttonNode) {
        this.buttonNode.removeAttribute('aria-expanded');
        this.menuNode.style.display = 'none';
      }
    }
  }

  isOpen() {
    return this.buttonNode?.getAttribute('aria-expanded') === 'true';
  }

  // Menu event handlers

  onFocusin() {
    this.domNode.classList.add('focus');
  }

  onFocusout() {
    this.domNode.classList.remove('focus');
  }

  onButtonKeydown(event: KeyboardEvent) {
    let key = event.key;
    let flag = false;

    switch (key) {
      case 'Enter':
      case 'ArrowDown':
      case 'Down':
        this.openPopup();
        this.setFocusToFirstMenuitem();
        flag = true;
        break;

      case 'Esc':
      case 'Escape':
        this.closePopup();
        flag = true;
        break;

      case 'Up':
      case 'ArrowUp':
        this.openPopup();
        this.setFocusToLastMenuitem();
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onButtonClick(event: MouseEvent) {
    if (this.isOpen()) {
      this.closePopup();
      this.buttonNode?.focus();
    } else {
      this.openPopup();
      this.setFocusToFirstMenuitem();
    }

    event.stopPropagation();
    event.preventDefault();
  }

  onMenuitemKeydown(event: KeyboardEvent) {
    let tgt = <HTMLElement> event.currentTarget
    let key = event.key
    let flag = false

    function isPrintableCharacter(str: string) {
      return str.length === 1 && str.match(/\S/);
    }

    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    if (event.shiftKey) {
      if (isPrintableCharacter(key)) {
        this.setFocusByFirstCharacter(tgt, key);
        flag = true;
      }

      if (event.key === 'Tab') {
        this.buttonNode?.focus();
        this.closePopup();
        flag = true;
      }
    } else {
      switch (key) {
        case ' ':
        case 'Enter':
          this.closePopup();
          this.performMenuAction(tgt);
          this.buttonNode?.focus();
          flag = true;
          break;

        case 'Esc':
        case 'Escape':
          this.closePopup();
          this.buttonNode?.focus();
          flag = true;
          break;

        case 'Up':
        case 'ArrowUp':
          this.setFocusToPreviousMenuitem(tgt);
          flag = true;
          break;

        case 'ArrowDown':
        case 'Down':
          this.setFocusToNextMenuitem(tgt);
          flag = true;
          break;

        case 'Home':
        case 'PageUp':
          this.setFocusToFirstMenuitem();
          flag = true;
          break;

        case 'End':
        case 'PageDown':
          this.setFocusToLastMenuitem();
          flag = true;
          break;

        case 'Tab':
          this.closePopup();
          break;

        default:
          if (isPrintableCharacter(key)) {
            this.setFocusByFirstCharacter(tgt, key);
            flag = true;
          }
          break;
      }
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onMenuitemClick(event: MouseEvent) {
    var tgt = <HTMLElement> event.currentTarget;
    this.closePopup();
    this.buttonNode?.focus();
    this.performMenuAction(tgt);
  }

  onMenuitemMouseover(event: MouseEvent) {
    var tgt = <HTMLElement> event.currentTarget;
    tgt?.focus();
  }

  onBackgroundMousedown(event: KeyboardEvent) {
    const target = <HTMLElement> event.target
    if (!this.domNode.contains(target)) {
      if (this.isOpen()) {
        this.closePopup();
        this.buttonNode?.focus();
      }
    }
  }
}

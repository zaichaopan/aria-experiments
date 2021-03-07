export enum EVENT_KEY {
  ENTER = 'Enter',
  ARROW_DOWN = 'ArrowDown',
  DOWN = 'Down',
  ARROW_UP = 'ArrowUp',
  UP = 'Up',
  SPACE = ' ',
  HOME = 'Home',
  END = 'End',
  PAGE_UP = 'PageUp',
  PAGE_DOWN = 'PageDown',
  TAB = 'Tab',
  RETURN = 'Return',
  SHIFT = 'Shift',
  ESC = 'Esc',
  ESCAPE = 'Escape',
  DELETE = 'Delete'
}


export const useEscKeyHandler = (): {
  on: (fn: () => void) => void,
  dispose: () => void
} => {
  let _onESCPressed: () => void

  const handler = (event: KeyboardEvent) => {
    if (event.key === EVENT_KEY.ESCAPE) {
      _onESCPressed()
      event.stopPropagation()
    }
  }

  const on = (fn: () => void) => {
    _onESCPressed = fn
    document.addEventListener('keydown', handler)
  }

  const dispose = () => {
    document.removeEventListener('keydown', handler)
  }

  return {
    on,
    dispose
  }
}

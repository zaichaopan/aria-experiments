export const FOCUSABLE_SELCTORS = [
  'a[href]:not([tabindex^="-"])',
  'area[href]:not([tabindex^="-"])',
  'input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])',
  'input[type="radio"]:not([disabled]):not([tabindex^="-"]):checked',
  'select:not([disabled]):not([tabindex^="-"])',
  'textarea:not([disabled]):not([tabindex^="-"])',
  'button:not([disabled]):not([tabindex^="-"])',
  'iframe:not([tabindex^="-"])',
  'audio[controls]:not([tabindex^="-"])',
  'video[controls]:not([tabindex^="-"])',
  '[contenteditable]:not([tabindex^="-"])',
  '[tabindex]:not([tabindex^="-"])',
]

export function setFocusToFirstItem(container: HTMLElement | Element | null) {
  if (!container) {
    return
  }
  const focusableChildren = getFocusableChildren(container as HTMLElement)
  const focused = container.querySelector('[autofocus]') || focusableChildren[0]

  if (focused) {
    ;(focused as HTMLElement).focus()
  }
}

export function getFocusableChildren(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELCTORS.join(',')))
    .filter((child) => {
      const childNode = child as HTMLElement
      return !!(
        childNode.offsetWidth ||
        childNode.offsetHeight ||
        childNode.getClientRects().length
      )
    })
    .map((item) => item as HTMLElement)
}

type focusTrap = {
  on: (container: HTMLElement | Element | null) => void
  dispose: () => void
}

export function useFocusTrap(): focusTrap {
  let _container: HTMLElement | null

  const trapTabKey = (event: KeyboardEvent) => {
    if (!_container) {
      return
    }
    const focusableChildren = getFocusableChildren(_container)
    if (!document.activeElement) {
      return
    }

    const focusedItemIndex = focusableChildren.indexOf(
      document.activeElement as HTMLElement
    )

    if (event.shiftKey && focusedItemIndex === 0) {
      focusableChildren[focusableChildren.length - 1]?.focus()
      event.preventDefault()
    } else if (
      !event.shiftKey &&
      focusedItemIndex === focusableChildren.length - 1
    ) {
      focusableChildren[0]?.focus()
      event.preventDefault()
    }
  }

  const on = (container: HTMLElement | Element | null) => {
    _container = container as HTMLElement
    document.addEventListener('keydown', trapTabKey, true)
  }

  const dispose = () => {
    document.removeEventListener('keydown', trapTabKey, true)
  }

  return {
    on,
    dispose,
  }
}

export function useRestoreFocus(): ()=> void {
  const focusNeededRestore = document.activeElement as HTMLElement

  return () => {
    focusNeededRestore?.focus()   
  }
}

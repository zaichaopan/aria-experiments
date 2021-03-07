export type clickOutside = {
  on: (container: HTMLElement | null, onClickOutsideFn: (event?: MouseEvent) => void) => void,
  dispose: () => void
}

export default function useClickOutside(): clickOutside {
  let _container: HTMLElement | null
  let _onClickOutsideFn: (event?: MouseEvent) => void

  const onclickOutsideFnWrapper = (event: MouseEvent) => {
    if (!_container) {
      return
    }

    if (!_container.contains(<HTMLElement>event.target)) {
      _onClickOutsideFn(event)
    }
  }

  return {
    on: (container: HTMLElement | null, onClickOutsideFn: (event?: MouseEvent) => void) => {
      _container = container
      _onClickOutsideFn = onClickOutsideFn
      window.addEventListener('mousedown', onclickOutsideFnWrapper)
    },
    dispose: () => {
      window.removeEventListener('mousedown', onclickOutsideFnWrapper)
    }
  }
}

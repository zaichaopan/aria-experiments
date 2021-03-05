export default function useClickOutside() {
  let _container: HTMLElement | null
  let _onClickOutsideFn: (event?: MouseEvent) => void

  const onclickOutsideFnWrapper = (event: MouseEvent) => {
    console.log('click outside', _container)
    if (!_container) {
      return
    }

    if (!_container.contains(<HTMLElement>event.target)) {
      _onClickOutsideFn(event)
    }
  }

  return {
    start: (container: HTMLElement | null, onClickOutsideFn: (event?: MouseEvent) => void) => {
      _container = container
      _onClickOutsideFn = onClickOutsideFn
      window.addEventListener('mousedown', onclickOutsideFnWrapper);
    },
    stop: () => {
      window.removeEventListener('mousedown', onclickOutsideFnWrapper)
    }
  }
}

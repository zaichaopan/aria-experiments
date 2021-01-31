import { onBeforeUnmount, onMounted} from 'vue'

export default function usingMouseDetector({
  applyClass = 'using-mouse',
  applyTo }: { applyClass?: string, applyTo: string }): void {
  let container: HTMLElement | null

  function onMouseDown() {
    if (!container) {
      console.warn('Specify which container the applyClass should apply to')
      return
    }

    if (!container) {
      return
    }
    container.classList.add(applyClass);
  }

  function onKeyDown(event: KeyboardEvent) {
    if(!container) {
      console.warn('Specify which container the applyClass should apply to')
      return
    }

    if (event.code === 'Tab') {
      container.classList.remove(applyClass);
    }
  }

  onMounted(() => {
    container = document.querySelector(applyTo)
    document.body.addEventListener('mousedown', onMouseDown);
    document.body.addEventListener('keydown', onKeyDown);
  })

  onBeforeUnmount(() => {
    document.body.removeEventListener('mousedown', onMouseDown);
    document.body.removeEventListener('keydown', onKeyDown);
  })
}

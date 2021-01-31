import { onBeforeUnmount, onMounted} from 'vue'

export default function usingMouseDetector({
  applyClass = 'using-mouse',
  applyTo }: { applyClass?: string, applyTo: string }): void {
  let container: HTMLElement|null


  console.log('called using')

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
    console.log({code: event.code})

    if (event.code === 'Tab') {
      container.classList.remove(applyClass);
    }
  }

  onMounted(() => {
    container = document.querySelector(applyTo)
    console.log('on mounted')
    document.body.addEventListener('mousedown', onMouseDown);
    document.body.addEventListener('keydown', onKeyDown);
  })

  onBeforeUnmount(() => {
    console.log('remove listener')
    document.body.removeEventListener('mousedown', onMouseDown);
    document.body.removeEventListener('keydown', onKeyDown);
  })
}

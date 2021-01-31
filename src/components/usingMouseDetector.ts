import { onBeforeUnmount, onMounted} from 'vue'

export default function usingMouseDetector({
  applyClass = 'using-mouse',
  applyTo }: { applyClass?: string, applyTo: string }): void {
  let containers: NodeListOf<Element> | null

  function onMouseDown() {
    if (!containers) {
      console.warn('Specify which container the applyClass should apply to')
      return
    }

    if (!containers) {
      return
    }
    containers.forEach(item =>  item.classList.add(applyClass))
  }

  function onKeyDown(event: KeyboardEvent) {
    if(!containers) {
      console.warn('Specify which container the applyClass should apply to')
      return
    }

    if (event.code === 'Tab') {
      containers.forEach(item => item.classList.remove(applyClass))
    }
  }

  onMounted(() => {
    containers = document.querySelectorAll(applyTo)
    document.body.addEventListener('mousedown', onMouseDown);
    document.body.addEventListener('keydown', onKeyDown);
  })

  onBeforeUnmount(() => {
    document.body.removeEventListener('mousedown', onMouseDown);
    document.body.removeEventListener('keydown', onKeyDown);
  })
}

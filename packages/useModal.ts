import { ref, Ref } from 'vue'

let name: Ref<string> = ref('')

interface modal {
  name: Ref<string>,
  show: (name: string) => void,
  hide: (name: string) => void,
  closeAll: () => void
}

export default function useModal(): modal {
  const show = (modalName: string) => {
    name.value = modalName
  }

  const hide = (modalName: string) => {
    if (name.value === modalName) {
      name.value = ''
    }
  }

  const closeAll = () => {
    name.value = ''
  }

  return {
    name,
    show,
    hide,
    closeAll
  }
}

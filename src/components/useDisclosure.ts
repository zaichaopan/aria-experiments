import { randomString } from '../utils'
import { reactive, watch} from 'vue'
export interface Disclosure {
  control: {
    aria: {
      'aria-expanded': boolean,
      'aria-controls': string
    },
    onClick: () => void
  },
  description: {
    aria: {
      id: string,
      style: { display?: string }
    },

  }
}

export default function useDisclosure({ number, expanded = [] }: { number: Number, expanded?: Number[] }): Disclosure[] {
  return [...Array(number)].map((_, index) => {
    let control = randomString()

    let controlAria = reactive({
      'aria-expanded': expanded.indexOf(index)!==-1,
      'aria-controls': control
    })

    let descriptionAria = reactive({
      id: control,
      style: getDescriptionStyle(controlAria)
    })

    watch(controlAria, () => {
      descriptionAria.style = getDescriptionStyle(controlAria)
    })

    return {
      control: {
        aria: controlAria,
        onClick() {
          this.aria['aria-expanded'] = !this.aria['aria-expanded']
        },
      },
      description: {
        aria: descriptionAria
      }
    }
  })
}

function getDescriptionStyle(controlAria: { 'aria-expanded': boolean }): { display?: string } {
  return controlAria['aria-expanded'] === false ? { display: 'none' } : {}
}

import getRandString from './randomString'

export default function useDisclosure(className: string): void {
  const disclosures: NodeListOf<Element> = document.querySelectorAll(className)

  if (disclosures === null) {
    console.warn(`cannot find elements with class name: ${className}`)
    return
  }

  disclosures.forEach(disclosure => {
    let disclosureBtn = disclosure.querySelector('dt button')

    if (!disclosureBtn) {
      console.warn('not button inside a disclosure')
      return
    }

    if (!disclosureBtn.hasAttribute('aria-expanded')) {
      disclosureBtn.setAttribute('aria-expanded', 'false')
    }

    let { randomString: controls } = getRandString()
    disclosureBtn.setAttribute('aria-controls', controls)

    let disclosureDes = disclosure.querySelector('dd')

    if (!disclosureDes||!disclosureDes.children) {
      console.log('not description for disclosure')
      return
    }

    if (disclosureDes.children.length !== 1) {
      console.log('only one node for disclosure des')
      return
    }

    let desContent = disclosureDes.children[0] as HTMLElement
    desContent.id = controls
    setDesStyle(desContent, isCurrentExpanded(disclosureBtn))

    disclosureBtn.addEventListener('click', () => {
      if (disclosureBtn) {
        disclosureBtn.setAttribute('aria-expanded', isCurrentExpanded(disclosureBtn) ? 'false' : 'true')
        setDesStyle(desContent, isCurrentExpanded(disclosureBtn))
      }
    })
  })
}

function isCurrentExpanded(disclosureBtn: Element| null): boolean {
  return !!disclosureBtn && disclosureBtn.getAttribute('aria-expanded') === 'true'
}

function setDesStyle(desContent: HTMLElement | null, expanded: Boolean): void {
  if (desContent) {
    desContent.style.display = expanded ? 'block' : 'none'
  }
}

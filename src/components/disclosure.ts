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

    let { randomString: id } = getRandString()
    disclosureBtn.setAttribute('aria-controls', id)

  })
}
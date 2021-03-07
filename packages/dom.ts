export function findNextSibiling<T>(list: T[], currentItem: T): T {
  const currentItemIndex = list.indexOf(currentItem)

  return currentItemIndex > -1 && currentItemIndex < list.length - 1
    ? list[currentItemIndex + 1]
    : list[0]
}

export function findPreviousSibiling<T>(list: T[], currentItem: T): T | null {
  const currentItemIndex = list.indexOf(currentItem)

  return currentItemIndex > -1 && currentItemIndex > 0
    ? list[currentItemIndex - 1]
    : list[list.length - 1]
}

export type findItemMatchingChar = (
  list: HTMLElement[],
  currentItem: HTMLElement,
  char: string
) => HTMLElement | null

export function useFindItemMatchingChar(): findItemMatchingChar {
  let keysSoFar = ""
  let keyClear: ReturnType<typeof setTimeout> | null

  const clearKeysSoFarAfterDelay = () => {
    if (keyClear) {
      clearTimeout(keyClear)
      keyClear = null
    }

    keyClear = setTimeout(() => {
      keysSoFar = ""
      keyClear = null
    }, 500)
  }

  const findMatchInRange = (
    list: Element[],
    startIndex: number,
    endIndex: number
  ) => {
    for (let n = startIndex; n < endIndex; n++) {
      const label = (<HTMLElement>list[n]).innerText
      if (label && label.toUpperCase().indexOf(keysSoFar.toUpperCase()) === 0) {
        return list[n]
      }
    }
    return null
  }

  const findMathingItem = (
    list: HTMLElement[],
    currentItem: HTMLElement,
    char: string
  ): HTMLElement | null => {
    keysSoFar += char
    clearKeysSoFarAfterDelay()
    const currentItemIndex = list.indexOf(currentItem)
    const nextMatch =
      findMatchInRange(list, currentItemIndex + 1, list.length) ??
      findMatchInRange(list, 0, currentItemIndex)
    return nextMatch as HTMLElement
  }

  return findMathingItem
}

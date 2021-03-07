import { findNextSibiling, findPreviousSibiling, useFindItemMatchingChar } from '../dom'

describe('dom.ts test', () => {
  test('find next sibling returns first sibiling when current one is the last one', () => {
    const list = [1, 2, 3]
    const nextSibiling = findNextSibiling(list, list[list.length - 1])
    expect(nextSibiling).toBe(list[0])
  })

  test('find previsou sibling returns first sibiling when last one is the first one', () => {
    const list = [1, 2, 3]
    const previousSibiling = findPreviousSibiling(list, list[0])
    expect(previousSibiling).toBe(list[list.length - 1])
  })

  describe('find item matching typing character test', () => {
    let options: HTMLElement[]
    let current: HTMLElement

    beforeAll(() => {
      // innerText is not implemented in jsdom
      // https://github.com/jsdom/jsdom/issues/1245
      Object.defineProperty(HTMLElement.prototype, 'innerText', {
        get() {
          return this.textContent
        }
      })

      document.body.innerHTML = `
      <ul id="container">
        <ol>ab</ol>
        <ol>b</ol>
        <ol>c</ol>
        <ol>a</ol>
        <ol>d</ol>
      </ul>
    `
      options = Array.from(document.querySelectorAll('ol')).map(option => option as HTMLElement)
      current = options[2]
    })

    test('match single character', () => {
      const findItemMatchingChar = useFindItemMatchingChar()
      const item = findItemMatchingChar(options, current, 'a')
      expect(item.innerText).toBe('a')
    })

    test('concat following characters if keep typing', () => {
      const findItemMatchingChar = useFindItemMatchingChar()
      const current = options[2]
      findItemMatchingChar(options, current, 'a')
      const item = findItemMatchingChar(options, current, 'b')
      expect(item.innerText).toBe('ab')
    })

    test('clear previous character after clear key timeout', () => {
      jest.useFakeTimers()
      const findItemMatchingChar = useFindItemMatchingChar()
      findItemMatchingChar(options, current, 'a')
      jest.runAllTimers()
      const item = findItemMatchingChar(options, current, 'b')
      expect(item.innerText).toBe('b')
    })
  })
})

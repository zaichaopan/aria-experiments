import Listbox from '../listbox'

describe('listbox test', () => {
  test('single select', () => {
    document.body.innerHTML = `
      <div>
       <label>XXX</label>
        <button type="button">XXX</button>
        <div>
          <ul id="listbox" role="listbox">
           <li role="option" testid="option" id="1" data-value="option1">option1<li>
           <li role="option" testid="option" id="2" data-value="option2">option2<li>
           <li role="option" testid="option" id="3" data-value="option3">option3<li>
           <li role="option" testid="option" id="4" data-value="option4">option4<li>
          </ul>
        </div>
      </div>
    `
    const listbox = new Listbox({
      listbox: document.querySelector("#listbox"),
      button: document.querySelector("button"),
      label: document.querySelector("label")
    })

    let selectedOption = ''
    listbox.setOnSelect((selected) => {
      selectedOption = selected[0]
    })

    // query selector has to be unique in case
    //querySelectorAll return cached result
    // https://github.com/jsdom/jsdom/issues/2519
    const options = document.querySelector("ul#listbox").querySelectorAll('li')
    const desiredOption = options[2]
    const event = new MouseEvent("click", {})
    Object.defineProperty(event, 'target', { value: desiredOption, enumerable: true });
    document.querySelector("ul#listbox").dispatchEvent(event)
    expect(selectedOption).toBe(desiredOption.getAttribute('data-value'))
  })
})

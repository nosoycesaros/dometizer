import append from './append'

test('Append elements to Container', () => {
  document.body.innerHTML = `<ul class='list'></ul>`
  const container = <HTMLElement>document.querySelector('.list')

  const elements = [
    document.createElement('li'),
    document.createElement('li'),
    document.createElement('li')
  ]

  append(container, elements)
  
  expect(container.innerHTML).toBe('<li></li><li></li><li></li>')
});
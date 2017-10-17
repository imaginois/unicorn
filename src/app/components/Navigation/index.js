import xs from 'xstream'
import './styles.scss'

function dist(x1, y1, x2 = 0, y2 = 0) {
  if (x1 === x2 && y1 === y2) {
    return 100000
  }
  const xd = x2 - x1
  const yd = y2 - y1
  return Math.sqrt(xd * xd + yd * yd)
  // return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
}

function distLeft(relative, base) {
  if (relative.left >= base.left) {
    return 10000
  }
  if (~(relative.top - base.top) > 100) {
    return 10000
  }
  return dist(relative.right, relative.top, base.left, base.top)
}

function distRight(relative, base) {
  return dist(relative.left, relative.top, base.right, base.top)
}

function distUp(relative, base) {
  return dist(relative.left, relative.bottom, base.left, base.top)
}

function distDown(relative, base) {
  if (relative.bottom >= base.bottom) {
    return 10000
  }
  if (~(relative.bottom - base.bottom) > 100) {
    return 10000
  }
  return dist(relative.left, relative.bottom, base.left, base.bottom)
}


function offset(el) {
  const rect = el.getBoundingClientRect()
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  return {
    el: el,
    top: rect.top + scrollTop,
    right: rect.right + scrollLeft,
    bottom: rect.bottom + scrollTop,
    left: rect.left + scrollLeft,
  }
}

const simulateClick = function sc() {
  const eventClick = new MouseEvent('mousemove')
  document.querySelector('header a').dispatchEvent(eventClick)

  console.log('evt', eventClick)
}
setTimeout(simulateClick, 1000)

function Navigation({DOM}) {
  const keyUp$ = DOM.select('document').events('keyup')
  const keyDown$ = DOM.select('document').events('keydown')
  const keyPress$ = DOM.select('document').events('keypress')

  const click$ = DOM.select('document').events('click')
  const mouseEvent$ = DOM.select('document').events('mousemove')
  const mousePosition$ = mouseEvent$
    .map(({x, y}) => ({x,y}))

  const clickCount$ = click$
    .fold((acc) => acc + 1, 0)

  const mouseEvents$ = xs.combine(
    mousePosition$,
    clickCount$,
    mouseEvent$
  )

  mouseEvents$.subscribe({
    // next: ev => console.log(ev[0]),
  })

  keyDown$.subscribe({
    // next: ev => console.log(ev),
  })

  keyPress$.subscribe({
    // next: ev => console.log(ev),
  })

  const keyboardNav$ = keyUp$
    .map(ev => {
      const sel = document.querySelector('.selected')
      const selOffset = offset(sel)

      let distanceFn = dist

      if (ev.key === 'ArrowLeft') {
        distanceFn = distLeft
      } else if (ev.key === 'ArrowRight') {
        distanceFn = distRight
      } else if (ev.key === 'ArrowUp') {
        distanceFn = distUp
      } else if (ev.key === 'ArrowDown') {
        distanceFn = distDown
      }

      if (sel) {
        try {
          const target = Array.apply(null, document.querySelectorAll('.s'))
            .map((el) => offset(el))
            .map((el) => ({el, distance: distanceFn(el, selOffset)}))
            .reduce((prev, curr) => {
              return prev.distance < curr.distance ? prev : curr
            }, {})

          // const elOffset = offset(el)
          console.log('prev selection', selOffset)
          console.log('result', target)

          sel.classList.remove('selected')
          target.el.el.classList.add('selected')
        } catch (e) {
          console.error(e)
        }
      }
      return ev
    })

  const selection$ = mouseEvent$
    .map(e => {
      if (e.target.classList.contains('s')) {
        if (document.querySelector('.selected')) {
          document.querySelector('.selected').classList.remove('selected')
        }
        e.target.classList.add('selected')
        // console.log('e.target.classList', e)
      }
      return e
    })
    // .debug(x => console.log(x))

  return {
    KEY: keyboardNav$,
    SEL: selection$,
    POS: mousePosition$,
  }
}

export default Navigation

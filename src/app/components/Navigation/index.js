// import xs from 'xstream'
import {div, input, p} from '@cycle/dom'
import './styles.scss'

function Navigation({DOM}) {
  const view$ = DOM.select('document').events('mousemove')
            // .map(event => event.target.checked)
            // .startWith({target: {classList: ['s']}})
            .filter(e => !!e.target)
            // .filter(e => !!e.target.classList.contains('s'))
            .map(e => {
              if (document.querySelector('.selected')) {
                document.querySelector('.selected').classList.remove('selected')
              }
              console.log('e.target.classList', e.target.classList)
              e.target.classList.add('selected')
            })
            .map(e => div([
              input({attrs: {type: 'checkbox'}}), 'Checkbox content is ' + e,
              p('Click to toggle'),
            ]))
            // .debug(x => console.log(x))

  return {
    DOM: view$,
  }
}

export default Navigation

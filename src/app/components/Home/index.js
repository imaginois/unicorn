import xs from 'xstream'
import {h} from '@cycle/dom'
import {checkRequestUrl} from '../../global/utils'
import loadingSpinner from '../../global/loading'
import {fadeInStyle} from '../../global/styles'
import './styles.scss'

function resultView({
  id,
  name = 'defaultstripe',
  title = 'No title',
  description = 'No description given.',
  picture = '',
  }) {
  return h('a.stripe', {
    key: id,
    attrs: {href: '/list/gop/' + name},
    hero: {id: `repo${id}`},
  }, [
    h('img', {props: {src: picture}}),
    h('h1.title', {}, title),
    h('div.small', {}, description),
  ])
}

function Home({HTTP, CURSOR}) {
  const GET_REQUEST_URL = 'http://localhost:3000/api/stripes' //'https://api.github.com/users/cyclejs/repos'

  const mouseEvent$ = CURSOR
    .map(ev => ev[2])
    .debug(x => console.log(x))

  const cursorPosition$ = mouseEvent$
    .map(ev => {
      return {
        x: ev.x,
        y: ev.y,
      }
    })
    .debug(x => console.log(x))

  //Send HTTP request to get data for the page
  //.shareReplay(1) is needed because this observable
  //immediately emmits its value before anything can
  //subscribe to it.
  const dataRequest$ = xs
    .of({
      url: GET_REQUEST_URL,
      category: 'stripe-list',
    })
    .debug(() => console.log(`Hero list: Search request subscribed`))
    .remember()

  // Convert the stream of HTTP responses to virtual DOM elements.
  const dataResponse$ = HTTP
    .select('stripe-list')
    .filter(res$ => {
      console.dir(res$)
      return checkRequestUrl(res$, GET_REQUEST_URL)
    })
    .flatten() //Needed because HTTP gives an Observable when you map it
    .map(res => res.body)
    .startWith([])
    .debug((x) => console.log(`Hero list: HTTP response emitted: ${x.length} items`))

  //loading indication.  true if request is newer than response
  const loading$ = xs.merge(dataRequest$.mapTo(true), dataResponse$.mapTo(false))
    .debug((x) => console.log(`Hero List: loading status emitted: ${x}`))

  //Combined state observable which triggers view updates
  const state$ = xs.combine(dataResponse$, loading$, cursorPosition$)
    .map(([res, loading, cursorPosition]) => {
      return {results: res, loading: loading, cursorPosition: cursorPosition}
    })
    .debug(() => console.log(`Hero List: state emitted`))

  //Map state into DOM elements
  const pageDOM$ = state$
    .map(({results, loading, cursorPosition}) =>
      h('div.page-wrapper', {key: `Homepage`, style: fadeInStyle}, [
        h('div.cursorXY', [
          h('div.test', [`Cursor is at: ${cursorPosition.x}, ${cursorPosition.y}`]),
        ]),
        h('div.home', {style: {height: '100%', overflow: 'auto'}}, [
          h('h1', {}, 'Home'),
          h('section.flex.stripes.hero', {}, results.map(resultView).concat(loading ? loadingSpinner() : null)),
        ]),
      ])
    )
    .debug(() => console.log(`Hero list: DOM emitted`))

  const vtree$ = pageDOM$

  return {
    CURSOR: CURSOR,
    DOM: vtree$,
    HTTP: dataRequest$,
  }
}

export default Home

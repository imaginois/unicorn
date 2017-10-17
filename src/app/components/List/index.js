import xs from 'xstream'
import {h} from '@cycle/dom'
import {checkRequestUrl} from '../../global/utils'
import loadingSpinner from '../../global/loading'
import {fadeInStyle} from '../../global/styles'
import './styles.scss'

function resultView({
  _id = 0,
  guid = 0,
  title = 'No title',
  description = 'No description given.',
  picture = '',
  }) {
  return h('a.hero.list-item.s', {
    key: guid,
    attrs: {href: '/asset/' + _id},
    //hero: {id: `repo${id}`},
  }, [
    h('img', {props: {src: picture}}),
    h('div.small.bold', {}, title),
    h('div.small', {}, description),
  ])
}

function List({HTTP, NAV}, values = {type: 'stripe', provider: 'allTitles'}) {
  const GET_REQUEST_URL = 'http://localhost:3000/api/' + values.provider //'https://api.github.com/users/cyclejs/repos'

  //Send HTTP request to get data for the page
  //.shareReplay(1) is needed because this observable
  //immediately emmits its value before anything can
  //subscribe to it.
  const dataRequest$ = xs
    .of({
      url: GET_REQUEST_URL,
      category: 'hero-list',
    })
    .debug(() => console.log(`Hero list: Search request subscribed`))
    .remember()

  // Convert the stream of HTTP responses to virtual DOM elements.
  const dataResponse$ = HTTP
    .select('hero-list')
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
  const state$ = xs.combine(dataResponse$, loading$)
    .map(([res, loading]) => {
      return {results: res, loading: loading}
    })
    .debug(() => console.log(`Hero List: state emitted`))

  //Map state into DOM elements
  const vtree$ = state$
    .map(({results, loading}) =>
      h('div.page-wrapper', {key: `Listpage`, style: fadeInStyle}, [
        h('div', {style: {height: '100%', overflow: 'auto'}}, [
          h('h1', {}, 'All titles'),
          h(`section.flex.${values.type}-list`, {}, results.map(resultView).concat(loading ? loadingSpinner() : null)),
        ]),
      ])
    )
    .debug(() => console.log(`Hero list: DOM emitted`))

  return {
    NAV: NAV,
    DOM: vtree$,
    HTTP: dataRequest$,
  }
}

export default List

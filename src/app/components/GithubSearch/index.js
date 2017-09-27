import xs from 'xstream'
import debounce from 'xstream/extra/debounce'
import {h} from '@cycle/dom'
import {fadeInOutStyle} from '../../global/styles'
import loadingSpinner from '../../global/loading.js'
import './styles.scss'

function resultView({
  id,
  html_url = '#',
  title = 'Unknown Repo Name',
  description = 'No description given.',
  picture = '',
  }) {
  const html = h('div.search-result', {
    key: id,
    style: {
      opacity: 0, transform: 'translateY(-100px)',
      delayed: {opacity: 1, transform: 'translateY(0px)'},
      remove: {opacity: 0, transform: 'translateY(-100px)'},
    },
  }, [
    h('img.search-avatar',{props: {src: picture}}),
    h('a.search-link', {props: {href: html_url}}, [
      h('h1', {}, title),
      description,
    ]),
  ])
  return html
}

function Search({DOM, HTTP}, {search = ''}, pathname) {
  const GITHUB_SEARCH_API = 'http://localhost:3000/search?q='
  //CAN USE THIS DURING TESTING -> const GITHUB_SEARCH_API = 'http://localhost:3000/mocksearch?q='

  //Query text
  const query$ = DOM.select('.field').events('input')
    .debug(() => {console.log(`search input changed`)})
    .compose(debounce(500))
    .map(ev => ev.target.value.trim()) //added trim to reduce useless searches

  // Requests for Github repositories happen when the input field changes,
  // debounced by 500ms, ignoring empty input field.
  const searchRequest$ = query$
    .startWith(search)
    .filter(query => query.length > 0)
    .map(q => ({
      url: GITHUB_SEARCH_API + encodeURI(q),
      category: 'search',
    }))
    .debug((x) => console.log(`search request emitted: ${x}`))
    .remember()

  // Convert the stream of HTTP responses to virtual DOM elements.
  const searchResponse$ = HTTP
    .select('search')
    .flatten() //Needed because HTTP gives an Observable when you map it
    .map(res => res.body)
    .map((x) => {
      return x.filter((item) => {
        return item.title.indexOf('ipsum') > 0
      })
    })
    .debug((x) => console.log(`search response emitted: ${x.length} items`))
    // .debug((x) => console.log(x))

  //loading indication.  true if request is newer than response
  const loading$ = xs.merge(searchRequest$.mapTo(true),searchResponse$.mapTo(false))
    .startWith(false)
    .compose(debounce(250))
    .debug((x) => console.log(`search loading status emitted: ${x}`))

  //Combined state observable which triggers view updates
  const state$ = xs.combine(searchResponse$, loading$)
    .map(([res, loading]) => {
      return {results: res, loading: loading}
    })
    .debug(() => console.log(`search state emitted`))

  //Convert state to DOM
  const vtree$ = state$
    .map(({results, loading}) =>
      h('div.page-wrapper', {key: `searchpage`, style: fadeInOutStyle}, [
        h('div.page.search-container', {}, [
          h('label.label', {}, 'Search:'),
          h('input.field', {key: 'searchbox', props: {type: 'text', value: search}}),
          h('hr'),
          h('section.search-results', {}, results.map(resultView).concat(loading ? loadingSpinner() : null)),
        ]),
      ])
    )
    .debug(() => console.log(`search DOM emitted`))

  return {
    DOM: vtree$,
    //Kickstart the HTTP sink with a blank string.
    //I'm doing this so the Server Rendering has something to 'take()'
    //Unless I put more info into the router config, it's going to be needed for
    //any component which has an HTTP stream that isn't used initially.
    HTTP: xs.merge(xs.of(''),searchRequest$),
    Query: query$.map(q => { return {pathname: pathname, search: `?search=${q}`}}), //This will make its way to the history driver to update the url w/ query parms
  }
}

export default Search

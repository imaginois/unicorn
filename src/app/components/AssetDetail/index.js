import xs from 'xstream'
import {h} from '@cycle/dom'
import {checkRequestUrl} from '../../global/utils'
import {fadeInOutStyle} from '../../global/styles'
//import loadingSpinner from '../../global/loading'
import './styles.scss'

function detailView({
  id,
  title = 'No title',
  description = 'No description given.',
  picture = '',
  }) {
  const html = h('div.asset-detail.asset', {}, [
    h('img.asset-details-avatar.asset',{props: {src: picture}}),
    h('section.content', [
      h('h1', {}, title),
      h('p', {}, description),
      h('p.small', {}, id),
    ]),
  ])
  return html
}

function AssetDetail({HTTP}, values = {id: '0'}) {
  //create the api url from values passed from Url-Mapper
  const GET_REQUEST_URL = 'http://localhost:3000/item?id=' + values.id

  //Send HTTP request to get data for the page
  const searchRequest$ = xs
    .of({
      url: GET_REQUEST_URL,
      category: 'asset-detail',
    })
    .debug((x) => console.log(`asset Detail: Sent GET request to: ${x.url}`))
    .remember()

  // Convert the stream of HTTP responses to virtual DOM elements.
  const searchResponse$ = HTTP
    .select('asset-detail')
    .filter(res$ => checkRequestUrl(res$, GET_REQUEST_URL))
    .flatten() //Needed because HTTP gives an Observable when you map it
    .map(res => res.body)
    .debug(() => console.log(`asset Detail: HTTP response emitted`))

  //Map current state to DOM elements
  const vtree$ = searchResponse$
    .filter(results => results) //ignore any null or undefined responses
    .map((results) =>
      h('div.page-wrapper', {key: `assetdetailpage`, style: fadeInOutStyle}, [
        h('h1', {}, 'Details'),
        h('div.page.asset-detail-container', {}, [
          detailView(results[0]),
          console.log(results[0]),
        ]),
      ])
    )
    .debug(() => console.log(`asset Detail: DOM emitted`))

  return {
    DOM: vtree$,
    HTTP: searchRequest$,
  }
}

export default AssetDetail

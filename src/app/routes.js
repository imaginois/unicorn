import {h} from '@cycle/dom'
import isolate from '@cycle/isolate'
import Home from './components/Home'
import Search from './components/Search'
import Navigation from './components/Navigation'
import List from './components/List'
import AssetDetail from './components/AssetDetail'
import Redirect from './components/Redirect'

const routes = {
  '/': Home,
  '/search': isolate(Search),
  '/redirect': isolate(Redirect),
  '/just-dom': h('h1', {}, 'This route only returns a <h1>.'),
  '/navigation': Navigation,
  '/asset/:id': AssetDetail,
  '/list/:type/:provider': List,
  '*': Home,
}

export default routes

import {h} from '@cycle/dom'
import isolate from '@cycle/isolate'
import Stripe from './components/Stripe'
import Github from './components/GithubSearch'
import Gop from './components/Gop/List'
import AssetDetail from './components/Gop/Detail'
import HeroSimple from './components/HeroSimple'
import HeroTests from './components/HeroTests'
import Redirect from './components/Redirect'

const routes = {
  '/': Stripe,
  '/github': isolate(Github),
  '/redirect': isolate(Redirect),
  '/hero-simple': HeroSimple,
  '/hero-tests': HeroTests,
  '/just-dom': h('h1', {}, 'This route only returns a <h1>.'),
  '/asset/:state': AssetDetail,
  '/gop/:unicorn': Gop,
  '*': Stripe,
}

export default routes

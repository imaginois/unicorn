'use strict'
//Environment-related constants
const isDeveloping = process.env.NODE_ENV !== 'production'
const isExperimental = process.env.NODE_ENV === 'exp'
const port = process.env.PORT ? process.env.PORT : 3000
const host = process.env.IP ? process.env.IP : 'localhost'

//Initialize Express server
const express = require('express')
const server = express()

//During Development, set up Webpack Hot Module Replacement
if (isDeveloping) {
  console.log('Setting up Webpack hot loading! Wait for successful bundle creation before opening the app.')
  // Step 1: Create & configure a webpack compiler
  const webpack = require('webpack')
  const webpackConfig = isExperimental ? require('../../webpack.config.restart.js') : require('../../webpack.config.js')
  const compiler = webpack(webpackConfig)
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')

  server.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true},
    inline: true,
    historyApiFallback: true,
  }))

  server.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }))
}

//Define static asset directories which Express will serve
//TODO: Use nginx in production.
server.use(`/dist`, express.static(`dist`))
server.use(`/img`, express.static(`img`))

//Serve mock data for stripes
let stripeData = require('./data/stripes.json')
if (stripeData.length) {
  console.log('Data loaded, length = ' + stripeData.length)
} else {
  console.log('Data not loaded')
}

server.get('/api/stripes', (req, res) => {
  //Log each request
  console.log(`data requested @ ${new Date().toString()}`)
  res.json(stripeData)
})

//Serve mock data for continueWatching stripe
let continueWatchingData = require('./data/continueWatching.json')
if (continueWatchingData.length) {
  console.log('Data loaded, length = ' + continueWatchingData.length)
} else {
  console.log('Data not loaded')
}

server.get('/api/continueWatching', (req, res) => {
  //Log each request
  console.log(`data requested @ ${new Date().toString()}`)
  res.json(continueWatchingData)
})


//Serve mock data for allTitles stripe
let allTitlesData = require('./data/allTitles.json')
if (allTitlesData.length) {
  console.log('Data loaded, length = ' + allTitlesData.length)
} else {
  console.log('Data not loaded')
}

server.get('/api/allTitles', (req, res) => {
  //Log each request
  console.log(`data requested @ ${new Date().toString()}`)
  res.json(allTitlesData)
})

//Fake api to troubleshoot search page
server.get('/search', (req, res) => {
  const searchTerm = req.query.q || ''
  //Log each request
  console.log(`search for ${searchTerm} requested @ ${new Date().toString()}`)
  let modifiedData = JSON.parse(JSON.stringify(allTitlesData)) //clone
  modifiedData[0].title = `You searched for "${searchTerm}"!`
  res.json(modifiedData)
})

//Fake api to troubleshoot search page
server.get('/item', (req, res) => {
  const itemId = req.query.id || ''
  console.log("itemId", itemId);

  const filteredResult = allTitlesData
    .filter((x) => x._id == itemId)
  console.log("filteredResult", filteredResult);
  res.json(filteredResult)
})






//Redirection test
//This simulates a server which replies with a 302/303 redirection after a form POST.
//The client code can't actually see this redirect url :(, so creative alternatives
//must be brewed up.  See 'src/app/app.js'
server.post('/redirect', (req, res) => {
  console.log('Redirect POST received.')
  res.redirect(302, '/hero-complex')
})

// Ignore favicon requests
server.get('/favicon.ico',(req, res) => {
  res.writeHead(200, {'Content-Type': 'image/x-icon'})
  res.end()
  return
})

//Serve data to the Hero-Complex Example
let theData = require('./data/data.json')
if (theData.length) {
  console.log('Data loaded, length = ' + theData.length)
} else {
  console.log('Data not loaded')
}

server.get('/data', (req, res) => {
  //Log each request
  console.log(`data requested @ ${new Date().toString()}`)
  res.json(theData)
})





//For now, any get requests will send the Index.html
server.get('/*', (req, res) => {
  if (isDeveloping) {
    res.sendFile(__dirname + '/index.dev.html')
  } else {
    res.sendFile(__dirname + '/index.html')
  }
})

//Start listening to HTTP requests
server.listen(port, host, () => {
  console.log('Server listening at http://%s:%s', host, port)
  console.log('Node environment = ' + process.env.NODE_ENV)
})

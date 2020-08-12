const webpack = require('webpack')
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  exportPathMap: function () {
    const ids = [
      'publications',
      'people',
      'courses',
      'news',
      'facility'
    ]

    let pages = {}
    for (let id of ids) {
      let href = id
      pages[href] = {
        page: '/page',
        query: { id: id }
      }
    }

    const summary = require('./content/output/summary.json')

    const publications = Object.keys(summary.fileMap)
    .filter((fileName) => {
      return fileName.includes('publications')
    })
    for (let publication of publications) {
      let id = publication.split('/')[3].replace('.json', '')
      let href = `/publications/${id}`
      pages[href] = {
        page: '/publication',
        query: { id: id }
      }
    }

    const people = Object.keys(summary.fileMap)
    .filter((fileName) => {
      return fileName.includes('people')
    })
    for (let person of people) {
      let id = person.split('/')[3].replace('.json', '')
      let href = `/people/${id}`
      pages[href] = {
        page: '/person',
        query: { id: id }
      }
    }

    // console.log(pages)
    return Object.assign({}, pages, {
      '/': { page: '/' }
    })
  },

  webpack: (config, options) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    )
    return config
  }

})

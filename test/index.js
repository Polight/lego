import jsdom from 'mocha-jsdom'
import * from './html-parser'
import * from './transpile'
import * from './utils'

jsdom({ url: 'http://localhost/', includeNodeLocations: true })

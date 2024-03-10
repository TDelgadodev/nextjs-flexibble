import { config, connector, graph } from '@grafbase/sdk'

const g = graph.Standalone()

const mongo = connector.MongoDB('MongoDB', {
  apiKey: g.env('MONGODB_API_KEY'),
  url: g.env('MONGODB_API_URL'),
  dataSource: g.env('MONGODB_DATASOURCE'),
  database: g.env('MONGODB_DATABASE'),
})

g.datasource(mongo)

export default config({
  graph: g,
})

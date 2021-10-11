import kmeans from './kmeans.js'
import CSVToJSON from './CSVToJSON.js'

(async () => {
    const locationsURL = '/data/locations.csv'
    
    const locationsCSV = await (await fetch(locationsURL)).text() 
    const locationsJSON = CSVToJSON(locationsCSV)
    const locationsOBJ = JSON.parse(locationsJSON)
    const dataset = Array.from(locationsOBJ).map(data => ([
        +data.latitude,
        +data.longitude,
    ]))


    const { clusters } = kmeans(dataset, 10)
    let locations = []

    clusters.forEach((cluster, indexOfCluster) => {
        cluster.points.forEach(point => {
            locations.push({
                latitude: point[0],
                longitude: point[1],
                cluster: indexOfCluster
            })
        })
    })

    const spec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        description: "Show the clustered locations",
        width: "container",
        height: "container",
        data: {
            values: locations
        },
        mark: "circle",
        encoding: {
            x: { field: "latitude", type: "quantitative" },
            y: { field: "longitude", type: "quantitative" },
            color: { field: "cluster" },
            opacity: { value: 1 }
        }
    }
    
    vegaEmbed("#vis", spec)

})()
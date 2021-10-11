import random from './random.js'
import distance from './distance.js'

/**
 * Use the K-Means algorithm for divide a dataset into K clusters
 * @param {Array.<number, number>} dataset 
 * @param {number} k 
 * @return {Array.<Array<number>>}
 */
export default function kmeans(dataset, k, maxIterations = 50) {
    k = k > dataset.length ? dataset.length : k
    let centroids = getRandomCentroinds(dataset, k),
        previousCentroids = [],
        clusters = [],
        iterations = 0,
        shouldContinue = true
    
    while (shouldContinue) {
        clusters = classifyDataset(dataset, centroids)
        centroids = calculateCentroids(dataset, clusters)

        previousCentroids = [...centroids]

        shouldContinue = iterations < maxIterations && !isArraysEquals(previousCentroids, centroids)
        iterations += 1
    }

    return { clusters }
}

function getRandomCentroinds(dataset, k) {
    const min = 0
    const max = dataset.length
    let indexesOfCentroids = []

    while (indexesOfCentroids.length < k) {
        const indexOfCentroid = random(min, max)
        const isRepeated = indexesOfCentroids.indexOf(indexOfCentroid) > -1 ? true : false
        if (!isRepeated) {
            indexesOfCentroids.push(indexOfCentroid)
        }
    }

    const centroids = indexesOfCentroids.map(indexOfCentroid => (
        [...dataset[indexOfCentroid]]
    ))

    return centroids
}

function isArraysEquals(array1, array2) {
    if (array1.length !== array2.length)
        return false

    return array1.every((itemOfArray1, index) => itemOfArray1 === array2[index])
}

function classifyDataset(dataset, centroids) {
    let clusters = centroids.map(centroid => ({
        centroid,
        points: []
    }))

    dataset.forEach((point) => {
        let indexOfClosestCentroid = 0,
            distanceToClosestCentroid = distance(point, centroids[indexOfClosestCentroid])

        centroids.forEach((centroid, index) => {
            const distanceToCentroid = distance(point, centroid)
            if(distanceToCentroid < distanceToClosestCentroid){
                indexOfClosestCentroid = index
                distanceToClosestCentroid = distanceToCentroid
            }
        })

        clusters[indexOfClosestCentroid].points.push(point)
    })

    return clusters
}

function calculateCentroids(dataset, clusters){
    const centroids = clusters.map(cluster => {
        let centroid

        if(cluster.points.length)
            centroid = calculatePointsMean(cluster.points)
        else
            centroid = getRandomCentroinds(dataset, 1)[0]
        
        return centroid
    })
    
    return centroids
}

function calculatePointsMean(points){
    const nMeans = points[0].length
    let means = Array(nMeans).fill(0)
    
    points.forEach(point => {
        point.forEach((value, index) => {
            means[index] += value / 3
        })
    })

    return means
}
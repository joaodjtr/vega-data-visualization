import random from './random.js'

/**
 * Use the K-Means algorithm for divide a dataset into K clusters
 * @param {Array.<number, number>} dataset 
 * @param {number} k 
 * @return {Array.<Array<number>>}
 */

export default function kmeans(dataset, k) {
    k = k > dataset.length ? dataset.length : k

    const centroids = randomCentroinds(dataset, k)
}

function randomCentroinds(dataset, k) {
    const min = 0
    const max = dataset.length
    let indexesOfCentroids = []

    while(indexesOfCentroids.length < k){
        const indexOfCentroid = random(min, max)
        const isRepeated = indexesOfCentroids.indexOf(indexOfCentroid) > -1 ? true : false
        if(!isRepeated){
            indexesOfCentroids.push(indexOfCentroid)
        } 
    }

    const centroids = indexesOfCentroids.map(indexOfCentroid => (
        [...dataset[indexOfCentroid]]
    ))

    return centroids
}
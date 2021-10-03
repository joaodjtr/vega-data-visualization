/**
 * Uses the Euclidean distance to calculate the length of a line segment between the two points.
 * @param {Array.<number>} p1
 * @param {Array.<number>} p2
 * @return {number} The distance value between the two points.
 */
export default function distance(p1, p2){
    let total = 0
    for(let i = 0; i < p1.length; i++){
        total += Math.pow(p2[i] - p1[i], 2)
    }
    return Math.sqrt(total)
}
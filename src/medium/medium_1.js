import { variance } from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let sum = 0;
    array.forEach(element => {
        sum += element
    });
    return sum
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    array.sort()
    let length = array.length
    let median = 0;
    if (length % 2 != 0) {
        median = array[Math.floor(length / 2)]
    } else {
        median = array[length / 2]
        median += array[(length / 2) - 1]
        median /= 2
    }
    return median
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let stats = new Object();
    stats.min = Math.min(... array)
    stats.median = getMedian(array)
    stats.max = Math.max(... array)
    let mean = 0
    array.forEach(element => {
        mean += element
    });
    mean /= array.length
    stats.variance = variance(array, mean)
    stats.mean = mean
    stats.length = array.length
    stats.sum = getSum(array)
    stats.standard_deviation = Math.sqrt(stats.variance)
    return stats
}


import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export function getAverageMpg() {
    let cityAvg = 0
    let highwayAvg = 0
    let length = mpg_data.length
    mpg_data.forEach(element => {
        cityAvg += element.city_mpg
        highwayAvg += element.highway_mpg
    });
    cityAvg /= length
    highwayAvg /= length
    return {city: cityAvg, highway: highwayAvg}
}

export function getAverageMpgLength(length) {
    let cityAvg = 0
    let highwayAvg = 0
    mpg_data.forEach(element => {
        cityAvg += element.city_mpg
        highwayAvg += element.highway_mpg
    });
    cityAvg /= length
    highwayAvg /= length
    return {city: cityAvg, highway: highwayAvg}
}

export function getYearStats() {
    let years = []
    mpg_data.forEach(element => {
        years.push(element.year)
    })
    return getStatistics(years)
}

export function getRatio() {
    let ratio = 0
    let length = mpg_data.length
    mpg_data.forEach(element => {
        if (element.hybrid) {
            ratio++
        }
    });
    return ratio /= length
}

export const allCarStats = {
    avgMpg: getAverageMpg(),
    allYearStats: getYearStats(),
    ratioHybrids: getRatio(),
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

export function getMakesHybrids() {
    let hybrids1 = mpg_data.reduce(function(key, value) {
        if (key.find(element => element.make === value.make) == undefined) {
            let hybrids2 = mpg_data.filter(car => car.make == value.make).filter(car => car.hybrid).map(car => car.id)
            if (hybrids2.length > 0) {
                key.push({make: value.make, hybrids: hybrids2});
            }
        }
        return key
    }, []);
    hybrids1.sort((a, b) => b.hybrids.length - a.hybrids.length)
    return hybrids1
}

export function getAvgMpgYearHybrid() {
    let object1 = new Object()
    let years = mpg_data.map(element => element.year)
    let nonHybrids = mpg_data.filter(element => element.hybrid == false)
    let hybrids = mpg_data.filter(element => element.hybrid == true)

    years.forEach(element => {
        let year = element
        let tempObject = {
            hybrid: getAverageMpg(hybrids.filter(car => car.year == year), hybrids.filter(car => car.year == year).length),
            notHybrid: getAverageMpg(nonHybrids.filter(car => car.year == year), nonHybrids.filter(car => car.year == year).length)
        }
        object1[year] = tempObject
    });
    return object1
}

export const moreStats = {
    makerHybrids: getMakesHybrids(),
    avgMpgByYearAndHybrid: getAvgMpgYearHybrid()
};

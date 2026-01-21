// Historical Bitcoin Price Data (Monthly Averages)
// Data structure: 'YYYY-MM': price
const HISTORICAL_PRICES = {
    // 2015
    '2015-01': 248, '2015-02': 235, '2015-03': 260, '2015-04': 245, '2015-05': 240, '2015-06': 230,
    '2015-07': 270, '2015-08': 255, '2015-09': 235, '2015-10': 260, '2015-11': 360, '2015-12': 425,
    // 2016
    '2016-01': 415, '2016-02': 400, '2016-03': 415, '2016-04': 435, '2016-05': 480, '2016-06': 650,
    '2016-07': 660, '2016-08': 575, '2016-09': 605, '2016-10': 640, '2016-11': 720, '2016-12': 890,
    // 2017
    '2017-01': 920, '2017-02': 1060, '2017-03': 1150, '2017-04': 1250, '2017-05': 1900, '2017-06': 2600,
    '2017-07': 2500, '2017-08': 3800, '2017-09': 4100, '2017-10': 5300, '2017-11': 8000, '2017-12': 15000,
    // 2018
    '2018-01': 13500, '2018-02': 9400, '2018-03': 9000, '2018-04': 8000, '2018-05': 8400, '2018-06': 6700,
    '2018-07': 7100, '2018-08': 6600, '2018-09': 6500, '2018-10': 6400, '2018-11': 5400, '2018-12': 3700,
    // 2019
    '2019-01': 3600, '2019-02': 3700, '2019-03': 3950, '2019-04': 5000, '2019-05': 7300, '2019-06': 9500,
    '2019-07': 10500, '2019-08': 10500, '2019-09': 9500, '2019-10': 8600, '2019-11': 8300, '2019-12': 7300,
    // 2020
    '2020-01': 8000, '2020-02': 9500, '2020-03': 6500, '2020-04': 7500, '2020-05': 9000, '2020-06': 9200,
    '2020-07': 9300, '2020-08': 11500, '2020-09': 10700, '2020-10': 13500, '2020-11': 18000, '2020-12': 29000,
    // 2021
    '2021-01': 33000, '2021-02': 45000, '2021-03': 55000, '2021-04': 58000, '2021-05': 37000, '2021-06': 35000,
    '2021-07': 32000, '2021-08': 47000, '2021-09': 43000, '2021-10': 61000, '2021-11': 57000, '2021-12': 47000,
    // 2022
    '2022-01': 42000, '2022-02': 40000, '2022-03': 44000, '2022-04': 40000, '2022-05': 30000, '2022-06': 20000,
    '2022-07': 23000, '2022-08': 21000, '2022-09': 19500, '2022-10': 20500, '2022-11': 17000, '2022-12': 16500,
    // 2023
    '2023-01': 20000, '2023-02': 23000, '2023-03': 27000, '2023-04': 29000, '2023-05': 27500, '2023-06': 30000,
    '2023-07': 29500, '2023-08': 26000, '2023-09': 27000, '2023-10': 34000, '2023-11': 37000, '2023-12': 42000,
    // 2024
    '2024-01': 45000, '2024-02': 52000, '2024-03': 68000, '2024-04': 65000, '2024-05': 67000, '2024-06': 62000,
    '2024-07': 64000, '2024-08': 59000, '2024-09': 63000, '2024-10': 68000, '2024-11': 90000, '2024-12': 95000,
    // 2025 (Projected/Current)
    '2025-01': 97000, '2025-02': 98000, '2025-03': 101000, '2025-04': 105000
};

/**
 * Get the closest historical price for a given date string (YYYY-MM-DD or YYYY-MM)
 * @param {string} dateStr 
 * @returns {number} Price in USD
 */
export const getPriceForDate = (dateStr) => {
    if (!dateStr) return 0;
    const date = new Date(dateStr);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    // Exact match
    if (HISTORICAL_PRICES[yearMonth]) {
        return HISTORICAL_PRICES[yearMonth];
    }

    // Find closest available date (simple fallback logic)
    const keys = Object.keys(HISTORICAL_PRICES).sort();

    // If date is before our first record, return first record
    if (yearMonth < keys[0]) return HISTORICAL_PRICES[keys[0]];

    // If date is after our last record, return last record
    if (yearMonth > keys[keys.length - 1]) return HISTORICAL_PRICES[keys[keys.length - 1]];

    // Find closest previous month
    let closest = keys[0];
    for (const key of keys) {
        if (key <= yearMonth) {
            closest = key;
        } else {
            break;
        }
    }

    return HISTORICAL_PRICES[closest];
};

/**
 * Get a specific month's price key
 * @param {Date} date 
 * @returns {string} 'YYYY-MM'
 */
export const getMonthKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

/**
 * Get raw price map
 */
export const getHistoricalPrices = () => HISTORICAL_PRICES;

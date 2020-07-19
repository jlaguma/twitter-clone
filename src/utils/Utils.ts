import { Tweet, ChartData } from 'constants/types';

/**
 * Returns a current date in 2020-12-25 format.
 *
 * @return  {string}  Current date in 2020-12-25 format.
 */
export const getCurrentDate = (): string => {
    const today = new Date();

    return convertDateToString(today);
};

/**
 * Converts Date to string of "2020-12-25" format.
 *
 * @param   {Date}    date  Date.
 *
 * @return  {string}        "2020-12-25"
 */
export const convertDateToString = (date: Date): string => {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

    return `${ye}-${mo}-${da}`;
};

/**
 * Returns a random userId.
 *
 * @param   {number}    min     Minimum number, inclusive.
 * @param   {number}    max     Maximum number, inclusive.
 *
 * @return  {number}    Random userId.
 */
export const getRandomUserId = (min: number = 1, max: number = 4): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Create a data input array for recharts.
 *
 * @param   {number}  numberOfDays  Size of the array to create.
 * @param   {[Tweet]}  tweets  Aray of tweets of type Tweet.
 *
 * @return  {[type]}  Returns a data input array for recharts.
 */
export const createPostsPerDayData = (
    numberOfDays: number,
    tweets: Tweet[]
): ChartData[] => {
    let dates: string[] = [];
    for (let i = 0; i < numberOfDays; i++) {
        let d = new Date();
        d.setDate(d.getDate() - i);
        dates = [...dates, convertDateToString(d)];
    }
    let data = dates.map((day) => {
        const tweetsPerDay = tweets.filter((t) => t.date === day).length;
        const formatedDay = day.substr(5);
        return { name: formatedDay, value: tweetsPerDay };
    });
    return data;
};

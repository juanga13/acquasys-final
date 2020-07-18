/**
 * @description Todas utilidades relacionadas con el tiempo van aca
 */

/**
 * @returns { Date }
 */
export function tenDaysBeforeNow() {
    let date = new Date()
    date.setHours(0,0,0,0)
    date.setDate(date.getDate() - 10);
    return date;
};
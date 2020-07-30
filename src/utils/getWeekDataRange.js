/**
 * Devuelve un rango de 2 fechas desde la fecha dada hasta el domingo que viene.
 * Si la fecha no es dada, se elige usa la fecha de hoy.
 * LA SEMANA EMPIEZA EN DOMINGO -> Date getDay() va de 0 (domingo) a 6 (sabado)
 * 
 * @returns { array of 2 Date objects }
 */
export default function(day = new Date()) {
    const now = new Date(
        (day).setHours(0 ,0, 0, 0)
    );
    const endWeek = new Date(
        (new Date(
            now.setDate(now.getDate() + 6 - now.getDay())
        )).setHours(23 ,59, 59, 999)
    );
    return [now, endWeek];
};

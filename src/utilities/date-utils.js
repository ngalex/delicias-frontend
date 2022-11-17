//borrar cuando se cree un archivo en esta carpeta
export const userFormatDateTime = (str) => {
    if (!str) return "";
    let date = new Date(str);
    return `${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()} - ${date.getDate()} ${months[date.getMonth()]}`;
}

export const userFormatTime = (str) => {
    if (!str) return "";
    let date = new Date(str);
    return `${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
}

export const getDateFromString = (str) => {
    if (!str) return null;
    let date = new Date(str);
    return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

export const getDateString = (date) => {
    if (!date) return "";
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const months = [
    'ENE',
    'FEB',
    'MAR',
    'ABR',
    'MAY',
    'JUL',
    'JUN',
    'AGO',
    'SEP',
    'OCT',
    'NOV',
    'DIC'
]
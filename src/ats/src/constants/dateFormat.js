export const formatDate=(date)=> {
    
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export const yearsList = () => {
    let max = new Date().getFullYear()
    let min = max - 9
    let years = []
    
    for (var i = max; i >= min; i--) {
        years.push(i)
    }
    return years
}

export const monthsList = ["January", "February", "March", "April", "May",
"June", "July", "August", "September", "October", "November", "December"];
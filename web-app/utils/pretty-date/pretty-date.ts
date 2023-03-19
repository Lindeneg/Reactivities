const prettyDateString = (date: string, withTime = false): string => {
    let hourAndMinute = '';
    if (withTime) {
        hourAndMinute = ', ' + date.split('T')[1].split(':').slice(0, 2).join(':').toLocaleString();
    }
    return `${new Date(date).toLocaleDateString()}${hourAndMinute}`;
};

export default prettyDateString;

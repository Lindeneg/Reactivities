const prettyDateString = (date: Date, withTime = false): string => {
    let hourAndMinute = '';
    if (withTime) {
        hourAndMinute = ', ' + date.toISOString().split('T')[1].split(':').slice(0, 2).join(':').toLocaleString();
    }
    return `${new Date(date).toLocaleDateString()}${hourAndMinute}`;
};

export default prettyDateString;

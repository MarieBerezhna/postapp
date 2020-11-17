module.exports = function (datetime) {
    let timeArr = datetime.split('T');
    let date = timeArr[0].split('-').reverse().join('/');
    let time = timeArr[1].slice(0, 5);
    return `${date} ${time}`;
};
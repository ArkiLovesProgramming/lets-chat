function formatDate(date) {
    const currentDate = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
    const oneWeek = 7 * oneDay; // 一周的毫秒数

    // 获取目标日期的年、月、日
    // const year = date.getFullYear();
    const month = date.toLocaleString('en-us', { month: 'short' });
    const day = date.getDate();

    // 获取目标日期的小时和分钟
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // 判断目标日期和当前日期的差距
    const timeDiff = currentDate - date;

    if (timeDiff < oneDay) {
        // 如果是今天，则只显示时间
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
    } else if (timeDiff < oneWeek) {
        // 如果是一周内，则显示星期几
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayOfWeek = daysOfWeek[date.getDay()];
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'} ${dayOfWeek}`;
    } else if (timeDiff < 2 * oneWeek) {
        // 如果是昨天，则显示 Yesterday
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'} Yesterday`;
    } else {
        // 如果是一周之前，则显示日期和月份缩写
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'} ${month} ${day}`;
    }
}

export default formatDate;

// 测试
const date = new Date("Tue Apr 23 2024 09:52:21 GMT-0230 (Newfoundland Daylight Time)");
console.log(formatDate(date));
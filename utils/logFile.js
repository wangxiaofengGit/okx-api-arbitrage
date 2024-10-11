const fs = require('fs');
const util = require('util');
const path = require('path');

// Create logs folder 创建 logs 文件夹（如果不存在）
const logsDir = path.resolve(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Get current date  获取当前日期并格式化为 YYYY-MM-DD 格式
function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Dynamically generate a log file for the current date 动态生成当前日期的日志文件
const logFile = fs.createWriteStream(path.resolve(logsDir, `${getCurrentDate()}.txt`), { flags: 'a' });

// Overwrite console.log and output the log to a file  console.log输出日志到文件
console.log = function() {
    logFile.write(util.format.apply(null, arguments) + '\n');
    process.stdout.write(util.format.apply(null, arguments) + '\n');
}

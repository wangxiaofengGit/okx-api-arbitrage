const fs = require('fs');
const util = require('util');
const path = require('path');

// 动态生成 logs 文件夹（如果不存在）
const logsDir = path.resolve(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

let currentLogDate = getCurrentDate(); // 当前日志日期
let logFile = createLogFile(currentLogDate);

// 创建日志文件
function createLogFile(date) {
    const logFilePath = path.resolve(logsDir, `${date}.txt`);
    return fs.createWriteStream(logFilePath, { flags: 'a' });
}

// 更新日志文件逻辑
function updateLogFile() {
    const newDate = getCurrentDate();
    if (newDate !== currentLogDate) {
        // 日期变化，关闭旧的日志文件，创建新的日志文件
        logFile.end();
        currentLogDate = newDate;
        logFile = createLogFile(currentLogDate);
    }
}

// 覆盖 console.log 并输出日志到文件和控制台
console.log = function() {
    updateLogFile(); // 检查并更新日志文件
    logFile.write(util.format.apply(null, arguments) + '\n');
    process.stdout.write(util.format.apply(null, arguments) + '\n');
};

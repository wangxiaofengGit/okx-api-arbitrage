const fs = require('fs');
const util = require('util');
const path = require('path');
const getCurrentDate = require('../utils/date');

// 动态生成 logs 文件夹（如果不存在）
const logsDir = path.resolve(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

let currentLogDate = getCurrentDate().split(' ')[0]; // 当前日志日期
let logFile = createLogFile(currentLogDate);

// 创建日志文件
function createLogFile(date) {
    const logFilePath = path.resolve(logsDir, `${date}.txt`);
    return fs.createWriteStream(logFilePath, { flags: 'a' });
}

// 更新日志文件逻辑
function updateLogFile() {
    const newDate = getCurrentDate().split(' ')[0];
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

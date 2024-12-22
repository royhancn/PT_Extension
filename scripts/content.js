// 从字符串中截取需要的内容
function extractContent(str, startChar, endChar) {
    const startIndex = str.indexOf(startChar) + startChar.length;
    const endIndex = str.indexOf(endChar, startIndex);
    return str.substring(startIndex, endIndex);
  }

function weeksAgo(dateString) {
    const today = new Date(); // 当前日期
    const date = new Date(dateString); // 字符串日期转换成Date对象
    const diff = today.getTime() - date.getTime(); // 计算两个日期的毫秒差
    const days = diff / (1000 * 60 * 60 * 24); // 将差异转换成天数
    const weeks = days / 7; // 将天数转换成星期数
   
    return Math.floor(weeks); // 向下取整到最接近的整周数
  }

function calculateValueA(uploadedWeeks, size, seederCount) {
    A = (1 - (10 ** (-uploadedWeeks/12))) * size * 2 * (1 + Math.sqrt(2) * (10 ** (-(seederCount - 1)))) * (2 / (seederCount + 1))
    return A
}

// 获取账号信息
var infoTable = document.getElementById("info_block")
var infoTdElements = infoTable.querySelectorAll("td")
var infoText = infoTdElements[1].innerText

var bonus = extractContent(infoText,"魔力值：[使用]: "," 邀请 [发送]")

var torrentTable = document.getElementsByClassName("torrents progresstable")[0]
var torrentTrElements = torrentTable.getElementsByClassName("stickbg progresstr")
for (var i = 0; i < torrentTrElements.length; i++) {
    var childInfo = torrentTrElements[i].children
    var uploadedTimeRaw = childInfo[3].innerHTML
    var uploadedTime = extractContent(uploadedTimeRaw,"<span title=\"","\">")
    var uploadedWeeks = weeksAgo(uploadedTime)
    
    var sizeRaw = childInfo[4].innerText
    if (sizeRaw.includes("GB")){
        var size = Number(sizeRaw.substring(0, sizeRaw.length - 4))
    } else {
        var size = Number(sizeRaw.substring(0, sizeRaw.length - 4)) / 1000
    }

    var seederCount = Number(childInfo[5].innerText)

    A = calculateValueA(uploadedWeeks,size,seederCount)

    console.log(i, A)
}
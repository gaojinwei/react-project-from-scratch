/*根据出生日期算出年龄*/
function getAge(strBirthday) {
  var returnAge;
  var strBirthdayArr = strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];

  var d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();

  if (nowYear == birthYear) {
    returnAge = 0; //同年 则为0岁
  } else {
    var ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay; //日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      } else {
        var monthDiff = nowMonth - birthMonth; //月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge; //返回周岁年龄
}

// 根据生日的月份和日期，计算星座。
function getConstellation(strBirthday) {
  let month = getMonth(strBirthday);
  let day = getDay(strBirthday);
  var s = "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
  var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
  return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2);
}

function getMonth(strBirthday) {
  var strBirthdayArr = strBirthday.split("-");
  var birthMonth = strBirthdayArr[1];
  return birthMonth;
}

function getDay(strBirthday) {
  var strBirthdayArr = strBirthday.split("-");
  var birthDay = strBirthdayArr[2];
  return birthDay;
}

export { getAge, getConstellation };

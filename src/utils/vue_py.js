import { pinyin } from './pinyin.js'
export default {
  chineseToPinYin: function (l1) {
    var l2 = l1.length
    var I1 = ''
    var reg = new RegExp('[a-zA-Z0-9]')
    for (var i = 0; i < l2; i++) {
      var val = l1.substr(i, 1);
    if(this.isChinese(val)){
      var name = this.arraySearch(val, pinyin)
      if (reg.test(val)) {
        I1 += val
      } else if (name !== false) {
        I1 += name
      }
    }else{
        I1+=val;
    }
}
    I1 = I1.replace(/ /g, '-')
    while (I1.indexOf('--') > 0) {
      I1 = I1.replace('--', '-')
    }
    return I1
    
  },
  arraySearch: function (l1, l2) {
    for (var name in pinyin) {
      if (pinyin[name].indexOf(l1) !== -1) {
        return this.ucfirst(name)
      }
    }
    return false
  },
  ucfirst: function (l1) {
    if (l1.length > 0) {
      var first = l1.substr(0, 1).toUpperCase()
      var spare = l1.substr(1, l1.length)
      return first + spare
    }
  },
  isChinese(str){
    var entryVal=str;
    var entryLen=entryVal.length;
    var cnChar=entryVal.match(/[^\x00-\x80]/g);
    if(cnChar!=null&&cnChar.length>0) return true;
    else return false;
  }
}

export default {
  state: {

    inline: false, // 是否使用inline排版
    labelPosition: 'right', // 标签对齐方式
    labelWidth: '80px', // 标签宽度
    modelname:'默认api模型',
    api:'autoapi',
    size: 'small', // 尺寸
    statusIcon: true, // 显示验证图标
    formItemList: [],
    // inline: false, // 是否使用inline排版
    // labelPosition: 'right', // 标签对齐方式
    // labelWidth: '80px', // 标签宽度
    // size: 'small', // 尺寸
    // statusIcon: true, // 显示验证图标
    // formItemList: [{
    //   "type": "input",
    //   "label": "文本",
    //   "disabled": false,
    //   "readonly": false,
    //   "value": "",
    //   "placeholder": "请输入一些文本",
    //   "rules": [
    //   ],
    //   "key": "4b48647d-506c-4cdb-85e3-81dffeb807cb",
    //   "subtype": "text"
    // }],
  },
  mutations: {
    UPDATE_FORM(state, payload) {
      
      Object.assign(state, payload);
    },
  },
};

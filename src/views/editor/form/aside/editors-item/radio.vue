<template lang="pug">
  div
    el-form(v-on="$listeners" v-bind="$attrs")
      el-form-item(label="标签名")
        el-input(v-model="formItem.label" v-on:input ="inputFunc")
      el-form-item(label="键名")
        el-input(:value="formItem.key" readonly)
      el-form-item(label="默认值" v-if="formItem.optionsUrl===undefined")
        el-select(v-model="formItem.value" clearable)
          el-option(v-for="o in formItem.options" :key="o.value" :label="o.label" :value="o.value")
      el-form-item(v-else label="数据URL")
        el-input(v-model="formItem.optionsUrl")
      el-form-item(label="显示边框")
        el-switch(v-model="formItem.border")
      el-form-item(label="按钮形状")
        el-switch(v-model="formItem.button")

    editor-options(v-if="formItem.optionsUrl===undefined" :itemOptions="formItem.options")

    //- wtf?
    //- editor-rules(:item-rules.sync="formItem.rules" :item-type="formItem.type")
    //- todo 理论上不需要@update
    editor-rules(:item-rules="formItem.rules" @update:item-rules="n => formItem.rules = n" :item-type="formItem.type" types="required")

    pre {{formItem}}
</template>

<script>
import EditorRules from '../editor-rules';
import EditorOptions from '../editor-options';
import vPinyin from '@/utils/vue_py';
export default {
  components: { EditorRules, EditorOptions },
  props: {
    formItem: {
      type: Object,
      required: true,
    },
  },
   methods: {
      inputFunc(){
        const keys= vPinyin.chineseToPinYin(this.formItem.label);
        this.$store.state.itemKey=keys;
        this.formItem.key=keys;
      }
  },
};
</script>

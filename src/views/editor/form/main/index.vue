<template lang="pug">
  el-main
    fake-form(:form-config="currentForm")
    //- pre {{currentForm}}
    p
    el-button(type="primary" icon="el-icon-delete" @click="claerForm") 清空
</template>

<script>
import FakeForm from './fake-form';

export default {
  components: { FakeForm },
  computed: {
    currentForm() {
      return this.$store.state.form;
    },
  },
  methods:{
    claerForm(){
      console.log("清空")
      this.$store.state.form.formItemList=[]
    }
  }
};
</script>

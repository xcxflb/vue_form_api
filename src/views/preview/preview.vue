<template lang="pug">
  div
    p
    dynamic-form(:form-config="form" v-model="shuju" ref="form-preview" v-if="form")
    el-button(@click='$router.go(-1)' :size="form.size") 返回
    el-button(@click='validate' :loading="loading" type="primary" :size="form.size") 测试验证
    el-button(@click='sendModel' :loading="loading" type="success" :size="form.size") 保存模型
    p 表单数据：
      pre {{shuju}}
    p 表单配置：
      pre {{form}}
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      shuju: {},
      loading: false,
    };
  },
  computed: {
    ...mapState(['form']),
  },
  methods: {
    validate() {
      this.loading = true;
      const form = this.$refs['form-preview'].$children[0];
      form
        .validate()
        .then(() => {
          this.loading = false;
          console.log('----===---');
          console.log(this.shuju);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    
    sendModel(){
      console.log("保存模型");
      const form = this.$refs['form-preview'].$children[0];
      console.log(form);
      console.log(this.form);
      
      if(this.form.formItemList&&this.form.formItemList.length>0){
        console.log("存在")
        var api=this.form.api;
        var jsondata=JSON.stringify(this.form);
        console.log(jsondata);
    let url="http://bc.com/index/index/addGameModel?config="+jsondata+"&api="+api;
      this.$http.get(url).then(res => {
        console.log(res)
      });
      }

    },

  },
      mounted() {
      console.log('预览配置');
     

    },
};
</script>

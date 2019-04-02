<template>
  <div >
    <!-- 文本 -->
    <p>8888</p>
        <p>8888</p>
            <p class='bg_box'>8888</p>
         
  </div>
</template>

<script>

import vPinyin from '@/utils/vue_py'

export default {
  data() {
    return {
      popInput: false,
      popRadio: false,
      popCheckbox: false,
      popSelect: false,
      popDate: false,
      popCascader: false,
      preConfigDataSelect: {
        mode: 'multiple',
        source: 'ajax',
      },
    };
  },
  methods: {
   getModel(){       
    const id=5;
    const self=this;
    // self.$store.state.form.formItemList.push()
    let url="http://bc.com/index/index/getGameModel?id="+id;
    this.$http.get(url).then(res => {
       
        if(res&&res.status==200){
          var rest=res.data;
          // console.log(rest);
          if(rest.status==1){
        var model=JSON.parse(rest.data.info);
          console.log(model);
          // self.$store.state.form=model;
          // self.$store.state.form.formItemList.push()
          }
        
        }
        
      });
      }
   
  },
  mounted(){
    this.getModel()
    console.log("aa")
  }
};
</script>
<style lang="less" scoped>
.bg_box {
    width: 100%;
    height: 1rem;
}
</style>


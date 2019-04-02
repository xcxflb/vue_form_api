<template >
<div>
 <div class='hr_box'></div>
<div class='center_box'>
   
<el-radio-group v-model="labelPosition" size="small">
  <el-radio-button label="left">上传图片</el-radio-button>
  <el-radio-button label="right">系统图库</el-radio-button>
</el-radio-group>
<div v-if="labelPosition=='left'">
    <div class='hr_box'></div>
    <el-upload
  class="upload-demo"
  drag
  action="https://jsonplaceholder.typicode.com/posts/"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1000kb</div>
</el-upload>
<div class='hr_box'></div>
<div class='hr_box'></div>
<el-form :inline="true" :model="formInline" class="demo-form-inline">
  
  <el-form-item label="生成图片地址">
    <el-input  placeholder="链接"></el-input>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="copy">复制</el-button>
  </el-form-item>
</el-form>

</div>

</div>
</div>
</template>

<script>

export default {
  data() {
    return {
 labelPosition: 'left',
 formInline:{},
    };
  },
  computed: {
   
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
    
    copy(){

    }

  },
      mounted() {
      console.log('图片配置');
     

    },
};
</script>
<style scoped>
.hr_box {
    width: 100%;
    height: 0.8rem;
}
.center_box {
    width: 90%;
    height: 90%;
    text-align: center;
    margin: 0 auto;
}
.demo-form-inline {
    width: 500px;
    text-emphasis: center;

    margin: 0 auto;
}
</style>

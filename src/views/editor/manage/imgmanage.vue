<template >
<div>
 <div class='hr_box'></div>
<div class='center_box'>
   
<el-radio-group v-model="labelPosition" size="small" @change='changeShow'>
  <el-radio-button label="left">上传图片</el-radio-button>
  <el-radio-button label="right">系统图库</el-radio-button>
</el-radio-group>
   <div class='hr_box'></div>
<div v-if="labelPosition=='left'">
 
    <el-upload
  class="upload-demo"
  :on-success="upimg"
  drag
  name='image'
  action="http://bc.com/index/index/upload_img"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1000kb</div>
</el-upload>
<div class='hr_box'></div>
<div class='hr_box'></div>
<el-form :inline="true" :model="formInline" class="demo-form-inline" >
  
  <el-form-item label="生成图片地址" >
    <el-input  placeholder="链接" v-model="filename" id='success_form_input'></el-input>
  </el-form-item>
  
  <el-form-item>
    <button ref="copy" data-clipboard-action="copy" data-clipboard-target="#success_form_input" @click="copylink" class='elcopy'>复制</button>
    <!-- <el-button type="primary" ref="copy" data-clipboard-action="copy" data-clipboard-target="#success_form_input" @click="copylink">复制</el-button> -->
  </el-form-item>
</el-form>

</div>
<div v-else>
  <el-row>
  <el-col :span="4" v-for="(item,index) in imgList" :key="item.id" :offset="index > 0 ? 2 : 0">
    <el-card :body-style="{ padding: '0px' }">
      <div class='img_info'>
      <div class="imgbox">
      <img :src="item.img" class='imgitem'>
      </div>
      </div>
      <div style="padding: 14px;">
        <span>图片</span>
        <div class="bottom clearfix">

    <el-button type="primary">复制图片</el-button>
  <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
<el-col :span="24" class="toolbar">
		
  
			<el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :page-size="10" :current-page.sync="pageNo"  :total="total" style="float:right;">
			</el-pagination>
		</el-col>
 
</div>

</div>
</div>
</template>

<script>

export default {
  data() {
    return {
 labelPosition: 'left',
 filename:'',
 imgList:[],
 pageNo:1,
 total:10,
 currentDate:20190504,
  copyBtn: null,
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
    getImgList(page){
  let url="http://bc.com/index/index/get_sysimg_list?page="+page;
      this.$http.get(url).then(res => {
        console.log(res)
        if(res.status==200){
          if(res.data.status==1){
            this.imgList=res.data.data
            console.log(this.imgList)
        
          }
        }
      });
    },
    handleCurrentChange(){

    },
    changeShow(){
           console.log(this.labelPosition)

  
      if(this.labelPosition=='left'){
     
      }else{

          this.getImgList(1);
      }
    },
    copylink(){
       let _this = this;
    let clipboard = _this.copyBtn;
    clipboard.on('success', function() {
        _this.$message({ /*这是使用了element-UI的信息弹框*/
            message: '复制成功！',
            type: 'success'
        });
    });
    clipboard.on('error', function() {
        _this.$message({
            message: '复制失败，请手动选择复制！',
            type: 'error'
        });
    });
    },
    upimg(response){
      console.log(response);
      if(response.status==1){
      this.filename=response.data.filename;
        this.$message({
							message: '上传图片成功',
							type: 'success'
            });
      }
    
    }

  },
      mounted() {
      console.log('图片配置');
     this.copyBtn = new this.Clipboard(this.$refs.copy);

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
.elcopy {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: #fff;
    border: 1px solid #409eff;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    background-color: #409eff;
}

 .time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
  .imgbox {
    position: relative;
    overflow: hidden;
    padding-bottom: 100%;
}
  .imgitem {
    max-width: 100%;
    max-height: 100%;
  }
  .image {
    width: 100%;
    display: block;
    height: 9rem;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both;
    }
.img_info {
    width: 100%;
    background: white;
    outline: 1px solid red;
    height: 200px;
}

.imgbox img {
    width: 70%;
    height: auto;
}
</style>

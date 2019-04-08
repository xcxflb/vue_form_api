<template >
  <div>
  
      <div class='model_body'>

<el-row :gutter="18">
  <el-col :span="2"><el-tag>请选择应用</el-tag></el-col>

  <el-col :span="4"><el-select v-model="value2" placeholder="请选择" @change="changeAPP">
    <el-option
      v-for="item in options2"
      :key="item.appid"
      :label="item.app_name"
      :value="item.appid"
      :disabled="item.disabled">
    </el-option>
  </el-select></el-col>

</el-row>


<div class='hr_box'></div>
<el-form :inline="true" :model="formInline" class="demo-form-inline">
  
  <el-form-item label="模型名称">
    <el-input v-model="formInline.user" placeholder="名称"></el-input>
  </el-form-item>
  <el-form-item label="管理员">
    <el-select v-model="formInline.region" placeholder="管理员名称">
      <el-option label="admin" value="shanghai"></el-option>
      <el-option label="运营" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
<el-radio-group v-model="labelPosition" size="small" @change='changeModel'>
  <el-radio-button label="left">全部模型</el-radio-button>
  <el-radio-button label="right">已选择模型</el-radio-button>
</el-radio-group>

 <el-col class='right_msg'><el-tag  @click="outExe()">导出excel</el-tag></el-col>
<div class='hr_box'></div>

<el-dialog
  :title="modelname"
  :visible.sync="dialogVisible"
  width="80%"
  :before-close="handleClose"
  @close="closeMsg"
  >
<div v-if="dialog_type==1">
  <dynamic-form :form-config="form" v-model="shuju" ref="form-preview" v-if="form" ></dynamic-form>
  <p class='b_line'></p>
    <el-row :gutter="16" v-if="form">
       <el-col :span="1"><div class='btn_box'></div></el-col>
      <el-col :span="4"><span>默认排序: </span><el-input v-model="order" placeholder="请输入排序" class="order_box"></el-input></el-col>
                <el-col :span="3"><span>展示给前端: </span><el-switch
  v-model="apishow">
</el-switch></el-col>
     </el-row> 
  <p></p>
  <el-row :gutter="16">
  <el-col :span="2"><div class='btn_box'></div></el-col>
  <el-col :span="4"><el-button type="success" @click="addData" >提交</el-button></el-col>
  <el-col :span="4"><el-button plain  @click="clearData" >清空</el-button></el-col>
</el-row>


  </div>
  <div v-else-if="dialog_type==2">


  <el-table
    :data="DataList"
    border
    @selection-change="setapi"
  > 
  <el-table-column type="selection" width="55">
			</el-table-column>
    <el-table-column
      prop="addtime"
      label="添加时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="admin"
      label="管理员"
      width="130">
    </el-table-column>
    <el-table-column
      prop="info"
      label="数据详情"
      >
     <template slot-scope="scope" >
       <div v-if="editid==scope.row.id?true:false">
        <el-input placeholder="请输入内容" v-model="scope.row.info" class="input-with-select">
        <el-button slot="append" icon="el-icon-circle-check-outline" @click="editChange">修改</el-button>
        </el-input>
       </div>
       <div v-else>{{scope.row.info}}</div>
   </template>
    </el-table-column>
        <el-table-column
          label="状态"
      width="60"
      >
         <template slot-scope="scope">
           <el-switch
      v-model="scope.row.isshow"
    :active-value="1"
    :inactive-value="0"
  @change="switchStatus(scope.row.id,scope.row.isshow)"
  >
</el-switch>
      </template>
    </el-table-column>
    <el-table-column
       label="排序"
      width="100">
      <template slot-scope="scope">
  <el-input placeholder="请排序" >
  </el-input>
             </template>
    </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="150">
   <template slot-scope="scope">
        <el-button @click="editClick(scope.row.id)" type="text" size="small" >编辑</el-button>
           <el-button @click="copyClick(scope.row.id)" type="text" size="small">复制</el-button>     
        <el-button type="text danger" size="small" @click="del_api(scope.row.id)" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<div class='hr_box'></div>


 <el-row :gutter="16">
			 <el-col :span="4"><el-button type="primary" @click="batchAdd" :disabled="this.sels.length===0">批量复制</el-button> <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button></el-col>
      	 <el-col :span="3"></el-col>
        <el-col :span="4"><div class='btn_box'></div></el-col>
	 <el-col :span="6"><el-pagination
  small
  layout="prev, pager, next"
  :total="30"
  >
</el-pagination>
</el-col>
		</el-row>
    </div>
          <el-dialog
      width="50%"
      title="复制数据到"
      :visible.sync="innerVisible"
      append-to-body>
      <span>  应用:  </span><el-select v-model="theapp" placeholder="请选择">
    <el-option
      v-for="item in apparr"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <span> 模型:  </span><el-select v-model="theapp" placeholder="请选择">
    <el-option
      v-for="item in apparr"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <el-button type="primary" @click="onSubmit">确认复制</el-button>

      <p>复制的数据:</p>
      <pre>
        {{copydata}}
      </pre>
    </el-dialog>
      <span slot="footer" class="dialog-footer ">

    <el-button type="primary" @click="dialogVisible = false;clearData()">完成添加</el-button>
  </span>
</el-dialog>

      <el-table
    :data="tableData"
    border  @selection-change="selsChange" >
    <el-table-column type="selection" width="55">
			</el-table-column>
    <el-table-column
      prop="addtime"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="管理员"
      width="180">
    </el-table-column>
    <el-table-column
      prop="modelname"
      label="api模型">
    </el-table-column>
      <el-table-column
      prop="api"
       width="240"
      label="api地址">
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
           <el-button @click="addClick(scope.row.id)" type="text" size="small">增加</el-button>
          <el-button @click="handleClick(scope.row.id,2)" type="text" size="small">数据列表</el-button>
            <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
        <el-button type="text danger" size="small" @click="del_model(scope.row.api)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<el-col :span="24" class="toolbar">
			<el-button type="success" @click="batchAdd" :disabled="this.sels.length===0">批量添加</el-button>
      	<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :page-size="10" :current-page.sync="pageNo"  :total="total" style="float:right;">
			</el-pagination>
		</el-col>
  <!-- <el-pagination
   background
    @current-change="handleCurrentChange"
    :current-page.sync="pageNo"
  :page-size="10"
  :pager-count="15"
  layout="prev, pager, next"
  :total="100">
</el-pagination> -->
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
        labelPosition: 'right',
       
          options2: [],
    value2: '',
    apparr: [{
          value: '选项1',
          label: '应用1'
        }, {
          value: '选项2',
          label: '应用2'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],
    theapp:'',
     shuju:{},
     copydata:{},
     modelname:'测试模型',
     form:'',
     innerVisible:false,
     apishow:true,//默认api展示给前端
     order:0,
     apiid:1,
    editid:0,
     dialog_type:1,
    dialogVisible:false,
    DataList: [],
      sels:'',
      modelid:'',
      apidata:'',
      pageNo:1,
      total:100,
       formInline: {
          user: '',
          region: ''
        },
       tableData: []
    };
  },
  computed: {
 
  },
  methods: {
    handleDelete(){

    },
    //修改模型api
    changeModel(){
      console.log("修改model列表");
      console.log(this.labelPosition)

         this.tableData=[];
      if(this.labelPosition=='left'){
        this.getModel();
      }else{
        var appid=this.value2;
        this.getGameApi(appid);
      }
    },
    
    //编辑数据
    editClick(id){
      var eid=this.editid
      if(eid!=0&&eid==id){
         this.editid=0;
      }else{
         this.editid=id;
      }
     
      
    },
    outExe() {
  
                this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.excelData = this.tableData //你要导出的数据list。
                    this.export2Excel()
                }).catch(() => {
                
                });
            },

          export2Excel() {
                var that = this;
                require.ensure([], () => {
                    const { export_json_to_excel } = require('../../../../src/excel/Export2Excel'); //这里必须使用绝对路径
                    const tHeader = ['日期', 'name', '模型名称','api地址']; // 导出的表头名
                    const filterVal = ['addtime','name', 'modelname','api']; // 导出的表头字段名
                    const list = that.excelData;
                    const data = that.formatJson(filterVal, list);
                    let time1,time2 = '';
                    time1=this.CurentTime();
                    // if(this.start !== '') {
                    //     time1 = that.moment(that.start).format('YYYY-MM-DD')
                    // }
                    // if(this.end !== '') {
                    //     time2 = that.moment(that.end).format('YYYY-MM-DD')
                    // }
                    export_json_to_excel(tHeader, data, `${time1}_api模型数据管理excel`);// 导出的表格名称，根据需要自己命名
                })
            },
             formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            CurentTime()
    { 
        var now = new Date();
        
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();           //秒
        
        var clock = year + "-";
        
        if(month < 10)
            clock += "0";
        
        clock += month + "-";
        
        if(day < 10)
            clock += "0";
            
        clock += day + " ";
        
        if(hh < 10)
            clock += "0";
            
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm + ":"; 
         
        if (ss < 10) clock += '0'; 
        clock += ss; 
        return(clock); 
},
          
    del_model(api){
        let appid=this.value2;
      	this.$confirm('确认删除选中模型吗？', '提示', {
					type: 'warning'
				}).then(() => {
          console.log("queren")
        let url="http://bc.com/index/index/delGameApi?myappid="+appid+"&api="+api;
      this.$http.get(url).then(res => {
        console.log(res)
        if(res.status==200){
          if(res.data.status==1){
            console.log("删除成功")
          		this.$message({
							message: '删除模型成功',
							type: 'success'
            });
            this.getGameApi(appid);
          }
        }
      });
        }).catch(() => {
				});
    },
    del_api(id){
          var num=this.modelid;
          this.$confirm('确认删除选中数据吗？', '提示', {
					type: 'warning'
				}).then(() => {
           let url="http://bc.com/index/index/deldetailapi?id="+id;
      this.$http.get(url).then(res => {
        console.log(res)
        
        if(res.status==200){
          if(res.data.status==1){
            console.log("删除成功")
          		this.$message({
							message: '删除api成功',
							type: 'success'
            });
          if(num){
               this.getApiData(num);
          }
     
          }
        }
      });


        }).catch(() => {
				});
    },
    switchStatus(id,isshow){
      console.log("gaibian")
      console.log(id,isshow)
      var data={
        'id':id,
        'isshow':isshow,
      };
       let url="http://bc.com/index/index/apistatus";
      this.$http.post(url,this.$qs.stringify(data)).then(res => {
        console.log(res)
        if(res.status==200){
          if(res.data.status==1){
            var list=res.data.data
            console.log(list)
            console.log("修改状态")
          }
        }
      });
    },
    editChange(){
      console.log("修改啦")
    },
    //添加数据
    addData(){
    const form = this.$refs['form-preview'].$children[0];
      form
        .validate()
        .then(() => {
          console.log('----===---');
        
          const param=JSON.stringify(this.shuju);
          console.log(param);
          this.sendApiData(param)
        })
        .catch(() => {
     
        });
    },
    //清除数据
    clearData(){
      const arr=this.shuju
      if(arr){
        for (var index in arr){
              arr[index]='';
          }
      }
   
    },
    rowDblclick(row){
      console.log("info---")
    },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    batchRemove(){
      	var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
          let para = { ids: ids };
          console.log(para);
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						
					});
				}).catch(() => {
				});
			
    },
    setapi(sels){
      this.apidata = sels;
    },
    //全选
    selsChange(sels){
      console.log(sels);
      console.log("选择")
    this.sels = sels;
    },
    changeAPP(){
      console.log("改变app")
      console.log(this.value2);
      this.tableData=[];
      this.getGameApi(this.value2)
    },
    batchAdd(){

    	var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认批量增加选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '添加成功',
							type: 'success'
						});
						
					});
				}).catch(() => {
				});
			
    },
    closeMsg(){
      console.log("888")
      this.editid=0;
     
    },
    handleCurrentChange(){
      var num=this.pageNo
      this.getModel(num)
    },
    
     onSubmit() {
        console.log('submit!');
      },
      copyClick(num){
        console.log(num);
        this.innerVisible=true;
      },
      addClick(num){
          console.log(num)
        this.addFormModel(num);
           this.dialog_type=1;
           this.apishow=true;
           this.order=0;
          this.dialogVisible=true;
      },
     handleClick(num,type=1){
        console.log(num)
        if(type==2){
          console.log("num==")
          this.getApiData(num);
          this.modelid=num;
              this.dialogVisible=true;
              this.dialog_type=type;
        }else{
        this.$router.push({path:'/editor/form',query:{id:num}});
        }
    
      },
      getApiData(id){
        if(id){
      let url="http://bc.com/index/index/get_apidata?mid="+id;
      this.$http.get(url).then(res => {
        console.log(res)
        if(res.status==200){
          if(res.data.status==1){
            this.DataList=res.data.data
            // const form=JSON.parse(res.data.data.info)
            // this.form=form;
            // this.modelname=form.modelname
         
          }
        }
      });
      }
      },
      addFormModel(num){
//         const form={
//     inline: false, // 是否使用inline排版
//     labelPosition: 'right', // 标签对齐方式
//     labelWidth: '80px', // 标签宽度
//     size: 'small', // 尺寸
//     statusIcon: true, // 显示验证图标
//     formItemList: [{
//       "type": "input",
//       "label": "文本",
//       "disabled": false,
//       "readonly": false,
//       "value": "3434",
//       "placeholder": "请输入一些文本",
//       "rules": [{
//           "required": true,
//           "message": "不能为空",
//           "trigger": "blur"
//         }],
//       "key": "4b48121212ffeb807cb",
//       "subtype": "text"
//     },{
//       "type": "input",
//       "label": "文本",
//       "disabled": false,
//       "readonly": false,
//       "value": "3434",
//       "placeholder": "请输入一些文本",
//       "rules": [{
//           "required": true,
//           "message": "不能为空",
//           "trigger": "blur"
//         }],
//       "key": "4b48643fcb",
//       "subtype": "text"
//     },{
//       "type": "input",
//       "label": "文本",
//       "disabled": false,
//       "readonly": false,
//       "value": "3434",
//       "placeholder": "请输入一些文本",
//       "rules": [{
//           "required": true,
//           "message": "不能为空",
//           "trigger": "blur"
//         }],
//       "key": "4b48647d-506c-4c5e3-81dfcb",
//       "subtype": "text"
//     },{
//       "type": "input",
//       "label": "文本",
//       "disabled": false,
//       "readonly": false,
//       "value": "3434",
//       "placeholder": "请输入一些文本",
//       "rules": [{
//           "required": true,
//           "message": "不能为空",
//           "trigger": "blur"
//         }],
//       "key": "4b48647d-506c-cdb-85e3-81dfcb",
//       "subtype": "text"
//     },{
//       "type": "input",
//       "label": "文本",
//       "disabled": false,
//       "readonly": false,
//       "value": "3434",
//       "placeholder": "请输入一些文本",
//       "rules": [{
//           "required": true,
//           "message": "不能为空",
//           "trigger": "blur"
//         }],
//       "key": "4b48647d-506c-4c23db-85e3-81dfcb",
//       "subtype": "text"
//     }]
// };
// console.log(typeof(form))
//     this.form=form;
this.apiid=num;
   let url="http://bc.com/index/index/getGameModel?id="+num;
      this.$http.get(url).then(res => {
        console.log(res)
        if(res.status==200){
          if(res.data.status==1){
            const form=JSON.parse(res.data.data.info)
            this.form=form;
            this.modelname=form.modelname
            console.log(form.modelname)
            console.log(form.formItemList)
          }
        }
      });
      },
    //发送api数据
    sendApiData(param=''){
      if(param){
        let unionid=1;
        let admin="admin";
        let order=this.order;
        let mid=this.apiid;
        let isshow=this.apishow;
       let url="http://bc.com/index/index/add_apidata";
       let info={
         'info':param,
         'admin':admin,
         'unionid':unionid,
         'order':order,
         'mid':mid,
         'isshow':isshow
       };
      this.$http.post(url,this.$qs.stringify(info)).then(res => {
        console.log(res)
        if(res.status==200){
          if(res.data.status==1){
           this.$message({
              message: '成功添加一条api数据',
              type: 'success'
            });
       
          }
        }
      });
      }
    },
    getGameApi(appid){

        let url="http://bc.com/index/index/getGameApi?myappid="+appid+"&page=1";
      this.$http.get(url).then(res => {
        if(res.status==200){
          if(res.data.status==1){
            var list=res.data.data
           this.tableData=list;
          }
        }
      });
    },
    getAPPList(page){//获取应用列表
    let url="http://bc.com/index/index/get_app_list?page="+page;
      this.$http.get(url).then(res => {
        console.log(res)
        if(res.status==200){
          if(res.data.status==1){
            var list=res.data.data
            this.value2=list[0].appid;
            this.getGameApi(this.value2);
            this.options2=list;
          }
        }
      });
    },
    getModel(page=1){

    let url="http://bc.com/index/index/getAllGameModel?page="+page;
      this.$http.get(url).then(res => {
        console.log(res)
        if(res.status==200){
          if(res.data.status==1){
            var list=res.data.data
            this.tableData=list
          }
        }
      });
    //   }

    },

  },
      mounted() {
      console.log('模型管理');
      this.getAPPList(1);
    },
};
</script>
<style scoped>
.model_body {
  width: 94%;
  margin: 10px auto;
}
.toolbar {
  margin-top: 0.8rem;
}
.right_msg {
    float: right;
    width: 5.3rem;
}
.hr_box {
    width: 100%;
    height: 0.8rem;
}
.btn_box {
width: 0.5rem;
height: 0.5rem;
background-color: #fff;
}

.rate_box {
  font-size: 18px;
  width: 65%;
  height: 40px;
  float: right;
}
.order_box {
  width: 120px;
}
.b_line {
  width: 100%;
  height: 1px;
  background-color: #e3e3e3;
}
</style>

<template >
  <div>
  
      <div class='model_body'>
          <div class='center_box'>
<el-radio-group v-model="labelPosition" size="small" @change="changeShow">
  <el-radio-button label="left">应用列表</el-radio-button>
  <el-radio-button label="right">添加应用</el-radio-button>
</el-radio-group>
</div>
   <div class='hr_box'></div>
<div v-if="labelPosition=='left'" >
 <el-table
    :data="tableData"
    border
    style="width: 100%;">
    <el-table-column
      prop="addtime"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="uname"
      label="管理员"
      width="180">
    </el-table-column>
        <el-table-column
      prop="app_name"
      label="应用名">
    </el-table-column>
    <el-table-column
      prop="appid"
      label="应用id">
    </el-table-column>
       <el-table-column
      prop="game_type"
      label="应用类型">
    </el-table-column>
       <el-table-column
      prop="desc"
      label="描述">
    </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <span>开启应用: </span><el-switch
      v-model="scope.row.isshow"
    :active-value="1"
    :inactive-value="0"
  @change="switchStatus(scope.row.appid,scope.row.isshow)"
  >
</el-switch>
        <el-button type="text danger" size="small" @click="del_model(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  
<el-col :span="24" class="toolbar">
		
			<el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :page-size="10" :current-page.sync="pageNo"  :total="total" style="float:right;">
			</el-pagination>
		</el-col>
</div>
<div v-else>
  <dynamic-form :form-config="form" v-model="shuju" ref="form-api" v-if="form" ></dynamic-form>
<el-row>
        <div class='center_box'>

  <el-button type="primary" @click='validate'>添加</el-button>
  </div>
</el-row>
</div>


  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';


export default {
  data() {
    return {
      sels:'',
      pageNo:1,
      total:100,
      shuju:{},
      form:'',
       formInline: {
          user: '',
          region: ''
        },
    labelPosition:'left',
         tableData: []
    };
  },
  computed: {
  
  },
  methods: {
    handleDelete(){

    },
    changeShow(){
        console.log("showapp")
        if(this.labelPosition=='right'){
            this.showForm();
        }
    },
    handleCurrentChange(){
      var num=this.pageNo
    this.get_app_list(num)
    },
    switchStatus(id,isshow){
      console.log("gai--bian")
      console.log(id,isshow)
      var data={
        'myappid':id,
        'isshow':isshow,
      };
       let url="http://bc.com/index/index/appstatus";
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
    batchRemove(){
      	var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
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

     validate() {
      this.loading = true;
      const form = this.$refs['form-api'].$children[0];
      form
        .validate()
        .then(() => {
    
          console.log('----===-add--');
          console.log(this.shuju);
          this.add_app(this.shuju);
        })
        .catch(() => {
     
        });
    },
    add_app($data){
    let url="http://bc.com/index/index/add_app";
      this.$http.post(url,this.$qs.stringify($data)).then(res => {
        console.log(res)
        if(res.status==200){
          if(res.data.status==1){
            var list=res.data.data
            console.log(list)
          }
        }
      });
    },
     handleClick(num){
        console.log(num)
        this.$router.push({path:'/editor/form',query:{id:num}});
      },
    get_app_list(page=1){//获取应用列表

    let url="http://bc.com/index/index/get_app_list?page="+page;
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
    showForm(){
    const form={
    inline: false, // 是否使用inline排版
    labelPosition: 'right', // 标签对齐方式
    labelWidth: '150px', // 标签宽度
    size: 'small', // 尺寸
    statusIcon: true, // 显示验证图标
    formItemList: [{
      "type": "input",
      "label": "应用名称",
      "disabled": false,
      "readonly": false,
      "value": "微信应用",
      "placeholder": "请输入名称",
      "rules": [{
          "required": true,
          "message": "不能为空",
          "trigger": "blur"
        }],
      "key": "app_name",
      "subtype": "text"
    },{
      "type": "input",
      "label": "应用appid",
      "disabled": false,
      "readonly": false,
      "value": "wx",
      "placeholder": "请输入一些应用简称",
      "rules": [{
          "required": true,
          "message": "不能为空",
          "trigger": "blur"
        }],
      "key": "appid",
      "subtype": "text"
    },{
      "type": "input",
      "label": "排序",
      "disabled": false,
      "readonly": false,
      "value": "0",
      "placeholder": "请输入一些排序数字",
      "rules": [{
          "required": true,
          "message": "不能为空",
          "trigger": "blur"
        }],
      "key": "order",
      "subtype": "text"
    },{
      "type": "switch",
  "label": "是否开启",
  "appearance": "switch",
  "value": true,
  "key": "isshow"  
    },{
      "type": "input",
      "label": "备注",
      "disabled": false,
      "readonly": false,
      "value": "3434",
      "placeholder": "请输入备注",
      "rules": [{
          "required": false,
          "trigger": "blur"
        }],
      "key": "desc",
      "subtype": "text"
    }]
};

this.form=form;

    }

  },
      mounted() {
      console.log('应用管理');
      this.get_app_list(1);
     

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

  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
.center_box {
    width: 90%;
    height: 90%;
    text-align: center;
    margin: 0 auto;
}
.hr_box {
    width: 100%;
    height: 0.8rem;
}
</style>

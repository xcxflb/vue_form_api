<template >
  <div>
  
      <div class='model_body'>
<el-form :inline="true" :model="formInline" class="demo-form-inline">
  
  <el-form-item label="管理员">
    <el-input v-model="formInline.user" placeholder="管理员名称"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
   <el-form-item label="请选择时间">
 <el-date-picker
      v-model="value7"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2">
    </el-date-picker>
  </el-form-item>
</el-form>

<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
      label="权限列表">
    </el-table-column>
        <el-table-column
      prop="modelname"
         width="120"
      label="管理员类型">
    </el-table-column>
    <el-table-column
      prop="modelname"
      label="管理员信息">
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row.id)" type="text" size="small">修改</el-button>
        <el-button type="text danger" size="small" >删除</el-button>
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
      sels:'',
      pageNo:1,
      total:100,
      dialogVisible:false,
       pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value7: '',
       formInline: {
          user: '',
          region: ''
        },
       tableData: []
    };
  },
  computed: {
    ...mapState(['form']),
  },
  methods: {
    handleDelete(){

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
    selsChange(sels){
      console.log(sels);
      console.log("选择")
      this.sels = sels;
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
    handleCurrentChange(){
      var num=this.pageNo
      this.getModel(num)
    },
     onSubmit() {
        console.log('submit!');
      },
     handleClick(num){
       this.dialogVisible=true;

      },
    getModel(page=5){

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
      this.getModel();
     

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
</style>

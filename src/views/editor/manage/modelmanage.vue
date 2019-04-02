<template >
  <div>
  
      <div class='model_body'>
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
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="modelname"
      label="api模型">
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
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
        console.log(num)
        this.$router.push({path:'/editor/form',query:{id:num}});
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

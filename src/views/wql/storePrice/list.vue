<template>
  <div class="app-container">
    <div class="filter-container">
      <!--检索条件-->
      <el-input v-model="listQuery.storeName" placeholder="酒店名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.storeRegion" placeholder="酒店地址" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.storePhone" placeholder="酒店电话" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
    </div>
    <!--列表-->
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" height="700">
      <el-table-column align="center" label="ID" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="酒店名称">
        <template slot-scope="scope">
          <span>{{ scope.row.storeName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="酒店区域">
        <template slot-scope="scope">
          <span>{{ scope.row.storeRegion }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="酒店地址">
        <template slot-scope="scope">
          <span>{{ scope.row.storeAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="酒店电话">
        <template slot-scope="scope">
          <span>{{ scope.row.storePhone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建人">
        <template slot-scope="scope">
          <span>{{ scope.row.createBy }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="'/storePrice/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <router-link :to="'/storePrice/delete/'+scope.row.id">
            <el-button type="danger" size="small" icon="el-icon-delete">删除</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/storePrice'
import Pagination from '@/components/Pagination/index.vue' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>

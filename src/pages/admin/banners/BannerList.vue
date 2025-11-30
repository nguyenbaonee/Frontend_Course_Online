<template>
  <div class="page-container">
    <!-- Header -->
    <el-card shadow="never" class="page-header">
      <div class="header-content">
        <div class="header-left">
          <h2 class="page-title">Quản lý Banner</h2>
        </div>
        <div class="header-right">
          <el-button type="primary" :icon="Plus" @click="handleCreate">
            Thêm Banner
          </el-button>
        </div>
      </div>
    </el-card>

    <!-- Filter Form -->
    <el-card shadow="never" class="filter-card">
      <el-form :inline="true" :model="searchForm" class="filter-form">
        <el-form-item label="Vị trí">
          <el-select v-model="searchForm.position" placeholder="Vị trí banner" clearable style="width: 180px">
            <el-option label="Menu" value="MENU" />
            <el-option label="Middle" value="MIDDLE" />
            <el-option label="Footer" value="FOOTER" />
          </el-select>
        </el-form-item>

        <el-form-item label="Trạng thái">
          <el-select v-model="searchForm.status" placeholder="Trạng thái" clearable style="width: 150px">
            <el-option label="Active" value="ACTIVE" />
            <el-option label="Deleted" value="DELETED" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">
            Tìm
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-button :icon="Refresh" @click="handleReset">
            Reset
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- Table -->
    <el-card shadow="never">
      <el-table v-loading="loading" :data="tableData" stripe>
        <el-table-column type="index" label="STT" width="60" align="center" />

        <el-table-column prop="title" label="Title" min-width="150" />

        <el-table-column label="Image" width="120" align="center">
          <template #default="{ row }">
            <el-image
                :src="`http://localhost:8089${row.imageUrl}`"
                fit="cover"
                style="width: 80px; height: 50px; border-radius: 4px"
            />
          </template>
        </el-table-column>

        <el-table-column prop="position" label="Vị trí" width="120" align="center" />

        <el-table-column prop="status" label="Trạng thái" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 'ACTIVE' ? 'success' : 'danger'">
              {{ row.status === 'ACTIVE' ? 'Active' : 'DELETED' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="createdAt" label="Thời gian tạo" width="160" align="center">
          <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>

        <el-table-column prop="updatedAt" label="Thời gian cập nhật" width="160" align="center">
          <template #default="{ row }">
            {{ formatDate(row.updatedAt) }}
          </template>
        </el-table-column>

        <el-table-column label="Hành động" width="280" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="info" size="small" link @click="viewDetail(row)">
              Detail
            </el-button>
            <el-button type="warning" size="small" :icon="Edit" link @click="handleEdit(row)">
              Edit
            </el-button>
            <el-button
                v-if="row.status === 'ACTIVE'"
                type="danger"
                size="small"
                :icon="Delete"
                link
                @click="handleDelete(row)"
            >
              Delete
            </el-button>
            <!-- Toggle Status -->
            <el-switch
                v-model="row.statusSwitch"
                active-value="ACTIVE"
                inactive-value="DELETED"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="toggleStatus(row)"
                style="margin-left: 8px"
            />
          </template>
        </el-table-column>

      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref,computed, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search, Refresh, Edit, Delete } from '@element-plus/icons-vue'
import axios from '../../../api/axios.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchForm = reactive({
  position: null,
  status: null
})


const tableData = reactive([])
const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    const params = {
      position: searchForm.position || undefined,
      status: searchForm.status || undefined,
    }
    const res = await axios.get('http://localhost:8089/banners', { params })
    tableData.splice(0, tableData.length, ...res.data)
    tableData.splice(0, tableData.length, ...res.data.map(item => ({
      ...item,
      statusSwitch: item.status
    })))
  } catch (err) {
    console.error(err)
    ElMessage.error('Fetch banners failed')
  } finally {
    loading.value = false
  }
}
const toggleStatus = async (row) => {
  try {
    const newStatus = row.statusSwitch
    await axios.post(`http://localhost:8089/banners/${row.id}/status`, null, {
      params: { status: newStatus }
    })
    ElMessage.success(`Banner "${row.title}" is now ${newStatus}`)
    row.status = newStatus // cập nhật trực tiếp cho tag trạng thái
  } catch (err) {
    console.error(err)
    ElMessage.error('Change status failed')
    // rollback
    row.statusSwitch = row.status
  }
}


const handleSearch = () => {
  fetchData()
}

const handleReset = () => {
  searchForm.position = null
  searchForm.status = null
  fetchData()
}

const handleCreate = () => {
  router.push('/banners/create')
}

const handleEdit = (row) => {
  router.push(`/banners/${row.id}/edit`)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(`Delete banner "${row.title}"?`, 'Confirm', { type: 'warning' })
    await axios.delete(`http://localhost:8089/banners/${row.id}`)
    ElMessage.success('Banner deleted')
    fetchData()
  } catch (err) {
    console.log(err)
  }
}

const viewDetail = (row) => {
  router.push(`/banners/detail/${row.id}`)
}

const formatDate = (iso) => iso ? new Date(iso).toLocaleString() : ''

onMounted(() => {
  console.log(">>> COMPONENT MOUNTED")
  fetchData()
})

</script>

<style scoped lang="scss">
.page-container {
  .page-header {
    margin-bottom: 16px;
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      .page-title {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
      }
      .header-right {
        display: flex;
        gap: 8px;
      }
    }
  }

  .filter-card {
    margin-bottom: 16px;
  }

  .pagination-container {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

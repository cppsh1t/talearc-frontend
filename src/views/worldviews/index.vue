<template>
  <div class="h-full flex flex-col bg-gray-50">
    <!-- Header -->
    <WorldViewHeader v-model="queryParams.keyword" @search="handleSearch" @create="handleAdd" />

    <!-- Content -->
    <div class="flex-1 overflow-auto">
      <div v-if="loading" class="flex justify-center items-center h-full">
        <el-icon class="is-loading text-3xl text-gray-400">
          <Loading />
        </el-icon>
      </div>
      <div v-else-if="list.length === 0" class="flex justify-center items-center h-full text-gray-400">
        暂无数据
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <WorldViewCard v-for="item in list" :key="item.id" :data="item" @click="handleCardClick" @edit="handleEdit"
          @delete="handleDelete" />
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-4 p-4 rounded shadow-sm flex justify-end">
      <el-pagination v-model:current-page="queryParams.page" v-model:page-size="queryParams.size" :total="total"
        :page-sizes="[12, 24, 36, 48]" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handlePageChange" />
    </div>

    <!-- Dialog Component -->
    <WorldViewDialog v-model:visible="dialogVisible" :type="dialogType" :data="currentWorldView" @success="fetchData" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getWorldViewList,
  deleteWorldView,
  type WorldView
} from '@/api/worldview'
import type { PageForm } from '@/api/type'
import { withDisplay } from '@/utils/displayError'
import WorldViewDialog from './components/WorldViewDialog.vue'
import WorldViewCard from './components/WorldViewCard.vue'
import WorldViewHeader from './components/WorldViewHeader.vue'

// Define a type for query params that extends PageForm and includes keyword
type WorldViewPageForm = PageForm & { keyword?: string }

const loading = ref(false)
const list = ref<WorldView[]>([])
const total = ref(0)

const queryParams = reactive<WorldViewPageForm>({
  page: 1,
  size: 12,
  keyword: ''
})

const dialogVisible = ref(false)
const dialogType = ref<'create' | 'edit'>('create')
const currentWorldView = ref<WorldView>()

async function fetchData() {
  loading.value = true
  try {
    const res = await getWorldViewList(queryParams)
    list.value = res.data.list
    total.value = res.data.total
  } catch (error) {
    if (error instanceof Error) ElMessage.error(error.message)
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  // Reset to first page when searching
  queryParams.page = 1
  fetchData()
}

function handlePageChange(val: number) {
  queryParams.page = val
  fetchData()
}

function handleSizeChange(val: number) {
  queryParams.size = val
  queryParams.page = 1
  fetchData()
}

function handleAdd() {
  dialogType.value = 'create'
  currentWorldView.value = undefined
  dialogVisible.value = true
}

function handleEdit(item: WorldView) {
  dialogType.value = 'edit'
  currentWorldView.value = item
  dialogVisible.value = true
}

async function handleDelete(item: WorldView) {
  try {
    await ElMessageBox.confirm('确定要删除该世界观吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    const res = await withDisplay(deleteWorldView(item.id), '删除成功')

    if (res) {
      // Check if we need to go back a page
      if (list.value.length === 1 && queryParams.page > 1) {
        queryParams.page--
      }
      fetchData()
    }
  } catch (e) {
    // User cancelled or error occurred
  }
}

function handleCardClick(item: WorldView) {
  // Placeholder for future navigation
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="h-full flex flex-col bg-gray-50">
    <div class="p-4 bg-white shadow-sm flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <el-button @click="router.back()">返回</el-button>
        <h2 class="text-lg font-bold">小说管理</h2>
      </div>
      <el-button type="primary" @click="handleAdd">
        <el-icon class="mr-1">
          <Plus />
        </el-icon>新增小说
      </el-button>
    </div>

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
        <NovelCard v-for="item in list" :key="item.id" :data="item" @edit="handleEdit" @delete="handleDelete" />
      </div>
    </div>

    <!-- Novel list doesn't have pagination in swagger response (NovelListApiResponse vs PageResponse), but I'll leave pagination hidden if total <= size? 
         Actually getNovelListAll returns Novel[] directly, not { list: [], total: 0 } 
         I need to adjust the fetchData logic for Novel.
    -->

    <!-- 
    <div class="mt-4 p-4 rounded shadow-sm flex justify-end">
       Pagination hidden for Novel as it returns all
    </div>
    -->

    <NovelDialog v-model:visible="dialogVisible" :type="dialogType" :data="currentNovel" :world-view-id="worldViewId"
      @success="fetchData" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Loading, Plus } from '@element-plus/icons-vue'
import { getNovelList, deleteNovel, type Novel } from '@/api/novel'
import { withDisplay } from '@/utils/displayError'
import NovelDialog from './components/NovelDialog.vue'
import NovelCard from './components/NovelCard.vue'

const route = useRoute()
const router = useRouter()
const worldViewId = Number(route.query.worldViewId)

const loading = ref(false)
const list = ref<Novel[]>([])

const dialogVisible = ref(false)
const dialogType = ref<'create' | 'edit'>('create')
const currentNovel = ref<Novel>()

async function fetchData() {
  if (!worldViewId) {
    ElMessage.error('缺少世界观ID')
    return
  }
  loading.value = true
  try {
    const res = await getNovelList({ worldViewId })
    list.value = res.data || []
  } catch (error) {
    if (error instanceof Error) ElMessage.error(error.message)
  } finally {
    loading.value = false
  }
}

function handleAdd() {
  dialogType.value = 'create'
  currentNovel.value = undefined
  dialogVisible.value = true
}

function handleEdit(item: Novel) {
  dialogType.value = 'edit'
  currentNovel.value = item
  dialogVisible.value = true
}

async function handleDelete(item: Novel) {
  try {
    await ElMessageBox.confirm('确定要删除该小说吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    const res = await withDisplay(deleteNovel(item.id), '删除成功')

    if (res) {
      fetchData()
    }
  } catch (e) {
  }
}

onMounted(() => {
  fetchData()
})
</script>

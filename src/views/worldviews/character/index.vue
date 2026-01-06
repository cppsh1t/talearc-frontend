<template>
  <div class="h-full flex flex-col bg-gray-50">
    <div class="p-4 bg-white shadow-sm flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <el-button @click="router.back()">返回</el-button>
        <h2 class="text-lg font-bold">角色管理</h2>
      </div>
      <el-button type="primary" @click="handleAdd">
        <el-icon class="mr-1">
          <Plus />
        </el-icon>新增角色
      </el-button>
    </div>

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
        <CharacterCard v-for="item in list" :key="item.id" :data="item" @edit="handleEdit" @delete="handleDelete" />
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-4 p-4 rounded shadow-sm flex justify-end">
      <el-pagination v-model:current-page="queryParams.page" v-model:page-size="queryParams.size" :total="total"
        :page-sizes="[12, 24, 36, 48]" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handlePageChange" />
    </div>

    <!-- Dialog Component -->
    <CharacterDialog v-model:visible="dialogVisible" :type="dialogType" :data="currentCharacter"
      :world-view-id="worldViewId" @success="fetchData" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Loading, Plus } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import {
  getCharacterList,
  deleteCharacter,
  type Character,
  type CharacterQuery
} from '@/api/character'
import { withDisplay } from '@/utils/displayError'
import CharacterDialog from './components/CharacterDialog.vue'
import CharacterCard from './components/CharacterCard.vue'

const route = useRoute()
const router = useRouter()
const worldViewId = Number(route.query.worldViewId)

const loading = ref(false)
const list = ref<Character[]>([])
const total = ref(0)

const queryParams = ref<CharacterQuery>({
  page: 1,
  size: 12,
  worldViewId: worldViewId
})

const dialogVisible = ref(false)
const dialogType = ref<'create' | 'edit'>('create')
const currentCharacter = ref<Character>()

async function fetchData() {
  if (!worldViewId) {
    ElMessage.error('缺少世界观ID')
    return
  }
  loading.value = true
  try {
    const res = await getCharacterList(queryParams.value)
    list.value = res.data.list
    total.value = res.data.total
  } catch (error) {
    if (error instanceof Error) ElMessage.error(error.message)
  } finally {
    loading.value = false
  }
}

function handlePageChange(val: number) {
  queryParams.value.page = val
  fetchData()
}

function handleSizeChange(val: number) {
  queryParams.value.size = val
  queryParams.value.page = 1
  fetchData()
}

function handleAdd() {
  dialogType.value = 'create'
  currentCharacter.value = undefined
  dialogVisible.value = true
}

function handleEdit(item: Character) {
  dialogType.value = 'edit'
  currentCharacter.value = item
  dialogVisible.value = true
}

async function handleDelete(item: Character) {
  try {
    await ElMessageBox.confirm('确定要删除该角色吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    const res = await withDisplay(deleteCharacter(item.id), '删除成功')

    if (res) {
      if (list.value.length === 1 && queryParams.value.page > 1) {
        queryParams.value.page--
      }
      fetchData()
    }
  } catch (e) {
    // Cancelled
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <el-card class="relative hover:shadow-md transition-shadow cursor-pointer group" :body-style="{ padding: '16px' }">
    <div class="flex justify-between items-start mb-2">
      <h3 class="text-lg font-semibold truncate flex-1 mr-2" :title="data.title || ''">
        {{ data.title }}
      </h3>
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="p-1 hover:bg-gray-100 rounded cursor-pointer" @click.stop>
          <el-icon>
            <MoreFilled />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="edit">编辑</el-dropdown-item>
            <el-dropdown-item command="delete" class="text-red-500">删除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <p class="text-sm text-gray-500 line-clamp-3 h-15 mb-2" :title="data.description || ''">
      {{ data.description || '暂无描述' }}
    </p>
    <div class="text-xs text-gray-400 mt-2 flex justify-between items-center">
      <span>{{ formatDate(data.updatedAt) }}</span>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { MoreFilled } from '@element-plus/icons-vue'
import type { Novel } from '@/api/novel'
import dayjs from 'dayjs'

const props = defineProps<{
  data: Novel
}>()

const emit = defineEmits<{
  (e: 'edit', item: Novel): void
  (e: 'delete', item: Novel): void
}>()

function formatDate(date: string) {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

function handleCommand(command: string | number | object) {
  if (command === 'edit') {
    emit('edit', props.data)
  } else if (command === 'delete') {
    emit('delete', props.data)
  }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

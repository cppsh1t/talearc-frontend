<template>
  <el-card class="relative hover:shadow-md transition-shadow cursor-pointer group" :body-style="{ padding: '16px' }">
    <div class="flex justify-between items-start mb-2">
      <h3 class="text-lg font-semibold truncate flex-1 mr-2" :title="data.name || ''">
        {{ data.name }}
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
    <div class="text-xs text-gray-500 mt-1">
      <div v-if="data.happenedAt">开始: {{ formatDate(data.happenedAt) }}</div>
      <div v-if="data.endAt">结束: {{ formatDate(data.endAt) }}</div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { MoreFilled } from '@element-plus/icons-vue'
import type { WorldEvent } from '@/api/worldEvent'
import dayjs from 'dayjs'

const props = defineProps<{
  data: WorldEvent
}>()

const emit = defineEmits<{
  (e: 'edit', item: WorldEvent): void
  (e: 'delete', item: WorldEvent): void
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

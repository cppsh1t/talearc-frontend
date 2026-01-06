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
    <div v-if="data.note" class="text-xs text-gray-400 mt-1 truncate" :title="data.note">
      备注: {{ data.note }}
    </div>
    <div class="text-xs text-gray-400 mt-2 flex justify-between items-center">
      <span>{{ formatDate(data.updatedAt) }}</span>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { MoreFilled } from '@element-plus/icons-vue'
import type { Character } from '@/api/character'
import dayjs from 'dayjs'

const props = defineProps<{
  data: Character
}>()

const emit = defineEmits<{
  (e: 'click', item: Character): void
  (e: 'edit', item: Character): void
  (e: 'delete', item: Character): void
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

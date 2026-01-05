<template>
  <div class="flex justify-between items-center mb-4 p-4 rounded shadow-sm">
    <div class="flex items-center gap-4">
      <el-input
        :model-value="modelValue"
        @update:model-value="emit('update:modelValue', $event)"
        placeholder="世界观名称"
        class="w-64"
        clearable
        @clear="handleSearch"
        @keyup.enter="handleSearch"
      >
        <template #prefix>
          <el-icon>
            <Search />
          </el-icon>
        </template>
      </el-input>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>
    <el-button type="primary" @click="emit('create')">
      <el-icon class="mr-1">
        <Plus />
      </el-icon>新增
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { Search, Plus } from '@element-plus/icons-vue'

defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search'): void
  (e: 'create'): void
}>()

function handleSearch() {
  emit('search')
}
</script>

<template>
  <el-dialog :model-value="visible" :title="type === 'create' ? '新增事件' : '编辑事件'" width="500px"
    @update:model-value="handleUpdateVisible" @close="handleClose">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入事件名称" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入事件描述" />
      </el-form-item>
      <el-form-item label="开始时间" prop="happenedAt">
        <el-date-picker v-model="form.happenedAt" type="datetime" placeholder="选择开始时间"
          value-format="YYYY-MM-DD HH:mm:ss" />
      </el-form-item>
      <el-form-item label="结束时间" prop="endAt">
        <el-date-picker v-model="form.endAt" type="datetime" placeholder="选择结束时间" value-format="YYYY-MM-DD HH:mm:ss" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { createWorldEvent, updateWorldEvent, type WorldEvent } from '@/api/worldEvent'
import { withDisplay } from '@/utils/displayError'

const props = defineProps<{
  visible: boolean
  type: 'create' | 'edit'
  data?: WorldEvent
  worldViewId: number
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'success'): void
}>()

const formRef = ref<FormInstance>()
const loading = ref(false)

const form = ref<{
  name: string
  description: string
  happenedAt: string
  endAt: string
}>({
  name: '',
  description: '',
  happenedAt: '',
  endAt: ''
})

const rules = ref<FormRules>({
  name: [
    { required: true, message: '请输入事件名称', trigger: 'blur' },
    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
  ]
})

watch(
  () => props.visible,
  (val) => {
    if (val) {
      if (props.type === 'edit' && props.data) {
        form.value.name = props.data.name || ''
        form.value.description = props.data.description || ''
        form.value.happenedAt = props.data.happenedAt || ''
        form.value.endAt = props.data.endAt || ''
      } else {
        form.value.name = ''
        form.value.description = ''
        form.value.happenedAt = ''
        form.value.endAt = ''
      }
    }
  }
)

function handleUpdateVisible(val: boolean) {
  emit('update:visible', val)
}

function handleClose() {
  emit('update:visible', false)
  formRef.value?.resetFields()
}

async function handleSubmit() {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        if (props.type === 'create') {
          await withDisplay(
            createWorldEvent({
              worldViewId: props.worldViewId,
              name: form.value.name,
              description: form.value.description,
              happenedAt: form.value.happenedAt || undefined,
              endAt: form.value.endAt || undefined
            }),
            '创建成功'
          )
        } else if (props.data) {
          await withDisplay(
            updateWorldEvent(props.data.id, {
              name: form.value.name,
              description: form.value.description,
              happenedAt: form.value.happenedAt || undefined,
              endAt: form.value.endAt || undefined
            }),
            '更新成功'
          )
        }
        emit('success')
        handleClose()
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

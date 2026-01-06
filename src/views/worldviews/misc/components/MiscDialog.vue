<template>
  <el-dialog :model-value="visible" :title="type === 'create' ? '新增杂项' : '编辑杂项'" width="500px"
    @update:model-value="handleUpdateVisible" @close="handleClose">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入杂项名称" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="form.type" placeholder="请输入类型（如：道具、地点）" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入杂项描述" />
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
import { createMisc, updateMisc, type Misc } from '@/api/misc'
import { withDisplay } from '@/utils/displayError'

const props = defineProps<{
  visible: boolean
  type: 'create' | 'edit'
  data?: Misc
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
  type: string
}>({
  name: '',
  description: '',
  type: ''
})

const rules = ref<FormRules>({
  name: [
    { required: true, message: '请输入杂项名称', trigger: 'blur' },
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
        form.value.type = props.data.type || ''
      } else {
        form.value.name = ''
        form.value.description = ''
        form.value.type = ''
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
            createMisc({
              worldViewId: props.worldViewId,
              name: form.value.name,
              description: form.value.description,
              type: form.value.type
            }),
            '创建成功'
          )
        } else if (props.data) {
          await withDisplay(
            updateMisc(props.data.id, {
              name: form.value.name,
              description: form.value.description,
              type: form.value.type
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

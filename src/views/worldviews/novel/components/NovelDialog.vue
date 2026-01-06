<template>
  <el-dialog :model-value="visible" :title="type === 'create' ? '新增小说' : '编辑小说'" width="500px"
    @update:model-value="handleUpdateVisible" @close="handleClose">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入小说标题" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入小说描述" />
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
import { createNovel, updateNovel, type Novel } from '@/api/novel'
import { withDisplay } from '@/utils/displayError'

const props = defineProps<{
  visible: boolean
  type: 'create' | 'edit'
  data?: Novel
  worldViewId: number
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'success'): void
}>()

const formRef = ref<FormInstance>()
const loading = ref(false)

const form = ref<{
  title: string
  description: string
}>({
  title: '',
  description: ''
})

const rules = ref<FormRules>({
  title: [
    { required: true, message: '请输入小说标题', trigger: 'blur' },
    { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
  ]
})

watch(
  () => props.visible,
  (val) => {
    if (val) {
      if (props.type === 'edit' && props.data) {
        form.value.title = props.data.title || ''
        form.value.description = props.data.description || ''
      } else {
        form.value.title = ''
        form.value.description = ''
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
            createNovel({
              worldViewId: props.worldViewId,
              title: form.value.title,
              description: form.value.description
            }),
            '创建成功'
          )
        } else if (props.data) {
          await withDisplay(
            updateNovel(props.data.id, {
              title: form.value.title,
              description: form.value.description
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

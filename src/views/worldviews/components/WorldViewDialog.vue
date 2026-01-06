<template>
  <el-dialog :model-value="visible" :title="type === 'create' ? '新增世界观' : '编辑世界观'" width="500px" destroy-on-close
    @update:model-value="emit('update:visible', $event)">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入世界观名称" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="备注" prop="notes">
        <el-input v-model="form.notes" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { createWorldView, updateWorldView, type WorldView, type CreateWorldViewRequest } from '@/api/worldview'
import { withDisplay } from '@/utils/displayError'

const props = defineProps<{
  visible: boolean
  type: 'create' | 'edit'
  data?: WorldView
}>()

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'success'): void
}>()

const formRef = ref<FormInstance>()
const submitting = ref(false)

const form = ref<CreateWorldViewRequest>({
  name: '',
  description: '',
  notes: ''
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
}

watch(
  () => props.visible,
  (val) => {
    if (val) {
      if (props.type === 'edit' && props.data) {
        form.value.name = props.data.name || ''
        form.value.description = props.data.description || ''
        form.value.notes = props.data.notes || ''
      } else {
        form.value.name = ''
        form.value.description = ''
        form.value.notes = ''
      }
    }
  }
)

function handleCancel() {
  emit('update:visible', false)
}

async function handleSubmit() {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      submitting.value = true

      let res
      if (props.type === 'create') {
        res = await withDisplay(createWorldView(form.value), '创建成功')
      } else if (props.data?.id) {
        res = await withDisplay(updateWorldView(props.data.id, form.value), '更新成功')
      }

      if (res) {
        emit('success')
        emit('update:visible', false)
      }

      submitting.value = false
    }
  })
}
</script>

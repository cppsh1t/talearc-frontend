<template>
  <el-dialog :model-value="visible" :title="type === 'create' ? '新增角色' : '编辑角色'" width="500px" @update:model-value="handleUpdateVisible"
    @close="handleClose">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入角色描述" />
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="form.note" type="textarea" :rows="2" placeholder="请输入备注" />
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
import { createCharacter, updateCharacter, type Character } from '@/api/character'
import { withDisplay } from '@/utils/displayError'

const props = defineProps<{
  visible: boolean
  type: 'create' | 'edit'
  data?: Character
  worldViewId: number
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'success'): void
}>()

const formRef = ref<FormInstance>()
const loading = ref(false)

interface CharacterForm {
  name: string
  description: string
  note: string
}

const form = ref<CharacterForm>({
  name: '',
  description: '',
  note: ''
})

const rules = ref<FormRules>({
  name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
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
        form.value.note = props.data.note || ''
      } else {
        form.value.name = ''
        form.value.description = ''
        form.value.note = ''
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
            createCharacter({
              worldViewId: props.worldViewId,
              name: form.value.name,
              description: form.value.description,
              note: form.value.note
            }),
            '创建成功'
          )
        } else if (props.data) {
          await withDisplay(
            updateCharacter(props.data.id, {
              name: form.value.name,
              description: form.value.description,
              note: form.value.note
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

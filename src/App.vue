<template>
  <div class="w-full h-100vh flex box-border relative overflow-hidden">
    <MenuList class="shrink-0" />
    <div class="w-full h-full box-border p-4">
      <Transition name="page">
        <RouterView />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">


</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  position: absolute;
  width: 100%;
}
</style>
---
trigger: always_on
---

## 功能分区

**tests** -> 测试
api -> api函数和类型
assets -> 资产文件
components -> 通用组件
components/icons icon组件
router -> 路由
stores -> 持久化存储
utils -> 工具函数
views -> 视图
views/\*/components/ -> 某个视图下的特定组件
swagger.json -> 后端接口的swagger文件

## 命名规范

变量/函数：camelCase
组件：PascalCase (与文件名保持一致)
常量：UPPER_SNAKE_CASE
类型/接口：PascalCase
文件：kebab-case 用于视图/组件，camelCase 用于工具函数/API模块。

## icon规范

统统采用vue组件的方式，32\*32的默认大小，放在指定文件夹下，使用时用样式设置
例子:
<template>
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.0227 3.75L9.00897 14.25" stroke="#3A9CFF" stroke-linecap="round" stroke-linejoin="round" />
<path d="M3.75 9H14.25" stroke="#3A9CFF" stroke-linecap="round" stroke-linejoin="round" />
</svg>
</template>

## vue组件规范

props规范:

```vue
const props = defineProps<{ data: Test }>()
```

emit规范:

```vue
const emit = defineEmits<{ (e: 'cb', v: string): void (e: 'click'): void }>()
```

## 函数与类型

异步函数采用async模式,非必要不要使用.then语法, 通用的类型文件保存在/api/type.ts,不同api模块的函数和类型保存在/api/\*.ts。

**使用完整的类型！！！ 当代码中缺少类型作为后缀时，应该引入类型或者声明类型，严禁使用any！！！！**

Vue实例组件的类型使用工具类型InstanceOf

## 代码和样式风格

使用 <script setup lang="ts"></script>的代码块和unocss来完成样式，使用elementplus做组件库，让UI看起来简约大方，尽量使用flex布局让页面适应能力更强

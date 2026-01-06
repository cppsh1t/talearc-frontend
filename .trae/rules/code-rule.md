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

**结构规范**
- 复杂的弹窗/部分独立逻辑必须抽离为单独的组件，存放在 `components` 目录下，禁止直接嵌套在页面中。
- 组件必须保持单一职责，通过 Props 和 Emits 与父组件通信。

props规范:

```ts
const props = defineProps<{ data: Test }>()
```

emit规范:

```ts
const emit = defineEmits<{ (e: 'cb', v: string): void (e: 'click'): void }>()
```

**状态与类型规范**
- **严禁使用 `reactive`**，统一使用 `ref` 来定义响应式数据。
- **严禁在 form 中使用 `any` 类型**。例如 `ref({...})` 是禁止的，必须显式指定类型：`ref<XXX>({...})`。

## 错误处理规范

使用utils/displayError中的withDisplay来catch错误并进行必要情况下的错误提示

## 函数与类型

**API 定义规范**
- 必须使用 `function xxx(params: Type) {}` 的声明方式，禁止使用 `const xxx = () => {}` 的变量赋值形式。
- 分页查询参数必须使用 `PageForm` 类型或其扩展类型。
- 异步操作**必须**使用 `async/await` 语法，严禁使用 `.then` 链式调用（除非是特殊的库要求）。

**类型规范**
- 通用的类型文件保存在/api/type.ts,不同api模块的函数和类型保存在/api/\*.ts。
- **使用完整的类型！！！ 当代码中缺少类型作为后缀时，应该引入类型或者声明类型，严禁使用any！！！！**
- Vue实例组件的类型使用工具类型InstanceOf

## 代码和样式风格

使用 <script setup lang="ts"></script>的代码块和unocss来完成样式，使用elementplus做组件库，让UI看起来简约大方，尽量使用flex布局让页面适应能力更强

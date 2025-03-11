<template>
  <div class="editor-wrapper">
    <div class="editor-operate">
      <ul style="display:flex; list-style:none;margin-bottom: 10px;">
        <li class="my-button" v-for="item in mockTags" :key="item.id" @click="insertTag(item)">{{ item.label}}</li>
      </ul>
    </div>
    <div style="border: 1px solid #ccc; margin-top: 10px">
      <!-- <Toolbar
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="editorMode"
        v-if="showToolBar"
        style="border-bottom: 1px solid #ccc"
      /> -->
      <Editor
        :defaultConfig="editorConfig"
        :mode="editorMode"
        v-model="valueHtml"
        style="height: 400px; overflow-y: hidden"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
    <div style="margin-top: 10px">
      <textarea
        v-model="valueHtml"
        readonly
        style="width: 100%; height: 200px; outline: none"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@wangeditor-next/editor/dist/css/style.css";
import { onBeforeUnmount, ref, shallowRef, onMounted, nextTick } from "vue";
import { Editor, Toolbar } from "@wangeditor-next/editor-for-vue";
import { Boot } from '@wangeditor-next/editor'
import type { IDomEditor } from '@wangeditor-next/editor'
import tagModule from '@wangeditor-plugins/tag'
console.log(tagModule)
type TagType = Record<string, string|number>
// 注册插件
Boot.registerModule(tagModule)
const props = defineProps({
  showToolBar: {
    type: Boolean,
    default: false,
  },
});
const editorMode = "simple";
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("");

// 模拟 ajax 异步获取内容
onMounted(() => {});

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

// 编辑器回调函数
const handleCreated = (editor: IDomEditor) => {
  console.log("created", editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const mockTags = [
  {id: 1, label: '自定义标签1'},
  {id: 2, label: '自定义标签2'},
  {id: 3, label: '自定义标签3'},
  {id: 4, label: '自定义标签4'}
]
const insertTag = ({id, label}: TagType) => {
  const tagNode = {
    type: "tag", // 唯一
    value: label,
    info: { id, label },
    prefixCode: '', // 符号前缀
    style: {
      fontSize: '14px',
      // color: "#f00",
    },
    children: [{ text: "" }], // 必须有一个空 text 作为 children
  };
  const editor = editorRef.value;
  if (editor) {
    editor.restoreSelection();
    editor.insertNode(tagNode);
    editor.move(1); 
  }
}
const handleChange = async (editor: IDomEditor) => {
  console.log(editor.isFocused(),'---')
};


</script>
<style>
.editor-wrapper .w-e-text-container {
  text-align: left;
}
.my-button {
  border: 1px solid #ccc;
  padding: 8px 12px;
  margin-right: 12px;
  color: #333;
  border-radius: 3px;
  cursor: pointer;
}
.editor-operate {
  text-align: left;
}

</style>

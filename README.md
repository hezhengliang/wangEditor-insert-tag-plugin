
##  基于WangEditor5的Mention功能实现插入自定义标签

### 运行
```
  pnpm install 

  pnpm run dev
```

### 说明

```js
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
    tooltip: label + '自定义标签', // tooltip（非必选， 默认为label）
    tooltipStyle: { // tooltip 自定义样式（非必选）
      background: 'white',
      color: '#000',
      border: '1px solid #303333',
    }
  };
  const editor = editorRef.value;
  if (editor) {
    editor.restoreSelection();
    editor.insertNode(tagNode);
    editor.move(1); 
  }
}
```
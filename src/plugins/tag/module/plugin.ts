/**
 * @description 参考：https://www.wangeditor.com/v5/development.html#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E6%B8%B2%E6%9F%93%E6%96%B0%E5%85%83%E7%B4%A0
 */
import { DomEditor, IDomEditor } from '@wangeditor/editor'
import { ElType } from '../utils/el-type'
function withTag<T extends IDomEditor>(editor: T) {
  const { insertText, isInline, isVoid } = editor
  const newEditor = editor

  // 重写 insertText
  newEditor.insertText = t => {
    // 选过选中了 void 元素
    const els = DomEditor.getSelectedElems(newEditor)
    const isSelectedVoidElem = els.some(el => newEditor.isVoid(el))
    if (isSelectedVoidElem) {
      insertText(t)
      return
    }
    insertText(t)
  }

  // 重写 isInline
  newEditor.isInline = el => {
    const type = DomEditor.getNodeType(el)
    if (type === ElType) {
      return true
    }

    return isInline(el)
  }

  // 重写 isVoid
  newEditor.isVoid = el => {
    const type = DomEditor.getNodeType(el)
    if (type === ElType) {
      return true
    }
    return isVoid(el)
  }

  return newEditor
}

export default withTag

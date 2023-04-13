/*
 * @Date: 2022-07-10 13:22:34
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-04-13 21:13:07
 * @Description: render el 参考 https://www.wangeditor.com/v5/development.html#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E6%B8%B2%E6%9F%93%E6%96%B0%E5%85%83%E7%B4%A0
 */

import { h, VNode } from 'snabbdom'
import { IDomEditor, SlateElement } from '@wangeditor/editor'
import { TagElement } from './custom-types'
import { ElType } from '../utils/el-type'
function renderCustomTag(el: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
  const { value = '', style, prefixCode='' } = el as TagElement
  let elStyle = {
    ...{
      margin: '0 3px',
      fontSize: '14px',
      backgroundColor: '#ecf5ff',
      color: "#409eff",
      border: '1px solid #d9ecff' ,
      borderRadius: '3px',
      padding: '3px 8px',
    },
    ...style
  }
  if(typeof style !== 'object'){
    console.warn('自定义样式必须是对象')
  }
  // 构建 vnode
  const vNode = h(
    'span.w-tag-inner',
    {
      props: {
        contentEditable: false, // 不可编辑
      },
      dataset: {
        'type': 'w-textarea-tag',
      },
      style: elStyle,
    },
    `${prefixCode}${value}`
  )
  return vNode
}

const conf = {
  type: ElType, // 节点 type
  renderElem: renderCustomTag,
}

export default conf

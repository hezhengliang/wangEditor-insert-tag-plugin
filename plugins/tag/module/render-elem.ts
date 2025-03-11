/*
 * @Date: 2022-07-10 13:22:34
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-04-13 21:13:07
 * @Description: render el 参考 https://www.wangeditor.com/v5/development.html#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E6%B8%B2%E6%9F%93%E6%96%B0%E5%85%83%E7%B4%A0
 */

import { h, VNode } from 'snabbdom'
import { SlateElement } from '@wangeditor-next/editor'
import { TagElement } from './custom-types'
import { ElType } from '../utils/el-type'
import { computePosition, flip, shift, offset } from '@floating-ui/dom'

// 存储 tooltip 元素的引用
let tooltipEl: HTMLElement | null = null
let currentTarget: HTMLElement | null = null

// 默认 tooltip 样式
const defaultTooltipStyle = {
  position: 'absolute',
  background: '#303333',
  color: 'white',
  padding: '5px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  zIndex: '2012',
  pointerEvents: 'none',
  opacity: '0',
  transition: 'opacity 0.2s',
  lineHeight: '20px',
  minWidth: '10px',
  overflowWrap: 'break-word'
}

function visibleTooltip(reference: HTMLElement, content: string, tooltipStyle: Record<string, string> = {}) {
  if (!tooltipEl) {
    tooltipEl = document.createElement('div')
    tooltipEl.className = 'w-tag-tooltip'
  }
  // 合并样式
  const mergedStyle = { ...defaultTooltipStyle, ...tooltipStyle }
  const styleText = Object.entries(mergedStyle)
    .map(([key, value]) => `${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}: ${value}`)
    .join(';')
  
  tooltipEl.style.cssText = styleText
  tooltipEl.textContent = content
  tooltipEl.style.opacity = '1'
  currentTarget = reference

  if (!tooltipEl.parentNode) {
    document.body.appendChild(tooltipEl)
  }

  // 使用 computePosition 计算位置
  computePosition(reference, tooltipEl, {
    placement: 'top',
    middleware: [
      offset(5),
      flip(),
      shift()
    ]
  }).then(({ x, y }) => {
    if (tooltipEl) {
      tooltipEl.style.left = `${x}px`
      tooltipEl.style.top = `${y}px`
    }
  })
}

function hideTooltip() {
  if (tooltipEl) {
    tooltipEl.style.opacity = '0'
    currentTarget = null
  }
}

function renderCustomTag(el: SlateElement): VNode {
  const { value = '', style = {}, prefixCode = '', tooltip = '', tooltipStyle = {} } = el as TagElement
  const elStyle = {
    ...{
      margin: '0 3px',
      fontSize: '14px',
      backgroundColor: '#ecf5ff',
      color: "#409eff",
      border: '1px solid #d9ecff' ,
      borderRadius: '3px',
      padding: '3px 8px',
      cursor: 'pointer'
    },
    ...style
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
      hook: {
        create: (_, vnode: VNode) => {
          const element = vnode.elm as HTMLElement
          element.addEventListener('mouseenter', () => visibleTooltip(element, tooltip || value, tooltipStyle))
          element.addEventListener('mouseleave', hideTooltip)
        },
        destroy: (vnode: VNode) => {
          const element = vnode.elm as HTMLElement
          element.removeEventListener('mouseenter', () => visibleTooltip(element, tooltip || value, tooltipStyle))
          element.removeEventListener('mouseleave', hideTooltip)
          if (currentTarget === element) {
            hideTooltip()
          }
        }
      }
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

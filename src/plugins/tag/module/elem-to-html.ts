/*
 * @Date: 2022-07-10 13:22:34
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-04-13 21:11:42
 * @Description: 参考 https://www.wangeditor.com/v5/development.html#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E6%B8%B2%E6%9F%93%E6%96%B0%E5%85%83%E7%B4%A0
 */


import { SlateElement } from '@wangeditor/editor'
import { TagElement } from './custom-types'

// 生成 html 的函数
function tagToHtml(elem: SlateElement, childrenHtml: string): string {
  const { value = '', info = {}, prefixCode = '' } = elem as TagElement
  const infoStr = encodeURIComponent(JSON.stringify(info))
  return `<span class="w-e-tag" data-w-e-type="tag" data-w-e-is-void data-w-e-is-inline data-value="${value}" data-info="${infoStr}">${prefixCode}${value}</span>`
}

// 配置
const conf = {
  type: 'tag', // 节点 type ，重要！！！
  elemToHtml: tagToHtml,
}

export default conf

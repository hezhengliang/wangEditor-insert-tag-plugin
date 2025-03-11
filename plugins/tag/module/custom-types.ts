/**
 * @description tag element
 */

type EmptyText = {
  text: ''
}
export type TagElement = {
  type: 'tag'
  value: string
  info: any
  children: EmptyText[] // void 元素必须有一个空 text
  style?: Record<string, string>
  prefixCode?: string
  tooltip?: string    // tooltip 文本
  tooltipStyle?: Record<string, string>  // tooltip 样式
}

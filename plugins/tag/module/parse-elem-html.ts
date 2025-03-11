/**
 * @description parse elem html
 *
 */

import { DOMElement } from '../utils/dom'
import { IDomEditor, SlateDescendant, SlateElement } from '@wangeditor/editor'
import { TagElement } from './custom-types'
import { ElType } from '../utils/el-type'
function parseHtml(
  elem: DOMElement,
  children: SlateDescendant[],
  editor: IDomEditor
): SlateElement {
  const value = elem.getAttribute('data-value') || ''
  const rawInfo = decodeURIComponent(elem.getAttribute('data-info') || '')
  let info: any
  try {
    info = JSON.parse(rawInfo)
  } catch (ex) {
    info = rawInfo
  }

  return {
    type: ElType,
    value,
    info,
    children: [{ text: '' }], // void node 必须有一个空白 text
  } as TagElement
}

const parseHtmlConf = {
  selector: `span[data-w-e-type="${ElType}"]`,
  parseElemHtml: parseHtml,
}

export default parseHtmlConf

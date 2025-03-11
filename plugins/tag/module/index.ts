/*
 * @Date: 2022-07-10 13:22:34
 * @LastEditors: error: git config user.email & please set dead value or install git
 * @LastEditTime: 2023-04-13 20:32:25
 * @Description: tag module entry 参考 https://www.wangeditor.com/v5/development.html#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E6%B8%B2%E6%9F%93%E6%96%B0%E5%85%83%E7%B4%A0
 */


import { IModuleConf } from '@wangeditor-next/editor'
import withTag from './plugin'
import renderElemConf from './render-elem'
import elemToHtmlConf from './elem-to-html'
import parseHtmlConf from './parse-elem-html'

const module: Partial<IModuleConf> = {
  editorPlugin: withTag,
  renderElems: [renderElemConf],
  elemsToHtml: [elemToHtmlConf],
  parseElemsHtml: [parseHtmlConf],
}

export default module

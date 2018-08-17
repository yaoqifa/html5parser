import { Stack } from './stack.js'

export const checkHtml = (html) => {
  const stack = new Stack()
  const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
  const ncname = '[a-zA-Z_][\\w\\-\\.]*'
  const qnameCapture = `((?:${ncname}\\:)?${ncname})`
  const startTagOpen = new RegExp(`^<${qnameCapture}`)
  const startTagClose = /^\s*(\/?)>/
  const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)

  while (html) {
    // 匹配开始标签
    let startMatch = html.match(startTagOpen)  
    if (startMatch) {
      stack.push(startMatch[1])
      advance(startMatch[0].length)
      let end
      let attr
      // 没有结束并匹配属性
      while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length)
        // 检查属性
        let res = checkAttr(attr[0])
        if (res) {
          return 1
        }
      }
      // 匹配开始的结束标签
      if (end) {
        advance(end[0].length)
      } else {
        return 1
      }
      continue
    }
    // 匹配结束标签
    let endMatch = html.match(endTag)
    if (endMatch) {
      if (stack.isEmpty()) {
        return 1
      }
      if (endMatch[1] === stack.peek()) {
        stack.pop()
      } else {
        return 1
      }
      advance(endMatch[0].length)
      continue
    }
    
    // 既不是开始也不是结束，应该是文本开始了
    if (!startMatch && !endMatch) {
      let index = html.indexOf('<')
      if (index > -1) {
        advance(index)
      } else {
        advance(html.length)
      }
    }
  }

  // 用于往后遍历html
  function advance (n) {
    html = html.substring(n)
  }
  // 检查属性的合法性
  function checkAttr (attr) {
    let nameReg = /^[a-z]+$/
    let valueReg = /^\"[a-z\/<>]+\"$/
    let res = 0
    // 不是空格间隔的属性，直接返回1
    if (!/\s/.test(attr[0])) {
      return 1
    }
    attr = attr.trim()
    if (nameReg.test(attr.split('=')[0]) && valueReg.test(attr.split('=')[1])) {
      res = 0
    } else {
      res = 1
    }
    return res
  }

  return 0
}

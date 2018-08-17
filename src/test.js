import { checkHtml } from './html5parse'

let html = `<div><span></span></div>`
let html2 = '<div name="jhs"><span>test</span></div>'
let html3 = '<div name="jhs"id="id"><span>test</span></div>'
let html4 = '<div name="jhs"id="id"><span>test</div></span>'

checkHtml(html)
checkHtml(html2)
checkHtml(html3)
checkHtml(html4)
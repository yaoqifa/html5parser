### 描述
最近遇到一个html解析器的问题，解决html的解析，主要包括标签的匹配，属性的校验。校验通过返回0，不通过返回1。
正好研究下vue源码的compile 部分。路径：  src/compiler/parser/html-parser.js
所以写了这个简化版。

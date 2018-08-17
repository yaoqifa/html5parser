export const Stack = (() => {
  const wm = new WeakMap()
  class Stack {
    constructor () {
      wm.set(this, [])
    }
    push (e) {
      wm.get(this).push(e)
    }
    pop () {
      return wm.get(this).pop()   
    }
    print () {
      return wm.get(this).toString()
    }
    size () {
      return wm.get(this).length
    }
    isEmpty () {
      return  wm.get(this).length === 0
    }
    peek () {
      let arr = wm.get(this)
      return  arr[arr.length - 1]
    }
  }
  return Stack
})()
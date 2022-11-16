// import { effectScope } from 'vue-demi'

const events = {
  map: {},

  on(event, cb){
    if (!this.map[event]) {
      this.map[event] = []
    }

    this.map[event].push(cb)
  },

  emit(event, ...args){
    this.map[event].forEach(cb => cb(...args))
  }
}

export function createEvent(event?: string){
  const eventName = event || Symbol()

  const cb = function (){

  }

  events.on(eventName, cb)

  return (...args) => events.emit(eventName, ...args)
}

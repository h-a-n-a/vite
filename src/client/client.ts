// This file runs in the browser.
import { HMRRuntime } from 'vue'

declare var __VUE_HMR_RUNTIME__: HMRRuntime

const socket = new WebSocket(`ws://${location.host}`)

console.log(123, __VUE_HMR_RUNTIME__)

// Listen for messages
socket.addEventListener('message', ({ data }) => {
  const { type, path, id, index } = JSON.parse(data)
  console.log(data)
  switch (type) {
    case 'connected':
      console.log(`[vite] connected.`)
      break
    case 'reload':
      import(`${path}?t=${Date.now()}`).then((m) => {
        console.log('reload module', m)
        __VUE_HMR_RUNTIME__.reload(path, m.default)
        console.log(`[vite] ${path} reloaded.`)
      })
      break
    case 'rerender':
      import(`${path}?type=template&t=${Date.now()}`).then((m) => {
        __VUE_HMR_RUNTIME__.rerender(path, m.render)
        console.log(`[vite] ${path} template updated.`)
      })
      break
    case 'style-update':
      console.log(
        `[vite] ${path} style${index > 0 ? `#${index}` : ``} updated.`
      )
      import(`${path}?type=style&index=${index}&t=${Date.now()}`)
      break
    case 'style-remove':
      const style = document.getElementById(`vue-style-${id}`)
      if (style) {
        style.parentNode!.removeChild(style)
      }
      break
    case 'full-reload':
      location.reload()
  }
})

// ping server
socket.addEventListener('close', () => {
  console.log(`[vite] server connection lost. polling for restart...`)
  setInterval(() => {
    new WebSocket(`ws://${location.host}`).addEventListener('open', () => {
      location.reload()
    })
  }, 1000)
})

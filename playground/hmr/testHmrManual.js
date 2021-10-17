import './testHmrManualDep'

export const foo = 1

if (import.meta.hot) {
  import.meta.hot.accept(({ foo }) => {
    console.log('(self-accepting)1.foo is now:', foo)
    console.log('detected')
  })

  import.meta.hot.accept(({ foo }) => {
    console.log('(self-accepting)2.foo is now:', foo)
  })

  import.meta.hot.dispose(() => {
    console.log(`foo was: ${foo}`)
  })

  import.meta.hot.acceptDeps('./testHmrManualDep.js', ({ foo }) => {
    console.log('testHmrManualDep (single dep) foo is now:', foo)
  })

  import.meta.hot.acceptDeps(['./testHmrManualDep.js'], (modules) => {
    console.log('testHmrManualDep (multiple deps) foo is now:', modules[0].foo)
  })
}

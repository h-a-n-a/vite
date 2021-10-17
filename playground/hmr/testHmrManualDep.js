import { bar } from './testHmrManualDepDep'

export const foo = 1000

if (import.meta.hot) {
  const data = import.meta.hot.data
  if ('fromDispose' in data) {
    console.log(`(dep) foo from dispose: ${data.fromDispose}`)
  }

  import.meta.hot.accept(({ foo }) => {
    console.log('testHmrManualDep(self-accepting) foo detected', foo)
  })

  import.meta.hot.dispose((data) => {
    console.log(`(dep) foo was: ${foo}`)
    data.fromDispose = foo * 10
  })
}

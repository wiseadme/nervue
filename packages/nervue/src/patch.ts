export const createPatcher = (state) => {
  console.log(state)
  return (executor) => {
    const executorType = typeof executor

    if (executorType === 'function') {
      executor(state)
    } else if (executorType === 'object') {

    }
  }
}

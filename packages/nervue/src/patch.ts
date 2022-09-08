export function $patch(executor) {
  const executorType = typeof executor

  if (executorType === 'function') {
    executor(this)
  } else if (executorType === 'object') {

  }
}

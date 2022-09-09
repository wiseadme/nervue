export function $patch(updates) {
  const updatesType = typeof updates

  if (updatesType === 'function') {
    updates(this.$state)
  } else if (updatesType === 'object') {

  }
}

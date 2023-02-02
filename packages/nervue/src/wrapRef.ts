import { ref, unref, UnwrapRef } from 'vue-demi'
import { typeOf } from './helpers'

type WrappedRef<S> = {
  value(): UnwrapRef<S>
  prev(): S
  next(): any
  set(val: S extends object ? Partial<S> : S): void
  effect(): void
}

export function wrapRef<S = any>(initialValue: S): WrappedRef<S> {
  const refValue = ref(initialValue)

  let prevValue = initialValue as any
  let nextValue

  function prev(): S {
    return prevValue
  }

  function next(): S {
    return nextValue
  }

  function set(val: any) {
    const valType = typeOf(val)

    console.log(nextValue, val)

    if (nextValue === val) {
      return
    }

    if (
      valType === 'string'
      || valType === 'number'
      || valType === 'symbol'
    ) {
      return nextValue = val
    }

    return nextValue = { ...prevValue, ...val }
  }

  function effect() {
    prevValue = nextValue
    refValue.value = nextValue
    nextValue = undefined
  }

  function value(): UnwrapRef<S> {
    return unref(refValue)
  }

  return {
    prev,
    next,
    set,
    value,
    effect
  }
}

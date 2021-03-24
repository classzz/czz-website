import { useEffect, useState } from "react"

const useLocalStorage = (stateToPersist, key) => {
  const [localState, setLocalState] = useState(stateToPersist)
  if (typeof stateToPersist === "undefined") {
    throw new Error("Cannot store undefined as a state")
  } else if (typeof stateToPersist === "object") {
    if (
      !(stateToPersist instanceof Array) &&
      stateToPersist instanceof Object
    ) {
      localState[Symbol.iterator] = function* () {
        for (let key of Object.keys(localState)) {
          yield localState[key]
        }
      }
    } else if (
      stateToPersist instanceof Array &&
      stateToPersist instanceof Object
    ) {
    } else if (stateToPersist instanceof Date) {
      throw new Error(
        `The provided type should be an object or array, found a date type`
      )
    } else if (stateToPersist instanceof RegExp) {
      throw new Error(
        `The provided is not of appropriate type, expected an object type found a regular expression`
      )
    } else {
      throw new Error(
        `The provided is not of appropriate type, expected an object type found ${stateToPersist}`
      )
    }
  } else if (
    typeof stateToPersist === "function" ||
    typeof stateToPersist === "symbol" ||
    typeof stateToPersist === "undefined"
  ) {
    throw new Error(
      `The type provided cannot be stored in local state of a component, the type found is ${typeof stateToPersist}`
    )
  }

  let isObjectType = typeof localState === "object"
  let depType = isObjectType ? JSON.stringify(localState) : localState

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem(key))

    if (storedState) {
      if (isObjectType && !(localState instanceof Array)) {
        const keys = Object.keys(stateToPersist)
        let allKeysAreEmpty = true

        for (let key of keys) {
          allKeysAreEmpty = allKeysAreEmpty && stateToPersist[key] === ""
        }

        if (allKeysAreEmpty) {
          setLocalState((prevState) => ({ ...prevState, ...storedState }))
        }
      } else if (isObjectType && localState instanceof Array) {
        if (localState.length !== storedState.length) {
          setLocalState(storedState)
        }
      } else if (typeof localState === "string") {
        if (storedState !== localState) {
          setLocalState(storedState)
        }
      } else if (typeof localState === "number") {
        if (storedState !== localState) {
          setLocalState(storedState)
        }
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localState))
  }, [depType])

  return [localState, setLocalState]
}

export default useLocalStorage

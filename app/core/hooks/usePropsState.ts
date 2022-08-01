import { useContext, useEffect, useState } from "react"
//
// import { AuthContext } from '../contexts/AwsCognitoContext';
// import { AuthContext } from '../contexts/Auth0Context';
// import { AuthContext } from '../contexts/FirebaseContext';

// ----------------------------------------------------------------------

export interface UsePropsStateProps<T> {
  value: T
  transform: (node: T) => any
}

const usePropsState = <T>({ value, transform }: UsePropsStateProps<T>): T => {
  const [state, setState] = useState<T>(value)

  useEffect(() => {
    setState(transform(value))
  }, [value])

  return state
}

export default usePropsState

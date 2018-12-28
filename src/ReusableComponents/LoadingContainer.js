import React from 'react'
import Spinner from './Spinner'

const LoadingContainer = ({ loading, children }) => {
  return loading ? <Spinner /> : children
}

export default LoadingContainer

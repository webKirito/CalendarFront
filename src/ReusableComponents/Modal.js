import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styles from '../styles/Modal.module.css'

class Modal extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.root = document.createElement('div')
    document.body.appendChild(this.root)
  }

  componentWillUnmount() {
    document.body.removeChild(this.root)
  }

  render() {
    return ReactDOM.createPortal(
      <div className={styles.modal}>{this.props.children}</div>,
      this.root,
    )
  }
}

export default Modal

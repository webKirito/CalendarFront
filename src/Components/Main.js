import { Switch, Route } from 'react-router'
import React from 'react'
import Calendar from '../pages/Calendar'
import styles from '../styles/App.module.css'

class Main extends React.Component {
  render() {
    return (
      <section className={styles.main}>
        <Switch>
          <Route exact path={'/'} component={Calendar} />
        </Switch>
      </section>
    )
  }
}

export default Main

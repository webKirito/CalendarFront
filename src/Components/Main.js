import { Switch, Route } from 'react-router'
import React from 'react'
import Calendar from './CartPage'

class Main extends React.Component {
  render() {
    return (
      <section>
        <Switch>
          <Route exact path={'/'} component={Calendar} />
        </Switch>
      </section>
    )
  }
}

export default Main

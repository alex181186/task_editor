import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Head from './head'
import Category from './category'
import IndexComponent from './index'

const Home = () => {

  return (
    <div>
      <Head title="Hello" />
      <Switch>
        {/* add your routes here */}
        <Route exact path="/" component={() => <IndexComponent />} />
        <Route exact path="/:category" component={() => <Category />} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default React.memo(Home)

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Head from './head'
import Category from './category'
import IndexComponent from './index'
// import wave from '../assets/images/wave.jpg'

const Home = () => {

  return (
    <div>
      <Head title="Hello" />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-10">
          <Switch>
            {/* add your routes here */}
            <Route exact path="/" component={() => <IndexComponent />} />
            <Route exact path="/:category" component={() => <Category />} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

Home.propTypes = {}

export default React.memo(Home)

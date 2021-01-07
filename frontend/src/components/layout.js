import React from 'react';
import Header from './header';
import Footer from './footer';

const Layout = (props) => {
  return (
    <div>
        <Header jambotron={props.jambotron}/>
        {props.children}
        <Footer profileKey={props.profileKey} profile={props.profileParsing} />
    </div>
  )
}

export default Layout;
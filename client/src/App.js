/* Name: Shinya Abe
   Date: 11/4/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab5
*/


import React from 'react';

import './App.css';

import {ApolloClient, HttpLink, InMemoryCache, ApolloProvider} from '@apollo/client';
import {NavLink, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home'
import MyBin from './components/MyBin'
import MyPosts from './components/MyPosts'
import NewPost from './components/NewPost'

const client = new ApolloClient ({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/'
  })
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div >
          <header className='App-header'> 
            <div className="App">
              <h1 className="appTitle"> 
                Binterest Application which Utilizes ApolloClient 
                and React.js for the client and ApolloServer, 
                GraphQL, Node.js, and Redis on the server. 
              </h1>
            </div>
            <nav>
              <NavLink className="button" to='/'>
                Home
              </NavLink>
              <NavLink className="button" to='/my-bin'>
              My Bin
              </NavLink>
              <NavLink className="button" to='/my-posts'>
                My Posts
              </NavLink>
              <NavLink className="button" to='/new-post'>
                New Post
              </NavLink>
            </nav>
          </header>
          <div>
            <Routes>
              <Route exact path = '/' element={<Home/>}/>
              <Route path = '/my-bin' element={<MyBin/>}/>
              <Route path = '/my-posts' element={<MyPosts/>}/>
              <Route path = '/new-post' element={<NewPost/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

import React, { Component } from 'react'

class Nav extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark  bg-primary">
          <div class="collapse navbar-collapse" id="navbarColor03">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item ">
                <a class="nav-link" href="http://localhost:3001/">Join</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="http://localhost:3001/login">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="http://localhost:3001/home">Map</a>
              </li>
            </ul>
          </div>
      </nav>
        
      </div>
    )
  }
}
export default Nav
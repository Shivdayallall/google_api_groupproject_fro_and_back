import React, { Component } from 'react'
import Nav from './Nav'


class   UserLogin extends Component {
  state = {
    email: '',
    password: '',
    // errors: {}
  }

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler = (e) => {
    e.preventDefault()
    console.log(this.state)
  }

  render() {
    return (
      <div className="userform">
      <Nav />

        <form className="form-signin" onSubmit={this.submitHandler} >
          <h1 className="h3 mb-3 font-weight-normal">Login</h1>

          <input type="email" name="email" className="form-control"  value={this.state.email} onChange={this.inputHandler} placeholder="Email address" required/>

          <input type="password" name="password" className="form-control"  value={this.state.password} onChange={this.inputHandler} placeholder="Password" required/>

          <button className="btn btn-lg btn-primary btn-block" type="submit">GO</button>

        </form>
      </div>
    )
  }
}
export default UserLogin

const Register = require('../models/Register')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


module.exports = {
  join: (params) => {
    return new Promise(( resolve, reject) => {
      Register
        .findOne({email: params.email})
        .then( user => {
          if(user) {
            let errors = {}
            errors.message = 'Email taken! Pick another'
            errors.status = 400
            reject(errors)
          } else {
            const newUser = new Register({name:params.name, email:params.email, password:params.password})

            bcrypt.genSalt(10, (err, salt ) => {
              if(err) {
                reject(err)
              }
              bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
                if(err) {
                  reject(err)
                } else {
                  newUser.password = hashedPassword

                  newUser
                    .save()
                    .then(user => resolve(user))
                    .catch(err => reject(err))
                }
              })
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    })
  },

  login: (params) => {
    const email = params.email
    const password = params.password

    return new Promise((resolve, reject) => {
      Register
        .findOne({email})
        .then(user => {
          if(!user) {
            let errors = {}
            errorsemail = " Email not found"
            errors.status = 404
            reject(errors)
          }
          bcrypt
            .compare(password, user.password)
            .then( isAuth => {

              if(isAuth) {
                let errors = {}
                errors.password = "check password and email"
                errors.status = 404

              } else {
                const payload = {
                  id: user._id,
                  email: user.email,
                  name: user.name
                }
                
                jwt.sign(payload, process.env.SUPER_KEY, {expiresIn: 4000}, (err, token) => {
                  if(err) {
                    console.log(err)
                    reject(err)
                  }
                  let success = {}
                  success.confirmation = "Complete"
                  success.token = "Bearer " + token
                  resolve(success)
                })
              }
            })
        })
    })
  }

}
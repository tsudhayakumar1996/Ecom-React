import React from 'react'
var CryptoJs = require('crypto-js')

export default function User() {    

  const userDetails = {
    userName : "Udhay",
    passWord : "123456"
  }

  //encrypt
  var encripted = CryptoJs.AES.encrypt(JSON.stringify(userDetails),"fhdfdufhidnwebf487643289776&^&^&^").toString()
  console.log(encripted,"<=====================encripted value,,,,,,,,,,")

  //decrypt
  var decripted = CryptoJs.AES.decrypt(encripted,"fhdfdufhidnwebf487643289776&^&^&^")
  var decriptedString = JSON.parse(decripted.toString(CryptoJs.enc.Utf8))

  console.log(decriptedString)

  return (
    <div style={{height:'110vh'}}>
        <p>User Page</p>
    </div>
  )
}

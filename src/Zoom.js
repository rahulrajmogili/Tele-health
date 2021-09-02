import { React, useEffect } from 'react'
import { ZoomMtg } from '@zoomus/websdk';
import './Zoom.css';

const crypto = require('crypto') // crypto comes with Node.js

function generateSignature(apiKey, apiSecret, meetingNumber, role) {
  return new Promise((res, rej) => {
    // Prevent time sync issue between client signature generation and zoom 
    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
    const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
    const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')
  res(signature)
  })
}

var apiKey = 'JWT_API_KEY'
var apiSecret = ''
var meetingNumber = 123456789
var role = 0
var leaveUrl = 'http://localhost:9999' // our redirect url
var userName = 'WebSDK'
var userEmail = ''
var passWord = ''
var signature = '' 

generateSignature(apiKey, apiSecret, meetingNumber, role).then((res) => {
  signature = res;
}) // need to generate based on meeting id

function Zoom() {
  const video = document.getElementById("zmmtg-root")

  useEffect(() => {
    showZoomDiv();
    ZoomMtg.setZoomJSLib('https://source.zoom.us/{VERSION_NUMBER}/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    initialMeeting();
  }, []);

  const getMedia = () => {
    let stream = null

    try {
      stream = navigator.mediaDevices.getUserMedia({video: true, audio: true})
      console.log(stream)
    } catch (err) {
      console.error(`The error is get Media:- ${err}`)
    }
  }

  const showZoomDiv = () => {
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    }).then(stream => {
      video.srcObject = stream;
    }).catch(console.error)
    video.style.display = "block";
  }

  const initialMeeting = () => {
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)
    
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })
    
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div>
      Zoom
    </div>
  )
}

export default Zoom

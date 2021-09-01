import { React, useEffect } from 'react'
import { ZoomMtg } from '@zoomus/websdk';
import './Zoom.css';

function Zoom() {
  var signatureEndpoint = 'http://localhost:4000'
  var apiKey = 'JWT_API_KEY'
  var meetingNumber = 123456789
  var role = 0
  var leaveUrl = 'http://localhost:9999' // our redirect url
  var userName = 'WebSDK'
  var userEmail = ''
  var passWord = ''
  var signature = '' // need to generate based on meeting id

  useEffect(() => {
    showZoomDiv();
    ZoomMtg.setZoomJSLib('https://source.zoom.us/{VERSION_NUMBER}/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    initialMeeting();
  }, []);

  const showZoomDiv = () => {
    document.getElementById("zmmtg-root").style.display = "block";
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

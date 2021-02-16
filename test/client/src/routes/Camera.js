import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import * as tf from '@tensorflow/tfjs';

//https://towardsdatascience.com/how-to-use-tensorflow-js-in-react-js-sentimental-analysis-59c538c07256
//https://github.com/Dirvann/webrtc-video-conference-simple-peer/blob/master/src/socketController.js

const cocoSsd = require('@tensorflow-models/coco-ssd');


const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 100%;
    width: 100%;
`;

const Camera = (props) => {

    const userVideo = useRef();
    const videoID = props.match.params.videoID;
    const audioID = props.match.params.audioID;

    var children = [];

    useEffect(() => {

        var videostring = (videoID !== 'false') ? { deviceId: { exact: videoID }, width: { ideal: 1280 }, height: { ideal: 720 } } : false
        var audiostring = (audioID !== 'false') ? { deviceId: { exact: audioID } } : false

        navigator.mediaDevices.getUserMedia({
            video: videostring,
            audio: audiostring,
        }).then(stream => {
            userVideo.current.srcObject = stream;

            // predictWebcam(userVideo)

            userVideo.current.addEventListener('loadeddata', (event) => {

                predictWebcam(userVideo)
                console.log('Yay! The readyState just increased to  ' +
                    'HAVE_CURRENT_DATA or greater for the first time.');
            });


               // const mediaStream = await navigator.mediaDevices.getUserMedia({video: true});
           // const video = document.createElement('video');
           // video.srcObject = mediaStream;



        }).catch(error => {
            console.log("da geht nix " + error)
        })

        return function cleanup() {
            console.log("cleanup " + videoID)
            userVideo.current.srcObject.getTracks().forEach(function (track) {
                //if (track.readyState == 'live') {
                track.stop();
                //}
            });
        }
        // eslint-disable-next-line
    }, []);


    function predictWebcam(refvideo) {
        // Now let's start classifying a frame in the stream.
        cocoSsd.load()
            .then((cocomodel) => {
                console.log(refvideo)
                cocomodel.detect(refvideo).then(function (predictions) {
                    // Remove any highlighting we did previous frame.
                    //for (let i = 0; i < children.length; i++) {
                    //     liveView.removeChild(children[i]);
                    //}
                    children.splice(0);

                    // Now lets loop through predictions and draw them to the live view if
                    // they have a high confidence score.
                    for (let n = 0; n < predictions.length; n++) {
                        // If we are over 66% sure we are sure we classified it right, draw it!
                        if (predictions[n].score > 0.66) {
                            const p = document.createElement('p');
                            p.innerText = predictions[n].class + ' - with '
                                + Math.round(parseFloat(predictions[n].score) * 100)
                                + '% confidence.';
                            p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
                                + (predictions[n].bbox[1] - 10) + 'px; width: '
                                + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

                            const highlighter = document.createElement('div');
                            highlighter.setAttribute('class', 'highlighter');
                            highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
                                + predictions[n].bbox[1] + 'px; width: '
                                + predictions[n].bbox[2] + 'px; height: '
                                + predictions[n].bbox[3] + 'px;';

                            //            liveView.appendChild(highlighter);
                            //            liveView.appendChild(p);
                            children.push(highlighter);
                            children.push(p);
                        }
                    }
                    // Call this function again to keep predicting when the browser is ready.
                    window.requestAnimationFrame(predictWebcam);
                });

            })

    }
 
    return (
        <Container>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
        </Container>
    );
};

export default Camera;

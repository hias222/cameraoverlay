import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import CircularProgress from '@material-ui/core/CircularProgress';

import * as tf from '@tensorflow/tfjs';

//https://towardsdatascience.com/how-to-use-tensorflow-js-in-react-js-sentimental-analysis-59c538c07256
//https://github.com/Dirvann/webrtc-video-conference-simple-peer/blob/master/src/socketController.js

const cocoSsd = require('@tensorflow-models/coco-ssd');

//const video = document.getElementById('webcam');
//const liveView = document.getElementById('liveView');

const Container = styled.div`
    padding: 0px;
    margin: 0px;
`;

const StyledVideo = styled.video`
    height: 100%;
    width: 1280px;
`;

const Video = (props) => {
    const ref = useRef();
  
    //React Hook
    //const [metadata, setMetadata] = useState();
    const [model, setModel] = useState();
    //    const model = cocoSsd.load();
    var children = [];

    useEffect(() => {

        props.peer.on('connect', () => {
            console.log("start connect");
        })

        props.peer.on("stream", stream => {
            console.log("start stream");
            ref.current.srcObject = stream;

           // const mediaStream = await navigator.mediaDevices.getUserMedia({video: true});
           // const video = document.createElement('video');
           // video.srcObject = mediaStream;

            ref.current.addEventListener('loadeddata', (event) => {
                //predictWebcam(ref.current);
                console.log(ref)
                

                //predictWebcam(ref.current);
           
                console.log('Yay! The readyState just increased to  ' +
                    'HAVE_CURRENT_DATA or greater for the first time.');
            });


            //predictWebcam(ref.current);
        })

        props.peer.on('error', (err) => {
            console.log("error - " + err)
        })

        props.peer.on('close', () => {
            console.log("close peer")
        })

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
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const Viewer = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const peersRef = useRef([]);
    const roomID = props.match.params.roomID;

    const [loading, setLoading] = React.useState(true);

    useEffect(() => {

        socketRef.current = io.connect(process.env.REACT_APP_WSURL, {
            path: "/peerws/socket.io"
        });

        console.log("connect to " + process.env.REACT_APP_WSURL)

        socketRef.current.emit("join room", roomID);

        socketRef.current.on("user joined", payload => {
            console.log("user joined " + payload.callerID)
            const peer = addPeer(payload.signal, payload.callerID);
            peersRef.current.push({
                peerID: payload.callerID,
                peer,
            })
            setPeers(users => [...users, peer]);
        });


        socketRef.current.on("removePeer", payload => {
            console.log("removePeer")
            console.log(payload)

        });

        return function cleanup() {
            // delete from websockt!!

            var id = socketRef.current.id

            socketRef.current.emit("closing peer", { callerID: id })
            // eslint-disable-next-line
            peersRef.current.map((peer) => {
                console.log("cleanup " + peer.peer)
                peer.peer.destroy();
            })
        }

        // })
        // eslint-disable-next-line
    }, []);

    function addPeer(incomingSignal, callerID) {
        console.log("add peer")
        const peer = new Peer({
            initiator: false,
            trickle: false,
        })

        peer.on("signal", signal => {
            setLoading(false);
            console.log("get signal")
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.on('error', (err) => {
            var tmp = err.message;
            console.log(tmp)
        })

        peer.on('close', () => {
            console.log("close peer " + callerID)
        })

        peer.signal(incomingSignal);

        return peer;
    }

    function spinner() {
        if (loading) {
            return <CircularProgress />
        } else {
            return
        }
    }

    function message() {
        if (loading) {
            return <p>on long running use back in browser</p>
        } else {
            return
        }
    }

    function showvideo() {
        var videos = ''
        peers.map((peer, index) => {
            videos = <Video key={index} peer={peer} />
            return null
        })
        return videos;
    }

    return (
        <div>
            {spinner()}
            {message()}
            <Container>
                {showvideo()}
            </Container>

        </div>

    );
};

export default Viewer;
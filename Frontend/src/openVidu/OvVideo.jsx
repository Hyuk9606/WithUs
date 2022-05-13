import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }
    
    componentDidMount() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    render() {
        return (
            <>
                {this.props.streamManager.stream.typeOfVideo === "CAMERA" ? <video autoPlay={true} ref={this.videoRef} style={{display:'none'}} /> : <video autoPlay={true} ref={this.videoRef} />}
            </>
        ) 
    }

}

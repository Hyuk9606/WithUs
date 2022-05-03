import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidUpdate() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }

    }

    componentDidMount() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
        console.log("==========user", this.props)
        // if (this.props && this.props.user.streamManager.session && this.props.user && !!this.videoRef) {
        //     this.props.user.streamManager.session.on('signal:userChanged', (event) => {
        //         const data = JSON.parse(event.data);
        //         console.log("이벤트 갑지 =========", data)
        //         if (data.isScreenShareActive !== undefined) {
        //             this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
        //         }
        //     });
        // }
    }

    render() {
        return <video
            autoPlay={true}
            ref={this.videoRef}
            muted={this.props.mutedSound}
        />;
    }

}

import React, { Component } from 'react';
import Lottie from 'react-lottie';
import animationData from '../images copy/Instructor1.json';

export default class LottieControl extends Component {
    constructor(props) {
        super(props);
        this.state = { isStopped: false, isPaused: false };
    }

    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <div>
                <Lottie
                    options={defaultOptions}
                    style={{ height: "350px", width: "500px", objectFit: "cover" }}

                    isStopped={this.state.isStopped}
                    isPaused={this.state.isPaused}
                />
            </div>
        );
    }
}

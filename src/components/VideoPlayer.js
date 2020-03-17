import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class VideoPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bloqueado : false
        };
        this.toogleBloquear = this.toogleBloquear.bind(this);
    }

    toogleBloquear() {
        this.setState({
            bloqueado : !this.state.bloqueado
        });
    }

    render() {
        const url = `https://www.youtube.com/embed/${this.props.videoId}?autoplay=${this.state.bloqueado ? 1 : 0}&rel=0&autohide=1&showinfo=0&controls=0&loop=1&disablekb=1&modestbranding=1`;

        const overlay = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            xIndex: 10
          }
        return <div style={{width:'100%', height:'100%' }}>
                <div id="yt-player-container" style={ this.state.bloqueado ? overlay : {width:'100%', height:'100%' }}>
                    <button onClick={this.toogleBloquear} style={{position: 'absolute'}} >Bloquear Tela</button>
                    <iframe title='yt-player' width='100%' height='100%' 
                        src={url} frameBorder='0' 
                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen' 
                        allowFullScreen
                        muted>
                    </iframe>    
                </div>
                {this.state.bloqueado && 
                    <div id="yt-player-container-block" style={overlay}>
                        <button onClick={this.toogleBloquear} style={{position: 'absolute'}} >Desbloquear Tela</button>
                    </div>
                }
            </div>
    }
}

VideoPlayer.propTypes = {
    videoId: PropTypes.string
};
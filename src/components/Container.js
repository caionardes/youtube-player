import React, { Component } from "react";
import Playlist from "./Playlist";
import VideoPlayer from "./VideoPlayer";
import CampoDeBusca from "./CampoDeBusca";

export default class Container extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videoId : "iY91JoMWQoM",
            searchKeyword : 'mundo de bita'
        };

        this.verVideo = this.verVideo.bind(this);
        this.atualizarPlaylist = this.atualizarPlaylist.bind(this);
    }

    atualizarPlaylist(searchKeyword) {
        this.setState({
            searchKeyword : searchKeyword
        });
    }

    verVideo(videoId) {
        this.setState({
            videoId : videoId
        });
    }

    render() {
        return <div className="App" style={{backgroundColor: '#b3d7f7', height: '100%'}}>
			<header id="App-header">
				<div>
                    <label style={{float:'left'}}>Pesquisar:</label>
                    <CampoDeBusca handleBuscar={this.atualizarPlaylist} />
                </div>
			</header>
            <br></br>
            <table width="100%">
                <tbody>
                    <tr>
                        <td width="70%">
                            <div style={{height:500, overflow: 'auto'}}>
                                <VideoPlayer videoId={this.state.videoId}></VideoPlayer>
                            </div>
                        </td>
                        <td width="30%">
                            <div style={{height:500, overflow: 'auto'}}>
                                <Playlist searchKeyword={this.state.searchKeyword} verVideo={this.verVideo}></Playlist>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
      </div>
    }
}
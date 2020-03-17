import React, { Component } from "react";
import * as VideoService from "../services/VideoService"

export default class Playlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalResults : 0,
            resultsPerPage : 0,
            playListItems : [],
            ultimaPesquisa : ""
        };

        this.limparPlaylist = this.limparPlaylist.bind(this);
        this.pesquisar = this.pesquisar.bind(this);
    }
    
    limparPlaylist() {
        this.setState({
            totalResults : 0,
            resultsPerPage : 0,
            playListItems : []
        });
    }

    pesquisar(searchKeyword) {
        if (!searchKeyword || searchKeyword === "") {
            this.limparPlaylist();
            return;
        }

        const promise = VideoService.listByKeyword(searchKeyword);

        promise.then( resultadoPesquisaVideos => {
            const playListItems = this.criarPlaylist(resultadoPesquisaVideos.videos);
            this.setState({
                totalResults: resultadoPesquisaVideos.totalResults,
                resultsPerPage : resultadoPesquisaVideos.resultsPerPage,
                playListItems : playListItems
            });
        }).catch( err => {
           // alert("Erro na Promise da Playlist: " + err);
        });
    }

    criarPlaylist(videos) {
        return videos.map(video => {
            const { videoId, title,  thumbnailURL } = video;
            //description,
            return (
                <div key={videoId} id={videoId}
                    onClick={(e) => this.props.verVideo(videoId)}
                    style={
                        {
                            borderRadius: 10,
                            border: '1px solid black',
                            margin: 4, padding: 4,
                            display: 'flex',
                            ':hover' : {
                                backgroundColor: "#ff0000",
                                color: "#ffffff"
                            }
                        }
                    }
                >
                    <div style={{width: '50%'}}>
                        <img src={thumbnailURL} alt={title}></img>
                    </div>
                    <div style={{width: '50%'}}>
                        <p style={{float:'left'}}>{videos.length}-{title}</p>
                        {/*<p>{description}</p> 
                        <p>{videoId}</p>*/}
                    </div>
                </div>
            );
        });
    }

    criaItem(index, id) {
        return <p key={index}>{id}</p>
    }

    componentDidMount() {
        this.pesquisar(this.props.searchKeyword);
    }

    render() {
        if (this.state.ultimaPesquisa !== this.props.searchKeyword) {
            this.setState({
                ultimaPesquisa: this.props.searchKeyword
            });
            this.pesquisar(this.props.searchKeyword)
        }
        return <div>Resultado da Pesquisa "{this.props.searchKeyword}"
            {this.state.playListItems}
        </div>
    }
}
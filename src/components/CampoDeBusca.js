import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class CampoDeBusca extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchKeyword : ''
        };

        this.buscar = this.buscar.bind(this);
    }

    buscar() {
        this.props.handleBuscar(this.state.searchKeyword);
    }

    render() {
        return <div>
                <input type='text' name='searchKeyword'
                        onChange={(evt) => this.setState({ searchKeyword : evt.target.value })}
                        
                        onKeyDown={(evt) => {if (evt.keyCode === 13) { this.buscar() }} }
                        value={this.state.searchKeyword} ></input>
                <button onClick={this.buscar}>OK</button>
            </div>
    }
}

CampoDeBusca.propTypes = {
    handleBuscar: PropTypes.func
};
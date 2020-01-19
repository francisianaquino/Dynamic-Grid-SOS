import React, { Component } from 'react';
import Settings from '../components/Settings';
import { Button } from 'reactstrap';
import logo from '../img/logo.jpg'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: true,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            isShown: false,
        });
    }

    render() {
        return (
            <div>
                <div hidden={!this.state.isShown}>
                    <h1 className="title">-S<strike>O</strike>S-</h1>
                    <div className="home">
                        <img src={logo} alt="logo" />
                        <div className="gamesettings">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <Button className="mt-3 btn btn-primary btn-lg" color="primary" block onClick={this.handleClick}>Play</Button>
                    </div>
                </div>
                <div className="settings-container" hidden={this.state.isShown}>
                    <Settings />
                </div>
            </div>
        );
    }
}

export default Home;
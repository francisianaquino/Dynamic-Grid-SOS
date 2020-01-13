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
                <div className="home" hidden={!this.state.isShown}>
                    <img src={logo} alt="logo"/>
                    <Button className="mt-3" color="primary" block onClick={this.handleClick}>Enter</Button>
                </div>
                <div className="settings-container" hidden={this.state.isShown}>
                    <Settings />
                </div>
            </div>
        );
    }
}

export default Home;
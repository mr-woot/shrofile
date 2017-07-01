import React, { Component } from 'react';
// import { Form, FormControl, Button } from 'react-bootstrap';

import List from './List';
import './App.css';
import booksData from './searchbook.json';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentWillMount() {
        this.setState({data: booksData.books});
    }

    render() {
        return (
            <div className="App">
                <List data={this.state.data} />
            </div>
        );
    }
}

export default App;
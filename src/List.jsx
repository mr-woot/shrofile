import React, { Component } from 'react';
import _ from 'lodash';

import './App.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            query: ""
        };
    }

    componentWillMount() {
        this.setState({data: this.props.data});
    }

    searchByTitle(search) {
        // if (search === "")
        //     this.setState({data: this.props.data});
        const results = _.filter(this.props.data, item => {
            return item.title.toLowerCase().indexOf(this.state.query) > -1;
        });
        
        this.setState({data: results});
    }

    sortById() {
        const results = _.orderBy(this.state.data, [item => item.globalbookid.toLowerCase()], ['asc']);

        this.setState({data: results});
    }

    sortByTitle() {
        const results = _.orderBy(this.state.data, [item => item.title.toLowerCase()], ['asc']);

        this.setState({data: results});
    }

    authorNames(authors) {
        let authStr = "";
        let aLen = authors.length;

        authStr = authors.map((names, i) => {
            if (aLen === i + 1)
                return (names.firstname + names.lastname + '.');
            return (names.firstname + names.lastname + ', ');
        });
        
        return (
            authStr
        )
    }

    render() {
        return (
            <div>
                <div className="Search">
                    <div className="Search-title">Search in Books </div>
                    <div className="form">
                        <div className="form-group">
                            <input type="text" onChange={event => {this.setState({query: event.target.value})}} className="form-control" placeholder="Search by title" />
                            <button className="btn btn-success" type="submit" onClick={event => this.searchByTitle(this.state.query)}>Search </button>
                        </div>
                    </div>
                </div>
                <div className="Sort">
                    <span className="Sort-title">Sort By: </span>
                    <span className="Sort-by" onClick={() => {this.sortById()}}>globalbookid</span>
                    <span className="Sort-separator">|</span>
                    <span className="Sort-by" onClick={() => {this.sortByTitle()}}>title</span>
                </div>
                <div className="List">
                    <div className="List-title">List of Books</div>
                    <div className="List-data">
                        <table className="table table-bordered table-striped table-responsive">
                            <thead>
                                <tr>
                                    <th>globalbookid</th>
                                    <th>title</th>
                                    <th>authors</th>
                                    <th>ebookisbn10</th>
                                    <th>ebookisbn13</th>
                                    <th>printisbn10</th>
                                    <th>printisbn13</th>
                                    <th>librarysupported</th>
                                    <th>editiontype</th>
                                    <th>previewlink</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map(item => {
                                    return (
                                        <tr key={item.globalbookid}>
                                            <td className="List-row">{item.globalbookid}</td>
                                            <td className="List-row">{item.title}</td>
                                            <td className="List-row">
                                                {this.authorNames(item.authors)}
                                            </td>
                                            <td className="List-row">{item.ebookisbn10}</td>
                                            <td className="List-row">{item.ebookisbn13}</td>
                                            <td className="List-row">{item.printisbn10}</td>
                                            <td className="List-row">{item.printisbn13}</td>
                                            <td className="List-row">{item.librarysupported}</td>
                                            <td className="List-row">{item.editiontype}</td>
                                            <td className="List-row"><a href={item.previewlink}>{item.previewlink}</a></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default List;
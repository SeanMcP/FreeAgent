import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyFancyComponent from './Map';
import { geocodeAddress , storeMeets } from '../actions'
import * as moment from 'moment';

class Search extends Component {
    constructor(props){
        super(props);

        this.state = {
            query: this.props.query,
            data: []

        }
        console.log("this.state before fetch: ", this.state);
    }

    handleQuery = e => {
        this.setState({ query : e.target.value})
    }

    handleSearch = e => {
      // search for events
      e.preventDefault();
      this.setState({ query: e.target.value })

      fetch(`/api/search/meet/`+ this.state.query)
      .then(res => res.json())
      .then(data => {
          // Return fetched data
          this.setState({ data: data });
          console.log("state after fetch: ", this.state);

          // return data
      })
      .catch(err => console.log(err))

    }
    moveCursor = e => {
      let temp = e.target.value;
      e.target.value = '';
      e.target.value = temp;
    }

    fetchFilteredMeets = e => {
    }

    render(){
    //   console.log('props on search', this.props);
    //   console.log('state on search', this.state);

    let filteredMeets = this.state.data.map((meet, index)=>{
        return(
            <tr key= {index}>
                <td scope="row">{index + 1}</td>
                <td>{meet.name}</td>
                <td>{moment(meet.date_start).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
                <td>{meet.country}</td>
                <td><button  className="btn btn-primary"> <a id="adminViewMeet" href="/admin/dashboard">View Meet</a> </button></td>
            </tr>
        )
    })

        return (
            <div id="searchPage">
                <div id="left" className="panel panel-default">
                    <div className="panel-body"> Search Page Left.
                        <div id="searchField" className="row">
                            <input type="text" className="form-control" id="searchQuery" placeholder="Search for meets" value={this.state.query} onChange={this.handleQuery} autoFocus onFocus={this.moveCursor}/>
                            {/* autoFocus selects the input field on page load */}
                            <button type="submit" className="btn btn-primary" id="searchButton" onClick={this.handleSearch}>Search</button>
                        </div>
                        <div id="mapField">
                            <MyFancyComponent/>
                        </div>
                    </div>
                </div>

                <div id="right" className="panel panel-default">
                    <div className="panel-body">
                        <h1>Available Meets</h1>
                        <table id="searchResults" className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Meet Name</th>
                                    <th>Start Date</th>
                                    <th>Country</th>
                                    <th>Edit Meet</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {filteredMeets}
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
  console.log('state on Search', state);
  return {
    query: state.query
  }
}

export default connect(mapStateToProps)(Search);

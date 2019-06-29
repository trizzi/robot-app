import React, { Component } from 'react';
import { connect } from 'react-redux'
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/scroll';
import '../containers/App.css'

import { setSearchField, requestRobots } from '../action'

const mapStateToProps = state => {
    console.log (state)
    return {
           searchField: state.searchRobots.searchField,
           robots: state.requestRobots.robots,
           isPending: state.requestRobots.isPending,
           error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
     }
} 
class Appp extends Component {
    componentDidMount(){
        this.props.onRequestRobots();   
}

    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots =robots.filter (robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return isPending ?
     <h1>LOADING...</h1>:
           (
            <div className='tc'>
                <h1>ROBOFRIENDS</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                <CardList robots={filteredRobots} />
                </Scroll>
            </div>
        );
    }
    }


export default connect(mapStateToProps, mapDispatchToProps)(Appp);

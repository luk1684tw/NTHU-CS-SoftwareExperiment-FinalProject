import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ListView, RefreshControl, Text
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import {Left,Right,Body, List, ListItem, CheckBox} from 'native-base';


import PostItem from './PostItem';

import {connect} from 'react-redux';
import {listPosts, listMorePosts} from '../states/post-actions';

class PostList extends React.Component {
    static propTypes = {
        searchText: PropTypes.string.isRequired,
        listingPosts: PropTypes.bool.isRequired,
        listingMorePosts: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        events: PropTypes.array.isRequired,
        hasMorePosts: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)
            })
        };

        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(listPosts(this.props.searchText));
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const {listingPosts, hasMorePosts, events} = this.props;
        return (
          <List dataArray={events}
                        renderRow={(event) =>
                            <ListItem>
                                <Text>{event.StartDate}-{event.EndDate}{' '}</Text>
                                <Text>{event.Title} {' Group: '+event.Group}</Text>
                                <CheckBox checked={false} />
                                <Text>{event.Description}</Text>

                            </ListItem>
                        }>
          </List>
        )
    }

    handleRefresh() {
        const {dispatch, searchText} = this.props;
        dispatch(listPosts(searchText));
    }

    handleLoadMore() {
        const {listingMorePosts, dispatch, events, searchText} = this.props;
        const start = events[events.length - 1].id;
        if (listingMorePosts !== start)
            dispatch(listMorePosts(searchText, start));
    }
}

export default connect((state, ownProps) => ({
    searchText: state.search.searchText,
    listingPosts: state.post.listingPosts,
    listingMorePosts: state.post.listingMorePosts,
    events: state.post.events,
    hasMorePosts: state.post.hasMore
}))(PostList);

import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ListView, RefreshControl
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import {Left,Right,Body} from 'native-base';


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
        posts: PropTypes.array.isRequired,
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
        const {listingPosts, hasMorePosts, posts} = this.props;
        return (

            <View>
                <PostItem/>
                <PostItem/>
            </View>

        )
    }

    handleRefresh() {
        const {dispatch, searchText} = this.props;
        dispatch(listPosts(searchText));
    }

    handleLoadMore() {
        const {listingMorePosts, dispatch, posts, searchText} = this.props;
        const start = posts[posts.length - 1].id;
        if (listingMorePosts !== start)
            dispatch(listMorePosts(searchText, start));
    }
}

export default connect((state, ownProps) => ({
    searchText: state.search.searchText,
    listingPosts: state.post.listingPosts,
    listingMorePosts: state.post.listingMorePosts,
    posts: state.post.posts,
    hasMorePosts: state.post.hasMore
}))(PostList);

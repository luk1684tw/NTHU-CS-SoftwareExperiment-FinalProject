import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Platform, Modal,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Header, Container, Item, Input, Content, Thumbnail,Label, Badge, Button, Text as NbText, List, ListItem, Separator, Left, Body, Right,Toast} from 'native-base';
import appColors from '../styles/colors';
import {setGroupScreenName, createGroup, listEvents, listGroups, Animated} from '../states/event-actions';
import {toggleGroupNameModal, setGroupNameText} from '../states/groupName';
import {connect} from 'react-redux';

class DrawerSideBar extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        groups: PropTypes.array.isRequired,
        groupNameText: PropTypes.string.isRequired,
        groupScreenName: PropTypes.string.isRequired,
        modalToggle: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
        pictureNum: PropTypes.number.isRequired
    };
    constructor(props){
        super(props);
        this.handleOnClick=this.handleOnClick.bind(this);
        this.handleOpenGroupName=this.handleOpenGroupName.bind(this);
        this.handleCloseGroupName=this.handleCloseGroupName.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleOnClickOtherWindow=this.handleOnClickOtherWindow.bind(this);
        this.handleOnClickCorgi=this.handleOnClickCorgi.bind(this);
        this.images = [
          require('../images/corgi-24.png'),
          require('../images/corgi-25.png'),
          require('../images/corgi-26.png'),
          require('../images/corgi-27.png'),
          require('../images/corgi-28.png'),
          require('../images/corgi-29.png'),
          require('../images/corgi-30.png'),
          require('../images/corgi-31.png'),
          require('../images/corgi-32.png'),
          require('../images/corgi-33.png'),
          require('../images/corgi-34.png'),
          require('../images/corgi-35.png'),
          require('../images/corgi-36.png'),
          require('../images/corgi-37.png'),
          require('../images/corgi-38.png'),
          require('../images/corgi-39.png'),
          require('../images/corgi-40.png'),
          require('../images/corgi-41.png'),
          require('../images/corgi-42.png'),
          require('../images/corgi-43.png'),
          require('../images/corgi-44.png'),
          require('../images/corgi-45.png'),
          require('../images/corgi-46.png'),
          require('../images/corgi-47.png'),
          require('../images/corgi-48.png'),
          require('../images/corgi-49.png'),
          require('../images/corgi-50.png'),
          require('../images/corgi-51.png'),
          require('../images/corgi-52.png'),
          require('../images/corgi-53.png'),
          require('../images/corgi-54.png'),
          require('../images/corgi-55.png'),
          require('../images/corgi-56.png'),
          require('../images/corgi-57.png'),
        ];
        this.next = this.next.bind(this);
        this.state = {
            index: 0,
            firstclick:0
        };
    }
    componentDidMount(){
        this.props.dispatch(listGroups());
    }
    handleOnClick(item){
        this.props.dispatch(setGroupScreenName(item));
        // console.log(item, this.props.groupScreenName);
         this.props.dispatch(listEvents(this.props.groupScreenName));
        this.props.navigate('Group');
        // this.props.dispatch(setGroupScreenName(item));
    }
    handleOnClickOtherWindow(screenName){
        this.props.dispatch(setGroupScreenName(''));
        this.props.navigate(screenName);
    }

    handleOpenGroupName(){
        // Todo: dynamic add group name
        this.props.dispatch(setGroupNameText(''));
        this.props.dispatch(toggleGroupNameModal());
    }
    handleCloseGroupName(){
        this.props.dispatch(setGroupNameText(''));
        this.props.dispatch(toggleGroupNameModal());
    }
    handleSubmit(e){
        if(e.nativeEvent.text){
            this.props.dispatch(createGroup(e.nativeEvent.text));
            this.props.dispatch(setGroupNameText(e.nativeEvent.text));
            this.props.dispatch(toggleGroupNameModal());
            if(this.props.groups.length==0){
            Toast.show({
            supportedOrientations: ['portrait','landscape'],
            text: 'You got a new milestone',
            position: 'bottom',
            duration: 2600
          })}
          if(this.props.groups.length==4){
          Toast.show({
          supportedOrientations: ['portrait','landscape'],
          text: 'You got a new milestone',
          position: 'bottom',
          duration: 2600
        })}
        }
    }

    handleOnClickCorgi(){
      clearInterval(this.interval);
      this.next();
    }

    componentWillReceiveProps(){
      if(this.props.pictureNum == 44 ){
            clearInterval(this.interval);
          }
    }

    next() {
        this.interval = setInterval(() => {
            this.setState({index: (this.state.index+1)%34});
            if(this.state.index == 33){
              this.setState({index: (this.state.index+1)%34});
              clearInterval(this.interval);
            }
        }, 50);
    }

    componentWillMount(){
      this.interval = setInterval(() => {
          this.setState({index: (this.state.index+1)});
          var w= this.images[this.state.index];
          if(this.state.index == 33){
            this.setState({index: 0});
            clearInterval(this.interval);
          }
      }, 50);
    }

    render() {

      const {navigate, dispatch, modalToggle, groupNameText, groups , pictureNum , eventStartDate ,eventEndDate} = this.props;
      var e = (this.state.firstclick==0)  ? 'Welcome back Master~': 'hihi';
      //-----------------Group List Setting-----------------------
        //var items=['和學妹出去玩', '和妹妹野餐', '和女友約會'];

        let children=(
          <ListItem>
              <Icon name='tag-multiple' size={24}/>
              <Text style={styles.text}>Add group</Text>
          </ListItem>
        );
        if(groups.length){
          children=(
              <List dataArray={groups}
              renderRow={(group) =>
                  <ListItem button onPress={() =>  {this.handleOnClick(group)}}>
                      <Icon name='tag-multiple' size={20}/>
                      <Text style={styles.text}>{group}</Text>
                  </ListItem>
              }>
              </List>
          );
        }
      //----------------------------------------------------

      return (
        <Container style={styles.drawer}>
          <TouchableOpacity   onPress={() => {this.handleOnClickCorgi();
                                              this.setState({firstclick:!this.state.firstclick});
                                              Toast.show({
                                              supportedOrientations: ['portrait','landscape'],
                                              text: e,
                                              position: 'bottom',
                                              duration: 2600
                                            })}}>
          <Image
              source={this.images[this.state.index]}
              style={styles.corgi}
            /></TouchableOpacity>
            <Content>
                <List>
                    {/* 代辦事項 */}
                    <ListItem itemDivider style={styles.itemheight}><Left><Text style={styles.text}>Todo</Text></Left><Body></Body><Right></Right></ListItem>
                    <ListItem button onPress={()=>{this.handleOnClickOtherWindow('Today')}}>
                        <Icon name='bomb' size={20}/>
                        <Text style={styles.text}>Today</Text>
                    </ListItem>
                    <ListItem  button onPress={()=>{this.handleOnClickOtherWindow('Upcoming')}}>
                        <Icon name='clock-alert' size={20}/>
                        <Text style={styles.text}>Upcoming</Text>
                    </ListItem>
                    <ListItem  button onPress={()=>{this.handleOnClickOtherWindow('SomeDay')}}>
                        <Icon name='trophy' size={20}/>
                        <Text style={styles.text}>Milestone</Text>
                    </ListItem>
                    {/* 群組 */}
                    <ListItem itemDivider>
                            <Left><Text style={styles.text}>Group</Text></Left>
                            <Body></Body>
                            <Right>
                                {/* TODO: Add Group Name Button */}
                                {(modalToggle)?
                                    <Icon name='window-close' size={20}
                                    onPress={this.handleOpenGroupName} />:
                                    <Icon name='tag-plus' size={20}
                                        onPress={this.handleCloseGroupName} />}
                            </Right>
                    </ListItem>
                    {(modalToggle===false)?<Text></Text>:<ListItem>
                        <Item >
                               <Input placeholder='Enter group name '
                                   defaultValue={groupNameText}
                                   onEndEditing={this.handleSubmit}/>
                               <Button transparent success onPress={this.handleSubmit} ><Text>Add</Text></Button>
                        </Item>
                    </ListItem>}
                    {children}
                    {/* 設定 */}
                    <ListItem itemDivider><Left><Text style={styles.text}>Setting</Text></Left><Body></Body><Right></Right></ListItem>
                    <ListItem  button onPress={()=>{this.handleOnClickOtherWindow('Setting')}}>
                        <Icon name='settings-box' size={20}/>
                        <Text style={styles.text}>Preference</Text>
                    </ListItem>
                </List>
            </Content>

        </Container>
    );
    }
    foo(item){
        console.log(item);
    }
}

const styles = {
    drawer: {
        flex: 2,
        backgroundColor: 'white'
    },
    header: {
        width: undefined,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#666',
        marginBottom: 16
    },
    header_title: {
        flexDirection:'row',
        justifyContent:'center'
    },
    item: {
        alignItems: 'center'
    },
    icon: {
        color: appColors.primaryLightText
    },
    text: {
        color: appColors.primaryLightText,
        fontSize: (Platform.OS === 'ios') ? 10 : 12,
        fontWeight: 'bold',
        flex: 1,
        marginHorizontal: 12,

    },
    title:{
        backgroundColor: 'rgb(255, 219, 251)',
        fontSize: (Platform.OS === 'ios')? 10: 12
    },
    itemheight:{
      flex:1
    },
    corgi:{
      width:125,
      height:125,
      marginLeft:'auto',
      marginRight:'auto',
      opacity:0.5,
      borderWidth: 0.5,
      borderColor: 'black',
      borderRadius:90,
    },
    background:{
      resizeMode: 'cover',
      width:null,
      height:null,
      flex: 1
    }
};
export default connect((state, ownProps) => ({
    groupScreenName: state.group.groupScreenName,
    groupNameText: state.groupName.groupNameText,
    groups: state.group.groups,
    modalToggle: state.groupName.modalToggle,
    pictureNum: state.corgi.pictureNum,
}))(DrawerSideBar);

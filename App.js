import React from 'react';
import { StyleSheet, Text, View,Button ,TouchableOpacity } from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      gameState:[
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer:1
    }
  }
  componentDidMount(){
    this.initializeGame();
  }
  initializeGame = () => {
    this.setState({gameState:
      [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ]
    });
  }
  clearCells = () =>{
    counter = 0;
    this.initializeGame();
  }
  
  getWinner = () => {
    var sum; 
    const NUM_TILES = 3;
    var arr = this.state.gameState;

    // check rows
    for(var i =0;i<NUM_TILES;i++)
    {
        sum = arr[i][0]+arr[i][1]+arr[i][2];
        if(sum == 3){ return 1;}
        else if(sum == -3){return -1;}
      
    }

    // for columns
    for(var i =0;i<NUM_TILES;i++)
    {
        sum = arr[0][i]+arr[1][i]+arr[2][i];
        if(sum == 3){ return 1;}
        else if(sum == -3){return -1;}
        //else if(sum == 1 || sum==-1){ return 2;} 
    }
    // for diagonal

    sum = arr[0][0]+arr[1][1]+arr[2][2];
    if(sum == 3){ return 1;}
    else if(sum == -3){return -1;} 
    //else if(sum == 1 || sum==-1){ return 2;} 

    sum = arr[0][2]+arr[1][1]+arr[2][0];
    if(sum == 3){ return 1;}
    else if(sum == -3){return -1;}
    //else if(sum == 1 || sum==-1){ return 2;}      
  }
  
  onCellPress = (row,col) => {
    
    var value = this.state.gameState[row][col];
    if(value!==0){return;}    
    
    var currentPlayer = this.state.currentPlayer;

    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});
    
    // switch to the pressed cell value/ player
    var nextPlayer = (currentPlayer ==1)?-1:1;
    this.setState({currentPlayer:nextPlayer});

    // check the winner
    
    var winner = this.getWinner();
    if(winner == 1){
      alert("Player X is the winner!!");
      this.initializeGame();
    }else if(winner == -1){
      alert("player O is the winner!!");
      this.initializeGame();
    }
    // else if(counter>8){
    //   alert("Draw!!");
    //   //this.initializeGame();
    // }
  }
  renderIcon = (row,col)=>{
    var value = this.state.gameState[row][col];
    switch(value)
    {
      case 1: return <Icon name="close" style = {styles.cellX}/>
      case -1: return  <Icon name="circle-outline" style = {styles.cellO}/>
      default: return <View />
    }
  }
  render(){
    return (
      <View style={styles.container}>

        <View style = {{flexDirection:"row"}}>
          <TouchableOpacity onPress ={()=>this.onCellPress(0,0)} style = {[styles.cell,{borderLeftWidth:2,borderTopWidth:2}]}>
            {this.renderIcon(0,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress ={()=>this.onCellPress(0,1)} style = {[styles.cell,{borderTopWidth:2}]}>
            {this.renderIcon(0,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress ={()=>this.onCellPress(0,2)} style = {[styles.cell,{borderTopWidth:2,borderRightWidth:2}]}>
            {this.renderIcon(0,2)}
          </TouchableOpacity>
        </View>
        <View style = {{flexDirection:"row"}}>
          <TouchableOpacity onPress = {()=>this.onCellPress(1,0)} style = {[styles.cell,{borderLeftWidth:2}]}>
            {this.renderIcon(1,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {()=>this.onCellPress(1,1)} style = {[styles.cell,{}]}>
            {this.renderIcon(1,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {()=>this.onCellPress(1,2)} style = {[styles.cell,{borderRightWidth:2}]}>
            {this.renderIcon(1,2)}
          </TouchableOpacity>
        </View>
        <View style = {{flexDirection:"row"}}>
          <TouchableOpacity onPress = {()=>this.onCellPress(2,0)} style = {[styles.cell,{borderLeftWidth:2,borderBottomWidth:2}]}>
            {this.renderIcon(2,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {()=>this.onCellPress(2,1)} style = {[styles.cell,{borderBottomWidth:2}]}>
            {this.renderIcon(2,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress = {()=>this.onCellPress(2,2)} style = {[styles.cell,{borderBottomWidth:2,borderRightWidth:2}]}>
            {this.renderIcon(2,2)}
          </TouchableOpacity>
        </View>
        <Button title="Clear" onPress = {()=>this.clearCells()}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell:{
    borderWidth:3,
    borderRadius:6,
    width:100,
    height:100,
  },
  cellX:{
    color:"red",
    fontSize:90,
    // alignItems:"stretch",
    // justifyContent:"space-evenly"
  },
  cellO:{
    color:"green",
    fontSize:90,
    // alignItems:"stretch",
    // justifyContent:"center"
  }


});

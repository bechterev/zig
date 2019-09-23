import React from 'react'
import FormNewDot from './formNewDot'
import './listDots.css'

class ListDots extends React.Component{
  constructor(props){
    super(props);
    this.state={list:[],visDotForm:false}
    this.addDot=this.addDot.bind(this);
    this.updateList=this.updateList.bind(this);
    this.searchList=this.searchList.bind(this);
  }
  addDot(){
    this.setState({visDotForm:!this.state.visDotForm});
  }
  updateList(val){
    this.setState(prevState=>{let oldList=[...prevState.list]; oldList.push(val); return{list:oldList}})
    this.setState({visDotForm:false})
    let ll=this.state.list.map((value)=>{return {lat:value.latitude,long:value.longetude,name:value.name,funct:"up"}})
    this.props.markers(ll);
  }
  searchList(e){
    const ll=this.state.list.filter(value=>value.name.indexOf(e.target.value)!=-1)
    let x=ll.map((value)=>{let mark = Object.assign({}, value); mark.funct="sea"; return mark })
    this.props.markers(x);
  }
  render(){
    let contentDot=this.state.visDotForm===true?<div><FormNewDot dataDot={this.updateList} /></div>:<div></div>;
    let lists=this.state.list.map((value, index)=><div keys={index}><div>{value.name}</div><div>{value.date}</div><div>{value.latitude}</div><div>{value.longetude}</div></div>);
    return(<div className="listDots"><div><input type="text" onChange={this.searchList} /></div>{lists}<div><button onClick={this.addDot}> Добавить точку </button></div>
    {contentDot}
    </div>);
  }
}
export default ListDots

import React from 'react'
import FormNewDot from './formNewDot'
import './listDots.css'

class ListDots extends React.Component{
  constructor(props){
    super(props);
    this.state={list:[],visDotForm:false,lay:[]}
    this.addDot=this.addDot.bind(this);
    this.updateList=this.updateList.bind(this);
    this.searchList=this.searchList.bind(this);
  }
  addDot(){
    this.setState({visDotForm:!this.state.visDotForm});
  }
  updateList(val){
    this.setState(prevState=>{let oldList=[...prevState.list]; oldList.push(val); return{list:oldList,visDotForm:false}})
    let z=[val].concat(this.state.list);
    let val1=z.map((value)=>{return {lat:value.latitude,long:value.longetude,name:value.name}})
    //let ll=this.state.list.map((value)=>{return {lat:value.latitude,long:value.longetude,name:value.name,funct:"up"}})

    this.props.markers(val1);
  }
  searchList(e){
    const val=e.target.value;
    this.setState(prevState=>{const x=[...prevState.list]; let z=x.filter((value)=>{return value.name.indexOf(val)!=-1});
  return{lay:z}})
  this.props.markersFil(this.state.lay)
  }
  render(){
    let contentDot=this.state.visDotForm===true?<div><FormNewDot dataDot={this.updateList} /></div>:<div></div>;

    let lists=this.state.lay.length==0?this.state.list.map((value, index)=><div keys={index} className="str"><div>{value.name}</div><div>{value.date}</div><div>{value.latitude}</div><div>{value.longetude}</div></div>):
    this.state.lay.map((value, index)=><div keys={index} className="str"><div>{value.name}</div><div>{value.date}</div><div>{value.latitude}</div><div>{value.longetude}</div></div>);


    return(<div className="listDots"><div><input type="text" onChange={this.searchList} /></div><div className="list">{lists}</div><div><button onClick={this.addDot}> Добавить точку </button></div>
    {contentDot}
    </div>);
  }
}
export default ListDots

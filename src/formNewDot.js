import React from 'react'
import './formNewDot.css'

class FormNewDot extends React.Component{
  constructor(props){
    super(props);
    this.state={latitude:"",longitude:"",name:"",date:"",errorBool:{errorDate:"",errorLat:"",errorLong:""}}
    this.save=this.save.bind(this)
    this.update=this.update.bind(this)
  }
  save(){
    if(this.state.name != "" && this.state.date != "" && this.state.latitude != "" && this.state.longetude !=""){
      this.props.dataDot({name:this.state.name,date:this.state.date,latitude:this.state.latitude,longetude:this.state.longetude})
    }
    else{alert("Данные введены не корректно")}
  }
  update(e){
    this.setState({errorBool:false});
    const{value,placeholder}=e.target;
    switch(placeholder){
      case "Dot name":this.setState({name:value});break;
      case "time save 01.01.2010 00:00":
      let dt=/([0-2][0-9]|3[0-1])\.(0[0-9]|1[0-2])\.(20[1-9][0-9]) ([0-1]?[0-9]|2[0-3]):[0-5][0-9]/;
      if(dt.test(value)===true){
        this.setState(prevState=>{let errorBool=Object.assign({},prevState.errorBool); errorBool.errorDate="green"; return{errorBool}});
        this.setState({date:value});
      }
      else if(dt.test(value)===false && value.length==16){
        this.setState(prevState=>{let errorBool=Object.assign({},prevState.errorBool); errorBool.errorDate="red"; return{errorBool}});
        this.setState({date:value});
      }
      break;
      case "latitude 00.00":
      let dlat=/[0-9]{2}\.[0-9]{2}/;
      if(dlat.test(value)===true){
        this.setState(prevState=>prevState=>{let errorBool=Object.assign({},prevState.errorBool); errorBool.errorLat="green"; return{errorBool}});
        this.setState({latitude:value});
      }
      else if(dlat.test(value)===false && value.length==5){
        this.setState(prevState=>{let errorBool=Object.assign({},prevState.errorBool); errorBool.errorLat="red"; return{errorBool}});
        this.setState({latitude:value});
      }
      break;
      case "longetude 00.00":
      let dlon=/[0-9]{2}\.[0-9]{2}/;
      if(dlon.test(value)===true){
        this.setState(prevState =>{let errorBool=Object.assign({},prevState.errorBool); errorBool.errorLong="green"; return{errorBool}});
        this.setState({longetude:value});
      }
      if(dlon.test(value)===false && value.length==5){
        this.setState(prevState =>{let errorBool=Object.assign({},prevState.errorBool); errorBool.errorLong="red"; return{errorBool}});
        this.setState({longetude:value});
      }
      break;
    }
  }
  render(){
    return(<div className="formNewDot">
      <input type="text" onChange={this.update} placeholder="Dot name" />
      <input type="text" style={{borderColor:this.state.errorBool.errorDate}} onChange={this.update} placeholder="time save 01.01.2010 00:00" />
      <input type="text" style={{borderColor:this.state.errorBool.errorLat}} onChange={this.update} placeholder="latitude 00.00" />
      <input type="text" style={{borderColor:this.state.errorBool.errorLong}} onChange={this.update} placeholder="longetude 00.00" />
      <button onClick={this.save}>Сохранить</button>
      </div>)
  }

}
export default FormNewDot

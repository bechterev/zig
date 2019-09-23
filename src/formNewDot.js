import React from 'react'
import './formNewDot.css'

class FormNewDot extends React.Component{
  constructor(props){
    super(props);
    this.state={latitude:"",longitude:"",name:"",date:"",errorBool:false}
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
      case "time save 01.01.2000 00:00":
      let dt=/[0-9]{2}\.[0-9]{2}\.[0-9]{4} [0-9]{2}:[0-9]{2}/;
      if(dt.test(value)===true){
        this.setState(prevState=>{return {errorBool:true}});
        this.setState({date:value});
      }break;
      case "latitude 00.00":
      let dlat=/[0-9]{2}\.[0-9]{2}/;
      if(dlat.test(value)===true){
        this.setState(prevState=>{return {errorBool:true}});
        this.setState({latitude:value});
      }break;
      case "longetude 00.00":
      let dlon=/[0-9]{2}\.[0-9]{2}/;
      if(dlon.test(value)===true){
        this.setState(prevState =>{return {errorBool:true}});
        this.setState({longetude:value});
      }break;
    }
  }
  render(){
    let errorBorder=this.state.errorBool===true?"green":"red";
    return(<div className="formNewDot">
      <input type="text" onChange={this.update} placeholder="Dot name" />
      <input type="text" style={{borderColor:errorBorder}} onChange={this.update} placeholder="time save 01.01.2000 00:00" />
      <input type="text" style={{borderColor:errorBorder}} onChange={this.update} placeholder="latitude 00.00" />
      <input type="text" style={{borderColor:errorBorder}} onChange={this.update} placeholder="longetude 00.00" />
      <button onClick={this.save}>Сохранить</button>
      </div>)
  }

}
export default FormNewDot

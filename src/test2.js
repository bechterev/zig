import React from 'react'
import L from 'leaflet'
import ListDots from './ListDots'

function Viewses(props){
  return<div width={props.width} height={props.height} id={props.id} style={{width:props.width, height:props.height}}></div>
}

class Mapper extends React.Component{
  constructor(props){
    super(props);
    this.state={listDots:[],map:null,lay:[]};
    this.addDotMap=this.addDotMap.bind(this);
  }
  componentDidMount(){
    var maps=L.map('map',{
      center:[56.95, 53.65],
      zoom:10,
      maxZoom:15,
      attributionControl:false,
      zoomControl:true,
      doubleClickZoom:true,
      scrollWheelZoom:true,
      dragging:true,
      animate:true,
      easeLinearity:0.35
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(maps);
this.setState({map:maps});
  }
  addDotMap(val){
     let lays=[];
    try{      if(val[0].funct=="up"){
            val.map((value)=>{lays.push(L.marker([parseFloat(value.lat), parseFloat(value.long)]));return L.marker([parseFloat(value.lat), parseFloat(value.long)]).addTo(this.state.map).bindPopup(value.name)
            .openPopup();})
            this.setState({lay:lays});
          }
          else{
            this.state.lays.map((value)=>{return this.state.map.removeMaker(value)})
        }
        this.setState(prevState=>{let oldList=[...prevState.listDots]; oldList.push(val); return{listDots:oldList}})
        }
      catch{}
    }


  render(){
    return(<div><Viewses width="100%" height="800px" id="map"></Viewses><div><ListDots markers={this.addDotMap} /></div></div>)
  }
}
export default Mapper

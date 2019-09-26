import React from 'react'
import L from 'leaflet'
import ListDots from './ListDots'

function Viewses(props){
  return<div width={props.width} height={props.height} id={props.id} style={{width:props.width, height:props.height}}></div>
}

class Mapper extends React.Component{
  constructor(props){
    super(props);
    this.state={listDots:[],
      map:      {center:[56.95, 53.65],
            zoom:10,
            maxZoom:15,
            attributionControl:false,
            zoomControl:true,
            doubleClickZoom:true,
            scrollWheelZoom:true,
            dragging:true,
            animate:true,
            easeLinearity:0.35},layerGroup:L.layerGroup([]),
    lay:[]};
    this.addDotMap=this.addDotMap.bind(this);
    this.filMarks=this.filMarks.bind(this);
  }
  componentDidMount(){
    let tL=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
this.state.layerGroup.addLayer(tL);
    let maps=L.map('map',this.state.map);
this.state.layerGroup.addTo(maps);

  }
  addDotMap(val){
     let lays=[];



            val.map((value)=>{lays.push(L.marker([parseFloat(value.lat), parseFloat(value.long)]).bindPopup(value.name).openPopup());return lays})
            this.setState(prevState=>{ const mass=[...prevState.lay.concat(lays)];  return{lay:mass}});
            lays.map((value)=>{return this.state.layerGroup.addLayer(value)});



        this.setState(prevState=>{let oldList=[...prevState.listDots]; oldList.push(val); return{listDots:oldList}})

    }
    filMarks(val){
      let lays=[];
      val.map((value)=>{lays.push(L.marker([parseFloat(value.latitude), parseFloat(value.longetude)]).bindPopup(value.name).openPopup());return lays})
      let fil=[];

      for(let i=0;i<this.state.lay.length;i++){
        for(let j=0;j<lays.length;j++){
          if(this.state.lay[i].name ==lays[j].name){
            alert(this.state.lay[i].name+' '+lays[j].name)
            break;
          }
          else{fil.push(this.state.lay[i])}
        }
      }
      alert(fil.length)
      if(fil.length!=0){this.setState(prevState=>{  return{lay:fil}});

      fil.map((value)=>{return this.state.layerGroup.removeLayer(value)});
    }
    }

  render(){
    return(<div><Viewses width="100%" height="800px" id="map"></Viewses><div><ListDots markers={this.addDotMap} markersFil={this.filMarks}/></div></div>)
  }
}
export default Mapper

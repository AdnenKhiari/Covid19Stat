import 'react-leaflet'
import React from 'react'
import {useMap, MapContainer  ,TileLayer,Marker ,Popup } from 'react-leaflet';
import {useEffect} from 'react'
import { Link } from 'react-router-dom';
import L from 'leaflet'
import pinicon from "./../assets/marker.svg"
import Loading from './Loading';
const customMarker = new  L.icon (
  {
    iconUrl : pinicon ,
    iconSize: [50, 52],
    iconAnchor: [25, 52],
    popupAnchor: [0, -52],
    shadowSize: [0, 0],
    shadowAnchor: [20, 52]
  }
)

const MapProp = ({setMap})=>{
    const map = useMap()
    useEffect(()=>{
        setMap(map)
    },[])

    return null
}
const CustomMarker = ({data})=>{
    return (<>

       {data ?  (<Marker position = {[data.coordinates.latitude,data.coordinates.longitude]} className="marker" icon={customMarker}>
            <Popup className = "popUp">
                {data.province!== "null"  ? (<>
                    <h2>{data.province}</h2>
                    <h4>{data.country}</h4>
                    </>) :( <>
                        <h2>{data.country}</h2>
                     </>)


                }
                <p>Confirmed : {data.stats.confirmed}</p>
                <p>Deaths : {data.stats.deaths}</p>
                <p>Recovered : {data.stats.recovered}</p>
                <Link to={"/custom/"+(data.country)+(data.province!=="null" ? ("/"+(data.province)) : "/null")} >Find more...</Link>
            </Popup>
        </Marker>) : (<></>)
        }

    </>)
}
const MainMap = ({allData,setMap}) => {

    return (<><React.Suspense fallback={        <Loading/>
}>  <MapContainer center = {[15,15]} zoom = {10}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapProp setMap = {setMap}/>
            {allData.map((item,index)=>{
               return <CustomMarker data={item} key={index} />
            })}

        </MapContainer >
        </React.Suspense>
        </>
    )

}

export default (MainMap);
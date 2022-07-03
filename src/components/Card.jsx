import "./../style/card.scss"
import {useFetch} from "./../utils/customHooks"
import upArrow from "./../assets/up-arrow.svg"
import downArrow from "./../assets/down-arrow.svg"

const Card = ({data,dataArray,lastData = null}) => {
   
    return <div className="card-container-head">
        <div className="card-container">
            <div className="card-container__left">
                <div className="card-title">
                    <h1>{data.country != null ?  data.country : "World"}</h1>
                    <div className="card-title__flag" style={{backgroundImage : "url("+( data.countryInfo ? (data.countryInfo.flag || "") : "" )+ ")",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"}}></div>
                </div>
                <div className="card-body">
                   { dataArray.map( (x,i) => <div  key = {i} className="card-body__item">
                        <div className="field">{x}</div>
                        <div>{data[x] || "Missing Value"}</div>
                        <div>{lastData===null  ? "" : <img src={parseInt(lastData[x]) < parseInt(data[x]) ? upArrow : downArrow } style={{opacity :( parseInt(lastData[x]) === parseInt(data[x]) )? 0 : 1 }} alt=""/> }</div>
                    </div>)
                    }
                </div>

            </div>    
            <div className="card-container__right">
                    <div className="card-circle-container">
                        {['todayCases','todayTests','todayDeaths','todayRecovered'].map((w,i) => <div key={i}  className="card-circle-item">
                            <h2>{w === "todayTests" ?  "LatestTests" : w}</h2>
                            <div className="circle">{ (w === "todayTests" && lastData !== null) ?  -parseInt(lastData["tests"])+parseInt(data["tests"]) :  (data[w] || "Missing Value" ) }</div>
                        </div>)}
                    </div>
            </div> 
            <div className="card-container__footer">
                <div className="card-source">
                        Sources : <small>disease.sh - Worldometers</small>
                </div>
                <div className="card-date">
                       Updated Last At: {new Date(data.updated).toUTCString()}
                </div>

            </div> 
            </div> 
    </div>
}

export default Card
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React from 'react'
import AllData from './components/AllData';
import CustomCountry from './components/CustomCountry';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Selector from "./components/Selector"
import TsComponent from "./components/TsStatsComponent"
import CardStatComponent from "./components/CardStatComponents"
import {useFetch} from "./utils/customHooks"
import Vaccines from "./components/Vaccines";
import Loading from "./components/Loading"
function App() {
  const show = React.useRef(null)
  const [map,setMap] = React.useState(null)
  var [allData,allDataLoading,allDataError] = useFetch("https://disease.sh/v3/covid-19/jhucsse",(data)=>{return data.map(x=> (x.province !== null) ?  {...x,province: x.province.toLowerCase()} : {...x,province: "null"})});
  var [worldSummaryStats,worldSummaryStatsLoading,worldSummaryStatsError] = useFetch("https://disease.sh/v3/covid-19/all?allowNull=true");
  var [oldworldSummaryStats,oldworldSummaryStatsLoading,oldworldSummaryStatsError] = useFetch("https://disease.sh/v3/covid-19/all?yesterday=true&allowNull=true");
  var [tsData,tsDataLoading,tsDataError] = useFetch("https://disease.sh/v3/covid-19/historical?lastdays=1",(data)=>{return data.map(x=> (x.province !== null) ?  {...x ,province: x.province.toLowerCase()} : {...x,province: "null"} )});
  const [dayCount, setDayCount] = React.useState(60);
  var [worldTsData,worldTsDataLoading,worldTsDataError] = useFetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all",(data)=> {return {timeline : data }});
  const nv =  React.useRef(null)
  const toggleMenu = ()=>{
    nv.current.classList.toggle("on")
    show.current.classList.toggle("open")
  }
  React.useEffect(() => {
  /*  console.log(allData,tsData)
    console.log("za walrudo " ,worldTsData)
    console.log("www " ,countriesSummaryStat,countriesSummaryStatLoading,countriesSummaryStatError)*/
  }, [tsData,allData,tsDataLoading,allDataError,tsDataError,allDataLoading,worldTsData]);
  return (<>
        <Router basename ={process.env.NODE_ENV === 'production' ? "/Covid19Stat" : '.'}>
        <div ref={show} className="show" onClick={ ()=> nv && toggleMenu()}></div>

        <div className="maingrid">

        <NavBar nv = {nv}/>
        <div className="main-content">
        <Switch>
        <Route exact path ='/vaccine/'>
        <Vaccines/>
        </Route>
        <Route path ='/'>
        <AllData setMap = {setMap} allData = {allData} allDataLoading = {allDataLoading} allDataError = {allDataError}/>    
        <Route path ='/custom'>
        <Selector tsData = {tsData} tsDataLoading = {tsDataLoading} /> 
        </Route>  
        <Route path ='/custom/:country/:province' >
        <CustomCountry allDataLoading = {allDataLoading} allData = {allData} tsData = {tsData} tsDataLoading = {tsDataLoading}  map = {map}   dayCount = {dayCount}/>
        </Route>
        <Route exact path ='/'>
        {<CardStatComponent  arr = {['cases', 'deaths', 'recovered', 'tests', 'population', 'affectedCountries']} data = {worldSummaryStats} dataLoading = {worldSummaryStatsLoading} lastData = {oldworldSummaryStats} lastDataLoading = {oldworldSummaryStatsLoading} />}
        {worldTsDataLoading ?  <Loading/>: <TsComponent  historicalData={worldTsData} mydata = {null} /> }
        </Route>
        </Route>
        <Route path ='/' component={()=>{return <div className="fof">404 Error ! Route Not Found</div>}} />
        </Switch>
        </div>  
        </div>    
        <Footer/>
        </Router>
     </>
  );
}
export default App;

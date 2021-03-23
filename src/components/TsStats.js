import React from 'react'
import * as V from 'victory'
import colors from "../utils/colors"
const DefaultPlot =({dataAll})=> {
  const data = dataAll.data
  const suffixUnit = ["","K","M","B"]
  const ref = React.useRef(null)

    const [selectedDomain, setselectedDomain] = React.useState(null);
    const [zoomDomain, setzoomDomain] = React.useState({x : [data[0].x,data[data.length-1].x]});

    const handleZoom  =((domain)=> {
        setselectedDomain(domain);
    })

    const handleBrush  = (domain)=> {
      setzoomDomain(domain);
    }

    const LimitData = (data)=>{
       return zoomDomain!==null? data.filter(d=> d.x >= zoomDomain.x[0] && d.x <= zoomDomain.x[1]).filter((d,i) => ((i % Math.max(1,Math.ceil(((zoomDomain.x[1].getTime() - zoomDomain.x[0].getTime())/(1000*3600*24))/110) ) ) === 0)) : data;
    }
    const tickData = (data)=> ([...new Set(data.map(o => new Date(o.x.getFullYear(),o.x.getMonth(),1)))]);

    const datalabels = (data)=> (data).map(o =>  o.y.toString());

    React.useEffect(() => {
      console.log("zum",zoomDomain)
      console.log("limit",LimitData(data))

  }, [zoomDomain]);

    return (
      <div className="graph-container" ref = {ref}>
          <V.VictoryChart 
          height = {
             (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))? 850 : 400
          }
            width = { 700}
            style={{
              axisLabel: { padding: 130 },
          }}
            scale={{x: "time"}}
            theme={V.VictoryTheme.material}
            containerComponent={
              <V.VictoryZoomContainer 
                responsive = {true}
                zoomDimension="x"
                zoomDomain={zoomDomain}
                onZoomDomainChange={handleZoom}
              />
            }
          >
          <V.VictoryAxis  dependentAxis                 
          theme={V.VictoryTheme.material}

        tickFormat={(x) => {
            
            return x / Math.pow(10,dataAll.divider*3)  + suffixUnit[dataAll.divider];
        } }
        style={{size:10}}/>
          
          <V.VictoryAxis  />

            <V.VictoryBar

              style={{
                fill: colors.red
              }}
              data={LimitData(data)}
              labels={datalabels(LimitData(data))}
              labelComponent={
                <V.VictoryTooltip      pointerOrientation="bottom" cornerRadius={30}
                flyoutStyle={{ stroke: colors.rose, strokeWidth: 1,fill : colors.white}}
                />
              }
            />

<V.VictoryLine

              style={{
                data: {stroke: colors.rose}
              }}
              data={LimitData(data)}            />


            <V.VictoryScatter
            labels={datalabels(LimitData(data))}
            size={1.5}
            labelComponent={
              <V.VictoryTooltip      pointerOrientation="bottom" cornerRadius={30}
              flyoutStyle={{ stroke: colors.rose, strokeWidth: 1,fill : colors.white}}
              />
            }
              style={{
                data: {fill: colors.black}
              }}
              data={LimitData(data)}            />


          </V.VictoryChart>

          <V.VictoryChart
                      theme={V.VictoryTheme.material}

            height={90}
            width={700}
            scale={{x: "time"}}
            padding={{top: 0, left: 20, right: 20, bottom: 50}}
            containerComponent={
              <V.VictoryBrushContainer responsive={true}
                brushDimension="x"
                brushDomain={selectedDomain}
                onBrushDomainChange={handleBrush}
              />
            }
          >
            <V.VictoryAxis
                theme={V.VictoryTheme.material}

              tickValues={tickData(data)}
              tickFormat={(x) => {
                  const ll = x.getFullYear().toString()
                  return x.getMonth() + "/" + ll.slice(2)
              } }
              style={{size:10}}
            />

          <V.VictoryLine
                      theme={V.VictoryTheme.material}

              style={{
                data: {stroke: colors.red}
              }}
              data={data}            />
          </V.VictoryChart>

      </div>

    );
 
    

}
const processDT =  (type,moreData)=>{
    var xs = [type] 
    var divider = 0;
    var values = xs.map((p)=>{
      //to be salahed
        var x = Object.keys(moreData.timeline[p])
        var max = Math.max(...(x.map(u => moreData.timeline[p][u])))
        var multiplier = Math.ceil(Math.log10(max))
        while(multiplier > 3){
          multiplier-= 3;
          divider++;
        }
      return x.map((u)=>{
          let k = u.split('/').reverse();k[0] = "20".concat(k[0]);
                return {
                    x :  new Date(k[0],k[2],k[1]),
                    y : moreData.timeline[p][u] 
                }
            })
        
    })[0]
     return {data :  values,divider}
}

const CountryStat = ({title,stat,historicalData,mydata})=>{
  /*React.useEffect(() => {
    console.log(mydata,"hist")
    return () => {
    };
  }, [mydata]);*/
    return<>
    <div className ="stat-header">
    <h1 >{title}</h1>
    </div>
    <DefaultPlot  dataAll={ processDT(stat,historicalData)} />
    <div style={{paddingLeft:"60px",fontSize:"1.1rem"}}> Sources :disease.sh - Johns Hopkins University, updated every 10 minutes</div>
    {/*<div style={{paddingLeft:"60px",fontSize:"1.1rem"}}> Last Update : {mydata.updatedAt}</div>*/}
    </>
}


export {CountryStat}
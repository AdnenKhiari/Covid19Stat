import "./../style/main.scss"
import React from 'react'
import { Link } from "react-router-dom"
const Selector = ({tsDataLoading,tsData})=>{
    const refCountry =React.useRef(null)
    const refProvince =React.useRef(null)

    const [prov,setProv] = React.useState(null)
    const updateProvinceList = () =>{
        if(tsData){
        setProv(tsData.filter(item =>{
            return item.country === refCountry.current.value && item.province!=="null";
        }))

    }

    }
    /*React.useEffect(() => {
        console.log((refProvince && refProvince.current) ? "Found thaaaaaaaaaaaaaat" + refProvince.current.value.toString() : "nein")
        return () => {
        };
    }, [refProvince]);*/
    return(<> 
    <div className ="stat-header">
    <h1 style={{display : "inline"}}>{"Custom Place:"}</h1>
    </div>
    <div className="main-selector" >
    <h1 style={{alignSelf : "flex-end"}} >Country :</h1>
    <select ref={refCountry} onChange={updateProvinceList} style={{alignSelf : "flex-end"}} id="country" name="country" className="form-control">
        { (!tsDataLoading && tsData) &&  [...(new Set(tsData.map(i => i.country)))].map((item,index)=>{
            return <option key={index} value={item}>{item}</option>
        })
        }
    </select>
    { (refCountry!==null && refCountry.current !== null) && (<><h1 style={{alignSelf : "flex-end"}}>Province :</h1>
    <select onChange={updateProvinceList} ref = {refProvince} style={{alignSelf : "flex-end"}} id="country" name="country" className="form-control">
        { (!tsDataLoading && tsData && prov && refCountry!=null && refCountry.current!=null) && prov.map((item,index) =>{
            let st = item.province
            return <option key={index} value={st}>{st}</option>
        })
        }
    </select></>)
    }
        {(refProvince && refCountry && refCountry.current) && <Link  style={{marginLeft:"20px"}} className="beautiful-link" to={"/custom/"+refCountry.current.value+"/"+(prov!=null && prov.length > 0 && refProvince.current.value!=="" ? refProvince.current.value : "null")} > Travel :</Link> }

    </div>
    </>
    )
}

export default Selector
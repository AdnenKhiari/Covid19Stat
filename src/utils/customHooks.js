import {useState,useEffect} from 'react'
const useFetch = (url,callBack = null) =>{
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [data,setData] = useState(null);

    useEffect(() => {
        fetch(url).then((data) => {
              return data.json()
          }).then((data) => {     
              if(callBack !== null) 
                data = callBack(data)
              setData(data); 
              setLoading(false);
          }).catch((err)=>{
              setError(err);
              setLoading(false);
          }) 
    },[url])
    
    return [data,loading,error];
}

export {useFetch}
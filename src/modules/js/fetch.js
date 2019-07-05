import axios from axios
import url from './url'

function fetch(url,data){
    return new Promise(function(resolve,reject){
        axios.get(url,data).then(res=>{
            let status = res.data.status
            if(status===200){
                resolve(res)
            }
        }).catch(error=>{
            reject(error)
        })
    })
}
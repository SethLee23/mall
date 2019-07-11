import axios from 'axios'
function fetch_g(url,data){
  return new Promise((resolve,reject)=>{
    axios.get(url,data).then(res=>{
      if(res.status===200){
        resolve(res)
      }
      if(res.status===300){
        location.href = 'login.html'
      }
    }).catch(error=>{
      reject(error)
    })
  })
}

export default fetch_g
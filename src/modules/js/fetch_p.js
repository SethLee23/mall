import axios from 'axios'

function fetch_p(url,data) {
  return new Promise((resolve,reject) => {
    axios.post(url,data).then(res => {
      let status = res.data.status
      if(status===200){
        resolve(res)
      }
      if(status===300){
        location.href = 'login.html'
      }
    }).catch(error => {
      reject(error)
    })
  })
}

export default fetch_p 
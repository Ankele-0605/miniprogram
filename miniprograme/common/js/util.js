export function wxgetUserInfo(){
  return new Promise((resolve,reject)=>{
    uni.getUserProfile({
      desc: 'desc',
      success: (res) => {
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}

export function wxlogin(){
  return new Promise((resolve,reject)=>{
    uni.login({
      success: (res) => {
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}


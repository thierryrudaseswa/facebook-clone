export const loginStart= (userCredentials)=>({
    type:"LOGIN_START"
})
export const loginSucess = (user) =>({
    type:"LOGIN_SUCCESS",
    payload: user
})
export const loginFailure = () =>({
    type:"LOGIN_FAILURE"
})
export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
  });
  
  export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
  });

  export const Logout = () =>({
    type:"LOGOUT"
  })

  export const updateUserStart = (userCredentials) =>({
    type:"UPDATE_START",
    
  });
  export const updateUSerSuccess = (user)=({
    type:"UPDATE_SUCCESS",
    payload: user
  });
  

  export const updateUSerFailure = () =>({
    type :"UPDATE_FAILURE",

  })


const AuthReducer =(state,action)=>{
    switch(action.type){
        case "LOGIN_START":
            return{
                user: false,
                isFetching: true,
                error: false
            }
    
        case "LOGIN_SUCCESS":
            console.log(action.payload);
            localStorage.setItem("user", JSON.stringify(action.payload))
            return{
                user: action.payload,
                isFetching: false,
                error: false
            }
                
            case "LOGIN_FAILURE":
                return{
                    user: false,
                    isFetching: false,
                    error: true
                }
                case "FOLLOW":
                    return {
                      ...state,
                      user: {
                        ...state.user,
                        followings: [...state.user.followings, action.payload],
                      },
                    };
                    
                  case "UNFOLLOW":
                    return {
                      ...state,
                      user: {
                        ...state.user,
                        followings: state.user.followings.filter(
                          (following) => following !== action.payload
                        ),
                      },
                    };
                    case "UPDATE_START":
                      return{
                        ...state,
                        isFetching: true,
                      }
                      case "UPDATE_SUCCESS":
                        return{
                            user: action.payload,
                            isFetching: false,
                            error: false
                        };
                        case "LOGOUT":
                          return{
                            user:null,
                            isFetching:false,
                            error: false
                          }
                        case "UPDATE_FAILURE":
                            return{
                                user:state.user,
                                isFetching: false,
                                error:true
                            }
            
    }
}
export default AuthReducer;
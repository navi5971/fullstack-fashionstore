export const getRateReducer= (state= {items : [] },action)=>{
    switch(action.type)
    {
        case 'GET_Rate_REQUEST' : return{
            loading:true,
            ...state
        }
        case 'GET_RATE_SUCCESS' : return {
            loading:false,
            items: action.payload
        }
        case 'GET_RATE_FAILED': return{
            
            error: action.payload,
            loading :false
        }
        default :return state
    }
        
    }
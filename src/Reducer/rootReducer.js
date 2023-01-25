import { useDispatch } from "react-redux";
import { appReducer } from ".";

// const dispatch = useDispatch()
const RootReducer = (state, action) => {
    const dispatch = useDispatch()
    if (action.type === 'USER_LOGOUT') {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
  };

export default RootReducer
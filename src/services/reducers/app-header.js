import {
  HEADER_CONSTRUCTOR_ACTIVE,
  HEADER_FEED_ACTIVE,
  HEADER_PROFILE_ACTIVE
} from "../actions/app-header";


const initialState = {
  isConstructorActive: true,
  isFeedActive: false,
  isProfileActive: false,
}

export const setActiveReducer = (state = initialState, action) => {

  switch (action.type) {

    case HEADER_CONSTRUCTOR_ACTIVE: {
      return {
        ...state,
        isConstructorActive: action.isActive,
        isProfileActive:false,
        isFeedActive: false,
      }
    }
    case HEADER_FEED_ACTIVE: {
      return {
        ...state,
        isFeedActive: action.isActive,
        isConstructorActive:false,
        isProfileActive: false,
      }
    }
    case HEADER_PROFILE_ACTIVE: {
      return {
        ...state,
        isProfileActive: action.isActive,
        isConstructorActive: false,
        isFeedActive: false,
      }
    }


    default: {
      return state
    }
  }
}
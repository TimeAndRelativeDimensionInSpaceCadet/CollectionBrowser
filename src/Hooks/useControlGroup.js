import { useReducer, useRef, createContext } from 'react';
import { SortDirections } from '../Constants/SortDirections';

export const useControlGroup = () => {
  const { current: initialState } = useRef({
    searchValue: '',
    sortType: 'artist',
    sortDirection: SortDirections.ascending,
  });

  const reduceControls = (state, action) => {
    switch (action.type) {
      case 'search':
        return { ...state, searchValue: action.payload };
      case 'sortType':
        return { ...state, sortType: action.payload };
      case 'sortDirection':
        return { ...state, sortDirection: action.payload };
    }
  };

  const controlState = useReducer(reduceControls, initialState);

  const ControlContext = createContext(controlState);
  
  return ControlContext;
};

import { useReducer, useRef, createContext, useContext } from 'react';
import { SortDirections } from '../Constants/SortDirections';

export const ControlContext = createContext(null);

export const ControlStateProps = {
  search: 'search',
  sortType: 'sortType',
  sortDirection: 'sortDirection',
};

export const useControlState = () => {
  const { current: initialState } = useRef({
    [ControlStateProps.search]: '',
    [ControlStateProps.sortType]: 'artist',
    [ControlStateProps.sortDirection]: SortDirections.ascending,
  });

  const reduceControls = (state, action) => {
    const { type, payload } = action;

    return {
      ...state,
      [type]: payload,
    };
  };

  const controlState = useReducer(reduceControls, initialState);

  return controlState;
};

export const useControlContext = () => {
  return useContext(ControlContext);
};

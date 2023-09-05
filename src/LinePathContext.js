import React, {createContext, useCallback, useContext, useReducer} from 'react';

const LinePathContext = createContext(null);

const LinePathReducer = (LinePaths, action) => {
  switch (action.type) {
    case 'add':
      return [...LinePaths, action.LinePath];
    case 'clear':
      return [];
    case 'pop':
      return LinePaths.slice(0, -1);
    default:
      return LinePaths;
  }
};

export const useLinePathContext = () => {
  const ctx = useContext(LinePathContext);
  if (ctx === null) {
    throw new Error('No LinePath context found');
  }
  const {LinePaths, dispatch} = ctx;
  const addLinePath = useCallback(
    LinePath => {
      dispatch({type: 'add', LinePath});
    },
    [dispatch],
  );
  const clearLinePaths = useCallback(() => {
    dispatch({type: 'clear'});
  }, [dispatch]);

  const popLinePath = useCallback(
    LinePath => {
      dispatch({type: 'pop', LinePath});
    },
    [dispatch],
  );

  return {
    LinePaths,
    addLinePath,
    clearLinePaths,
    popLinePath,
  };
};

export const LinePathProvider = ({children}) => {
  const [LinePaths, dispatch] = useReducer(LinePathReducer, []);
  return (
    <LinePathContext.Provider value={{LinePaths, dispatch}}>
      {children}
    </LinePathContext.Provider>
  );
};

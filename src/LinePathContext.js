import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

const LinePathContext = createContext(null);

const LinePathReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return { ...state, linePaths: [...state.linePaths, action.payload] };
    case "clear":
      return { ...state, linePaths: [], snapshots: [] };
    case "pop":
      return {
        ...state,
        linePaths: state.linePaths.slice(0, -1),
        snapshots: state.snapshots.slice(0, -1),
      };
    case "add-snapshots":
      return { ...state, snapshots: [...action.payload] };
    default:
      return state;
  }
};

export const useLinePathContext = () => {
  const ctx = useContext(LinePathContext);
  if (ctx === null) {
    throw new Error("No LinePath context found");
  }
  const { state, dispatch } = ctx;

  const addLinePath = useCallback(
    linePath => {
      dispatch({ type: "add", payload: linePath });
    },
    [dispatch],
  );

  const clearLinePaths = useCallback(() => {
    dispatch({ type: "clear" });
    console.log(state.linePaths.length);
  }, [dispatch, state.linePaths]);

  const popLinePath = useCallback(() => {
    dispatch({ type: "pop" });
  }, [dispatch]);

  const getSnapshots = ({ canvasRef }) => {
    console.log("Inside getSnapshots: ", canvasRef.current !== null);
    try {
      if (state.linePaths.length > 0) {
        const bounds = state.linePaths.map(linePath =>
          linePath.path.getBounds(),
        );
        const snapshots = bounds
          .map(bound => {
            const snapshot = canvasRef.current?.makeImageSnapshot(bound);
            return snapshot;
          })
          .filter(Boolean);
        console.log(snapshots);
        dispatch({ type: "add-snapshots", payload: snapshots });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    linePaths: state.linePaths,
    snapshots: state.snapshots,
    addLinePath,
    clearLinePaths,
    popLinePath,
    getSnapshots,
  };
};

export const LinePathProvider = ({ children }) => {
  const initialState = { linePaths: [], snapshots: [] };
  const [state, dispatch] = useReducer(LinePathReducer, initialState);
  return (
    <LinePathContext.Provider value={{ state, dispatch }}>
      {children}
    </LinePathContext.Provider>
  );
};

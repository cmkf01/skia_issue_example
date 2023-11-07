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
  }, [dispatch]);

  const takeSnapshots = ({ canvasRef }) => {
    try {
      if (state.linePaths.length > 0) {
        console.log(
          "context/func takeSnapshots: state.linePaths.length = ",
          state.linePaths.length,
        );
        const bounds = state.linePaths.map(linePath =>
          linePath.path.getBounds(),
        );
        const snapshots = bounds
          .map(bound => {
            const snapshot = canvasRef.current?.makeImageSnapshot(bound);
            return snapshot;
          })
          .filter(Boolean);
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
    takeSnapshots,
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

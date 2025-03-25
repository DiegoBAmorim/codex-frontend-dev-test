import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';

import Graphic from '@arcgis/core/Graphic.js';

type FeatureLayerState = {
  selectedLayer: Graphic | null;
  setFeatureLayer: (layer: Graphic) => void;
};

// Estado inicial
const initialState: FeatureLayerState = {
  selectedLayer: null,
  setFeatureLayer: () => {},
};

const FeatureLayerContext = createContext<FeatureLayerState>(initialState);

// Reducer para armazenar apenas UM layer de cada vez
const featureLayerReducer = (
  state: Graphic | null,
  action: { type: string; payload: Graphic }
) => {
  switch (action.type) {
    case 'SET_LAYER':
      return action.payload; // Substitui pelo novo layer clicado
    default:
      return state;
  }
};

// Provedor do contexto
export const FeatureLayerProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLayer, dispatch] = useReducer(featureLayerReducer, null);

  const setFeatureLayer = useCallback((layer: Graphic) => {
    dispatch({ type: 'SET_LAYER', payload: layer });
  }, []);

  return (
    <FeatureLayerContext.Provider value={{ selectedLayer, setFeatureLayer }}>
      {children}
    </FeatureLayerContext.Provider>
  );
};

// Hook para usar o contexto
export const useFeatureLayer = () => {
  return useContext(FeatureLayerContext);
};

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import Legend from '@arcgis/core/widgets/Legend';
import { MapView } from '../../components/MapView';
import MapViewArcGis from '@arcgis/core/views/MapView';
import { useDrawer } from '../../hooks/useDrawer';
import { useFeatureLayer } from '../../hooks/useFeatureLayer';
import { useSearch } from '../../hooks/useSearch';

// Mock dos hooks
jest.mock('../../hooks/useDrawer', () => ({
  useDrawer: jest.fn(),
}));

jest.mock('../../hooks/useFeatureLayer', () => ({
  useFeatureLayer: jest.fn(),
}));

jest.mock('../../hooks/useSearch', () => ({
  useSearch: jest.fn(),
}));

// Mock das classes do ArcGIS
jest.mock('@arcgis/core/Map', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    add: jest.fn(),
    on: jest.fn(),
  })),
}));
jest.mock('@arcgis/core/views/MapView', () =>
  jest.fn().mockImplementation(() => ({
    ui: { add: jest.fn() },
    on: jest.fn().mockImplementation(() => {}),
    hitTest: jest.fn().mockResolvedValue({ results: [] }),
    destroy: jest.fn(),
    goTo: jest.fn(),
    openPopup: jest.fn(),
  }))
);

jest.mock('@arcgis/core/layers/FeatureLayer', () =>
  jest.fn().mockImplementation(() => ({
    createQuery: jest.fn(() => ({
      where: '',
      outFields: ['*'],
      returnGeometry: true,
    })),
    queryFeatures: jest.fn().mockResolvedValue({ features: [] }),
  }))
);
jest.mock('@arcgis/core/widgets/Expand', () => jest.fn());
jest.mock('@arcgis/core/widgets/LayerList', () => jest.fn());
// jest.mock('@arcgis/core/widgets/Legend', () => jest.fn());
jest.mock('@arcgis/core/PopupTemplate', () => jest.fn());
jest.mock('@arcgis/core/widgets/Legend', () =>
  jest.fn().mockImplementation(() => ({
    render: jest.fn(),
  }))
);

describe('MapView Component', () => {
  beforeEach(() => {
    (useDrawer as jest.Mock).mockReturnValue({
      openDrawer: jest.fn(),
      closeDrawer: jest.fn(),
      toggleDrawer: jest.fn(),
    });

    (useFeatureLayer as jest.Mock).mockReturnValue({
      setFeatureLayer: jest.fn(),
    });

    (useSearch as jest.Mock).mockReturnValue({
      searchTerm: '',
    });
  });

  it('renderiza o mapa corretamente', () => {
    render(<MapView />);
  });
});

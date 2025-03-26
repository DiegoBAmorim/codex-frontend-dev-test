import { DrawerProvider } from './hooks/useDrawer';
import { FeatureLayerProvider } from './hooks/useFeatureLayer';
import { Home } from './pages/Home';
import { SearchProvider } from './hooks/useSearch';

function App() {
  return (
    <FeatureLayerProvider>
      <DrawerProvider>
        <SearchProvider>
          <Home />
        </SearchProvider>
      </DrawerProvider>
    </FeatureLayerProvider>
  );
}

export default App;

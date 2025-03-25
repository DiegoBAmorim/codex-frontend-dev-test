import React, { useEffect, useRef, useState } from 'react';

import Expand from '@arcgis/core/widgets/Expand';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import LayerList from '@arcgis/core/widgets/LayerList';
import Legend from '@arcgis/core/widgets/Legend';
import Map from '@arcgis/core/Map';
import MapViewArcgis from '@arcgis/core/views/MapView';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import { useDrawer } from '../../hooks/useDrawer';
import { useFeatureLayer } from '../../hooks/useFeatureLayer';
import { useSearch } from '../../hooks/useSearch';

export const MapView: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { setFeatureLayer } = useFeatureLayer();
  const [view, setView] = useState<MapViewArcgis | null>(null);
  const [featureLayer, setFeatureLayerState] = useState<FeatureLayer | null>(
    null
  );

  const { openDrawer, closeDrawer, toggleDrawer } = useDrawer();
  const { searchTerm } = useSearch();

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      basemap: 'streets-navigation-vector',
      layers: [],
    });

    const viewInstance = new MapViewArcgis({
      map: map,
      container: mapRef.current,
      center: [-51.1996, -30.0393],
      zoom: 13,
    });

    setView(viewInstance);

    // Array de FeatureLayers (adicione mais URLs conforme necessário)
    const featureLayers: string[] = [
      'https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/1',
      'https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/3',
      'https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/2',
      'https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/4',
    ];

    featureLayers.forEach((url) => {
      const layer = new FeatureLayer({
        url,
        outFields: ['*'],
        popupTemplate: url.endsWith('4')
          ? new PopupTemplate({
              title: 'Bairro: {Bairro}',
            })
          : null,
      });

      map.add(layer);

      // Define a FeatureLayer principal (última do array como referência)
      if (url.endsWith('4')) {
        setFeatureLayerState(layer);
      }
    });

    // Adiciona widgets
    const layerList = new LayerList({ view: viewInstance });
    const layerListExpand = new Expand({
      view: viewInstance,
      content: layerList,
      expanded: false,
    });

    viewInstance.ui.add(layerListExpand, 'top-left');

    const legend = new Legend({ view: viewInstance });
    viewInstance.ui.add(legend, 'bottom-left');

    // Captura feição clicada
    viewInstance.on('click', async (event) => {
      const response = await viewInstance.hitTest(event);
      const results = response.results.filter(
        (result) => result.graphic?.layer
      );

      if (results.length > 0) {
        let feature = results[0].graphic;
        setFeatureLayer(feature);
        openDrawer();
      }
    });

    const handleClick = async (event: __esri.ViewClickEvent) => {
      const response = await viewInstance.hitTest(event);

      // Filtra resultados para verificar se há alguma feição clicada
      const hasFeature = response.results.some(
        (result) => result.graphic?.layer
      );

      if (!hasFeature) {
        closeDrawer(); // Função para fechar o Drawer
      }
    };

    viewInstance.on('click', handleClick);

    return () => viewInstance.destroy();
  }, [setFeatureLayer]);

  // Função para buscar e dar zoom na feição pelo nome digitado
  const zoomAndSelectFeature = async () => {
    if (!view || !featureLayer || !searchTerm) return;

    const query = featureLayer.createQuery();
    query.where = `Bairro = '${searchTerm.toUpperCase()}'`; // Substitua "nome" pelo campo correto
    query.outFields = ['*'];
    query.returnGeometry = true;

    try {
      const results = await featureLayer.queryFeatures(query);

      if (results.features.length > 0) {
        const selectedFeature = results.features[0];
        const geometry = selectedFeature.geometry;

        // Verifica se é um polígono e pega o centroide
        let popupLocation = geometry;
        if (geometry?.type === 'polygon') {
          popupLocation = geometry.centroid;
        }

        // Faz o zoom na feição encontrada
        await view.goTo({
          target: geometry,
          zoom: 14,
        });

        setFeatureLayer(results.features[0]);
        openDrawer();

        view.openPopup({
          title: `Bairro: ${selectedFeature.attributes.bairro}`,
          features: [selectedFeature],
          updateLocationEnabled: true,
          location: popupLocation as __esri.Point,
        });
      } else {
        console.log('Nenhuma feição encontrada com esse nome.');
      }
    } catch (error) {
      view.graphics.removeAll();
      console.error('Erro ao consultar a camada:', error);
    }
  };

  useEffect(() => {
    zoomAndSelectFeature();
  }, [searchTerm]);

  return (
    <div className='h-screen z-50'>
      {/* Mapa */}
      <div ref={mapRef} className='w-full h-full' />
    </div>
  );
};

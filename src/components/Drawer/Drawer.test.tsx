import { fireEvent, render, screen } from '@testing-library/react';

import { Drawer } from './index';
import { useFeatureLayer } from '../../hooks/useFeatureLayer';

// Mock do hook useFeatureLayer
jest.mock('../../hooks/useFeatureLayer', () => ({
  useFeatureLayer: jest.fn(),
}));

describe('Drawer', () => {
  // Mocking o valor de selectedLayer
  const mockLayer = {
    attributes: {
      objectid: 1,
      bairro: 'Centro',
    },
  };

  beforeEach(() => {
    // Configurando o retorno do hook
    (useFeatureLayer as jest.Mock).mockReturnValue({
      selectedLayer: mockLayer,
    });
  });

  it('deve renderizar corretamente o Drawer com as informações do bairro', () => {
    // Abertura do Drawer
    render(<Drawer isDrawerOpen={true} setIsDrawerOpen={jest.fn()} />);

    // Verificar se as informações estão sendo renderizadas
    expect(screen.getByText('Dados do bairro')).toBeInTheDocument();
    expect(
      screen.getByText(`Id: ${mockLayer.attributes.objectid}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Nome: ${mockLayer.attributes.bairro}`)
    ).toBeInTheDocument();
  });

  it('não deve exibir o Drawer quando isDrawerOpen for false', () => {
    render(<Drawer isDrawerOpen={false} setIsDrawerOpen={jest.fn()} />);

    // O Drawer não deve ser renderizado
    expect(screen.queryByText('Dados do bairro')).not.toBeInTheDocument();
  });
});

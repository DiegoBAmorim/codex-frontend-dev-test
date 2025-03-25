import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Modal } from './index'; // Ajuste o caminho de importação conforme necessário
import { useSearch } from '../../hooks/useSearch';

// Mockando o hook useSearch
jest.mock('../../hooks/useSearch', () => ({
  useSearch: jest.fn(),
}));

describe('Modal Component', () => {
  const setIsVisibleMock = jest.fn();
  const setSearchTermMock = jest.fn();
  const clearSearchTermMock = jest.fn();

  beforeEach(() => {
    // Defina o mock para o useSearch
    (useSearch as jest.Mock).mockReturnValue({
      searchTerm: '',
      setSearchTerm: setSearchTermMock,
      clearSearchTerm: clearSearchTermMock,
    });
  });

  it('deve renderizar o modal quando isVisible for true', () => {
    render(<Modal isVisible={true} setIsVisible={setIsVisibleMock} />);

    const modalTitle = screen.getByText(/buscar bairro/i);
    expect(modalTitle).toBeInTheDocument();
  });

  it('não deve renderizar o modal quando isVisible for false', () => {
    render(<Modal isVisible={false} setIsVisible={setIsVisibleMock} />);

    const modalTitle = screen.queryByText(/buscar bairro/i);
    expect(modalTitle).not.toBeInTheDocument();
  });

  it('deve chamar o setSearchTerm e fechar o modal ao clicar no botão "Buscar"', async () => {
    render(<Modal isVisible={true} setIsVisible={setIsVisibleMock} />);

    const inputElement = screen.getByPlaceholderText(/nome do bairro/i);
    fireEvent.change(inputElement, { target: { value: 'Bairro Teste' } });

    const searchButton = screen.getByTestId('buscar');
    fireEvent.click(searchButton);

    // Verifica se o setSearchTerm foi chamado com o valor correto
    expect(setSearchTermMock).toHaveBeenCalledWith('Bairro Teste');

    // Verifica se o modal foi fechado ao clicar no botão "Buscar"
    await waitFor(() => {
      expect(setIsVisibleMock).toHaveBeenCalledWith(false);
    });
  });

  it('deve chamar clearSearchTerm e fechar o modal ao clicar no botão de fechar', async () => {
    render(<Modal isVisible={true} setIsVisible={setIsVisibleMock} />);

    // const closeButton = screen.getByRole('button', { name: /fechar/i });

    const closeButton = screen.getByRole('button', { name: /Close/i });

    fireEvent.click(closeButton);

    // Verifica se o clearSearchTerm foi chamado
    expect(clearSearchTermMock).toHaveBeenCalled();

    // Verifica se o modal foi fechado
    await waitFor(() => {
      expect(setIsVisibleMock).toHaveBeenCalledWith(false);
    });
  });
});

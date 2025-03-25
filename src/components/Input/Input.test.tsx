import { fireEvent, render, screen } from '@testing-library/react';

import { Input } from './index'; // Ajuste o caminho de importação conforme necessário

describe('Input Component', () => {
  it('deve renderizar o componente de input corretamente', () => {
    render(<Input placeholder='Digite algo...' />);

    // Verifique se o placeholder está presente
    const inputElement = screen.getByPlaceholderText(/digite algo.../i);
    expect(inputElement).toBeInTheDocument();
  });

  it('deve permitir a digitação de texto no input', () => {
    render(<Input placeholder='Digite algo...' />);

    const inputElement = screen.getByPlaceholderText(/digite algo.../i);

    // Simula a digitação de texto
    fireEvent.change(inputElement, { target: { value: 'Texto de exemplo' } });

    // Verifique se o valor do input foi atualizado corretamente
    expect(inputElement).toHaveValue('Texto de exemplo');
  });

  it('deve passar o valor correto para o onChange', () => {
    const handleChange = jest.fn();

    render(<Input placeholder='Digite algo...' onChange={handleChange} />);

    const inputElement = screen.getByPlaceholderText(/digite algo.../i);

    // Simula a digitação de texto
    fireEvent.change(inputElement, {
      target: { value: 'Texto para onChange' },
    });

    // Verifica se a função onChange foi chamada com o valor correto
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'Texto para onChange',
        }),
      })
    );
  });
});

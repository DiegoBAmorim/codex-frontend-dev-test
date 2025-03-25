import { Funnel, List } from '@phosphor-icons/react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Header } from './index';

describe('Header', () => {
  it('deve renderizar os textos do título corretamente', () => {
    render(<Header onClickFirstBtn={jest.fn()} onClickSecondBtn={jest.fn()} />);

    // Verificar se o texto dos títulos é renderizado
    expect(screen.getByText('Arcgis Dev')).toBeInTheDocument();
    expect(screen.getByText('Codex Dev Test')).toBeInTheDocument();
  });

  it('deve renderizar os botões com os ícones corretos', () => {
    render(<Header onClickFirstBtn={jest.fn()} onClickSecondBtn={jest.fn()} />);

    // Verificar se os botões existem com os ids corretos
    expect(screen.getByTestId('first-btn')).toBeInTheDocument();
    expect(screen.getByTestId('second-btn')).toBeInTheDocument();
  });

  it('deve chamar onClickFirstBtn ao clicar no primeiro botão', () => {
    const onClickFirstBtn = jest.fn();
    render(
      <Header onClickFirstBtn={onClickFirstBtn} onClickSecondBtn={jest.fn()} />
    );

    // Simula o clique no primeiro botão
    fireEvent.click(screen.getByTestId('first-btn'));

    // Verificar se onClickFirstBtn foi chamado
    expect(onClickFirstBtn).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onClickSecondBtn ao clicar no segundo botão', () => {
    const onClickSecondBtn = jest.fn();
    render(
      <Header onClickFirstBtn={jest.fn()} onClickSecondBtn={onClickSecondBtn} />
    );

    // Simula o clique no segundo botão
    fireEvent.click(screen.getByTestId('second-btn'));

    // Verificar se onClickSecondBtn foi chamado
    expect(onClickSecondBtn).toHaveBeenCalledTimes(1);
  });
});

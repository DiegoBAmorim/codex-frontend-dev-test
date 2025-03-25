import { Input } from '../Input';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { Modal as ModalAntd } from 'antd';
import { useSearch } from '../../hooks/useSearch';
import { useState } from 'react';

interface Props {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

export const Modal = ({ isVisible = false, setIsVisible }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const { setSearchTerm, clearSearchTerm } = useSearch();

  const onClose = () => {
    clearSearchTerm();
    setIsVisible(false);
  };

  const onSubmit = () => {
    setSearchTerm(inputValue);
    setIsVisible(false);
  };

  return (
    <div className='bg-black h-screen'>
      <ModalAntd
        title='Buscar bairro'
        data-testid='Buscar bairro'
        centered
        open={isVisible}
        onOk={() => setIsVisible(false)}
        onCancel={onClose}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
      >
        <div className='flex flex-col gap-3'>
          <Input
            name='inputValue'
            placeholder='Nome do Bairro'
            onChange={(ev) => setInputValue(ev.target.value)}
          />
          <button
            onClick={onSubmit}
            data-testid='buscar'
            className='flex bg-black w-full text-white items-center justify-center p-2 rounded-md gap-1'
          >
            <MagnifyingGlass size={20} />
            Buscar
          </button>
        </div>
      </ModalAntd>
    </div>
  );
};

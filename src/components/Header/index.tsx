import { Funnel, List } from '@phosphor-icons/react';

import React from 'react';

interface Props {
  onClickFirstBtn: () => void;
  onClickSecondBtn: () => void;
}

export const Header = ({ onClickFirstBtn, onClickSecondBtn }: Props) => {
  return (
    <div className='bg-black flex justify-between items-center px-10 relative z-[9999]'>
      <h1 className='text-white'>Arcgis Dev</h1>
      <h1 className='text-white'>Codex Dev Test</h1>
      <div className=' flex gap-5'>
        <button onClick={() => onClickFirstBtn()} data-testid='first-btn'>
          <Funnel size={24} color='white' />
        </button>
        <button onClick={() => onClickSecondBtn()} data-testid='second-btn'>
          <List size={24} color='white' />
        </button>
      </div>
    </div>
  );
};

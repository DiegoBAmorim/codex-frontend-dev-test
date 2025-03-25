import { Drawer as DrawerAntd } from 'antd';
import { useFeatureLayer } from '../../hooks/useFeatureLayer';

interface Props {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
}

export const Drawer = ({ isDrawerOpen = false, setIsDrawerOpen }: Props) => {
  const { selectedLayer } = useFeatureLayer();

  const onClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <DrawerAntd
      onClose={onClose}
      data-testid='drawer'
      open={isDrawerOpen}
      destroyOnClose
      maskClosable={false}
      maskClassName='hidden'
      closable={false}
    >
      <h3 className='font-bold'>Dados do bairro</h3>

      <h4>Id: {selectedLayer?.attributes?.objectid}</h4>
      <h4>Nome: {selectedLayer?.attributes?.bairro}</h4>
    </DrawerAntd>
  );
};

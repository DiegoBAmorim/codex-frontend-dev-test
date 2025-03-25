import { Drawer } from '../../components/Drawer';
import { Header } from '../../components/Header';
import { MapView } from '../../components/MapView';
import { Modal } from '../../components/Modal';
import { useDrawer } from '../../hooks/useDrawer';
import { useState } from 'react';

export const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isOpen, closeDrawer, toggleDrawer } = useDrawer();

  return (
    <div className='h-screen'>
      <Header
        onClickFirstBtn={() => setIsModalVisible(true)}
        onClickSecondBtn={() => toggleDrawer()}
      />
      <MapView />
      <Modal isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
      <Drawer isDrawerOpen={isOpen} setIsDrawerOpen={closeDrawer} />
    </div>
  );
};

import { motion } from 'framer-motion';
import React from 'react';
import { DrawerTriggerContainer } from './styles';

type DrawerTriggerProps = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const DrawerTrigger = ({ isDrawerOpen, setIsDrawerOpen }: DrawerTriggerProps) => {
  return (
    <DrawerTriggerContainer
      isDrawerOpen={isDrawerOpen}
      onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 1.5 }}
    >
      {isDrawerOpen ? (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-5"
          style={{ transformOrigin: '50% 50%' }}
          initial={{ rotate: 0 }}
          animate={{ x: [0, 3, 0, -1, 0] }}
          transition={{
            duration: 0.9,
            ease: 'easeOut',
          }}
          whileHover={{
            rotate: [0, 7, -7, 7, 0],
            transition: { duration: 0.8, ease: 'easeInOut' },
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </motion.svg>
      ) : (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-5"
          style={{ transformOrigin: '50% 50%' }}
          initial={{ rotate: 0 }}
          animate={{ x: [0, -3, 0, 1, 0] }}
          transition={{
            duration: 0.9,
            ease: 'easeOut',
          }}
          whileHover={{
            rotate: [0, 7, -7, 7, 0],
            transition: { duration: 0.8, ease: 'easeInOut' },
          }}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </motion.svg>
      )}
    </DrawerTriggerContainer>
  );
};

export default DrawerTrigger;

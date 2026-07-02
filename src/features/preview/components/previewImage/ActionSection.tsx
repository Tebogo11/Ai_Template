import { ActionContainer, ActionItem } from './style';
import { Variants } from 'framer-motion';

type ActionSectionProps = {
  addModal: () => void;
  downloadImage: () => void;
  fullView: () => void;
  deleteOutfit: () => void;
};

const actionIconsVariant: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.5, ease: 'easeOut' },
  },
  whileHover: {
    x: -0.75,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 2,
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  whileTap: {
    scale: 0.95,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 2,
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};

const ActionSection = ({
  addModal,
  downloadImage,
  fullView,
  deleteOutfit,
}: ActionSectionProps) => {
  return (
    <ActionContainer>
      <ActionItem
        onClick={addModal}
        variants={actionIconsVariant}
        initial="initial"
        animate="animate"
        whileHover="whileHover"
        whileTap="whileTap"
      >
        <svg
          xmlns="http://www.w8.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          className="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </ActionItem>
      <ActionItem
        onClick={downloadImage}
        variants={actionIconsVariant}
        initial="initial"
        animate="animate"
        whileHover="whileHover"
        whileTap="whileTap"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </ActionItem>
      <ActionItem
        onClick={fullView}
        variants={actionIconsVariant}
        initial="initial"
        animate="animate"
        whileHover="whileHover"
        whileTap="whileTap"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          className="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      </ActionItem>
      <ActionItem
        onClick={deleteOutfit}
        variants={actionIconsVariant}
        initial="initial"
        animate="animate"
        whileHover="whileHover"
        whileTap="whileTap"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0.5 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          className="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </ActionItem>
    </ActionContainer>
  );
};

export default ActionSection;

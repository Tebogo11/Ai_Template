import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import styled from 'styled-components';

type FormContainerProps = {
  isDrawerOpen: boolean;
};
export const FormContainer = styled(motion.div)<FormContainerProps>`
  display: flex;
  height: calc(100svh - 55px);
  width: clamp(375px, 90vw, 450px);
  max-width: 450px;
  min-width: 475px;
  flex-direction: column;
  padding-right: ${({ isDrawerOpen }) => (isDrawerOpen ? '1.25rem' : '0')};
  padding-bottom: 1.25rem;
  cursor: ${({ isDrawerOpen }) => (isDrawerOpen ? 'default' : 'pointer')};
  @media (max-width: 992px) {
    position: absolute;
    bottom: 0;
    left: 0;
    padding-left: ${({ isDrawerOpen }) => (isDrawerOpen ? '1.25rem' : '0')};
    z-index: 10;
    background: var(--color-base-100, #f9fafb);

    box-shadow: 2px 12px 12px 0px rgba(0, 0, 0, 0.2);
    width: ${({ isDrawerOpen }) => (isDrawerOpen ? 'calc(100vw - 40px)' : '50px')};
    min-width: ${({ isDrawerOpen }) => (isDrawerOpen ? '355px' : '50px')};
  }
`;

export const ScrollableContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  /* flex: 0 0 70%; */
  max-height: 75svh;
`;

export const PromptWrapper = styled.div`
  margin-top: auto;
  flex: 1;
`;

type DrawerTriggerContainerProps = {
  isDrawerOpen: boolean;
};
export const DrawerTriggerContainer = styled(motion.div)<DrawerTriggerContainerProps>`
  display: grid;
  place-items: center;
  position: absolute;
  width: 30px;
  height: 50px;
  background: var(--color-base-100, #f9fafb);
  left: 100%;
  top: 40%;
  box-shadow: 6px 4px 10px 0.34px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
  padding-right: 20px;
  @media (min-width: 992px) {
    display: none;
  }
`;

export const ChevronIcon = styled(ChevronLeft)<{ isDrawerOpen: boolean }>`
  transform: ${({ isDrawerOpen }) => (!isDrawerOpen ? 'rotate(180deg)' : 'none')};
`;

export const DrawerClosedFormPreview = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  img {
    width: 42px;
    height: 42px;
    object-fit: contain;
    object-position: center;
    border: 1px solid var(--color-base-content, #0000);
    border-radius: 2px;
    background: var(--color-base-200, #fff);
    margin-bottom: 0.25rem;
    padding: 2px;
  }
`;

export const MobileViewLabel = styled.p`
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--color-base-content, #1f2937);
`;

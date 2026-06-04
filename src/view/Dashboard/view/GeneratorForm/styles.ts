import { ChevronLeft } from 'lucide-react';
import styled from 'styled-components';

type FormContainerProps = {
  isDrawerOpen: boolean;
};
export const FormContainer = styled.div<FormContainerProps>`
  display: ${({ isDrawerOpen }) => (isDrawerOpen ? 'none' : 'flex')};
  height: 92svh;
  width: clamp(375px, 90vw, 450px);
  max-width: 450px;
  min-width: 475px;
  flex-direction: column;
  padding-right: 1.25rem;
  padding-bottom: 1.25rem;
  @media (max-width: 992px) {
    position: absolute;
    bottom: 0;
    left: 0;
    padding-left: 1.25rem;
    z-index: 10;
    background: var(--color-base-100, #f9fafb);
    display: flex;
    box-shadow: 2px 12px 12px 0px rgba(0, 0, 0, 0.2);
    min-width: 355px;
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
export const DrawerTriggerContainer = styled.div<DrawerTriggerContainerProps>`
  display: grid;
  place-items: center;
  position: absolute;
  width: 40px;
  height: 40px;
  background: var(--color-base-100, #f9fafb);
  left: 100%;
  box-shadow: 8px 8px 10px 0.34px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  @media (min-width: 992px) {
    display: none;
  }
`;

export const ChevronIcon = styled(ChevronLeft)<{ isDrawerOpen: boolean }>`
  transform: ${({ isDrawerOpen }) => (isDrawerOpen ? 'rotate(180deg)' : 'none')};
`;

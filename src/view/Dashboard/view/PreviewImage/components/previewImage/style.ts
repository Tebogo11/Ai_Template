import { motion } from 'framer-motion';
import styled from 'styled-components';

export const PreviewCarouselContainer = styled.div`
  position: relative;
  min-width: 100%;
  border-radius: 0.5rem;
  padding: 0rem 0rem 0.85rem;
  margin-top: 0.05rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 180px;

  @media (max-width: 992px) {
    padding-left: 1rem;
  }
`;

export const PreviewCarouselMeta = styled.div`
  display: grid;
  gap: 0.45rem;
`;

export const PreviewCarouselCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(17, 17, 17, 0.68);
  width: 100%;
`;

export const PreviewCarouselViewport = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 0.95rem;
  padding: 0.4rem 0;

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(138, 91, 42, 0.22);
  }
`;

export const TabBarContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  max-height: 24px;
  align-items: center;
  justify-content: space-between;
  background: var(--color-base-100, #fff);
  padding: 0.25rem 0.4rem;
  border: 3px solid var(--color-base-content, #0000);
  box-shadow: 0 4px 12px rgba(17, 17, 17, 0.08);
  border-radius: 0.2rem;
`;

export const PreviewCarouselTrack = styled.div`
  display: flex;
  width: 100%;
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
`;

export const PreviewCarouselFrame = styled(motion.div)`
  flex: 0 0 100%;
  min-width: 100%;
  height: min(75svh, 780px);
  border-radius: 0.45rem;
  overflow: hidden;
`;

export const PreviewThumbImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  object-position: center;
  border-radius: inherit;
`;

export const PreviewCarouselArrowButton = styled(motion.button)<{
  $side: 'left' | 'right';
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => ($side === 'left' ? 'left: 0.75rem;' : 'right: 0.75rem;')}

  width: 3.25rem;
  height: 3.25rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;

  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.22);

  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.6);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-around;
`;

export const ActionItem = styled(motion.button)`
  color: var(--color-base-content, #000);
  border: 3px solid var(--color-base-content, #0000);
  background: var(--color-base-100, #fff);
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  box-shadow: 4px 12px rgba(17, 17, 17, 0.08);
`;

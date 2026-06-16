import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const Container = styled(motion.div)`
  position: relative;
  display: flex;
  min-height: 90svh;
  max-height: 90svh;
  min-width: 320px;
  width: 100%;
  flex-direction: column;
  border: 1px solid var(--color-base-300, #d1d5db);
  border-radius: 0.275rem 0 0 0;

  padding-top: 0;
  background: hsl(0deg 0% 100%);

  overflow: hidden;
  background-image:
    radial-gradient(rgb(0, 0, 0) 10%, transparent 10%),
    radial-gradient(rgb(0, 0, 0) 10%, transparent 10%);
  background-position:
    0px 0px,
    8px 8px;
  background-size: 16px 16px;
  background-color: var(--color-base-100, #d1d5db);

  box-shadow:
    inset 4px 4px 8px rgb(0 0 0 / 0.25),
    inset -4px -4px 8px rgb(255 255 255 / 0.05);
`;

export const Stage = styled.div`
  position: relative;
  display: flex;
  min-height: 0;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

type StateCardProps = {
  $variant?: 'loading' | 'error' | 'empty' | 'deleting';
};

export const StateCard = styled.div<StateCardProps>`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  text-align: center;
  overflow: hidden;

  ${({ $variant }) =>
    $variant === 'loading' &&
    css`
      background: var(--color-primary-content, #fffaf1);
    `}

  ${({ $variant }) =>
    $variant === 'deleting' &&
    css`
      background: var(--color-base-200, #fffaf1);
      color: var(--color-base-content, #fffaf1);
    `}

  ${({ $variant }) =>
    $variant === 'error' &&
    css`
      color: '#fff';
      background:
        radial-gradient(circle at top, rgb(255 255 255 / 0.12), transparent 35%),
        linear-gradient(160deg, var(--color-error, #dc2626), rgb(87 18 18 / 0.94));
    `}

	${({ $variant }) =>
    $variant === 'empty' &&
    css`
      color: '#fff';
      background:
        radial-gradient(circle at top, rgb(255 255 255 / 0.4), transparent 35%),
        linear-gradient(
          180deg,
          var(--color-base-100, #f9fafb) 0%,
          var(--color-base-200, #eceff1) 100%
        );
      @media (max-width: 768px) {
        padding-left: 4rem;
      }
    `}
`;

export const StatusOrb = styled.div<StateCardProps>`
  position: relative;
  z-index: 1;
  display: grid;
  height: clamp(4rem, 10vw, 5.5rem);
  width: clamp(4rem, 10vw, 5.5rem);
  place-items: center;
  border-radius: 999px;
  border: 1px solid rgb(255 255 255 / 0.2);
  backdrop-filter: blur(14px);

  ${({ $variant }) =>
    $variant === 'loading' &&
    css`
      background: rgb(255 255 255 / 0.12);
      box-shadow: 0 0 0 10px rgb(255 255 255 / 0.06);
    `}

  ${({ $variant }) =>
    $variant === 'error' &&
    css`
      background: rgb(39 6 6 / 0.22);
      box-shadow: 0 0 0 10px rgb(39 6 6 / 0.08);
    `}

	${({ $variant }) =>
    $variant === 'empty' &&
    css`
      background: rgb(255 255 255 / 0.56);
      box-shadow: 0 0 0 10px rgb(255 255 255 / 0.3);
      border-color: rgb(17 24 39 / 0.08);
    `}
`;

export const StatusGlyph = styled.span`
  font-size: clamp(1.5rem, 4vw, 2rem);
  line-height: 1;
`;

export const StateTitle = styled.h3`
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: clamp(1.25rem, 2vw, 1.75rem);
  line-height: 1.1;
  font-weight: 800;
  color: --var(--color-primary-content, #fffaf1);
`;

export const StateBody = styled.p`
  position: relative;
  z-index: 1;
  margin: 0;
  max-width: 34rem;
  font-size: clamp(0.95rem, 1.45vw, 1.05rem);
  line-height: 1.7;
  opacity: 0.9;
  color: --var(--color-primary-content, #fffaf1);
`;

export const ImageFrame = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: clamp(0.5rem, 1.5vw, 1rem);
  overflow: auto;
`;

export const EdgeOptions = styled.div`
  position: absolute;
  right: 0.65rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    top: auto;
    bottom: 0.65rem;
    transform: none;
    flex-direction: row;
  }
`;

export const EdgeOptionButton = styled.button<{ $danger?: boolean }>`
  border: 1px solid
    ${({ $danger }) => ($danger ? 'rgba(220, 38, 38, 0.35)' : 'rgba(17, 17, 17, 0.2)')};
  background: ${({ $danger }) =>
    $danger ? 'rgba(220, 38, 38, 0.1)' : 'rgba(255, 255, 255, 0.9)'};
  color: ${({ $danger }) => ($danger ? '#991b1b' : '#111')};
  border-radius: 0.35rem;
  padding: 0.45rem 0.65rem;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.02em;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition:
    transform 140ms ease,
    background 140ms ease,
    box-shadow 140ms ease;

  &:hover {
    transform: translateX(-1px);
    box-shadow: 0 8px 16px rgb(0 0 0 / 0.12);
  }

  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-1px);
    }
  }
`;

import styled, { keyframes } from 'styled-components';

const revealUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const progressPulse = keyframes`
  0%,
  100% {
    filter: saturate(100%);
  }

  50% {
    filter: saturate(128%);
  }
`;

export const StyledImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 60svh;
  width: auto;
  height: auto;
  object-fit: contain;
  object-position: center;
  border-radius: 0.275rem;
  border: 0.5px solid rgba(113, 112, 110, 0.6);
`;

export const EmblaCarouselContainer = styled.div`
  position: relative;
  width: min(100%, 380px);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(244, 238, 231, 0.94)), #fff;
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 0.5rem;

  padding: 0.9rem 0.9rem 0.85rem;
  margin-top: 0.05rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 180px;
  animation: ${revealUp} 260ms ease;
`;

export const EmblaMeta = styled.div`
  display: grid;
  gap: 0.45rem;
`;

export const EmblaCounter = styled.div`
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(17, 17, 17, 0.68);
  width: 125px;
`;

export const EmblaProgressTrack = styled.div`
  position: relative;
  overflow: hidden;
  height: 0.38rem;
  width: 100%;
  border-radius: 0.19rem;
  background: rgba(17, 17, 17, 0.08);
`;

export const EmblaProgressFill = styled.div`
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #111 0%, #8a5b2a 55%, #d1a15f 100%);
  transition: width 240ms cubic-bezier(0.22, 1, 0.36, 1);
  animation: ${progressPulse} 1.8s ease-in-out infinite;
`;

export const EmblaHint = styled.p`
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.4;
  color: rgba(17, 17, 17, 0.58);
`;

export const EmblaViewport = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 0.95rem;
  padding: 0.4rem 0;
  cursor: grab;
  outline: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 0.85rem;
    z-index: 1;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(90deg, rgba(247, 243, 238, 0.96), transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(270deg, rgba(247, 243, 238, 0.96), transparent);
  }

  &:active {
    cursor: grabbing;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(138, 91, 42, 0.22);
  }
`;

export const EmblaContainer = styled.div`
  display: flex;
  touch-action: pan-y pinch-zoom;
  gap: 0.75rem;
  padding: 0 0;
  margin-right: 0.75rem;
`;

export const EmblaSlide = styled.div<{ $isSelected: boolean; $isFocused: boolean }>`
  flex: 0 0 auto;
  min-width: 0;
  width: 90px;
  height: 116px;
  border-radius: 0.25rem;
  cursor: pointer;
  border: 1px solid
    ${({ $isSelected, $isFocused }) => {
      if ($isSelected) return 'rgba(138, 91, 42, 0.82)';
      if ($isFocused) return 'rgba(17, 17, 17, 0.1)';
      return 'rgba(17, 17, 17, 0.1)';
    }};
  box-shadow: ${({ $isSelected, $isFocused }) => {
    if ($isSelected) return '0 16px 28px rgba(138, 91, 42, 0.2)';
    if ($isFocused) return '0 8px 18px rgba(17, 17, 17, 0.08)';
    return '0 8px 18px rgba(17, 17, 17, 0.08)';
  }};
  opacity: ${({ $isSelected, $isFocused }) => {
    if ($isSelected) return 1;
    if ($isFocused) return 0.72;
    return 0.72;
  }};
  transform: ${({ $isSelected, $isFocused }) => {
    if ($isSelected) return 'translateY(-2px) scale(1.02)';
    if ($isFocused) return 'translateY(0) scale(0.94)';
    return 'translateY(0) scale(0.94)';
  }};
  transition:
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 220ms ease,
    border-color 220ms ease,
    opacity 180ms ease;

  &:hover {
    opacity: 0.96;
    transform: translateY(-4px) scale(1.01);
  }
`;

export const PreviewThumbImage = styled.img<{
  $isSelected: boolean;
  $isFocused: boolean;
}>`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  border-radius: inherit;
  transition:
    filter 220ms ease,
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1);

  filter: ${({ $isSelected, $isFocused }) => {
    if ($isSelected) return 'none';
    if ($isFocused) return 'grayscale(16%) brightness(0.9)';
    return 'grayscale(16%) brightness(0.9)';
  }};
  transform: ${({ $isSelected, $isFocused }) => {
    if ($isSelected) return 'scale(1)';
    if ($isFocused) return 'scale(0.98)';
    return 'scale(0.98)';
  }};
`;

export const EmblaControls = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  width: 70%;
`;

export const EmblaNavButton = styled.button`
  min-width: 4.25rem;
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: rgba(255, 255, 255, 0.88);
  color: #111;
  border-radius: 2px;
  padding: 0;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    background: #fff;
    box-shadow: 0 10px 18px rgba(17, 17, 17, 0.08);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

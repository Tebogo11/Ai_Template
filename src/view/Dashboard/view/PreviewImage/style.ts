import styled, { css, keyframes } from 'styled-components';

const gradientShift = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

const shimmer = keyframes`
	from {
		transform: translateX(-100%);
	}
	to {
		transform: translateX(100%);
	}
`;

const float = keyframes`
	0%,
	100% {
		transform: translateY(0px);
	}
	50% {
		transform: translateY(-8px);
	}
`;

export const Container = styled.section`
  position: relative;
  display: flex;
  min-height: min(92dvh, 920px);
  max-height: min(92dvh, 920px);
  width: 100%;
  flex-direction: column;
  border: 1px solid var(--color-base-300, #d1d5db);
  border-radius: 0.275rem 0 0 0;

  padding: 1.25rem;
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
  @media (min-width: 768px) {
    width: 66.666667%;
  }

  @media (min-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    min-height: min(72dvh, 640px);
    max-height: min(72dvh, 640px);
    border-radius: 0.375rem;
    padding: 1rem;
  }
`;

export const Stage = styled.div`
  position: relative;
  display: flex;
  min-height: 0;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;

  border-radius: 1rem;

  overflow: hidden;
`;

type StateCardProps = {
  $variant?: 'loading' | 'error' | 'empty';
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
      color: var(--color-primary-content, #fffaf1);
      background: linear-gradient(
        120deg,
        var(--color-primary, #b86c09),
        var(--color-accent, #0e6393),
        var(--color-secondary, #0f6d69),
        var(--color-primary, #b86c09)
      );
      background-size: 220% 220%;
      animation: ${gradientShift} 8s ease infinite;

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgb(255 255 255 / 0.08) 50%,
          transparent 100%
        );
        animation: ${shimmer} 2.2s linear infinite;
      }
    `}

  ${({ $variant }) =>
    $variant === 'error' &&
    css`
      color: var(--color-error-content, #fff5f5);
      background:
        radial-gradient(circle at top, rgb(255 255 255 / 0.12), transparent 35%),
        linear-gradient(160deg, var(--color-error, #dc2626), rgb(87 18 18 / 0.94));
    `}

	${({ $variant }) =>
    $variant === 'empty' &&
    css`
      color: var(--color-base-content, #111827);
      background:
        radial-gradient(circle at top, rgb(255 255 255 / 0.4), transparent 35%),
        linear-gradient(
          180deg,
          var(--color-base-100, #f9fafb) 0%,
          var(--color-base-200, #eceff1) 100%
        );
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
  animation: ${float} 3s ease-in-out infinite;

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
`;

export const StateBody = styled.p`
  position: relative;
  z-index: 1;
  margin: 0;
  max-width: 34rem;
  font-size: clamp(0.95rem, 1.45vw, 1.05rem);
  line-height: 1.7;
  opacity: 0.9;
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

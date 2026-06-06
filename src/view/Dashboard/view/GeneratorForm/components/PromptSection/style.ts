import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  flex: 1;
  justify-content: flex-start;
  border-radius: 0;
  padding-top: 0.5rem;
  padding-bottom: 0;
`;

export const FormWrapper = styled.form<{ hasImage: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: ${({ hasImage }) => (hasImage ? '75%' : '100%')};
  height: 100%;
  margin-right: ${({ hasImage }) => (hasImage ? '1.25rem' : '0')};

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
`;

export const InputLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--color-base-content, #1f2937);

  span {
    font-size: 0.75rem;
    font-weight: 300;
    color: var(--color-base-content, #1f2937);
  }
`;

export const TextareaContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Textarea = styled.textarea<{ hasImage: boolean }>`
  box-sizing: border-box;
  width: 100%;
  resize: none;
  min-height: ${({ hasImage }) => (hasImage ? '12dvh' : '40px')};
  border: 1px solid var(--color-base-300, #d1d5db);
  border-radius: 0.25rem;
  background-color: var(--color-base-200, #e5e7eb);
  color: var(--color-base-content, #1f2937);
  padding: 0.5rem 5rem 0.5rem 1rem;
  max-height: 18dvh;
  word-break: break-word;
  white-space: pre-wrap;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  transition: all 0.15s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-base-300, #d1d5db);
  }

  &::placeholder {
    color: var(--color-base-content, #1f2937);
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    min-height: 40px;
  }
`;

export const SubmitButton = styled.button<{ isDisabled: boolean; isGenerating: boolean }>`
  position: absolute;
  right: 5px;
  bottom: 12px;
  padding: 0.375rem 0.75rem;
  background-color: var(--color-primary, #6366f1);
  color: var(--color-primary-content, #ffffff);
  font-weight: 600;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.15s;

  pointer-events: ${({ isGenerating }) => (isGenerating ? 'none' : 'auto')};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }

  &:disabled {
    cursor: not-allowed;
  }

  p {
    opacity: ${({ isDisabled }) => (isDisabled ? 0.55 : 1)};
    font-size: 0.875rem;
  }
`;

export const PreviewLabel = styled.label`
  display: block;
  max-height: 10rem;
  min-height: 10rem;
  width: 25%;
  border-radius: 0.125rem;
  padding: 0.5rem 0 0 0;
  cursor: pointer;
  transition: transform 0.15s;

  &:active {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const PreviewImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 0.125rem;
  object-fit: cover;
  object-position: top;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

export const PreviewButtonContainer = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  display: flex;
  height: 100%;
  max-height: 1.5rem;
  width: 1.5rem;
  flex-direction: column;
`;

export const PreviewButton = styled.button`
  background-color: var(--color-base-100, #f3f4f6);
  display: grid;
  width: 2.5rem;
  cursor: pointer;
  place-items: center;
  border-radius: 0.375rem;
  padding: 0.25rem;
  font-size: 0.75rem;
  color: var(--color-base-content, #1f2937);
  border: none;

  svg {
    height: 1.375rem;
    width: 1.375rem;
    color: var(--color-base-content, #1f2937);
  }

  &:hover svg {
    animation: jump 0.5s ease-in-out;
  }

  @keyframes jump {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-0.25rem);
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  p {
    font-size: 0.875rem;
    opacity: 1;
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* height: clamp(200px, 30svh, 300px); */
`;

export const UploadLabel = styled.label<{ isDragging?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0.275rem;
  border: 4px dashed var(--color-base-100, #e5e7eb);
  background: var(--color-base-300, #d1d5db);
  padding: 1rem;
  transition:
    border-color 0.2s,
    background-color 0.2s;

  &:hover {
    border-color: var(--color-secondary, #a78bfa);
  }
  ${({ isDragging }) =>
    isDragging &&
    `
    border-color: var(--color-secondary, #a78bfa);
    background: rgba(167, 139, 250, 0.1);
  `}
  height: 40svh
`;

export const UploadTitle = styled.h3`
  color: var(--color-base-content, #1f2937);
  text-align: center;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
  margin: 0 0 1.5rem 0;
`;

export const UploadText = styled.p<{ isSmall?: boolean }>`
  color: var(--color-base-content, #1f2937);
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0 0 0.5rem 0;
`;

export const UploadSubtitle = styled.p`
  color: var(--color-base-content, #9ca3af);
  text-align: center;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.25;
  margin: 0 0 2rem 0;
`;

export const SelectFileButton = styled.button`
  background: var(--color-base-100, #fff);
  color: var(--color-base-content, #1f2937);
  border: 1px solid var(--color-base-300, #d1d5db);
  padding: 0.625rem 1.75rem;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    /* background: var(--color-base-300, #f3f4f6); */
    border-color: var(--color-base-content, #9ca3af);
  }

  &:active {
    background: var(--color-base-300, #e5e7eb);
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const PreviewBox = styled.div<{}>`
  background: var(--color-base-200, #e5e7eb);
  position: relative;
  overflow: hidden;
  border-radius: 0.275rem;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 40svh;
`;

export const PreviewImage = styled.img`
  height: 100%;
  width: 100%;
  max-height: 40svh;
  object-fit: contain;
  object-position: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const RemoveButton = styled.button`
  background: rgba(229, 231, 235, 0.8);
  &:hover {
    background: #e5e7eb;
  }
  display: inline-flex;
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.275rem;
  cursor: pointer;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: var(--color-base-100, #fff);
  position: relative;
  width: 100%;
  max-width: 80rem;
  border-radius: 0.275rem;
  padding: 1rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
`;

export const ModalImage = styled.img`
  max-height: 80svh;
  width: 100%;
  border-radius: 0.275rem;
  object-fit: contain;
  object-position: center;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border-radius: 0.25rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  color: #fff;
  transition: background 0.2s;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

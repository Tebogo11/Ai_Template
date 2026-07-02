import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

export const InputLabel = styled.h2`
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const RequiredSpan = styled.span`
  font-size: 0.75rem;
  font-weight: 300;
`;

// Accessories Upload Styles
export const Container = styled.div`
  display: flex;
  width: 100%;
  /* height: 10%; */
  min-height: 125px;
  gap: 0.5rem;
  overflow-x: hidden;
  overflow-y: visible;
  border-radius: 0.25rem;
  background: var(--color-base-200, #e5e7eb);
  padding: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const UploadBox = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  height: 100%;
  background: var(--color-base-200, #d1d5db);
  border: 2px dashed var(--color-base-300, #a78bfa);
  border-radius: 0.15rem;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  font-weight: 600;
  font-size: 0.75rem;
  color: var(--color-base-content, #1f2937);
  text-align: center;
  padding: 0.5rem;

  &:hover {
    /* background: rgba(167, 139, 250, 0.1); */
    border-color: var(--color-primary, #7c3aed);
  }
`;

export const DragDropText = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
  height: 100%;
  color: var(--color-base-content, #1f2937);
  font-weight: 600;
  font-size: 0.875rem;
  text-align: left;
  padding: 0 1rem;
  width: 60%;
  white-space: wrap;
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  align-content: start;
  height: 100%;
  flex: 1;
  padding: 0 0.5rem;
`;

export const ImageItem = styled.div`
  position: relative;
  height: 125px;
  border-radius: 0.25rem;
  overflow: hidden;
  background: var(--color-base-300, #d1d5db);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  transition: background 0.2s;
  opacity: 0;
  top: -999px;

  ${ImageItem}:hover & {
    opacity: 1;
    top: 0.25rem;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const UploadText = styled.p<{ isSmall?: boolean }>`
  color: var(--color-base-content, #1f2937);
  text-align: center;
  font-weight: 600;
  font-size: 0.65rem;
  line-height: 1.5;
  margin: 0 0 0.5rem 0;
  max-width: 75px;
`;

export const EmptyHintText = styled.p<{ isSmall?: boolean }>`
  color: var(--color-base-content, #1f2937);
  text-align: left;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5;
`;

export const EmptyHintSubtitle = styled.p`
  color: var(--color-base-content, #9ca3af);
  text-align: left;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.25;
`;

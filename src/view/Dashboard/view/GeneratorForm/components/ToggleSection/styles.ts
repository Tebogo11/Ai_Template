import styled from 'styled-components';

export const Container = styled.div`
  background: var(--color-base-200, #e5e7eb);
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  min-width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.125rem;
  padding: 3px;
`;

export const Label = styled.h2`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0px;
  margin: 0px;
  color: var(--color-base-content, #1f2937);
  line-height: 1;
`;

export const LabelSubtext = styled.span`
  font-size: 0.65rem;
  font-weight: 300;
  color: var(--color-base-content, #1f2937);
  /* display: inline; */
  padding: 0px;
  margin: 0px;
  line-height: 1.5;
`;

export const ButtonGroup = styled.div`
  background: var(--color-base-300, #d1d5db);
  display: flex;
  width: 45%;
  justify-content: space-between;
  gap: 0.125rem;
  border-radius: 0.125rem;
  padding: 0.125rem;
`;

export const ToggleButton = styled.button<{ isActive: boolean }>`
  background: ${({ isActive }) =>
    isActive ? 'var(--color-base-100, #f3f4f6)' : 'var(--color-base-300, #d1d5db)'};
  flex: 1;
  border-radius: 0.125rem;
  border: 0;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  transition: background-color 0.2s;
  color: var(--color-base-content, #1f2937);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ isActive }) =>
      isActive ? 'var(--color-base-100, #f3f4f6)' : 'rgba(0, 0, 0, 0.05)'};
  }

  &:active {
    background: ${({ isActive }) =>
      isActive ? 'var(--color-base-100, #f3f4f6)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

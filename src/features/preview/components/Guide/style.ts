import styled from 'styled-components';

export const StepsList = styled.ol`
  position: relative;
  z-index: 1;
  display: grid;
  max-width: 38rem;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const Step = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 0.75rem;
  text-align: left;
`;

export const StepNumber = styled.span`
  display: inline-grid;
  height: 1.75rem;
  width: 1.75rem;
  place-items: center;
  border-radius: 999px;
  background: var(--color-primary, #b86c09);
  color: var(--color-primary-content, #fffaf1);
  font-size: 0.8rem;
  font-weight: 700;
`;

export const StepText = styled.span`
  color: inherit;
  font-size: 0.95rem;
  line-height: 1.55;

  strong {
    font-weight: 700;
  }
`;

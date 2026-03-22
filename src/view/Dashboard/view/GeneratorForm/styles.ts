import styled from 'styled-components';

export const FormContainer = styled.div<{ isPreviewPage: boolean }>`
  display: ${({ isPreviewPage }) => (isPreviewPage ? 'none' : 'flex')};
  min-height: 90dvh;
  max-width: 450px;
  min-width: 450px;
  flex-direction: column;
  padding-right: 1.25rem;
  padding-bottom: 1.25rem;
`;

export const ScrollableContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 0 0 80%;
`;

export const PromptWrapper = styled.div`
  margin-top: auto;
`;

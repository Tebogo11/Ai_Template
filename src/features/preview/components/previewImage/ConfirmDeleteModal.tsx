import React from 'react';
import styled from 'styled-components';

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 1rem;
`;

const Card = styled.div`
  width: min(100%, 26rem);
  border-radius: 0.85rem;
  border: 2px solid var(--color-base-content, #111);
  background: var(--color-base-100, #fff);
  color: var(--color-base-content, #111);
  box-shadow: 0 24px 44px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  display: grid;
  gap: 0.9rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const Body = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  opacity: 0.9;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
`;

const Button = styled.button<{ $variant?: 'danger' | 'neutral' }>`
  border: 2px solid var(--color-base-content, #111);
  border-radius: 0.6rem;
  min-width: 6.8rem;
  padding: 0.5rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    transform 120ms ease,
    opacity 120ms ease;
  background: ${({ $variant }) =>
    $variant === 'danger'
      ? 'var(--color-error, #dc2626)'
      : 'var(--color-base-100, #fff)'};
  color: ${({ $variant }) =>
    $variant === 'danger' ? '#fff' : 'var(--color-base-content, #111)'};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  &:not(:disabled):active {
    transform: scale(0.98);
  }
`;

const ConfirmDeleteModal = ({
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isDeleting) {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, isDeleting, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-label="Confirm delete"
      onClick={() => {
        if (!isDeleting) {
          onClose();
        }
      }}
    >
      <Card onClick={(event) => event.stopPropagation()}>
        <Title>Delete outfit</Title>
        <Body>
          This action is permanent. Do you want to delete this outfit from your wardrobe?
        </Body>
        <Actions>
          <Button type="button" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            type="button"
            $variant="danger"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </Actions>
      </Card>
    </Overlay>
  );
};

export default ConfirmDeleteModal;

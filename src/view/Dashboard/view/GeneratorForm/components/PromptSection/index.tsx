import { useGeneratorSetting } from '@/store/useGeneratorData';
import React, { useMemo, useLayoutEffect } from 'react';
import useSubmitForm from '../../hooks/useSubmitForm';
import Loading from '@/components/Core/Loading';
import { useQuery } from 'convex/react';
import { api } from '../../../../../../../convex/_generated/api';
import {
  Container,
  FormWrapper,
  InputLabel,
  TextareaContainer,
  Textarea,
  SubmitButton,
  LoadingContainer,
} from './style';

const PromptSection = () => {
  const { setPrompt, prompt, modal, isGenerating } = useGeneratorSetting();

  const hasTokenLeft = useQuery(api.user.tokens.hasTokenLeft);

  const { onSubmit } = useSubmitForm();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit();
  };

  const isSubmitDisabled = useMemo(() => {
    return !modal?.trim();
  }, [modal]);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    resizeTextarea(textareaRef.current);
  }, [prompt]);

  const resizeTextarea = (ta: HTMLTextAreaElement | null) => {
    if (!ta) return;
    ta.style.height = 'auto';
    const MAX =
      typeof window !== 'undefined' ? window.innerHeight * 0.2 : Number.MAX_SAFE_INTEGER;
    ta.style.maxHeight = '20vh';
    const newHeight = Math.min(ta.scrollHeight, MAX);
    ta.style.height = `${newHeight}px`;
    ta.style.overflowY = ta.scrollHeight > MAX ? 'auto' : 'hidden';
  };

  return (
    <Container>
      <FormWrapper onSubmit={(e) => void handleSend(e)}>
        <InputLabel>
          3. Any specific instructions? <span>(Optional)</span>
        </InputLabel>

        <TextareaContainer>
          <Textarea
            ref={textareaRef}
            placeholder="e.g. I want a red dress with floral patterns, full body view, "
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={1}
            style={{ maxHeight: '20vh' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              resizeTextarea(target);
            }}
          />
        </TextareaContainer>

        <SubmitButton
          type="submit"
          disabled={!!isSubmitDisabled}
          isDisabled={isSubmitDisabled}
          isGenerating={isGenerating}
        >
          {hasTokenLeft ? (
            isGenerating ? (
              <LoadingContainer>
                <p>Generating...</p>
                <Loading size="xs" color="base-100" />
              </LoadingContainer>
            ) : (
              <p>
                {prompt.trim() || !modal?.trim()
                  ? !modal?.trim()
                    ? 'Add Model'
                    : 'Create'
                  : 'No, Create'}
              </p>
            )
          ) : (
            <p>No tokens left</p>
          )}
        </SubmitButton>
      </FormWrapper>
    </Container>
  );
};

export default PromptSection;

import { useGeneratorSetting } from '@/store/useGeneratorData';
import { EyeIcon } from '@heroicons/react/24/outline';
import React, { useMemo, useLayoutEffect } from 'react';
import useSubmitForm from '../../hooks/useSubmitForm';
import Loading from '@/components/Core/Loading';
import { useQuery } from 'convex/react';
import { api } from '../../../../../../../convex/_generated/api';
import { Id } from '../../../../../../../convex/_generated/dataModel';
import { useAppSetting } from '@/store/useAppSetting';
import {
  Container,
  FormWrapper,
  InputLabel,
  TextareaContainer,
  Textarea,
  SubmitButton,
  PreviewLabel,
  PreviewImage,
  PreviewButtonContainer,
  PreviewButton,
  LoadingContainer,
} from './style';

const PromptSection = () => {
  const { setPrompt, prompt, modal, isGenerating, outfitId } = useGeneratorSetting();
  const { setIsPreviewPage } = useAppSetting();

  const outfit = null;

  const hasTokenLeft = useQuery(api.user.tokens.hasTokenLeft);

  const imageUrl = null;

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
      <FormWrapper hasImage={!!imageUrl} onSubmit={(e) => void handleSend(e)}>
        <InputLabel>
          3. Any specific instructions? <span>(Optional)</span>
        </InputLabel>

        <TextareaContainer>
          <Textarea
            ref={textareaRef}
            hasImage={!!imageUrl}
            placeholder="e.g. I want a red dress with floral patterns"
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

      {imageUrl && (
        <PreviewLabel onClick={() => setIsPreviewPage(true)}>
          <PreviewImage src={imageUrl} alt="Preview" loading="eager" decoding="async" />
          <PreviewButtonContainer>
            <PreviewButton type="button" onClick={() => {}}>
              <EyeIcon />
            </PreviewButton>
          </PreviewButtonContainer>
        </PreviewLabel>
      )}
    </Container>
  );
};

export default PromptSection;

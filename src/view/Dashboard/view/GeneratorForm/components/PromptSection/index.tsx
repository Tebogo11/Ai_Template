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
import { useRotatingPlaceholder } from '@/view/Dashboard/hooks/useRotatingPlaceholder ';
import { promptPlaceholders } from './const';

const PromptSection = () => {
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  const typingTimeoutRef = React.useRef<number | null>(null);
  const { setPrompt, prompt, modal, isGenerating } = useGeneratorSetting();
  const { placeholder } = useRotatingPlaceholder(promptPlaceholders);
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

  React.useEffect(() => {
    return () => {
      if (typingTimeoutRef.current !== null) {
        window.clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

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

  const handleTypingActivity = () => {
    setIsInputFocused(true);
    if (typingTimeoutRef.current !== null) {
      window.clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = window.setTimeout(() => {
      setIsInputFocused(false);
    }, 1000);
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
            placeholder={placeholder}
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              handleTypingActivity();
            }}
            rows={1}
            style={{ maxHeight: '20vh' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              resizeTextarea(target);
              handleTypingActivity();
            }}
          />
        </TextareaContainer>

        <SubmitButton
          type="submit"
          disabled={!!isSubmitDisabled}
          isDisabled={isSubmitDisabled}
          isGenerating={isGenerating}
          isInputFocused={isInputFocused}
        >
          {hasTokenLeft ? (
            isGenerating ? (
              <LoadingContainer>
                <p>Generating...</p>
                <Loading size="xs" color="base-100" />
              </LoadingContainer>
            ) : (
              <>
                <p className="flex-center mr-1 ml-[-2px]">
                  {prompt.trim() || !modal?.trim() ? (
                    !modal?.trim() ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
                      </svg>
                    ) : null
                  ) : null}
                </p>
                <p>
                  {prompt.trim() || !modal?.trim()
                    ? !modal?.trim()
                      ? 'Add Model'
                      : 'Create'
                    : 'No, Create'}
                </p>
              </>
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

import React from 'react';
import { StateCard, StatusOrb, StatusGlyph, StateTitle, StateBody } from '../../style';
import { StepsList, Step, StepNumber, StepText } from './style';
import { previewSteps } from './const';

type GuideSlideProps = {
  outfitStatus?: 'generating' | 'error' | 'done';
  hasImage: boolean;
};
const GuideSlide: React.FC<GuideSlideProps> = ({ outfitStatus, hasImage }) => {
  return !outfitStatus && !hasImage ? (
    <StateCard $variant="empty">
      <StatusOrb $variant="empty">
        <StatusGlyph>+</StatusGlyph>
      </StatusOrb>
      <StateTitle>Build your look</StateTitle>
      <StateBody>
        This panel will show the generated result once you submit the form. Use the steps
        below to set up a stronger prompt.
      </StateBody>
      <StepsList>
        {previewSteps.map((step, index) => (
          <Step key={step}>
            <StepNumber>{index + 1}</StepNumber>
            <StepText>{step}</StepText>
          </Step>
        ))}
      </StepsList>
    </StateCard>
  ) : null;
};

export default GuideSlide;

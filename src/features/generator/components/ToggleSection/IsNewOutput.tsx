import { useGeneratorSetting } from '@/store/useGeneratorData';
import { Container, Label, LabelSubtext, ButtonGroup, ToggleButton } from './styles';

const IsNewOutput = () => {
  const { setIsNewOutfit, is_new_outfit } = useGeneratorSetting();
  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Label>Try preserve current models outfit </Label>
        <LabelSubtext>Or are you looking for a complete change?</LabelSubtext>
      </div>

      <ButtonGroup>
        <ToggleButton isActive={is_new_outfit} onClick={() => setIsNewOutfit(true)}>
          No
        </ToggleButton>
        <ToggleButton isActive={!is_new_outfit} onClick={() => setIsNewOutfit(false)}>
          Yes
        </ToggleButton>
      </ButtonGroup>
    </Container>
  );
};

export default IsNewOutput;

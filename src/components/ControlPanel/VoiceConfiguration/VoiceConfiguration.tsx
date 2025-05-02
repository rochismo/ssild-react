import { useSSILDContext } from '@/contexts/SSILDContext'
import { speak } from '@/utils/speech'
import { Button, createListCollection, Flex, Portal, Select } from '@chakra-ui/react'
import { useCallback, useMemo } from 'react'
import { MdPlayArrow } from 'react-icons/md'

export const VoiceConfiguration = () => {
  const { form, voices } = useSSILDContext()

  const collection = useMemo(() => {
    return createListCollection({ items: voices, itemToString: (item) => item.name, itemToValue: (item) => item.name })
  }, [voices])

  const playSample = useCallback(() => {
    const voiceName = form.readValue('voice')
    speak('This is a sample', voiceName)
  }, [form])

  return (
    <Flex gap="5" alignItems={'flex-end'}>
      <Select.Root
        collection={collection}
        width="320px"
        value={[form.values.voice]}
        onValueChange={(e) => form.changeValue('voice', e.value[0])}
      >
        <Select.HiddenSelect />
        <Select.Label>Select Voice Sense Indicator</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select Voice" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {voices.map((voice) => (
                <Select.Item item={voice} key={voice.name}>
                  {voice.name}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      <Button onClick={playSample}>
        <MdPlayArrow /> Play Sample
      </Button>
    </Flex>
  )
}

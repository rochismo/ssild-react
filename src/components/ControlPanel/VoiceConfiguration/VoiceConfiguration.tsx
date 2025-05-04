import { useSSILDContext } from '@/contexts/SSILDContext'
import { speak } from '@/utils/speech'
import { Box, Button, createListCollection, Flex, Portal, Select, Slider } from '@chakra-ui/react'
import { useCallback, useMemo } from 'react'
import { MdPlayArrow, MdVolumeUp } from 'react-icons/md'

export const VoiceConfiguration = () => {
  const { form, voices, isRunning } = useSSILDContext()

  const collection = useMemo(() => {
    return createListCollection({
      items: voices,
      itemToString: (item) => item.name,
      itemToValue: (item) => item.voiceURI,
    })
  }, [voices])

  const playSample = useCallback(() => {
    const voiceConfiguration = form.readValue('voice')
    speak('This is a sample', voiceConfiguration)
  }, [form])

  return (
    <Flex direction={'column'} gap="5">
      <Flex gap="5" alignItems={'flex-end'}>
        <Select.Root
          collection={collection}
          width="320px"
          value={[form.values.voice.uri]}
          disabled={isRunning}
          onValueChange={(e) => form.changeValue('voice.uri', e.value[0])}
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

        <Button onClick={playSample} disabled={isRunning}>
          <MdPlayArrow /> Play Sample
        </Button>
      </Flex>
      <Slider.Root
        value={[form.values.voice.volume]}
        min={0}
        max={1}
        disabled={isRunning}
        step={0.01}
        onValueChange={(x) => form.changeValue('voice.volume', x.value[0])}
      >
        <Slider.Label>Voice volume</Slider.Label>
        <Slider.Control>
          <Slider.Track bg="gray.200" h="2" borderRadius={'full'}>
            <Slider.Range bg="blue.400" borderRadius="full" />
          </Slider.Track>
          <Slider.Thumb
            index={0}
            boxSize={6}
            bg="white"
            border="2px solid"
            borderColor="blue.500"
            shadow="md"
            _hover={{ bg: 'blue.100' }}
          >
            <Box as={MdVolumeUp} boxSize={4} color="blue.500" />
          </Slider.Thumb>
        </Slider.Control>
      </Slider.Root>
    </Flex>
  )
}

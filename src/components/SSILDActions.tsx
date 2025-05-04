import { useSSILDContext } from '@/contexts/SSILDContext'
import { SSILDStatus } from '@/types/SSILDConfig'
import { Flex, Button } from '@chakra-ui/react'
import { SSILDStartButton } from './SSILDStartButton'

export const SSILDActions = () => {
  const { form, ssild } = useSSILDContext()

  return (
    <Flex
      justify={{ smTo2xl: 'center', base: 'space-between', '2xlOnly': 'flex-start' }}
      w={['100%', '90%', '700px']}
      gap={{ base: '0', smTo2xl: '5', '2xlOnly': '5' }}
    >
      <SSILDStartButton />
      {ssild.status === SSILDStatus.IDLE && (
        <Button size="md" onClick={() => form.reset()}>
          Reset Settings
        </Button>
      )}

      {ssild.status !== SSILDStatus.IDLE && (
        <Button size="md" onClick={ssild.stop}>
          Stop SSILD
        </Button>
      )}
    </Flex>
  )
}

import { Box, Flex, Tabs } from '@chakra-ui/react'

import { SSILDControlPanel } from './components/ControlPanel/SSILDControlPanel'

import './App.css'
import { SSILDActions } from './components/SSILDActions'
import { BackgroundNoiseContainer } from './components/BackgroundNoise'

function App() {
  const tabProperties = {
    inset: '0',
    position: 'absolute',
    _open: {
      animationName: 'fade-in, scale-in',
      animationDuration: '300ms',
    },
    _closed: {
      animationName: 'fade-out, scale-out',
      animationDuration: '120ms',
    },
  }

  return (
    <Flex minH="100vh" align={{ base: 'center' }} direction={'column'} gap="2" justify="center" p={4}>
      <Tabs.Root defaultValue="control-panel" variant={'subtle'} fitted>
        <Tabs.List alignContent={'center'} width="100%" justifyContent={'center'}>
          <Tabs.Trigger value="control-panel">SSILD Control Panel</Tabs.Trigger>
          <Tabs.Trigger value="background-noise">Background Noise</Tabs.Trigger>
        </Tabs.List>
        <Box
          position={'relative'}
          w={['100%', '100%', '700px']}
          minH={{ smToMd: '750px', base: '500px', mdTo2xl: '650px' }}
        >
          <Tabs.Content value="control-panel" {...tabProperties}>
            <Box p={6} rounded="2xl" shadow="xl" border={'solid'} height={'100%'} overflowY={'auto'}>
              <SSILDControlPanel />
            </Box>
          </Tabs.Content>
          <Tabs.Content value="background-noise" {...tabProperties}>
            <Box px={'5px'} rounded="2xl" shadow="xl" height={'100%'} border={'solid'}>
              <BackgroundNoiseContainer />
            </Box>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
      <SSILDActions />
    </Flex>
  )
}

export default App

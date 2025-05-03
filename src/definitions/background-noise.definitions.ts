import { BackgroundNoise } from '@/types/BackgroundNoise'

import {
  FaFan,
  FaFeatherAlt,
  FaCity,
  FaFire,
  FaFrog,
  FaPeopleArrows,
  FaCloudRain,
  FaBolt,
  FaCompactDisc,
  FaWind,
  FaWater,
  FaTree,
  FaSnowflake,
  FaBug,
  FaBell,
  FaHome,
  FaUmbrella,
  FaMusic,
  FaWaveSquare,
} from 'react-icons/fa'

export const backgroundNoises: BackgroundNoise[] = [
  {
    slug: 'aircon',
    displayName: 'Air Conditioner',
    slider: {
      trackBg: 'gray.200',
      trackRangeBg: 'gray.500',
      thumbBg: 'gray.700',
      thumbIcon: FaSnowflake,
    },
  },
  {
    slug: 'birds',
    displayName: 'Birds',
    slider: {
      trackBg: 'green.100',
      trackRangeBg: 'green.400',
      thumbBg: 'green.600',
      thumbIcon: FaFeatherAlt,
    },
  },
  {
    slug: 'brownnoise',
    displayName: 'Brown Noise',
    slider: {
      trackBg: 'orange.100',
      trackRangeBg: 'orange.400',
      thumbBg: 'orange.600',
      thumbIcon: FaWaveSquare,
    },
  },
  {
    slug: 'chimesmetal',
    displayName: 'Metallic Chimes',
    slider: {
      trackBg: 'yellow.100',
      trackRangeBg: 'yellow.400',
      thumbBg: 'yellow.600',
      thumbIcon: FaBell,
    },
  },
  {
    slug: 'cicadas',
    displayName: 'Cicadas',
    slider: {
      trackBg: 'teal.100',
      trackRangeBg: 'teal.400',
      thumbBg: 'teal.600',
      thumbIcon: FaBug,
    },
  },
  {
    slug: 'city',
    displayName: 'City Noise',
    slider: {
      trackBg: 'gray.300',
      trackRangeBg: 'gray.600',
      thumbBg: 'gray.800',
      thumbIcon: FaCity,
    },
  },
  {
    slug: 'crickets',
    displayName: 'Crickets',
    slider: {
      trackBg: 'green.200',
      trackRangeBg: 'green.500',
      thumbBg: 'green.700',
      thumbIcon: FaBug,
    },
  },
  {
    slug: 'fanhigh',
    displayName: 'Fan at High Speed',
    slider: {
      trackBg: 'blue.100',
      trackRangeBg: 'blue.400',
      thumbBg: 'blue.600',
      thumbIcon: FaFan,
    },
  },
  {
    slug: 'fanlow',
    displayName: 'Fan at Low Speed',
    slider: {
      trackBg: 'blue.50',
      trackRangeBg: 'blue.300',
      thumbBg: 'blue.500',
      thumbIcon: FaFan,
    },
  },
  {
    slug: 'fire',
    displayName: 'Crackling Fire',
    slider: {
      trackBg: 'red.100',
      trackRangeBg: 'red.400',
      thumbBg: 'red.600',
      thumbIcon: FaFire,
    },
  },
  {
    slug: 'frogs',
    displayName: 'Frogs',
    slider: {
      trackBg: 'green.300',
      trackRangeBg: 'green.600',
      thumbBg: 'green.800',
      thumbIcon: FaFrog,
    },
  },
  {
    slug: 'people',
    displayName: 'People Chatter',
    slider: {
      trackBg: 'purple.100',
      trackRangeBg: 'purple.400',
      thumbBg: 'purple.600',
      thumbIcon: FaPeopleArrows,
    },
  },
  {
    slug: 'pinknoise',
    displayName: 'Pink Noise',
    slider: {
      trackBg: 'pink.100',
      trackRangeBg: 'pink.400',
      thumbBg: 'pink.600',
      thumbIcon: FaWaveSquare,
    },
  },
  {
    slug: 'rain',
    displayName: 'Rain',
    slider: {
      trackBg: 'blue.200',
      trackRangeBg: 'blue.500',
      thumbBg: 'blue.700',
      thumbIcon: FaCloudRain,
    },
  },
  {
    slug: 'raincabin',
    displayName: 'Rain Cabin',
    slider: {
      trackBg: 'cyan.100',
      trackRangeBg: 'cyan.400',
      thumbBg: 'cyan.600',
      thumbIcon: FaHome,
    },
  },
  {
    slug: 'raintinroof',
    displayName: 'Rain on tin roof',
    slider: {
      trackBg: 'gray.100',
      trackRangeBg: 'gray.400',
      thumbBg: 'gray.600',
      thumbIcon: FaUmbrella,
    },
  },
  {
    slug: 'raintrees',
    displayName: 'Rain on trees',
    slider: {
      trackBg: 'green.100',
      trackRangeBg: 'green.400',
      thumbBg: 'green.600',
      thumbIcon: FaTree,
    },
  },
  {
    slug: 'sbowl',
    displayName: 'Singing Bowl',
    slider: {
      trackBg: 'yellow.200',
      trackRangeBg: 'yellow.500',
      thumbBg: 'yellow.700',
      thumbIcon: FaMusic,
    },
  },
  {
    slug: 'stream',
    displayName: 'Water Stream',
    slider: {
      trackBg: 'teal.100',
      trackRangeBg: 'teal.400',
      thumbBg: 'teal.600',
      thumbIcon: FaWater,
    },
  },
  {
    slug: 'thunder',
    displayName: 'Thunder',
    slider: {
      trackBg: 'purple.200',
      trackRangeBg: 'purple.500',
      thumbBg: 'purple.700',
      thumbIcon: FaBolt,
    },
  },
  {
    slug: 'vinyl',
    displayName: 'Vinyl',
    slider: {
      trackBg: 'gray.100',
      trackRangeBg: 'gray.400',
      thumbBg: 'gray.600',
      thumbIcon: FaCompactDisc,
    },
  },
  {
    slug: 'waterfall',
    displayName: 'Waterfall',
    slider: {
      trackBg: 'blue.100',
      trackRangeBg: 'blue.400',
      thumbBg: 'blue.600',
      thumbIcon: FaWater,
    },
  },
  {
    slug: 'waves',
    displayName: 'Ocean Waves',
    slider: {
      trackBg: 'cyan.200',
      trackRangeBg: 'cyan.500',
      thumbBg: 'cyan.700',
      thumbIcon: FaWater,
    },
  },
  {
    slug: 'whitenoise',
    displayName: 'White Noise',
    slider: {
      trackBg: 'gray.100',
      trackRangeBg: 'gray.400',
      thumbBg: 'gray.600',
      thumbIcon: FaWaveSquare,
    },
  },
  {
    slug: 'wind',
    displayName: 'Wind',
    slider: {
      trackBg: 'blue.100',
      trackRangeBg: 'blue.400',
      thumbBg: 'blue.600',
      thumbIcon: FaWind,
    },
  },
]

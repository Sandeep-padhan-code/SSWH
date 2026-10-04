import biswajitImg from '@/memberpics/Biswajit-das.jpeg'
import sidharthImg from '@/memberpics/Sidharth-patnaik.png'
import satwikImg from '@/memberpics/Satwik-raj-panda.png'
import sandeepImg from '@/memberpics/Sandeep-padhan.jpeg'
import anushkaImg from '@/memberpics/Anushka-poddar.jpeg'
import santoshiImg from '@/memberpics/M.santoshi.jpeg'

export interface TeamMember {
  id: string
  name: string
  role: string
  contribution: string
  image: string
  badge?: string
  tags?: string[]
}

export const teamMembers: TeamMember[] = [
  {
    id: '01',
    name: 'Biswajit Das',
    role: 'IoT & Hardware Engineer',
    contribution:
      'Designed and deployed the physical hardware infrastructure, integrating IoT sensors to monitor water levels, flow rates, and soil moisture in real-time. Programmed the microcontroller units and solenoid valves to automate physical water routing and harvesting mechanisms.',
    image: biswajitImg,
    badge: 'HARDWARE & IOT',
    tags: ['IoT', 'Microcontrollers', 'Solenoid Automation'],
  },
  {
    id: '02',
    name: 'Sidharth Patnaik',
    role: 'ML Developer',
    contribution:
      'Developed predictive machine learning models to forecast water demand and rainfall patterns using historical weather data. Integrated optimization tools (like Google OR-Tools) to compute the most efficient distribution schedules, minimizing wastage and ensuring resource availability.',
    image: sidharthImg,
    badge: 'ML & INTELLIGENCE',
    tags: ['Machine Learning', 'OR-Tools', 'Predictive Modeling'],
  },
  {
    id: '03',
    name: 'Satwik Raj Panda',
    role: 'App Developer',
    contribution:
      'Architected and developed the cross-platform mobile application, providing users with real-time analytics, automated alerts, and manual overrides for the harvesting hardware. Implemented responsive UI components to display real-time sensor updates and predictive water metrics.',
    image: satwikImg,
    badge: 'MOBILE SYSTEMS',
    tags: ['Cross-Platform', 'Real-Time UI', 'Hardware Control'],
  },
  {
    id: '04',
    name: 'Sandeep Padhan',
    role: 'Web Developer',
    contribution:
      'Built and maintained the central web dashboard, ensuring seamless integration between database endpoints and the front-end user interface. Structured the administrative console to handle system telemetry, monitor device uptimes, and generate project performance analytics.',
    image: sandeepImg,
    badge: 'WEB ARCHITECTURE',
    tags: ['Web Dashboard', 'SCADA Console', 'Telemetry UI'],
  },
  {
    id: '05',
    name: 'Anushka Poddar',
    role: 'Data Analyst & Web Development',
    contribution:
      'Cleaned, structured, and analyzed multi-source environmental datasets using Pandas and NumPy to uncover water consumption trends. Contributed to the development of web APIs and integrated geospatial mapping features to visualize regional harvesting efficiency.',
    image: anushkaImg,
    badge: 'DATA & ANALYTICS',
    tags: ['Pandas / NumPy', 'Geospatial GIS', 'Web APIs'],
  },
  {
    id: '06',
    name: 'M. Santoshi',
    role: 'Research and Development & App Development',
    contribution:
      'Conducted extensive domain research on water conservation algorithms, statutory metrics, and optimization prerequisites to ground the project logically. Collaborated on the mobile interface execution, aligning features with researched UI/UX benchmarks for optimal utility.',
    image: santoshiImg,
    badge: 'R&D & UX',
    tags: ['Hydrological R&D', 'Conservation Logic', 'UI/UX'],
  },
]


import ranjitImg from '@/memberpics/Ranjit-patnaik.jpeg'
import raghavendraImg from '@/memberpics/raghavendra-kumar.png'


export interface Mentor {
  id: string
  label: string
  name: string
  role: string
  image: string
  description: string
  expertise: string
  experience: string
}

export const mentorsData: Mentor[] = [
  {
    id: 'ranjit-patnaik',
    label: 'DIRECTOR',
    name: 'Ranjit Patnaik',
    role: 'Director',
    image: ranjitImg,
    description:
      "An exceptional mentor who invests in the growth of his mentees. Ranjit Patnaik's guidance, encouragement, and leadership have supported the SSWH project team. His contribution reflects the value of experienced guidance in developing intelligent water infrastructure.",
    expertise:
      'Leadership, technical guidance, project development, and support for intelligent water infrastructure.',
    experience:
      'Director-level guidance and project oversight for the SSWH Smart Sustainable Water Harvesting initiative.',
  },
  {
    id: 'raghavendra-kumar',
    label: 'MENTOR',
    name: 'Raghavendra Kumar',
    role: 'Mentor',
    image: raghavendraImg,
    description:
      'A valued mentor whose guidance and technical oversight support the project team. His contribution helps the team work toward practical, reliable, and sustainable water management solutions through the SSWH project.',
    expertise:
      'Technical guidance, systems planning, engineering coordination, and sustainable water management.',
    experience:
      'Mentorship and technical advisory support for the SSWH project team.',
  },
]
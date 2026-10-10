
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
      "An exceptional mentor who truly invests in the growth of his mentees. Ranjit Patnaik's guidance, encouragement, and leadership have been instrumental in my development. Anyone would be fortunate to learn from him!",
    expertise:
      'Hydrological R&D, Technical Advisory, Research Mentorship',
    experience:
      'Domain Mentorship, Applied Research & System Advisory',
  },
  {
    id: 'raghavendra-kumar',
    label: 'MENTOR',
    name: 'Raghavendra Kumar',
    role: 'Mentor',
    image: raghavendraImg,
    description:
      'The efficiency and expertise brought to the table by this team are unmatched. As a designated lead, Raghavendra Kumar can confidently state that their solutions seamlessly integrated into our workflow, saving us both time and resources. Highly recommended for anyone looking for reliable, top-tier service.',
    expertise:
      'Strategic Direction, Engineering Governance, Systems Architecture',
    experience:
      'Project Direction, Executive Advisory & Technical Oversight',
  },
]


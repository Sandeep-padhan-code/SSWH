import raghavendraImg from '@/memberpics/Raghavendra-kumar.jpeg'
import ranjitImg from '@/memberpics/Ranjit-patnaik.jpeg'

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
    id: 'raghavendra-kumar',
    label: 'DIRECTOR / 01',
    name: 'Raghavendra Kumar',
    role: 'Director',
    image: raghavendraImg,
    description:
      'The efficiency and expertise brought to the table by this team are unmatched. As a designated lead, Raghavendra Kumar can confidently state that their solutions seamlessly integrated into our workflow, saving us both time and resources. Highly recommended for anyone looking for reliable, top-tier service.',
    expertise:
      '[EXPERTISE PLACEHOLDER — Strategic Direction, Engineering Governance, Systems Architecture]',
    experience:
      '[EXPERIENCE PLACEHOLDER — Project Direction, Executive Advisory & Technical Oversight]',
  },
  {
    id: 'ranjit-patnaik',
    label: 'MENTOR / 02',
    name: 'Ranjit Patnaik',
    role: 'Mentor',
    image: ranjitImg,
    description:
      "An exceptional mentor who truly invests in the growth of his mentees. Ranjit Patnaik's guidance, encouragement, and leadership have been instrumental in my development. Anyone would be fortunate to learn from him!",
    expertise:
      '[EXPERTISE PLACEHOLDER — Hydrological R&D, Technical Advisory, Research Mentorship]',
    experience:
      '[EXPERIENCE PLACEHOLDER — Domain Mentorship, Applied Research & System Advisory]',
  },
]

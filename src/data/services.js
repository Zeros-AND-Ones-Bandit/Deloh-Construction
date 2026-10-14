import { FaHardHat, FaThLarge, FaTint, FaLayerGroup, FaPaintRoller, FaDoorClosed } from 'react-icons/fa'

import buildingHero from '../images/building-hero.jpeg'
import buildingSide from '../images/building-side.jpeg'
import pavengHero from '../images/paveng-hero.jpeg'
import pavengSide from '../images/paveng-side.jpeg'
import flowHero from '../images/flowtall-hero.jpg'
import flowSide from '../images/flowtall-side.jpg'
import ceilingHero from '../images/ceiling-hero.jpg'
import ceilingSide from '../images/ceiling-side.jpg'
import paintingHero from '../images/painting-hero.jpg'
import paintingSide from '../images/painting-side.jpg'
import doorHero from '../images/door-hero.jpg'
import doorSide from '../images/door-side.jpg'

const services = [
  {
    slug: 'building',
    name: 'Building',
    icon: FaHardHat,
    tagline: 'Strong foundations. Lasting structures.',
    heading: 'Our Building Services',
    intro:
      'We handle residential and commercial building projects from start to finish. Our team ensures quality workmanship, modern designs and durable results.',
    items: ['New builds', 'Extensions', 'Renovations', 'Project management'],
    hero: buildingHero,
    side: buildingSide,
    quoteTitle: 'Your vision, our expertise.',
    quoteText: "Let's build something great together.",
  },
  {
    slug: 'paveng',
    name: 'Paveng',
    icon: FaThLarge,
    tagline: 'Beautiful. Durable. Functional.',
    heading: 'Our Paveng Services',
    intro:
      'We install high-quality paving for driveways, walkways, patios and outdoor areas. Our paveng solutions add value, beauty and durability to your property.',
    items: ['Driveways', 'Walkways', 'Patios', 'Commercial paving'],
    hero: pavengHero,
    side: pavengSide,
    quoteTitle: 'Great spaces start from the ground up.',
    quoteText: 'Quality paveng for a lasting impression.',
  },
  {
    slug: 'flow-tall',
    name: 'Flow Tall',
    icon: FaTint,
    tagline: 'Efficient drainage. Proper flow.',
    heading: 'Our Flow Tall Services',
    intro:
      'We install and maintain drainage systems to ensure proper water flow and prevent blockages. Our solutions keep your property safe and functional.',
    items: ['Drainage installation', 'Sewer connections', 'Stormwater systems', 'Repairs and maintenance'],
    hero: flowHero,
    side: flowSide,
    quoteTitle: 'Keep the flow going.',
    quoteText: 'Reliable drainage for a cleaner, safer environment.',
  },
  {
    slug: 'ceiling',
    name: 'Ceiling',
    icon: FaLayerGroup,
    tagline: 'Stylish. Modern. Long-lasting.',
    heading: 'Our Ceiling Services',
    intro:
      'We install a variety of ceiling solutions to improve the look, comfort and functionality of your space.',
    items: ['Gypsum ceilings', 'PVC ceilings', 'Suspended ceilings', 'Repairs and replacements'],
    hero: ceilingHero,
    side: ceilingSide,
    quoteTitle: 'A better ceiling. A better space.',
    quoteText: 'Modern ceiling solutions for every room.',
  },
  {
    slug: 'painting',
    name: 'Painting',
    icon: FaPaintRoller,
    tagline: 'Fresh looks. Lasting protection.',
    heading: 'Our Painting Services',
    intro:
      'We provide professional painting services for both interior and exterior surfaces. Our team delivers neat, clean and long-lasting finishes.',
    items: ['Interior painting', 'Exterior painting', 'Wall preparation', 'Repairs and touch-ups'],
    hero: paintingHero,
    side: paintingSide,
    quoteTitle: 'Add colour to your world.',
    quoteText: 'Professional painting for a fresh new look.',
  },
  {
    slug: 'door-installation',
    name: 'Door Installation',
    icon: FaDoorClosed,
    tagline: 'Secure. Stylish. Built to last.',
    heading: 'Our Door Installation Services',
    intro:
      'We install high-quality doors for homes and businesses. Our team ensures proper fitting, strong security and a professional finish.',
    items: ['Wooden doors', 'Aluminium doors', 'Sliding doors', 'Garage doors', 'Door repairs and replacements'],
    hero: doorHero,
    side: doorSide,
    quoteTitle: 'The right door makes a big difference.',
    quoteText: 'Security, style and quality, all in one.',
    wide: true,
  },
]

export default services
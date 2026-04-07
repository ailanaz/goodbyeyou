import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import { hubDirectory } from './siteContent';

const platformCards = [
  {
    title: 'Search the state you need',
    description:
      'Open the state page that brings together alternative options, timing, providers, documents, and next steps.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="12" r="8" />
        <circle cx="12" cy="36" r="8" />
        <circle cx="36" cy="36" r="8" />
        <path d="M20 18l-4 12" />
        <path d="M28 18l4 12" />
      </svg>
    ),
  },
  {
    title: 'Use real resources',
    description:
      'Go to Resources for what to do first, who may need to be contacted, documents, official steps, and supporting pathways.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 10h32v28H8z" />
        <path d="M16 18h16" />
        <path d="M16 24h12" />
        <path d="M16 30h8" />
      </svg>
    ),
  },
  {
    title: 'Keep the process moving',
    description:
      'Work through providers, official steps, timing, and open questions without losing the service path you are considering.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="7" y="8" width="34" height="32" rx="3" />
        <path d="M15 18h18" />
        <path d="M15 24h12" />
        <path d="M15 30h10" />
        <circle cx="32" cy="29" r="5" />
      </svg>
    ),
  },
  {
    title: 'Choose the path that fits',
    description:
      'Use GoodbyeYou for future planning or recent loss, depending on whether you are planning your own arrangements or making them after a death.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 40v-4a6 6 0 00-6-6H8a6 6 0 00-6 6v4" />
        <circle cx="12" cy="18" r="6" />
        <path d="M46 40v-4a6 6 0 00-6-6h-8a6 6 0 00-6 6v4" />
        <circle cx="36" cy="18" r="6" />
      </svg>
    ),
  },
];

const planningModes = [
  {
    id: 'future-planning',
    label: 'Planning Ahead',
    title: 'Making future arrangements',
    description:
      'Open the state that will shape your plans, then work through the options, logistics, provider paths, and questions that apply there.',
    points: [
      'See which alternative options are available there',
      'Work through timing, providers, and official steps',
      'Use Resources when process questions come up',
    ],
    searchPlaceholder: 'Enter the state you want to plan in',
    helperLead: 'Want a broader service overview first?',
    helperLink: { path: '/options', label: 'Explore alternative options' },
  },
  {
    id: 'current-planning',
    label: 'Planning Now',
    title: 'Making arrangements for a recent loss',
    description:
      'Open the state where the service will be held so you can move into the local options, providers, documents, and next steps tied to a recent loss.',
    points: [
      'Use Resources for what to do first',
      'Open state-specific planning and provider paths',
      'Follow the paperwork, timing, and next steps that apply there',
    ],
    searchPlaceholder: 'Enter the state where the service will be held',
    helperLead: 'Not sure where to start right now?',
    helperLink: { path: '/resources', label: 'Open Resources' },
  },
];

const optionPreviewCards = [
  {
    number: '01',
    title: 'Home Funeral',
    description: 'Family-directed care at home with preparation, visitation, and vigil before final disposition.',
  },
  {
    number: '02',
    title: 'Green Burial',
    description: 'Burial without embalming, using biodegradable containers in natural settings.',
  },
  {
    number: '03',
    title: 'Conservation Burial',
    description: 'Green burial within protected conservation areas that fund land preservation.',
  },
  {
    number: '04',
    title: 'Aquamation',
    description: 'Water-based cremation using alkaline hydrolysis instead of flame.',
  },
  {
    number: '05',
    title: 'Natural Organic Reduction',
    description: 'Natural processes transform the body into nutrient-rich soil over several weeks.',
  },
  {
    number: '06',
    title: 'Whole-Body Donation',
    description: 'Donating the body to medical science for education, research, or surgical training.',
  },
  {
    number: '07',
    title: 'Burial at Sea',
    description:
      'Full-body burial or ash scattering in open water, following EPA and Coast Guard requirements.',
  },
  {
    number: '08',
    title: 'Ash Scattering',
    description:
      'Scattering ashes at sea, on private land, or in a place that mattered to the person.',
  },
  {
    number: '09',
    title: 'Tree and Nature-Based Memorials',
    description:
      'Biodegradable urns, tree planting, and living memorial options connected to cremated remains.',
  },
  {
    number: '10',
    title: 'Memorial Diamonds and Gemstones',
    description:
      'Diamonds or gemstones created from ashes or hair as a lasting memorial keepsake.',
  },
  {
    number: '11',
    title: 'Ashes in Art or Keepsakes',
    description:
      'Ashes incorporated into jewelry, glass, pottery, or other keepsake pieces.',
  },
  {
    number: '12',
    title: 'Celebration of Life',
    description:
      'A service centered more on the person, their story, and how they lived than on a traditional funeral format.',
  },
  {
    number: '13',
    title: 'Space Burials',
    description:
      'A symbolic portion of ashes sent into space through a memorial launch service.',
  },
  {
    number: '14',
    title: 'Digital Memorials',
    description:
      'Online memorial spaces that hold stories, photos, videos, messages, and tribute material.',
  },
];

const optionDetails = [
  {
    id: 'home-funeral',
    number: '01',
    title: 'Home Funeral',
    description:
      'Caring for the deceased at home with family-directed preparation, visitation, and vigil before final disposition. The family takes responsibility for the body, often with the support of a home funeral guide.',
    involves: [
      'Family-directed body care and preparation',
      'Home vigil or viewing period',
      'Dry ice or cooling for preservation',
      'Transport arrangements for final disposition',
      'Filing of death certificate and permits',
    ],
    considerations: [
      'Legal in most states with varying requirements',
      'Some states require funeral director involvement',
      'Time-sensitive preparation and preservation',
      'Home funeral guides available in many areas',
      'Can be combined with green burial or cremation',
    ],
  },
  {
    id: 'green-burial',
    number: '02',
    title: 'Green Burial',
    description:
      'Burial without embalming, using biodegradable containers in natural settings that allow the body to return to the earth. No concrete vaults, metal caskets, or chemical preservation.',
    involves: [
      'No embalming or chemical preservation',
      'Biodegradable casket, shroud, or container',
      'Natural burial ground or approved cemetery section',
      'Grave markers using natural materials if any',
      'Minimal environmental impact by design',
    ],
    considerations: [
      'Availability varies by location and state',
      'Green Burial Council certifies burial grounds',
      'Cost often lower than conventional burial',
      'Religious and cultural compatibility varies',
      'Transport and timing logistics differ from conventional',
    ],
  },
  {
    id: 'conservation-burial',
    number: '03',
    title: 'Conservation Burial',
    description:
      'Green burial within a protected conservation area, where burial fees directly fund land preservation and habitat restoration. The burial itself helps protect the land permanently.',
    involves: [
      'Green burial practices on conservation land',
      'Burial fees fund land trust and habitat restoration',
      'Permanent conservation easement on the property',
      'Natural landscape maintained, not manicured',
      'GPS-marked grave locations',
    ],
    considerations: [
      'Limited number of conservation burial grounds',
      'May require travel depending on location',
      'Higher cost than standard green burial in some cases',
      'Environmental legacy as part of the arrangement',
      'Green Burial Council conservation certification',
    ],
  },
  {
    id: 'aquamation',
    number: '04',
    title: 'Aquamation',
    description:
      'Water-based cremation using alkaline hydrolysis. A gentler process that uses water flow, temperature, and alkalinity instead of flame. The result is similar to cremation but with significantly lower environmental impact.',
    involves: [
      'Alkaline hydrolysis process using water and heat',
      'Body placed in a pressurized vessel',
      'Process takes several hours',
      'Bone fragments returned to family as with cremation',
      'Sterile liquid byproduct is safely discharged',
    ],
    considerations: [
      'Legal in approximately 28 states and growing',
      'Not available everywhere - facility access varies',
      'Lower carbon footprint than flame cremation',
      'No mercury emissions from dental fillings',
      'Cost comparable to traditional cremation',
    ],
  },
  {
    id: 'natural-organic-reduction',
    number: '05',
    title: 'Natural Organic Reduction',
    description:
      'The body is placed in a vessel where controlled natural processes transform it into nutrient-rich soil over several weeks. Sometimes called human composting or terramation.',
    involves: [
      'Body placed in a vessel with organic materials',
      'Controlled decomposition over 30-60 days',
      'Results in approximately one cubic yard of soil',
      'Soil returned to family or donated to conservation',
      'Facility-based process with professional oversight',
    ],
    considerations: [
      'Legal in a growing number of states',
      'Very limited facility availability currently',
      'Longer timeline than cremation or burial',
      'Lowest environmental impact of all disposition options',
      'May not align with some religious or cultural practices',
    ],
  },
  {
    id: 'whole-body-donation',
    number: '06',
    title: 'Whole-Body Donation',
    description:
      'Donating the body to medical science for education, research, or surgical training. Remains are typically cremated and returned to family after the program concludes.',
    involves: [
      'Pre-registration with an anatomical program',
      'Body transport to the receiving institution',
      'Used for medical education, research, or training',
      'Duration ranges from months to several years',
      'Cremated remains returned to family when complete',
    ],
    considerations: [
      'Not all bodies are accepted - health criteria apply',
      'Pre-registration strongly recommended',
      'Often no cost to family for transport or cremation',
      'Multiple programs available nationwide',
      'Backup plan needed in case of non-acceptance',
    ],
  },
  {
    id: 'burial-at-sea',
    number: '07',
    title: 'Burial at Sea',
    description:
      'Full-body burial or ash scattering in open water, following EPA and Coast Guard requirements for location, depth, and materials used.',
    involves: [
      'Full-body burial requires minimum 600 feet depth',
      'Ash scattering permitted at 3+ nautical miles',
      'EPA notification required within 30 days',
      'Biodegradable or weighted containers for full body',
      'Charter services available in coastal areas',
    ],
    considerations: [
      'Federal regulations apply regardless of state',
      'Full-body burial at sea is rare and logistically complex',
      'Ash scattering at sea is more common and accessible',
      'Military veterans may qualify for Navy burial at sea',
      'Weather and scheduling can affect timing',
    ],
  },
  {
    id: 'ash-scattering',
    number: '08',
    title: 'Ash Scattering',
    description:
      'Scattering ashes after cremation in a place that mattered to the person, such as the ocean, private land, or another meaningful location. For many families, it feels more personal than placing remains in a cemetery, and it can include alternatives such as aerial scattering or space-related memorial release services.',
    involves: [
      'Cremation completed before scattering takes place',
      'Location chosen based on personal meaning and access',
      'Scattering method chosen such as hand scattering, sea scattering, or aerial release',
      'Permissions confirmed for private land or restricted areas',
      'Family gathering, private moment, or guided ceremony',
      'Possible specialty services such as aerial ash scattering or memorial space release',
    ],
    considerations: [
      'Rules vary by location, property type, and water access',
      'EPA rules apply when scattering at sea',
      'Public parks or protected land may have restrictions',
      'Aerial ash scattering and space burials are specialty variations with added cost',
      'Families may still want a separate memorial gathering',
    ],
  },
  {
    id: 'tree-and-nature-based-memorials',
    number: '09',
    title: 'Tree and Nature-Based Memorials',
    description:
      'Tree memorials and other nature-based memorial products are often used after cremation. These can include biodegradable urns, tree-planting products, coral reef memorial structures, or other living memorials tied to the person’s memory.',
    involves: [
      'Cremated remains or biodegradable memorial materials used',
      'Tree planting, seed pod urn, biodegradable urn, coral reef memorial, or other living memorial product selected',
      'Placement on private land, approved memorial grounds, or another chosen setting',
      'Coordination of planting timing, care, or long-term stewardship',
      'Memorial activity often paired with a separate gathering or tribute',
    ],
    considerations: [
      'Usually a memorial choice after cremation, not a full funeral method by itself',
      'Product quality and long-term viability vary by company',
      'Land access, reef program rules, and environmental requirements may shape what is possible',
      'Climate, soil, and maintenance affect the long-term result',
      'Families may want to connect it with another service or ceremony',
    ],
  },
  {
    id: 'memorial-diamonds-and-gemstones',
    number: '10',
    title: 'Memorial Diamonds and Gemstones',
    description:
      'Some companies create diamonds or gemstones from carbon taken from ashes or hair. This is a memorial option rather than a full funeral service, but it is one of the more unusual choices some people explore.',
    involves: [
      'Ashes or hair provided to a specialty memorial company',
      'Diamond or gemstone type, color, cut, size, or setting selected where available',
      'Production period that can take weeks or months',
      'Finished gemstone returned as a keepsake item',
      'Often paired with cremation and a separate service or tribute',
    ],
    considerations: [
      'This is a memorial keepsake option, not a primary disposition method',
      'Pricing can be significantly higher than other keepsake choices',
      'Production timelines vary by company and stone type',
      'Families may want careful review of vendor credibility and guarantees',
      'Some people prefer it because it creates a lasting physical object tied to the person',
    ],
  },
  {
    id: 'ashes-in-art-or-keepsakes',
    number: '11',
    title: 'Ashes in Art or Keepsakes',
    description:
      'Ashes can be incorporated into jewelry, glass art, pottery, and other keepsake items. Like memorial diamonds, this is not a primary funeral method but a memorial option for people who want something tangible to keep.',
    involves: [
      'Cremated remains set aside for keepsake use',
      'Artist, jeweler, or memorial maker selected',
      'Type of item chosen such as jewelry, glass, pottery, or custom art',
      'Ash portion prepared and transferred according to vendor instructions',
      'Finished keepsake returned for private use or family distribution',
    ],
    considerations: [
      'This is a memorial choice after cremation, not a full funeral service',
      'Different vendors use different amounts of ashes and production methods',
      'Costs vary widely depending on material and customization',
      'Families may want multiple keepsakes if remains are being shared',
      'Quality and handling standards vary, so vendor review matters',
    ],
  },
  {
    id: 'celebration-of-life',
    number: '12',
    title: 'Celebration of Life',
    description:
      'A celebration of life moves away from the structure of a traditional funeral and focuses more on the person, their story, and the way they lived. It can be simple or elaborate as long as it reflects the person.',
    involves: [
      'Service format built around the person rather than funeral convention',
      'Flexible timing before or after burial, cremation, or another disposition',
      'Personal stories, music, photos, video, or tribute material used',
      'Venue chosen based on meaning, scale, or accessibility, such as a home, outdoor setting, restaurant, or event space',
      'Can be combined with alternative disposition choices already selected',
    ],
    considerations: [
      'This is a service style rather than a disposition method on its own',
      'It can be paired with cremation, green burial, home funeral, or other options',
      'Venue, guest count, and personalization can change cost significantly',
      'Some families want more structure even within a celebration format',
      'It often works well when the goal is a less formal and more personal gathering',
    ],
  },
  {
    id: 'space-burials',
    number: '13',
    title: 'Space Burials',
    description:
      'Space burial sends a symbolic portion of cremated remains into space through a memorial launch service. It is one of the most unusual memorial options and often appeals to people with a strong connection to astronomy, exploration, or the idea of a celestial tribute.',
    involves: [
      'Cremation completed before the memorial launch takes place',
      'A symbolic portion of ashes provided to a specialty launch company',
      'Type of flight chosen such as suborbital, orbital, lunar, or deep-space memorial mission',
      'Launch timing coordinated around the provider’s scheduled missions',
      'Families may gather for a launch viewing or create a separate tribute around it',
    ],
    considerations: [
      'This is a memorial option after cremation, not a complete funeral service on its own',
      'Only a small symbolic portion of ashes is usually sent',
      'Launch timing depends on aerospace schedules and can shift',
      'Costs vary significantly depending on the type of flight selected',
      'Families often pair this option with another memorial, keepsake, or ash placement choice',
    ],
  },
  {
    id: 'digital-memorials',
    number: '14',
    title: 'Digital Memorials',
    description:
      'Digital memorials are online spaces where friends and family can gather photos, videos, stories, messages, and tribute material in one place. They are not a funeral method by themselves, but they are increasingly part of how remembrance continues over time.',
    involves: [
      'Memorial website, tribute page, or private digital platform selected',
      'Photos, videos, stories, written memories, and messages uploaded',
      'Privacy settings or sharing access chosen for family and friends',
      'Page used before, during, or after a service as part of the memorial process',
      'Digital space kept available for long-term remembrance or anniversary use',
    ],
    considerations: [
      'This is a memorial support option rather than a primary disposition or funeral method',
      'Platform quality, longevity, and privacy controls vary',
      'Families may want a plan for who manages the memorial over time',
      'Digital memorials work especially well when friends and family are geographically spread out',
      'They can pair naturally with tribute material and a separate memorial gathering',
    ],
  },
];

const relatedOptionItems = [
  'Conservation burial',
  'Home burial on private land where allowed',
  'Whole-body donation',
  'Direct cremation',
  'Immediate burial',
  'Home vigils',
  'Family-led body care',
  'Witness cremation',
  'Memorial services without the body present',
  'Nonreligious or celebrant-led services',
  'Reef memorials',
  'Keepsake urns',
  'Ash jewelry',
  'Tree memorial products',
  'Video tribute services',
  'Personal memorial websites',
];

const resourceCategories = [
  {
    title: 'What to do first',
    description:
      'Start with the first things that often need to happen after a death, before funeral choices are fully in motion.',
    items: [
      'Confirm what has happened in the setting you are in',
      'Identify who is acting as the main decision-maker',
      'Pause before jumping too far into service choices',
      'Start gathering the information already known',
    ],
  },
  {
    title: 'Who may need to be contacted',
    description:
      'The first stretch after a death often involves family, care settings, providers, and official contacts depending on the circumstances.',
    items: [
      'Immediate family or the main planner',
      'Hospital, hospice, care facility, or relevant staff',
      'Existing providers or guides already involved',
      'Other contacts that may matter early',
    ],
  },
  {
    title: 'Documents and official steps',
    description:
      'Early forms, authorizations, and official records can shape what happens next, especially in alternative funeral planning.',
    items: [
      'Death-related records and forms',
      'Disposition or authority documents',
      'Transport or permit-related paperwork',
      'Where originals or instructions may be stored',
    ],
    link: { path: '/legal-resources', label: 'View Legal Resources ->' },
  },
  {
    title: 'State-specific planning resources',
    description:
      'Alternative funeral services still depend on state-specific logistics, provider availability, and real-world limits before the final choice is made.',
    items: [
      'What alternative options may be available in your state',
      'Questions to ask before committing to a path',
      'What logistics may shape the decision',
      'What resources or providers may be needed next',
    ],
    link: { path: '/planning-hubs', label: 'Open Planning ->' },
  },
  {
    title: 'Provider and service resources',
    description:
      'Once the path becomes clearer, providers and supporting services help move the plan from idea to execution.',
    items: [
      'Alternative service providers by type',
      'Specialized operators and guides',
      'Provider coordination tied to the chosen path',
      'Support for logistics and follow-through',
    ],
    link: { path: '/providers', label: 'Find Providers ->' },
  },
  {
    title: 'Planning records and originals',
    description:
      'Private files do not need to live on the site to stay useful. What matters is knowing what exists, where originals are kept, and who needs to access them.',
    items: [
      'Where wet-ink originals are kept',
      'Who has copies, keys, or access',
      'Plain lists of providers, contacts, and account locations',
      'Outside storage you control for private files',
    ],
    link: { path: '/legal-resources', label: 'View Legal Resources ->' },
  },
];

const planningHubFeatures = [
  {
    title: 'Alternative options in that state',
    description:
      'See which alternative service types may be available there, including home funeral, green burial, aquamation, natural organic reduction, and more.',
  },
  {
    title: 'What the state requires',
    description:
      'Work through permits, timelines, authority questions, funeral director involvement, and other state-specific requirements.',
  },
  {
    title: 'Logistics and next steps',
    description:
      'See what usually needs to happen, in what order, and with which documents or transport needs in mind.',
  },
  {
    title: 'Provider and resource pathways',
    description:
      'Find the provider types, facilities, organizations, and support routes tied to the arrangement you are considering.',
  },
  {
    title: 'Official forms and offices',
    description:
      'Find the forms, offices, and official resources that may need to be part of the process.',
  },
  {
    title: 'When legal or authority questions matter',
    description:
      'Know when documentation, authority, or legal support may need attention and where to start looking.',
  },
];

const providerCategories = [
  {
    title: 'Green Burial Grounds',
    description:
      'Natural burial sites that allow biodegradable containers, no embalming, and minimal environmental impact. Certified and non-certified locations.',
    tags: ['Green Burial', 'Conservation Burial'],
  },
  {
    title: 'Aquamation Facilities',
    description:
      'Facilities offering alkaline hydrolysis as an alternative to flame cremation. Availability varies by state legality and facility location.',
    tags: ['Aquamation'],
  },
  {
    title: 'Home Funeral Guides',
    description:
      'Trained professionals who support families through home funeral care - body preparation, legal paperwork, and vigil coordination.',
    tags: ['Home Funeral'],
  },
  {
    title: 'Natural Organic Reduction Facilities',
    description:
      'Facilities offering human composting or terramation services. Currently available in a limited but growing number of states.',
    tags: ['Natural Organic Reduction'],
  },
  {
    title: 'Whole-Body Donation Programs',
    description:
      'Medical schools, research institutions, and anatomical programs that accept whole-body donations for science and education.',
    tags: ['Whole-Body Donation'],
  },
  {
    title: 'Burial at Sea Services',
    description:
      'Charter services and organizations that handle full-body burial at sea or ash scattering in line with EPA and Coast Guard requirements.',
    tags: ['Burial at Sea'],
  },
  {
    title: 'Alternative-Friendly Funeral Homes',
    description:
      'Licensed funeral homes that support alternative arrangements - green burial, home funeral support, non-traditional services, and hybrid approaches.',
    tags: ['Multiple Options'],
  },
  {
    title: 'Transport and Logistics',
    description:
      'Services for body transport, including interstate transfer, airport coordination, and direct-to-facility delivery for alternative arrangements.',
    tags: ['Logistics'],
  },
];

const legalFeatures = [
  {
    title: 'Official Forms',
    description:
      'Locate state-specific forms for death certificates, disposition permits, transport authorization, and other official documentation required for your arrangements.',
  },
  {
    title: 'Disposition Authority',
    description:
      'Understand who has legal authority to make disposition decisions in your state, how that authority is established, and what documentation may be needed.',
  },
  {
    title: 'Document Access',
    description:
      'How to get to important documents - advance directives, wills, insurance policies, and other materials that may be held by attorneys, institutions, or individuals.',
  },
  {
    title: 'State-Specific Requirements',
    description:
      'Legal requirements vary by state - funeral director involvement, waiting periods, transport rules, and disposition-specific regulations. Know what applies where you are.',
  },
  {
    title: 'Attorney and Notary Resources',
    description:
      'When professional legal support is needed, find attorneys, notaries, and legal-adjacent professionals with relevant experience in your state.',
  },
  {
    title: 'Authority Clarification',
    description:
      "When it's unclear who has authority or what documentation is needed, GoodbyeYou helps identify the right questions and the right resources to answer them.",
  },
];

const legalWhen = [
  {
    title: 'Disposition decisions',
    description:
      'Who has authority to decide what happens to the body, especially when no advance directive exists or family members disagree.',
  },
  {
    title: 'Interstate transport',
    description:
      'Moving remains across state lines involves different regulations, permits, and documentation requirements in each state.',
  },
  {
    title: 'Home funeral legality',
    description:
      "Some states require funeral director involvement for certain steps. Knowing your state's specific requirements before proceeding.",
  },
  {
    title: 'Advance directives',
    description:
      'Creating or locating advance directives, ensuring they meet state requirements, and understanding their legal standing.',
  },
  {
    title: 'Document access',
    description:
      'Accessing documents held by attorneys, safe deposit boxes, or institutions when the original holder has died.',
  },
  {
    title: 'Contested decisions',
    description:
      'When family members disagree on arrangements, understanding legal priority and what options exist for resolution.',
  },
];

const sitemapItems = [
  { path: '/planning-hubs', title: 'Planning', description: 'Open a state page for alternative options, logistics, and next steps' },
  { path: '/resources', title: 'Resources', description: 'What to know and do when a death occurs' },
  { path: '/options', title: 'Alternative Options', description: 'Browse non-traditional service paths and how they work' },
];

const navItems = [
  { path: '/planning-hubs', label: 'Planning' },
  { path: '/options', label: 'The Guide' },
];

const utilityNavItems = [
  { path: '/planning-hubs#future-planning', label: 'Planning Ahead' },
  { path: '/planning-hubs#current-planning', label: 'Planning Now' },
];

const desktopNavLeft = [
  { path: '/planning-hubs', label: 'Planning' },
];

const desktopNavRight = [
  { path: '/options', label: 'The Guide' },
];

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function PlaceholderAnchor({ children }) {
  return (
    <a
      href="/"
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      {children}
    </a>
  );
}

function PageHero({ eyebrow, title, subtitle, warm = false }) {
  return (
    <section className={`page-hero${warm ? ' page-hero-warm' : ''}`}>
      <div className="container">
        <p className="page-hero-eyebrow">{eyebrow}</p>
        <h1 className="page-hero-title">{title}</h1>
        <p className="page-hero-sub">{subtitle}</p>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, subtitle }) {
  return (
    <div className="section-intro">
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title">{title}</h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </div>
  );
}

function TopicHero({ eyebrow, title, subtitle }) {
  return (
    <section className="topic-hero">
      <div className="container">
        <p className="topic-hero-eyebrow">{eyebrow}</p>
        <h1 className="topic-hero-title">{title}</h1>
        <p className="topic-hero-sub">{subtitle}</p>
      </div>
    </section>
  );
}

function ResourceArtwork({ story }) {
  const commonTags = story.items.slice(0, 3);

  const illustrations = {
    state: (
      <svg viewBox="0 0 240 180" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="30" y="28" width="180" height="124" rx="10" />
        <path d="M60 56h120" />
        <path d="M60 82h78" />
        <path d="M60 108h98" />
        <rect x="150" y="74" width="32" height="44" rx="6" />
        <circle cx="166" cy="96" r="7" />
      </svg>
    ),
    forms: (
      <svg viewBox="0 0 240 180" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="54" y="26" width="98" height="128" rx="8" />
        <path d="M74 58h58" />
        <path d="M74 78h58" />
        <path d="M74 98h40" />
        <rect x="118" y="52" width="68" height="92" rx="8" />
        <path d="M136 82h30" />
        <path d="M136 102h30" />
        <path d="M136 122h18" />
      </svg>
    ),
    organizations: (
      <svg viewBox="0 0 240 180" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="120" cy="90" r="16" />
        <circle cx="66" cy="56" r="12" />
        <circle cx="174" cy="56" r="12" />
        <circle cx="66" cy="126" r="12" />
        <circle cx="174" cy="126" r="12" />
        <path d="M79 63l27 17" />
        <path d="M161 63l-27 17" />
        <path d="M79 119l27-17" />
        <path d="M161 119l-27-17" />
      </svg>
    ),
    education: (
      <svg viewBox="0 0 240 180" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M42 48c0-8.837 7.163-16 16-16h54c18 0 28 8 36 18 8-10 18-18 36-18h14v116h-14c-18 0-28 8-36 18-8-10-18-18-36-18H58c-8.837 0-16-7.163-16-16V48z" />
        <path d="M120 50v98" />
        <path d="M70 68h28" />
        <path d="M142 68h28" />
        <path d="M70 88h36" />
        <path d="M142 88h36" />
      </svg>
    ),
    providers: (
      <svg viewBox="0 0 240 180" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="34" y="38" width="172" height="104" rx="10" />
        <path d="M66 66h108" />
        <path d="M66 90h72" />
        <path d="M66 114h94" />
        <circle cx="182" cy="78" r="10" />
        <path d="M182 96v18" />
      </svg>
    ),
    legal: (
      <svg viewBox="0 0 240 180" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M120 36v108" />
        <path d="M84 52h72" />
        <path d="M92 68l-22 32h44L92 68z" />
        <path d="M148 68l-22 32h44l-22-32z" />
        <path d="M90 134h60" />
      </svg>
    ),
  };

  return (
    <div className={`editorial-art editorial-art-${story.variant}`}>
      <div className="editorial-art-frame">
        <span className="editorial-art-label">{story.eyebrow}</span>
        <strong className="editorial-art-title">{story.title}</strong>
        <div className="editorial-art-graphic">{illustrations[story.variant]}</div>
        <div className="editorial-art-tags">
          {commonTags.map((item) => (
            <span className="editorial-art-tag" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function EditorialSections({ sections }) {
  return (
    <section className="section section-editorial">
      <div className="container">
        <div className="editorial-stack">
          {sections.map((story, index) => (
            <article className={`editorial-section${index % 2 === 1 ? ' reverse' : ''}`} key={story.title}>
              <div className="editorial-copy">
                <p className="editorial-kicker">{story.eyebrow}</p>
                <h2 className="editorial-title">{story.title}</h2>
                <p className="editorial-body">{story.description}</p>
                <ul className="editorial-points">
                  {story.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {story.link ? (
                  <Link to={story.link.path} className="editorial-link">
                    {story.link.label}
                  </Link>
                ) : null}
              </div>
              <div className="editorial-media">
                <ResourceArtwork story={story} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ title, description, primary, secondary, note }) {
  return (
    <section className="section section-cta">
      <div className="container">
        <div className="cta-box">
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="cta-actions">
            <Link to={primary.path} className="btn btn-primary btn-lg">
              {primary.label}
            </Link>
            <Link to={secondary.path} className="btn btn-outline btn-lg">
              {secondary.label}
            </Link>
          </div>
          {note ? <p className="cta-note">{note}</p> : null}
        </div>
      </div>
    </section>
  );
}

function PlanningPathCard({ mode }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const matchedHub = query.trim().length > 0
    ? hubDirectory.find((hub) =>
        hub.searchTerms.some((term) =>
          term.toLowerCase() === query.trim().toLowerCase()
        ) || hub.region.toLowerCase() === query.trim().toLowerCase()
      )
    : null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (matchedHub) {
      navigate(`/planning-hubs/${matchedHub.id}`);
    }
  };

  return (
    <div className="path-card anchor-card" id={mode.id}>
      <div className="path-label">{mode.label}</div>
      <h3>{mode.title}</h3>
      <p>{mode.description}</p>
      <ul className="path-list">
        {mode.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <div className="path-state-block">
        <p className="path-state-label">Search your state</p>
        <form className="path-state-search" onSubmit={handleSearch}>
          <input
            type="text"
            className="state-search-input"
            placeholder={mode.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" disabled={!matchedHub}>
            Open State Planning
          </button>
        </form>
        {query.trim().length > 0 && !matchedHub && (
          <p className="state-search-no-match">No matching state found. Check spelling or try the full state name.</p>
        )}
        <div className="path-search-actions">
          <p className="path-helper">
            {mode.helperLead} <Link to={mode.helperLink.path}>{mode.helperLink.label}</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setNavOpen(false);
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      window.requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView();
        } else {
          window.scrollTo(0, 0);
        }
      });
      return;
    }

    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="nav-utility">
        <div className="nav-utility-inner">
          {utilityNavItems.map((item, index) => (
            <React.Fragment key={item.path}>
              {index > 0 ? <span className="nav-utility-divider">|</span> : null}
              <Link to={item.path} className="nav-utility-link">
                {item.label}
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="nav-main">
        <div className="nav-inner">
          <ul className="nav-links nav-links-left">
            {desktopNavLeft.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/" className="nav-logo">
            <span className="nav-logo-wordmark">Goodbye You</span>
            <span className="nav-logo-tagline">Goodbye to you. Goodbye from you. Goodbye for you.</span>
          </Link>
          <ul className="nav-links nav-links-right">
            {desktopNavRight.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Toggle navigation"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <ul className={`nav-mobile-links${navOpen ? ' open' : ''}`} id="navLinks">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="/planning-hubs" className="nav-mobile-cta">
              Open Plan
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              Goodbye<span>You</span>
            </Link>
            <p>
              Alternative funeral planning resources with state-specific information, real help,
              and next steps.
            </p>
          </div>
          <div className="footer-col">
            <h4>Start Here</h4>
            <ul>
              <li>
                <Link to="/planning-hubs#future-planning">Planning Ahead</Link>
              </li>
              <li>
                <Link to="/planning-hubs#current-planning">Planning Now</Link>
              </li>
              <li>
                <Link to="/planning-hubs">Open a State Page</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Main Pages</h4>
            <ul>
              <li>
                <Link to="/planning-hubs">Planning</Link>
              </li>
              <li>
                <Link to="/options">The Guide</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>GoodbyeYou</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/legal-resources">Legal Resources</Link>
              </li>
              <li>
                <Link to="/providers">Providers</Link>
              </li>
              <li>
                <PlaceholderAnchor>Privacy</PlaceholderAnchor>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 GoodbyeYou. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function HomeAboutSection() {
  const sections = [
    {
      eyebrow: 'Planning ahead',
      variant: 'education',
      title: 'Plan before the arrangements are needed.',
      description:
        'Use Plan to open the state that matters to you and work through alternative service options, logistics, provider paths, and official steps before they need to be used.',
      items: [
        'Alternative options tied to the state',
        'Questions, timing, and next steps',
        'Provider and document pathways',
      ],
      link: { path: '/planning-hubs#future-planning', label: 'Open Planning Ahead ->' },
    },
    {
      eyebrow: 'Planning now',
      variant: 'state',
      title: 'Work through a recent loss with clearer direction.',
      description:
        'Use GoodbyeYou after a death to move from what happened first into the state page, the option path, and the steps shaping the arrangement.',
      items: [
        'What to do first',
        'State-specific options and logistics',
        'Provider and document pathways',
      ],
      link: { path: '/planning-hubs#current-planning', label: 'Open Planning Now ->' },
    },
    {
      eyebrow: 'Support',
      variant: 'providers',
      title: 'Keep the process moving when questions come up.',
      description:
        'Resources, legal references, and provider paths help when paperwork, timing, authority, or coordination start shaping what can happen next.',
      items: [
        'What to do when a death occurs',
        'Legal and official resources',
        'Provider paths when needed',
      ],
      link: { path: '/resources', label: 'Open Resources ->' },
    },
  ];

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="about-statement">
            <h2 className="section-title">What GoodbyeYou helps with.</h2>
            <p className="about-lead">
              Alternative funeral planning often means moving between service choices, state rules,
              logistics, providers, documents, and next steps. GoodbyeYou keeps those pieces close
              enough together that decisions can keep moving.
            </p>
          </div>
        </div>
      </section>

      <EditorialSections sections={sections} />

      <section className="section section-map">
        <div className="container">
          <SectionIntro
            eyebrow="Explore"
            title="Where to go next."
            subtitle="Move into the page that matches what you need most right now."
          />
          <div className="sitemap-grid">
            {sitemapItems.map((item) => (
              <Link to={item.path} className="sitemap-item" key={item.path}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function HomePage() {
  useDocumentTitle('GoodbyeYou - Alternative Funeral Planning');

  const homePathwayCards = [
    {
      label: 'Planning Ahead',
      title: 'Make your own plans before they are needed.',
      description:
        'Start with Plan when you want to open the state that shapes your options, timing, and next steps.',
      path: '/planning-hubs#future-planning',
      linkLabel: 'Open Planning Ahead',
      art: '/home-card-future.svg',
    },
    {
      label: 'Planning Now',
      title: 'Make arrangements after a death with clearer next steps.',
      description:
        'Use Plan for the state where the service will be held and connect the work to resources, documents, and next steps.',
      path: '/planning-hubs#current-planning',
      linkLabel: 'Open Planning Now',
      art: '/home-card-current.svg',
    },
    {
      label: 'Resources',
      title: 'Know what to do when a death occurs.',
      description:
        'Work through what to do first, who may need to be contacted, and what official steps may shape the next move.',
      path: '/resources',
      linkLabel: 'Open Resources',
      art: '/home-card-resources.svg',
    },
    {
      label: 'Alternative Options',
      title: 'Compare non-traditional service paths.',
      description:
        'Look at the service types people most often compare before moving into state-specific planning.',
      path: '/options',
      linkLabel: 'Open Alternative Options',
      art: '/home-card-vault.svg',
    },
  ];

  const homeOptionCards = optionPreviewCards.slice(0, 4);

  const homeGuidanceItems = [
    {
      title: 'Open a state page',
      description:
        'Open the page that matches the state where the planning or arrangements are taking place.',
      icon: platformCards[0].icon,
    },
    {
      title: 'Work through the option and logistics together',
      description:
        'Keep the service type, provider path, timing, and official steps connected in the same place.',
      icon: platformCards[3].icon,
    },
    {
      title: 'Move into resources and process help when needed',
      description:
        'Use resources, legal references, and provider paths when questions around the process come up.',
      icon: platformCards[1].icon,
    },
  ];

  const homeInfoCards = [
    {
      eyebrow: 'Alternative Options',
      title: 'Start with the kind of service you are considering.',
      description:
        'Home funeral, green burial, conservation burial, aquamation, natural organic reduction, whole-body donation, and other uncommon paths belong in the planning flow from the start.',
      path: '/options',
      linkLabel: 'View Alternative Options',
    },
    {
      eyebrow: 'Legal Resources',
      title: 'Use the paperwork and authority side when it matters.',
      description:
        'Use legal and official resources when forms, authority, document access, or state requirements start shaping what can happen next.',
      path: '/legal-resources',
      linkLabel: 'Open Legal Resources',
    },
  ];

  const homeActionCards = [
    {
      title: 'Open Plan',
      description: 'Open the state you need and begin there.',
      path: '/planning-hubs',
    },
    {
      title: 'Open Options',
      description: 'Compare the service paths first.',
      path: '/options',
    },
    {
      title: 'Open Resources',
      description: 'What to do and where to start when a death occurs.',
      path: '/resources',
    },
  ];

  return (
    <>
      <section
        className="home-hero"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(24, 33, 49, 0.08) 0%, rgba(24, 33, 49, 0.26) 40%, rgba(24, 33, 49, 0.7) 100%), url('/HourGlass.jpg')",
        }}
      >
        <div className="container">
          <div className="home-hero-content">
            <h1 className="home-hero-title">Alternative Funeral Planning Resources</h1>
            <p className="home-hero-sub">
              Navigate uncommon after-death services with state-specific regulations<br />
              and clear steps for both pre-planning and immediate-need scenarios,<br />
              from the first call to final arrangements.
            </p>
            <div className="home-hero-actions">
              <Link to="/planning-hubs" className="btn btn-primary">
                Open Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-pathways" id="start">
        <div className="container">
          <div className="home-pathways-grid">
            {homePathwayCards.map((card) => (
              <Link
                to={card.path}
                className="home-pathway-card"
                key={card.title}
              >
                <div
                  className="home-pathway-media"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(56, 59, 91, 0.08) 0%, rgba(56, 59, 91, 0.9) 100%), url(${card.art})` }}
                />
                <div className="home-pathway-content">
                  <div className="home-pathway-label">{card.label}</div>
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                  <span className="home-pathway-link">{card.linkLabel}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-options-panel" id="services">
        <div className="container">
          <div className="home-frame">
            <SectionIntro
              eyebrow="Alternative Services"
              title="Alternative services people plan around."
              subtitle="Start with the service path, then go into Plan for the state-specific rules, logistics, providers, and next steps."
            />
            <div className="home-options-grid">
              {homeOptionCards.map((card) => (
                <div className="home-option-card" key={card.title}>
                  <div className="home-option-number">{card.number}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section home-plan-preview" id="support">
        <div className="container">
          <div className="home-plan-preview-shell">
            <div className="home-plan-preview-art">
              <img src="/home-plan-scene.svg" alt="" />
            </div>
            <div className="home-plan-preview-copy">
              <p className="section-eyebrow">Planning</p>
              <h2 className="section-title">Open the state page you need.</h2>
              <p className="section-subtitle">
                Planning is where state-specific alternative funeral planning lives. It keeps the
                service path, logistics, provider routes, documents, and next steps connected.
              </p>
              <div className="home-guidance-list">
                {homeGuidanceItems.map((item) => (
                  <div className="home-guidance-item" key={item.title}>
                    <div className="home-guidance-icon">{item.icon}</div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/planning-hubs" className="btn btn-primary">
                Open Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-resources-callout">
        <div className="container">
          <div className="home-resources-card">
            <p className="section-eyebrow">Resources</p>
            <h2 className="section-title">
              When a death occurs, start with the information people usually need first.
            </h2>
            <p className="section-subtitle">
              Resources helps with what to do first, who may need to be contacted, which
              documents may matter, and how the next steps connect back into planning.
            </p>
            <Link to="/resources" className="btn btn-primary">
              Open Resources
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-info">
        <div className="container">
          <div className="home-info-grid">
            {homeInfoCards.map((card) => (
              <div className="home-info-card" key={card.title}>
                <p className="section-eyebrow">{card.eyebrow}</p>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <Link to={card.path} className="btn btn-outline-dark">
                  {card.linkLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-band">
        <div className="container">
          <div className="home-band-box">
            <p className="section-eyebrow">GoodbyeYou</p>
            <h2>Alternative funeral services resource and support.</h2>
            <p>
              State-specific planning and real resources so the process is easier to carry
              out.
            </p>
          </div>
        </div>
      </section>

      <section className="section home-actions">
        <div className="container">
          <div className="home-actions-grid">
            {homeActionCards.map((card) => (
              <Link to={card.path} className="home-action-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HomeAboutSection />
    </>
  );
}

function OptionsPage() {
  useDocumentTitle('Alternative Options - GoodbyeYou');

  return (
    <>
      <PageHero
        eyebrow="Alternative Options"
        title="Beyond the traditional."
        subtitle="Use this overview to understand alternative funeral service types before moving into state-specific planning."
      />

      <section className="section">
        <div className="container">
          <div className="option-detail-list">
            {optionDetails.map((option) => (
              <div className="option-detail" id={option.id} key={option.id}>
                <div className="option-detail-header">
                  <div className="option-number">{option.number}</div>
                  <h2>{option.title}</h2>
                </div>
                <div className="option-detail-body">
                  <p>{option.description}</p>
                  <div className="option-detail-grid">
                    <div>
                      <h4>What it involves</h4>
                      <ul>
                        {option.involves.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>Key considerations</h4>
                      <ul>
                        {option.considerations.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-more">
        <div className="container">
          <div className="more-box">
            <h2 className="section-title">People also look into</h2>
            <p>
              Some of these are full service paths, and some are memorial or carry-out choices
              that come up alongside alternative funeral planning.
            </p>
            <ul className="more-list">
              {relatedOptionItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to plan?"
        description="Move from the option overview into the state you need so the service type connects to logistics, resources, and next steps."
        primary={{ path: '/planning-hubs', label: 'Open Planning' }}
        secondary={{ path: '/planning-hubs#future-planning', label: 'Planning Ahead' }}
      />
    </>
  );
}

function PlanningHubsPage() {
  useDocumentTitle('Planning - GoodbyeYou');

  return (
    <>
      <PageHero
        eyebrow="Planning"
        title="Choose a path and open your state."
        subtitle="Start with planning ahead or planning now, then open the state page you need."
      />

      <section className="section">
        <div className="container">
          <SectionIntro
            title="What you can work through here."
            subtitle="Each state page brings together alternative options, logistics, resources, providers, documents, and official steps in one place."
          />
          <div className="features-grid">
            {planningHubFeatures.map((feature) => (
              <div className="feature-card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-paths" id="planning-modes">
        <div className="container">
          <SectionIntro
            eyebrow="Choose Your Path"
            title="Future planning or recent loss."
            subtitle="Pick the path that matches your situation, then go straight into the state page you need."
          />
          <div className="paths-grid">
            {planningModes.map((mode) => (
              <PlanningPathCard mode={mode} key={mode.id} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need another place to start?"
        description="Use Resources for what to do after a death, or explore the service types before you choose a path."
        primary={{ path: '/options', label: 'Explore Options' }}
        secondary={{ path: '/resources', label: 'Open Resources' }}
      />
    </>
  );
}

function PlanningHubDetailPage() {
  const { hubId } = useParams();
  const hub = hubDirectory.find((entry) => entry.id === hubId);

  useDocumentTitle(hub ? `${hub.title} - GoodbyeYou` : 'Planning - GoodbyeYou');

  if (!hub) {
    return <Navigate to="/planning-hubs" replace />;
  }

  return (
    <>
      <PageHero eyebrow={hub.region} title={hub.title} subtitle={hub.summary} />

      <section className="section">
        <div className="container">
          <SectionIntro
            eyebrow="Inside Planning"
            title="What this state page covers."
            subtitle="Use this page to work through the local side of the arrangement, including options, next steps, providers, and documents."
          />
          <div className="features-grid">
            {hub.modules.map((module) => (
              <div className="feature-card" key={module.title}>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-features">
        <div className="container">
          <SectionIntro
            eyebrow="Focus"
            title="What to work through here."
            subtitle={hub.note}
          />
          <div className="resource-detail-grid">
            <div className="resource-detail-card">
              <h3>Focus areas</h3>
              <ul className="resource-list">
                {hub.focusAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>
            <div className="resource-detail-card">
              <h3>Keep moving</h3>
              <p>Use this state page alongside Resources, providers, and legal resources as the arrangement takes shape.</p>
              <ul className="resource-list">
                <li>Use Resources for what to do after a death</li>
                <li>Keep provider details and document locations close at hand</li>
                <li>Open provider and legal-resource pages when the state plan points there</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Keep planning from here."
        description="From here, move into Resources, providers, or legal resources as the state plan requires."
        primary={{ path: '/resources', label: 'Explore Resources' }}
        secondary={{ path: '/legal-resources', label: 'Legal Resources' }}
      />
    </>
  );
}

function ResourcesPage() {
  useDocumentTitle('Resources - GoodbyeYou');

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="What to do when a death occurs."
        subtitle="Use this page for what to do first, who may need to be contacted, documents, official steps, provider pathways, and links back into planning."
      />

      <section className="section">
        <div className="container">
          <SectionIntro
            title="What you'll find here."
            subtitle="These resources help before, during, and after funeral choices start taking shape."
          />
          <div className="resource-detail-grid">
            {resourceCategories.map((category) => (
              <div className="resource-detail-card" key={category.title}>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <ul className="resource-list">
                  {category.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {category.link ? (
                  <Link to={category.link.path} className="resource-link">
                    {category.link.label}
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Find what you need."
        description="Open the state you need for local planning, or use legal resources when forms, authority, or document access become part of the work."
        primary={{ path: '/planning-hubs', label: 'Open Planning' }}
        secondary={{ path: '/legal-resources', label: 'Legal Resources' }}
      />
    </>
  );
}

function ProvidersPage() {
  useDocumentTitle('Providers - GoodbyeYou');

  const sections = [
    {
      eyebrow: 'Burial providers',
      variant: 'providers',
      title: 'Find providers by the kind of arrangement they support.',
      description:
        'Provider search works better when it starts from service type instead of generic funeral-home categories. Different arrangements need different provider pathways.',
      items: [
        providerCategories[0].title,
        providerCategories[2].title,
        providerCategories[6].title,
      ],
      link: { path: '/options', label: 'Match Providers to Options ->' },
    },
    {
      eyebrow: 'State fit',
      variant: 'state',
      title: 'Provider availability still depends on planning.',
      description:
        'This page narrows the field, but local legality, facility access, and next steps still depend on the state you are planning in.',
      items: [
        'Search local provider pathways',
        'See which services are active where you are',
        'Connect provider choices back to logistics',
      ],
      link: { path: '/planning-hubs', label: 'Open Planning ->' },
    },
    {
      eyebrow: 'Specialized services',
      variant: 'organizations',
      title: 'Some arrangements need specialized operators and guides.',
      description:
        'Aquamation, natural organic reduction, whole-body donation, and burial at sea often require narrower provider sets and more specific route planning than conventional arrangements.',
      items: [
        providerCategories[1].title,
        providerCategories[3].title,
        providerCategories[5].title,
      ],
      link: { path: '/resources', label: 'Use Resource Paths ->' },
    },
    {
      eyebrow: 'Logistics',
      variant: 'legal',
      title: 'Transport, authority, and coordination still matter.',
      description:
        'The right provider network is not only about the ceremony or disposition itself. It also includes transport, documentation, and authority-sensitive coordination behind the scenes.',
      items: [
        providerCategories[7].title,
        'Official forms and transport needs',
        'Questions to settle before transport is booked',
      ],
      link: { path: '/legal-resources', label: 'See Legal + Official Resources ->' },
    },
  ];

  return (
    <>
      <TopicHero
        eyebrow="Providers"
        title="Find the right providers."
        subtitle="Browse the provider types that support alternative arrangements, then narrow the field by state and next step."
      />

      <EditorialSections sections={sections} />

      <section className="section section-more">
        <div className="container">
          <div className="more-box">
            <h2 className="section-title">Provider availability changes by state.</h2>
            <p>
              Availability, legality, and service mix vary by state. Use Planning to narrow
              the provider list to what is actually possible where you are.
            </p>
            <Link to="/planning-hubs" className="btn btn-outline-dark more-link-button">
              Open Planning
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Start connecting."
        description="Open your state for local providers, or compare options before you choose a path."
        primary={{ path: '/planning-hubs', label: 'Open Planning' }}
        secondary={{ path: '/options', label: 'Explore Options' }}
      />
    </>
  );
}

function LegalResourcesPage() {
  useDocumentTitle('Legal and Official Resources - GoodbyeYou');

  const sections = [
    {
      eyebrow: 'Forms',
      variant: 'forms',
      title: 'Start with the official documents that may be required.',
      description:
        'Legal resources start with identifying the forms, authorizations, and records that often control whether the next step can happen.',
      items: [
        legalFeatures[0].title,
        legalFeatures[3].title,
        legalWhen[1].title,
      ],
      link: { path: '/planning-hubs', label: 'Open Planning ->' },
    },
    {
      eyebrow: 'Authority',
      variant: 'legal',
      title: 'Clarify who can make decisions and why.',
      description:
        'Authority can shape everything from disposition to document access. It is easier to deal with early than after the process has already started moving.',
      items: [
        legalFeatures[1].title,
        legalFeatures[5].title,
        legalWhen[0].title,
      ],
      link: { path: '/resources', label: 'Browse Resource Paths ->' },
    },
    {
      eyebrow: 'Access',
      variant: 'state',
      title: 'Document access is often a state-specific problem.',
      description:
        'Whether the issue is home funeral legality, interstate transport, or locating advance directives, the right answer usually depends on the jurisdiction and the document trail involved.',
      items: [
        legalFeatures[2].title,
        legalWhen[2].title,
        legalWhen[4].title,
      ],
      link: { path: '/planning-hubs#current-planning', label: 'Go to Planning Now ->' },
    },
    {
      eyebrow: 'Professional support',
      variant: 'organizations',
      title: 'Know when to bring in outside legal or official help.',
      description:
        'Some situations need more than organization. This page helps you see when attorneys, notaries, or official agencies need to be part of the next step.',
      items: [
        legalFeatures[4].title,
        legalWhen[3].title,
        legalWhen[5].title,
      ],
      link: { path: '/providers', label: 'See Connected Provider Paths ->' },
    },
  ];

  return (
    <>
      <TopicHero
        eyebrow="Legal and Official Resources"
        title="Forms, authority, and document support."
        subtitle="Use this page when paperwork, document access, authority questions, or official requirements start shaping what can happen next."
      />

      <section className="section section-notice">
        <div className="container">
          <div className="notice-box">
            <p>
              <strong>Important:</strong> GoodbyeYou provides legal-resource support - it
              helps with access, organization, and connection to resources. It does not act as a law
              firm, provide legal advice, or replace a qualified attorney. When
              professional legal support is needed, GoodbyeYou helps you recognize that and find
              the right resources.
            </p>
          </div>
        </div>
      </section>

      <EditorialSections sections={sections} />

      <CTASection
        title="Start with your state."
        description="Open your state to see what applies where you are, then come back here for the document and authority side of the process."
        primary={{ path: '/planning-hubs', label: 'Open Planning' }}
        secondary={{ path: '/resources', label: 'All Resources' }}
      />
    </>
  );
}

function AppLayout() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plan-ahead" element={<Navigate to="/planning-hubs#future-planning" replace />} />
        <Route path="/planning-now" element={<Navigate to="/planning-hubs#current-planning" replace />} />
        <Route path="/after-death-steps" element={<Navigate to="/resources" replace />} />
        <Route path="/planning-hubs" element={<PlanningHubsPage />} />
        <Route path="/planning-hubs/:hubId" element={<PlanningHubDetailPage />} />
        <Route path="/options" element={<OptionsPage />} />
        <Route path="/options/:optionId" element={<Navigate to="/options" replace />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/providers" element={<ProvidersPage />} />
        <Route path="/vault" element={<Navigate to="/resources" replace />} />
        <Route path="/legal" element={<Navigate to="/legal-resources" replace />} />
        <Route path="/legal-resources" element={<LegalResourcesPage />} />
        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

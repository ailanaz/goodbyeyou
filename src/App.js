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
    link: { path: '/funeralplanning', label: 'Search Your State ->' },
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


const navItems = [
  { path: '/funeralplanning', label: 'When You Have Time' },
  { path: '/funeral-services', label: 'When Time Has Run Out' },
  { path: '/after-death-steps', label: 'After Death Steps' },
  { path: '/exploreoptions', label: 'Explore Your Options' },
];

const utilityNavItems = [];

const desktopNavLeft = [
  { path: '/funeralplanning', label: 'When You Have Time' },
];

const desktopNavRight = [
  { path: '/funeral-services', label: 'When Time Has Run Out' },
];

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function useMetaDescription(description) {
  useEffect(() => {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, [description]);
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

function PageHero({ eyebrow, title, subtitle, warm = false, titleClassName = '' }) {
  return (
    <section className={`page-hero${warm ? ' page-hero-warm' : ''}`}>
      <div className="container">
        <p className="page-hero-eyebrow">{eyebrow}</p>
        <h1 className={`page-hero-title ${titleClassName}`.trim()}>{title}</h1>
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
        {story.image ? (
          <>
            <span className="editorial-art-label">{story.imageLabel || story.eyebrow}</span>
            <Link to={story.imageLink ? story.imageLink.path : '#'} className="editorial-art-graphic">
              <img src={story.image} alt={story.imageLabel || story.eyebrow} className="editorial-art-image" />
            </Link>
            {story.imageLink && (
              <Link to={story.imageLink.path} className="editorial-art-img-link">
                {story.imageLink.label} &rarr;
              </Link>
            )}
          </>
        ) : (
          <>
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
          </>
        )}
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
                {story.description && <p className="editorial-body">{story.description}</p>}
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
        <div className="editorial-bottom-link">
          <Link to="/exploreoptions" className="editorial-bottom-cta">
            Explore Alternative Service Options &rarr;
          </Link>
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


const statePathData = {
  MA: { name: 'Massachusetts', d: 'm 956.31178,153.05085 -0.29118,-0.19412 0,0.29119 0.29118,-0.0971 z m -2.91189,-2.6207 0.67944,-0.29119 0,-0.38825 -0.67944,0.67944 z m 12.03583,-7.57092 -0.0971,-1.35889 -0.19412,-0.7765 0.29119,2.13539 z m -42.41659,-9.9975 -0.67944,0.29119 -5.5326,1.65007 -1.94126,0.67944 -2.23245,0.67944 -0.7765,0.29119 0,0.29119 0.29118,5.04728 0.29119,4.65903 0.29119,4.27078 0.48532,0.29119 1.74714,-0.48532 7.86211,-2.32951 0.19412,0.48531 13.97709,-5.33847 0.0971,0.19413 1.26182,-0.48532 4.4649,-1.74713 4.27078,5.14434 0,0 0.58238,-0.48531 0.29119,-1.45595 -0.0971,2.32952 0,0 0.97063,0 0.29119,1.16475 0.87357,1.65008 0,0 4.56197,-5.5326 3.78546,1.26182 0.87357,-1.94126 6.21204,-3.30015 -2.62071,-5.14435 0.67945,3.30015 -3.20309,2.42658 -3.59133,0.29119 -7.18267,-7.66799 -3.20309,-4.85315 3.20309,-3.39721 -3.30015,-0.19413 -1.35888,-3.20308 -0.0971,-0.19413 -5.53259,6.01791 -12.22996,4.07666 -3.97959,1.26182 0,0 z' },
  MN: { name: 'Minnesota', d: 'm 558.54712,73.847349 1.94126,6.891482 4.07665,24.848159 1.94126,9.90044 0.58238,8.73568 2.23246,5.24141 0.48531,4.4649 0.38825,1.45595 -0.0971,0.29119 -3.88252,6.40616 2.52364,4.27078 4.85315,34.16622 0.19413,4.4649 4.85315,-0.29119 19.12144,-1.06769 47.75505,-3.97959 4.7561,-0.48532 0,-0.48531 -1.35889,-7.47386 -5.92085,-3.00896 -4.65903,-4.85315 -7.37679,-4.46491 -2.32952,-0.19412 -3.59133,-2.71777 0.97063,-13.39471 -3.39721,-3.10602 1.16476,-5.43554 6.21204,-5.62966 -1.0677,-11.64757 2.23245,-2.52364 0,0 7.57093,-7.95918 8.63861,-11.065195 3.30015,-2.329514 5.82379,-2.814831 6.11497,-4.561967 -4.07665,0.776505 -2.42658,-1.844199 -9.31806,1.261821 -1.45594,-1.747136 -8.34743,3.397209 -6.69736,-2.814831 -1.84419,-2.232452 -5.33848,0.388253 -3.59133,-1.844199 1.16476,-1.358884 -4.56197,-1.455947 -4.07665,0 -6.50323,2.814831 -1.26182,-1.941263 -10.28869,-1.455947 -3.49427,-8.73568 -0.38826,-2.620705 -4.4649,-1.26182 0.38825,7.47386 -11.8417,0.873568 -14.65653,0.582379 -0.97063,0.09706 z' },
  MT: { name: 'Montana', d: 'm 465.65771,72.973781 -32.12789,-2.135389 -23.39221,-2.232451 -23.29515,-2.717768 -14.46241,-1.941262 -23.10102,-3.591336 -11.55051,-1.941262 -25.81879,-4.950219 -2.71777,-0.582379 -4.17371,19.800877 1.8442,3.591335 1.45595,5.532598 -0.87357,0.776505 1.8442,5.047282 2.52364,2.135389 7.18267,12.035829 0.67944,2.03832 2.91189,-0.19412 -3.39721,15.91835 -1.35888,0.38825 -1.8442,5.33847 9.60925,0.67944 0.77651,4.46491 5.43553,13.29765 0.97063,0.7765 3.78546,7.76505 0.97063,-0.7765 8.05624,-0.0971 10.19163,1.0677 2.52364,-3.30015 3.00896,5.43553 0.58238,0.29119 0.0971,-0.58237 1.35888,-9.51219 33.19559,4.07665 26.49823,2.52364 13.97709,1.16476 24.94522,1.45595 1.26182,0.0971 0.29119,0 0.0971,-1.35888 0.29119,-6.69736 0.38825,-8.83274 0.0971,-2.23246 0.19413,-3.88252 1.55301,-30.47782 1.26182,-23.683401 0.0971,-3.882525 -1.8442,-0.09706 z' },
  ND: { name: 'North Dakota', d: 'm 556.50879,73.847349 -29.31306,0.582379 -20.48032,-0.09706 -17.56842,-0.388253 -20.57738,-0.776505 -1.0677,-0.09706 -0.0971,3.882525 -1.26182,23.683405 -1.55301,30.47782 -0.19413,3.88252 3.78546,0.19413 42.80484,1.16476 39.50469,-0.29119 16.40367,-0.48532 3.30014,-0.19412 -0.38825,-1.45595 -0.48531,-4.4649 -2.23246,-5.24141 -0.58238,-8.73568 -1.94126,-9.90044 -4.07665,-24.848163 -1.94126,-6.891482 -2.03833,0 z' },
  HI: { name: 'Hawaii', d: 'm 416.34965,514.99923 -3.00896,-2.23245 -2.6207,0.67944 0.58238,5.43553 -3.59134,4.46491 3.10602,7.08561 0.87357,7.27973 3.59133,2.32951 2.23246,-3.59133 3.97958,-2.91189 4.85316,-1.26183 5.33847,-4.56196 -5.24141,-4.46491 -0.0971,-2.71776 -9.9975,-5.5326 z m -17.66549,-7.86211 -1.45595,-1.26182 -1.35888,1.8442 2.81483,-0.58238 z m -7.27973,-4.17372 0.38825,-3.59133 -1.8442,-0.29119 1.45595,3.88252 z m 6.11497,-5.92085 -1.65007,0.77651 1.16476,3.6884 2.52364,0.19412 0.7765,3.20308 2.71777,1.16476 6.01791,-2.81483 -5.62966,-4.65903 -5.92085,-1.55301 z m -12.42408,-3.97959 -0.87356,2.62071 4.17371,-0.0971 3.88252,0.97063 -2.03832,-3.20309 -5.14435,-0.29119 z m -12.22995,-7.66798 -2.23245,-2.13539 -4.27078,3.30015 2.71777,5.04728 1.94126,-2.03833 5.5326,1.16476 -0.48532,-2.32952 -3.20308,-3.00895 z' },
  ID: { name: 'Idaho', d: 'm 309.0949,52.881715 -8.63862,-1.747136 -2.81483,-0.679442 -1.26182,-0.291189 -11.25932,50.666952 0.48532,4.17371 -0.38826,4.36784 0.19413,0.97063 0,0.0971 0.0971,1.84419 3.30015,3.59134 -4.75609,11.93876 -10.09457,13.20059 -0.29119,2.42658 2.62071,6.21204 -9.221,38.24287 -0.38825,2.03832 2.71776,0.58238 27.46887,5.43553 10.96813,2.03833 2.81483,0.48532 2.71777,0.48531 13.97709,2.23245 25.04228,3.78546 2.81483,0.38826 0.38825,-3.20309 0.87357,-6.3091 3.30015,-25.23641 1.74714,-12.52114 0.38825,-3.20309 -0.58238,-0.29119 -3.00896,-5.43553 -2.52364,3.30015 -10.19163,-1.0677 -8.05624,0.0971 -0.97063,0.7765 -3.78546,-7.76505 -0.97063,-0.7765 -5.43553,-13.29765 -0.77651,-4.46491 -9.60925,-0.67944 1.8442,-5.33847 1.35888,-0.38825 3.39721,-15.91835 -2.91189,0.19412 -0.67944,-2.03832 -7.18267,-12.035829 -2.52364,-2.135389 -1.8442,-5.047282 0.87357,-0.776505 -1.45595,-5.532598 -1.8442,-3.591335 4.17371,-19.800877 -0.0971,0 z' },
  WA: { name: 'Washington', d: 'm 192.13384,77.050432 0.0971,-1.650073 -0.19412,0.09706 0.0971,1.55301 z m 20.67445,-8.832744 0.58237,-0.970631 -0.67944,-0.09706 0.0971,1.067694 z m -1.8442,-1.747136 0.58237,-1.941262 -0.58237,-0.194127 0,2.135389 z m 7.0856,-2.814831 -0.0971,-1.941262 -1.65007,2.523641 1.74713,-0.582379 z m 0.19413,-4.076651 0.29119,-1.941262 -0.19413,-0.485316 -0.0971,2.426578 z m 0.29119,-9.512185 -0.0971,-1.067695 -0.38826,-0.09706 0.48532,1.164758 z m 3.10602,-6.406166 -0.87357,-0.09706 -1.74713,2.717767 2.6207,-2.620704 z m -2.42658,-2.620705 0.48532,-0.388252 0.0971,-0.291189 -0.58238,0.679441 z m -0.48531,0.29119 -0.29119,-1.941263 -0.87357,1.650073 1.16476,0.29119 z m -0.48532,-2.717768 -0.87357,-0.388252 0.67944,0.970631 0.19413,-0.582379 z m 2.91189,1.650074 0,-1.261821 -0.29119,0.485316 0.29119,0.776505 z m 0.87357,-1.261821 -0.38825,-0.291189 -0.0971,0 0.48531,0.291189 z m -5.5326,-2.135389 -0.48531,-0.388252 -0.19413,-0.09706 0.67944,0.485315 z m 3.59134,-0.388252 -2.6207,0.679442 0.67944,0.194126 1.94126,-0.873568 z m -2.13539,-0.194126 -0.48531,-0.582379 -0.0971,0.09706 0.58238,0.485316 z m 2.03833,-1.164758 -0.38826,0 0.48532,0.194126 -0.0971,-0.194126 z m -19.02438,49.793381 3.49428,3.785461 -0.58238,7.279734 0.67944,1.8442 5.24141,2.81483 14.75359,1.35888 0.58238,1.74714 6.98855,0.0971 6.60029,0.87357 10.774,-1.16476 5.33848,0.87357 1.45594,-0.67944 27.27474,6.21204 1.8442,0.38825 -0.19413,-0.97063 0.38826,-4.36784 -0.48532,-4.17371 11.25932,-50.666952 -1.55301,-0.29119 -22.71277,-5.338471 -19.80087,-5.047282 -22.42159,-6.21204 -6.69735,-1.650073 1.55301,8.444491 -1.45595,2.717768 -2.6207,-1.358884 2.52364,11.744637 -2.71777,3.882525 -1.26182,3.591336 0,3.688398 -5.72672,3.979588 -2.42658,-1.55301 -2.32952,1.164758 4.27078,-5.532598 -1.06769,3.785462 2.42658,-2.620705 1.94126,0.388253 -0.58238,-4.853156 1.26182,0.194126 2.6207,-5.823787 -0.87356,-0.873568 -3.39721,4.36784 -2.23246,0.09706 2.42658,-2.717767 2.71777,-0.679442 -0.97063,-4.950219 -2.71777,-0.679442 -1.35888,-2.329515 -1.65008,0.873568 -8.9298,-3.882524 -7.86211,-6.114977 -2.13539,5.92085 -0.19413,2.523641 1.65007,4.464904 -1.06769,14.462405 -0.77651,2.232452 4.36784,0.388252 -4.36784,3.10602 2.32952,1.164757 -1.8442,6.21204 -0.87357,-4.853156 -1.65007,5.629661 2.23245,2.717767 2.42658,-0.194126 2.91189,1.747136 1.45595,2.814831 1.74713,0 0,0 z' },
  AZ: { name: 'Arizona', d: 'm 372.18593,309.90486 -32.71027,-4.07665 -17.56843,-2.52365 -25.04228,-3.97958 -2.52364,-0.38826 0,0.19413 -4.27078,18.83025 -2.23245,-0.0971 -3.39721,-3.00895 -4.27078,3.59133 -0.0971,15.43304 -1.55301,3.30014 0,0.29119 0,0.0971 -0.19413,2.42657 3.39721,9.12394 3.00896,4.07665 -5.43554,3.20308 -2.13539,3.97959 -3.49427,8.54155 -1.74713,0.38826 -0.0971,7.0856 3.00896,2.23246 -1.55301,4.27077 -3.49427,0.19413 0,0 -2.03833,3.78546 6.98855,4.36784 13.20058,7.3768 40.76651,21.64507 34.55447,4.27078 0.38825,0 2.71777,-28.63362 0.67944,-7.08561 7.27974,-75.12685 0.38825,-3.49427 -2.52364,-0.29119 z' },
  CA: { name: 'California', d: 'm 206.01387,363.77489 0.38825,2.13539 0,0.38825 -0.38825,-2.52364 z m -14.26828,-8.34743 0.67944,1.45595 0.38825,-0.0971 -1.06769,-1.35888 z m 16.98604,-0.29119 0.29119,2.52364 1.74714,1.26182 -2.03833,-3.78546 z m -11.74463,-13.78296 -1.0677,-0.29119 0.87357,0.38825 0.19413,-0.0971 z m -10.77401,-2.9119 -2.6207,1.55301 0.67944,0.67945 1.94126,-2.23246 z m -5.04728,-1.8442 -0.19413,0.77651 0.87357,0.19413 -0.67944,-0.97064 z m 8.54155,1.94127 4.27078,2.42658 0.77651,-0.67945 -5.04729,-1.74713 z m -33.09852,-85.51261 -0.0971,0.0971 0.0971,-0.0971 0,0 z m 10.38575,0.48531 -0.0971,-0.29119 0,0.38826 0.0971,-0.0971 z m 56.00542,-73.6709 -3.78546,-0.97064 -41.54301,-11.45344 -15.43304,-4.65903 0,0.38825 -0.87357,9.60925 -4.07665,11.35638 -6.79442,8.44449 -0.19412,4.27078 3.30014,5.92085 1.65008,7.76505 -2.32952,6.3091 0.38825,6.30911 -1.16475,2.6207 3.97958,8.63862 2.52364,3.30015 -0.19412,9.41512 6.01791,5.72672 3.49427,-5.82378 3.78547,3.00895 1.45594,-1.35888 -5.24141,0.97063 -0.0971,4.95022 1.0677,6.21204 -2.9119,-2.81483 -1.65007,-3.78546 -0.48532,5.2414 1.35889,10.38576 5.43553,6.69735 -3.59133,4.65903 0.58237,5.92085 3.88253,6.01792 6.79442,18.63612 2.13539,1.16475 -0.67945,12.9094 1.0677,1.55301 14.55947,5.24141 4.4649,4.75609 1.55301,3.10602 4.27078,2.42658 4.65903,0.87357 1.94126,5.33847 3.88252,1.8442 5.82379,6.89148 5.43554,9.02687 -0.38826,8.34743 3.00896,3.97958 39.69882,3.88253 0,0 3.49427,-0.19413 1.55301,-4.27077 -3.00896,-2.23246 0.0971,-7.0856 1.74713,-0.38826 3.49427,-8.54155 2.13539,-3.97959 5.43554,-3.20308 -3.00896,-4.07665 -3.39721,-9.12394 0.19413,-2.42657 0,-0.0971 -2.52364,-3.39721 -7.76505,-10.38575 -15.04479,-21.15976 -20.96563,-30.08957 -11.8417,-16.40366 -11.45345,-16.50074 13.20058,-56.00542 0.87357,-3.68839 z' },
  CO: { name: 'Colorado', d: 'm 489.6323,255.54951 0.38826,-19.02437 -4.65903,-0.19413 -23.6834,-0.87357 -2.32952,-0.0971 -1.94126,-0.0971 -28.82775,-1.8442 -19.2185,-1.55301 -23.97459,-2.32952 -2.32951,-0.29119 -0.29119,2.52365 -5.24141,50.56988 -1.8442,17.66549 -0.7765,7.66799 -0.19413,2.52364 3.00896,0.29119 48.91981,4.27077 21.54801,1.35889 21.45095,0.97063 3.10602,0.0971 1.94126,0.0971 4.07665,0.0971 1.94127,0.0971 6.11497,0.19413 1.55301,0 0,-1.94127 1.0677,-51.34639 0.0971,-5.72672 0,-1.8442 0.0971,-1.26182 z' },
  NV: { name: 'Nevada', d: 'm 294.82662,295.8307 10.09457,-62.79983 5.14434,-31.44846 0.58238,-3.10601 -2.81483,-0.48532 -10.96813,-2.03833 -27.46887,-5.43553 -2.71776,-0.58238 -2.71777,-0.58238 -13.6859,-3.00895 -24.55697,-5.82379 -2.71777,-0.67944 -0.87357,3.68839 -13.20058,56.00542 11.45345,16.50074 11.8417,16.40366 20.96563,30.08957 15.04479,21.15976 7.76505,10.38575 2.52364,3.39721 0,-0.29119 1.55301,-3.30014 0.0971,-15.43304 4.27078,-3.59133 3.39721,3.00895 2.23245,0.0971 4.27078,-18.83025 0,-0.19413 0.48531,-3.10602 z' },
  NM: { name: 'New Mexico', d: 'm 472.45213,324.75551 0.0971,-2.52364 0.0971,-2.52364 0.0971,-2.52364 -3.10602,-0.0971 -21.45095,-0.97063 -21.54801,-1.35889 -48.91981,-4.27077 -3.00896,-0.29119 -0.38825,3.49427 -7.27974,75.12685 -0.67944,7.08561 -2.71777,28.63362 0.38826,0.0971 13.39471,1.26183 1.26182,-6.79442 2.42658,-1.94127 27.17767,2.42658 0.19413,0 -2.42658,-4.75609 12.32701,0.87357 30.76901,1.74713 19.2185,0.87357 3.30015,-91.0452 0.67944,0.0971 0.0971,-2.62071 z' },
  OR: { name: 'Oregon', d: 'm 162.2384,162.75717 15.43304,4.65903 41.54301,11.45344 3.78546,0.97064 2.71777,0.67944 24.55697,5.82379 13.6859,3.00895 2.71777,0.58238 0.38825,-2.03832 9.221,-38.24287 -2.62071,-6.21204 0.29119,-2.42658 10.09457,-13.20059 4.75609,-11.93876 -3.30015,-3.59134 -0.0971,-1.84419 0,-0.0971 -1.8442,-0.38825 -27.27474,-6.21204 -1.45594,0.67944 -5.33848,-0.87357 -10.774,1.16476 -6.60029,-0.87357 -6.98855,-0.0971 -0.58238,-1.74714 -14.75359,-1.35888 -5.24141,-2.81483 -0.67944,-1.8442 0.58238,-7.279734 -3.49428,-3.785461 -0.29118,0.09706 -0.67945,0.485315 -4.85315,-2.523641 -2.9119,0.873568 -1.94126,-0.970631 -2.03832,8.347429 -1.35889,2.329514 -6.01791,14.656531 -1.74714,8.05624 -1.06769,0.0971 -5.62966,13.39471 -3.78546,5.72672 -1.35889,0.97063 -3.49427,6.79442 -0.67944,7.18267 -2.13539,6.40617 1.26182,5.82378 0,0.0971 z' },
  UT: { name: 'Utah', d: 'm 352.38505,204.97962 -25.04228,-3.78546 -13.97709,-2.23245 -2.71777,-0.48531 -0.58238,3.10601 -5.14434,31.44846 -10.09457,62.79983 -0.48531,3.10602 2.52364,0.38826 25.04228,3.97958 17.56843,2.52365 32.71027,4.07665 2.52364,0.29119 0.19413,-2.52364 0.7765,-7.66799 1.8442,-17.66549 5.24141,-50.56988 0.29119,-2.52365 -1.94126,-0.19412 -24.7511,-3.00896 -3.78546,-0.48531 2.42658,-18.92731 0.19412,-1.26182 -2.81483,-0.38826 z' },
  WY: { name: 'Wyoming', d: 'm 461.38694,192.16729 0.7765,-15.14184 0.97063,-20.38326 0.0971,-2.52364 -1.26182,-0.0971 -24.94522,-1.45595 -13.97709,-1.16476 -26.49823,-2.52364 -33.19559,-4.07665 -1.35888,9.51219 -0.0971,0.58237 -0.38825,3.20309 -1.74714,12.52114 -3.30015,25.23641 -0.87357,6.3091 -0.38825,3.20309 -0.19412,1.26182 -2.42658,18.92731 3.78546,0.48531 24.7511,3.00896 1.94126,0.19412 2.32951,0.29119 23.97459,2.32952 19.2185,1.55301 28.82775,1.8442 1.94126,0.0971 0.0971,-2.52364 0.48532,-10.19163 0.87357,-17.76255 0.38825,-7.57092 0.0971,-2.52364 0.0971,-2.62071 z' },
  AR: { name: 'Arkansas', d: 'm 690.4559,328.05566 -10.48282,1.55301 4.27078,-6.79442 -1.8442,-3.78546 -36.98105,3.59134 -31.25432,2.52364 -4.56197,0.29119 0.58238,2.71776 3.78546,19.60675 0.0971,4.36784 1.0677,26.40117 0.0971,4.36784 0.29119,0.0971 1.45595,1.55301 5.82378,-0.19413 0.58238,8.54155 0.19413,2.42658 3.00896,-0.29119 9.22099,-0.67944 36.5928,-3.39721 0.19412,0 -0.0971,-2.13539 0.97063,-0.67944 -1.74713,-3.30014 3.6884,-15.5301 -1.45595,-1.74714 5.5326,-6.11498 -0.38826,-5.2414 4.07665,-6.79442 0,-0.0971 -0.19412,-0.19412 3.49427,-3.20309 -0.97063,-3.88252 2.71777,-4.27078 -0.58238,-3.97959 2.91189,-5.62966 0,-0.0971 -0.0971,0 z' },
  IA: { name: 'Iowa', d: 'm 661.53109,197.69989 -5.33847,-2.81483 -2.9119,-3.97959 -0.97063,-5.72672 0.77651,-2.62071 -2.81483,-3.39721 0,0 -4.7561,0.48532 -47.75505,3.97959 -19.12144,1.06769 -4.85315,0.29119 -2.03833,0.0971 1.65008,10.77401 -1.35889,5.14435 2.13539,3.20308 0,0.67944 0.67944,0.0971 3.10602,9.12394 3.00896,4.75609 0.19413,5.43554 3.30014,4.56196 -0.58238,1.94126 3.00896,12.22996 0,0.29119 0,0 19.89794,-0.58238 21.25682,-1.8442 20.86857,-2.62071 4.7561,4.17372 0.19412,0.19412 0.87357,-0.38825 -0.67944,-3.78546 3.59133,-2.23245 1.45595,-9.90044 -1.45595,-0.67944 0.87357,-5.04728 4.36784,-0.87357 4.85316,-3.49427 2.13539,-6.11498 0.0971,-3.10602 -3.88252,-3.6884 -1.16476,-2.32951 -3.6884,-2.32952 0.19413,-0.48531 0.0971,-0.48532 z' },
  KS: { name: 'Kansas', d: 'm 608.92288,312.71969 -2.42658,-41.0577 -4.36784,-2.52364 -0.38825,-1.94127 -3.49428,-3.10602 3.39721,-4.17371 -1.35888,-2.42658 -2.52364,0.0971 -2.32952,-1.65008 -0.97063,-0.7765 -3.30014,0.19412 -35.81629,1.35889 -16.40367,0.38825 -32.61321,0 -13.10352,-0.19413 -3.6884,-0.0971 0,1.8442 -0.0971,5.72672 -1.0677,51.34639 0,1.94127 4.17372,0.0971 22.51864,0.29119 52.70528,-0.77651 37.56342,-1.74713 3.6884,-0.29119 -0.0971,-2.52364 z' },
  MO: { name: 'Missouri', d: 'm 653.66898,242.44599 -4.7561,-4.17372 -20.86857,2.62071 -21.25682,1.8442 -19.89794,0.58238 0,0 -0.0971,0.58238 2.42657,4.65903 2.23246,1.553 2.6207,4.65903 0.38825,0.38826 0.97063,0.7765 2.32952,1.65008 2.52364,-0.0971 1.35888,2.42658 -3.39721,4.17371 3.49428,3.10602 0.38825,1.94127 4.36784,2.52364 2.42658,41.0577 0.0971,2.52364 0.19413,2.52364 0.0971,2.52364 0.19413,2.6207 0.0971,2.52365 4.56197,-0.29119 31.25432,-2.52364 36.98105,-3.59134 1.8442,3.78546 -4.27078,6.79442 10.48282,-1.55301 0.0971,0 0,-0.7765 0.19413,-4.46491 1.94126,-2.42658 -0.58238,-2.71776 -0.0971,-0.0971 -0.0971,-0.0971 0.38825,-1.26182 0.58238,0.19413 0.29119,0.7765 -0.0971,0.29119 0,0.0971 0,0.77651 0.38826,0.0971 0.7765,-0.97063 0,-0.0971 0.0971,-0.29119 2.52364,-1.55301 0.38826,-0.19413 0.87357,-7.95917 -0.19413,-0.38826 -0.29119,-0.0971 -6.89148,-5.62966 1.06769,-2.03833 -1.94126,-5.53259 -3.49427,-2.71777 -6.60029,-2.9119 -4.17372,-3.3972 0.48532,-6.98855 1.26182,-6.50323 -6.98855,0.38825 -2.13539,-2.23245 -0.97063,-4.4649 -11.06519,-9.31806 -3.10602,-8.63862 0.7765,-4.27078 0,0 -0.19412,-0.19412 z' },
  NE: { name: 'Nebraska', d: 'm 572.33008,204.68843 -3.00895,-3.00895 -10.57988,-3.10602 -3.39721,-0.0971 -5.14435,1.45594 -6.11498,-3.88252 -19.12143,0.19412 -27.85712,-0.29119 -32.90439,-1.06769 -2.9119,-0.0971 -0.0971,2.52364 -0.38825,7.57092 -0.87357,17.76255 -0.48532,10.19163 -0.0971,2.52364 2.32952,0.0971 23.6834,0.87357 4.65903,0.19413 -0.38826,19.02437 -0.0971,1.26182 3.6884,0.0971 13.10352,0.19413 32.61321,0 16.40367,-0.38825 35.81629,-1.35889 3.30014,-0.19412 -0.38825,-0.38826 -2.6207,-4.65903 -2.23246,-1.553 -2.42657,-4.65903 0.0971,-0.58238 0,-0.29119 -3.00896,-12.22996 0.58238,-1.94126 -3.30014,-4.56196 -0.19413,-5.43554 -3.00896,-4.75609 -3.10602,-9.12394 -0.67944,-0.0971 -1.8442,-0.19413 z' },
  OK: { name: 'Oklahoma', d: 'm 609.50526,322.91131 -0.19413,-2.6207 -0.0971,-2.52364 -0.19413,-2.52364 -3.6884,0.29119 -37.56342,1.74713 -52.70528,0.77651 -22.51864,-0.29119 -4.17372,-0.0971 -1.55301,0 -6.11497,-0.19413 -1.94127,-0.0971 -4.07665,-0.0971 -1.94126,-0.0971 -0.0971,2.52364 -0.0971,2.52364 -0.0971,2.52364 -0.0971,2.62071 0.58238,0 23.48927,0.58238 24.84816,0.29119 0.29119,33.19558 1.74714,5.82379 3.88252,3.6884 4.17372,0.19413 0.87356,-1.74714 5.72673,5.24141 7.47386,0.7765 1.35888,1.55301 2.71777,-1.26182 6.79442,3.20309 0,1.84419 2.52364,-0.0971 2.6207,-2.23245 4.85316,3.10602 4.56197,1.65007 3.10601,-4.27077 9.90044,4.65902 3.6884,-3.00895 3.00896,-1.16476 2.42658,0.58238 9.12393,-2.6207 4.85316,2.03832 4.36784,2.81483 3.78546,0.67944 0.0971,0 -0.0971,-4.36784 -1.0677,-26.40117 -0.0971,-4.36784 -3.78546,-19.60675 -0.58238,-2.71776 -0.0971,-2.52365 z' },
  SD: { name: 'South Dakota', d: 'm 566.89455,135.57949 -16.40367,0.48532 -39.50469,0.29119 -42.80484,-1.16476 -3.78546,-0.19413 -0.0971,2.23246 -0.38825,8.83274 -0.29119,6.69736 -0.0971,1.35888 -0.29119,0 -0.0971,2.52364 -0.97063,20.38326 -0.7765,15.14184 -0.0971,2.62071 2.9119,0.0971 32.90439,1.06769 27.85712,0.29119 19.12143,-0.19412 6.11498,3.88252 5.14435,-1.45594 3.39721,0.0971 10.57988,3.10602 3.00895,3.00895 1.8442,0.19413 0,-0.67944 -2.13539,-3.20308 1.35889,-5.14435 -1.65008,-10.77401 2.03833,-0.0971 -0.19413,-4.4649 -4.85315,-34.16622 -2.52364,-4.27078 3.88252,-6.40616 0.0971,-0.29119 -3.30014,0.19412 z' },
  LA: { name: 'Louisiana', d: 'm 688.99995,469.2825 -1.26182,0.29119 -0.58238,0.58238 1.8442,-0.87357 z m 4.07665,0 -0.67944,-0.29119 -0.19412,0.29119 0.87356,0 z m 2.32952,-0.77651 -0.67944,0 -0.38826,0.48532 1.0677,-0.48532 z m -1.16476,-0.67944 -0.19413,-0.29119 -0.0971,0.29119 0.29119,0 z m 7.76505,-5.14434 -0.29119,0.19412 0.48532,0 -0.19413,-0.19412 z m 13.58884,-5.72673 0.58238,-0.7765 -0.67945,0.87357 0.0971,-0.0971 z m 1.94126,-2.52364 -0.19413,0.0971 0,0.0971 0.19413,-0.19413 z m -49.89044,8.54156 1.45594,-1.8442 -3.97959,-1.0677 -1.74713,1.45595 4.27078,1.45595 z m 40.28119,-8.44449 -0.38825,-0.38826 -0.0971,0.19413 0.48532,0.19413 z m 1.06769,-1.74714 -0.97063,-0.29119 0.29119,0.97063 0.67944,-0.67944 z m 7.95918,-1.65007 0,-0.29119 0,0.0971 0,0.19413 z m 1.94126,-1.26182 -0.0971,-0.0971 0.0971,0.19413 0,-0.0971 z m -0.7765,-0.19413 -0.19413,-0.0971 -0.0971,0.29119 0.29119,-0.19413 z m -6.79442,-0.29119 0.87357,-0.29119 0,-0.29119 -0.87357,0.58238 z m 0.48532,-0.48532 0.48531,-0.48531 -0.0971,-0.0971 -0.38825,0.58237 z m -3.39721,-3.59133 -0.19413,0.19413 0.0971,0 0.0971,-0.19413 z m -35.8163,-54.35535 -0.19412,0 -36.5928,3.39721 -9.22099,0.67944 -3.00896,0.29119 0.0971,2.32952 1.94126,18.73318 3.20309,4.4649 0.0971,2.62071 3.10602,5.43553 2.52364,7.95918 -0.87357,4.4649 -0.67944,11.0652 -1.45594,3.59133 0.19412,0 0.29119,2.52364 -1.65007,2.32952 12.03582,-1.35889 9.41513,2.62071 6.69735,0.87357 3.39721,-2.42658 -1.8442,-2.42658 6.21204,-1.94126 -0.19412,2.13539 3.20308,-0.77651 2.6207,4.07665 2.23245,-0.7765 5.82379,3.97959 -3.59133,1.26182 8.25036,2.42657 3.10602,0 1.8442,-2.23245 3.97959,-2.13539 2.81483,4.07666 1.94126,-3.6884 -0.58238,-5.82379 5.24141,2.03833 0.58238,1.74713 6.21204,0.77651 3.10602,2.52364 -0.38825,2.03832 4.36784,-4.07665 -1.65008,-2.13539 -7.27973,-1.8442 -2.71777,-1.55301 -0.0971,-2.91189 3.00896,0.38825 2.32951,-4.75609 -3.00896,-4.17371 -1.65007,3.97958 -3.78546,-0.67944 2.6207,-4.27078 -1.74713,-0.48531 -4.27078,3.00896 -6.11498,0.38825 -1.74713,-1.35889 2.81483,-4.95021 3.30014,-0.0971 5.62967,1.8442 4.07665,0.38825 0,0 -2.23245,-2.81483 -4.27078,-8.34742 1.16476,-4.65903 -33.48678,3.68839 1.26182,-1.26182 -1.35888,-3.49427 2.03832,-3.00896 1.16476,-7.57092 7.3768,-12.6182 -3.59134,-4.36784 0.19413,-3.20309 -2.23246,-5.24141 0,-0.67944 z' },
  TX: { name: 'Texas', d: 'm 573.98015,536.93549 -4.65902,-17.56842 0,3.30015 4.65902,14.26827 z m -1.06769,-30.86607 -3.30015,6.21204 -0.38825,2.03833 3.6884,-8.25037 z m 2.6207,-4.56196 3.10602,-4.07666 -2.23245,1.35889 -0.87357,2.71777 z m 10.96814,-9.90044 -7.27974,3.78546 2.03833,-0.38825 5.24141,-3.39721 z m 0.97063,-1.35889 2.03832,-1.65007 -0.7765,0.19413 -1.26182,1.45594 z m -115.11686,-162.87191 -0.67944,-0.0971 -3.30015,91.0452 -19.2185,-0.87357 -30.76901,-1.74713 -12.32701,-0.87357 2.42658,4.75609 0.0971,0.0971 10.48282,10.48281 6.01791,7.08561 7.95917,5.92085 5.62967,10.28869 2.13538,10.77401 4.56197,3.00895 3.59134,3.97959 5.14434,1.8442 7.47386,4.75609 3.39721,1.26183 4.65903,-4.65903 1.45595,-4.95022 2.42658,-4.7561 7.57092,-3.00895 2.91189,1.45594 8.44449,0.67945 7.66799,4.75609 5.24141,0.97063 -1.45595,2.71777 3.00896,1.94126 2.81483,3.39721 0.58238,3.59133 1.8442,2.42658 4.27077,10.28869 4.27078,3.59134 3.30015,5.43553 4.17371,4.27078 1.8442,0.58238 1.55301,11.06519 4.56197,2.52365 0.19412,3.49427 1.16476,-0.29119 7.95918,9.70631 3.97959,0.87357 5.04728,3.00896 7.76505,0 5.62966,3.10601 6.69735,-1.45594 -3.00895,-2.81483 -2.71777,-8.1533 -1.06769,-7.08561 -1.55301,-2.32952 0.67944,-4.75609 -2.03833,-0.19413 -2.71777,-4.4649 3.10602,3.30015 3.59134,-1.26182 1.94126,-5.14435 -3.88252,-5.24141 5.82378,0.67944 2.71777,-4.17371 -0.38825,-1.45595 2.42658,-3.20308 -0.58238,2.81483 2.71777,-2.13539 -1.0677,-3.78546 3.49427,1.8442 4.46491,-2.52364 -4.36784,-4.56197 2.71776,1.0677 5.04729,0.29119 6.60029,-1.45595 7.3768,-4.95022 4.4649,-3.6884 0.67944,-2.71777 2.71777,-2.81483 -1.45595,-4.65903 0.29119,-2.91189 4.85316,-2.13539 -0.38826,5.14435 2.9119,0 -3.20308,2.71776 12.90939,-6.79441 2.13539,-0.0971 1.35888,-6.21204 0.38826,0 1.45594,-3.59133 0.67944,-11.0652 0.87357,-4.4649 -2.52364,-7.95918 -3.10602,-5.43553 -0.0971,-2.62071 -3.20309,-4.4649 -1.94126,-18.73318 -0.0971,-2.32952 -0.19413,-2.42658 -0.58238,-8.54155 -5.82378,0.19413 -1.45595,-1.55301 -0.29119,-0.0971 -0.0971,0 -3.78546,-0.67944 -4.36784,-2.81483 -4.85316,-2.03832 -9.12393,2.6207 -2.42658,-0.58238 -3.00896,1.16476 -3.6884,3.00895 -9.90044,-4.65902 -3.10601,4.27077 -4.56197,-1.65007 -4.85316,-3.10602 -2.6207,2.23245 -2.52364,0.0971 0,-1.84419 -6.79442,-3.20309 -2.71777,1.26182 -1.35888,-1.55301 -7.47386,-0.7765 -5.72673,-5.24141 -0.87356,1.74714 -4.17372,-0.19413 -3.88252,-3.6884 -1.74714,-5.82379 -0.29119,-33.19558 -24.84816,-0.29119 -23.48927,-0.58238 -0.58238,0 z' },
  CT: { name: 'Connecticut', d: 'm 936.99622,143.34454 -13.97709,5.33847 -0.19412,-0.48531 -7.86211,2.32951 -1.74714,0.48532 0.19413,0.97063 3.68839,14.26828 1.16476,1.45595 -2.52364,3.10602 1.74714,1.65007 0,0 5.62966,-5.43554 3.00895,-4.17371 0.58238,1.16476 14.17122,-6.30911 0.29119,-0.29118 -0.0971,-2.32952 -0.58237,-2.03833 -3.00896,-8.44449 -0.38825,-1.06769 -0.0971,-0.19413 z' },
  NH: { name: 'New Hampshire', d: 'm 923.8927,75.982738 -1.26182,1.55301 -1.45594,-0.29119 -0.77651,6.406166 0,0.09706 2.32952,8.735681 -0.19413,1.747136 -4.17372,5.532598 1.0677,5.047281 0,6.30911 -0.77651,5.82378 4.36784,15.91836 0,0 0,0 3.97959,-1.26182 12.22996,-4.07666 5.53259,-6.01791 0,0 0,-1.55301 0.29119,-2.52364 -0.67944,0.29119 -0.0971,-0.58238 -6.11498,-7.47386 -0.19413,-0.67944 -14.07415,-33.001465 0,0 z' },
  RI: { name: 'Rhode Island', d: 'm 946.50841,152.08022 -0.0971,-2.03832 -0.29119,0.7765 0.38825,1.26182 z m 1.94126,-1.55301 -1.26182,-2.42657 -0.0971,2.52364 1.35888,-0.0971 z m -0.58238,-3.00895 0.67944,1.74713 0.87357,1.55301 0.58238,-1.16475 -0.87357,-1.65008 -0.29119,-1.16475 -0.97063,0 0,0.67944 z m -10.774,-3.97959 0.38825,1.06769 3.00896,8.44449 0.58237,2.03833 0.0971,2.32952 0.19412,-0.29119 4.65903,-3.6884 -0.87356,-6.60029 1.94126,-0.38826 0,0 -4.27078,-5.14434 -4.4649,1.74713 -1.26182,0.48532 z' },
  VT: { name: 'Vermont', d: 'm 923.01913,132.86173 -4.36784,-15.91836 0.77651,-5.82378 0,-6.30911 -1.0677,-5.047278 4.17372,-5.532598 0.19413,-1.747136 -2.32952,-8.735681 -1.26182,0.485316 -5.33847,1.941262 -5.24141,2.038326 -12.03583,4.36784 -0.67944,0.194126 4.36784,10.191633 1.45595,9.60924 5.14434,8.05624 4.85316,15.91835 0.19413,-0.0971 0.7765,-0.29119 2.23245,-0.67944 1.94126,-0.67944 5.5326,-1.65007 0.67944,-0.29119 0,0 z' },
  AL: { name: 'Alabama', d: 'm 718.31301,344.84758 0.38826,0.77651 1.35888,0.87356 0.58238,39.79588 0.19413,21.8392 4.95021,29.89545 0.38826,-0.0971 4.36784,0.87357 1.16475,-8.63862 1.94127,4.85316 3.30014,3.00896 6.30911,-3.6884 -0.67945,-0.58238 0.19413,0.0971 -4.36784,-9.9975 41.93127,-6.79442 2.81483,-0.48531 0,-0.0971 -2.62071,-4.95022 -0.19412,-7.0856 -2.13539,-3.88253 1.06769,-7.57092 1.74714,-1.94126 -7.18267,-12.81234 -13.00646,-39.60175 -0.0971,-0.19413 -2.9119,0.48532 -15.5301,2.52364 -7.76504,0.97063 -16.30661,2.23245 0.0971,0.19413 z' },
  FL: { name: 'Florida', d: 'm 854.6867,535.28542 -0.19413,0 0.0971,0.0971 0.0971,-0.0971 z m -0.87357,-0.0971 0,0.0971 0.0971,0 -0.0971,-0.0971 z m 0.19413,-0.0971 0,-0.0971 0,0.0971 0,0 z m -13.20059,1.45594 0,0 0,0.0971 0,-0.0971 z m -0.19412,0.0971 0,-0.0971 0,0.0971 0,0 z m 0.0971,-0.0971 0,0 0,0 0,0 z m -0.97063,0.0971 -0.0971,0 0,0.0971 0.0971,-0.0971 z m 27.56592,-6.11498 -0.0971,0 0.0971,0.19412 0,-0.19412 z m 2.62071,-0.67944 0,-0.19413 -0.19413,0.29119 0.19413,-0.0971 z m -0.97063,-0.19413 -0.38826,-0.38825 -0.0971,0.0971 0.48532,0.29119 z m -0.29119,0.77651 -1.16476,-1.45595 0.67944,1.26182 0.48532,0.19413 z m 9.22099,-5.72673 0,0.38825 0.19413,-0.19412 -0.19413,-0.19413 z m 1.35889,-0.97063 0.29119,-0.48532 -0.38826,0.38826 0.0971,0.0971 z m 0.29119,-0.97063 -0.0971,0 0,0.0971 0.0971,-0.0971 z m -1.74714,-0.29119 -0.0971,-0.0971 0.0971,0.0971 0,0 z m 0.87357,-1.45595 -0.0971,-0.0971 0,0.19413 0.0971,-0.0971 z m -2.62071,-0.0971 -0.0971,-0.0971 0.0971,0.0971 0,0 z m 3.30015,-2.23245 -0.19413,0.0971 0.29119,0.0971 -0.0971,-0.19412 z m 0.38825,0 -0.19412,-0.19413 0.0971,0.29119 0.0971,-0.0971 z m -0.67944,-0.19413 -0.0971,-0.0971 0,0.19412 0.0971,-0.0971 z m 3.59134,-0.67944 0,-0.0971 -0.19413,0.38825 0.19413,-0.29119 z m -4.07665,0.38825 -0.19413,0 0.19413,0.0971 0,-0.0971 z m 2.03832,-1.16476 -0.29119,0 -0.0971,0.0971 0.38825,-0.0971 z m 0.77651,-0.48531 0,0 -0.0971,0 0.0971,0 z m -8.15331,0.38825 0,-0.19412 -0.0971,0.19412 0.0971,0 z m 0.87357,-0.29119 -0.29119,0 0.29119,0.58238 0,-0.58238 z m -2.32951,0.0971 0,-0.58238 -0.48532,0.0971 0.48532,0.48532 z m -1.35889,-0.97064 0.48532,0.48532 0,-0.19413 -0.48532,-0.29119 z m 14.26828,0.58238 -1.74713,0.77651 0.58237,0.0971 1.16476,-0.87357 z m -13.58883,-0.87356 -0.58238,0 0,0.19412 0.58238,-0.19412 z m 15.33597,-4.85316 0.0971,-0.48532 0.0971,-1.26182 -0.19412,1.74714 z m 0.0971,-5.43554 -0.38825,-0.97063 -0.19413,0.38826 0.58238,0.58237 z m -22.42158,2.42658 -0.19413,0.29119 0.48532,0.0971 -0.29119,-0.38825 z m -1.8442,-0.87357 -0.87357,0.29119 0.67945,0.0971 0.19412,-0.38826 z m -1.94126,0.19413 0,-0.29119 -0.0971,0.0971 0.0971,0.19413 z m -2.03833,-0.0971 -0.58238,0.38825 0.77651,0.38825 -0.19413,-0.7765 z m 2.71777,0.0971 -0.0971,-0.29119 -0.48532,-0.0971 0.58238,0.38825 z m -12.71527,-9.51219 -0.58238,0.29119 1.16476,0.38826 -0.58238,-0.67945 z m -2.32951,-3.10602 -0.77651,-1.16475 0.29119,0.87357 0.48532,0.29118 z m 3.00895,1.94127 -1.35888,-3.10602 -0.97063,-0.29119 2.32951,3.39721 z m -3.88252,-3.88253 -0.29119,-0.7765 -0.19413,-0.48532 0.48532,1.26182 z m -8.05624,-10.774 -1.74714,-1.26182 0.67945,0.67944 1.06769,0.58238 z m 43.6784,-6.50323 -7.0856,-11.8417 -0.38826,0 7.47386,11.8417 z m -49.01687,-18.92731 -0.29119,-0.0971 0.29119,0.19412 0,-0.0971 z m -0.58238,-0.67944 -0.0971,0.0971 0.0971,0.0971 0,-0.19412 z m -0.67944,-0.97063 0,-0.0971 -0.0971,0.0971 0.0971,0 z m 0.38825,-0.38826 0.29119,0.19413 0,-0.19413 -0.29119,0 z m 0.58238,-0.38825 -0.38825,0.0971 0.0971,0 0.29119,-0.0971 z m -0.67944,-0.0971 -0.29119,-0.29119 0.0971,0.0971 0.19413,0.19413 z m -0.67944,-1.0677 -0.19413,0 0.29119,0.0971 -0.0971,-0.0971 z m 0.67944,-1.16475 -0.38826,0 -0.0971,0.0971 0.48532,-0.0971 z m 0.38825,0.19412 -0.48532,-0.48531 0.19413,0.0971 0.29119,0.38825 z m -3.6884,-4.17371 -0.19413,-0.0971 0,0.0971 0.19413,0 z m -4.17371,0 -0.29119,-0.38825 0.0971,0.48531 0.19413,-0.0971 z m -35.33098,-3.20309 2.91189,-2.23245 -3.20308,2.13539 0.29119,0.0971 z m 5.82379,-4.65902 0.29119,-0.29119 -1.16476,0.48531 0.87357,-0.19412 z m -36.88399,-6.50323 -10.57988,3.39721 5.82379,-1.65008 4.75609,-1.74713 z m 26.30411,-16.50073 -2.81483,0.48531 -41.93127,6.79442 4.36784,9.9975 0.29119,0.0971 -1.06769,3.97959 3.10602,-1.35888 3.3972,-3.00896 5.82379,-0.19412 6.69736,-2.42658 4.56196,0.67944 -1.06769,1.65007 8.34743,2.81483 7.18267,3.49428 1.65007,3.88252 5.33847,-1.16476 12.61821,-10.28869 4.65903,0.19413 19.02437,14.36534 3.88252,-0.77651 4.07666,5.43554 0.7765,8.63862 -1.26182,5.43553 0.58238,2.71777 3.39721,6.79442 -1.55301,-5.33847 4.36784,-0.0971 0.38825,3.88253 -2.32951,6.01791 8.05624,11.0652 3.00895,0.0971 -2.52364,-3.39721 3.10602,0.38825 1.8442,-1.16475 -0.7765,6.21204 4.17371,3.30014 2.81483,7.57093 3.78546,2.32951 4.85316,1.26182 6.69735,8.54156 3.49428,1.84419 -4.65903,0.29119 2.13538,2.42658 7.66799,-2.52364 3.78546,-2.13539 3.49427,-12.22995 -1.74713,-19.02437 -0.38825,-1.94127 -9.31806,-15.53009 -7.95918,-11.25933 -4.4649,-9.22099 3.78546,3.20308 0.7765,-0.58238 1.65008,8.05624 4.27077,6.11498 -4.17371,-8.1533 0.19413,-3.88253 -12.52115,-15.23891 -3.00895,-4.75609 -3.97959,-8.05624 -2.71777,-6.79442 -2.13539,-2.42658 -0.48531,-3.10602 -0.0971,-0.0971 -6.69735,-0.38825 -2.62071,2.03832 -1.45594,7.47386 -1.35889,-3.49427 -45.81379,5.72672 -3.30014,-5.14434 0.0971,-0.0971 z' },
  GA: { name: 'Georgia', d: 'm 845.85395,396.09691 -0.0971,-2.9119 -0.67944,2.52364 0.7765,0.38826 z m 1.0677,-4.46491 -0.38825,-2.23245 -0.29119,1.35889 0.67944,0.87356 z m -45.42554,-61.14976 -1.26182,0.29119 -3.6884,0.7765 -13.58884,2.81483 -1.26182,0.29119 -1.35888,0.19413 -7.57093,1.45595 -2.03832,0.38825 -8.25037,1.55301 -1.74713,0.19412 0.0971,0.19413 13.00646,39.60175 7.18267,12.81234 -1.74714,1.94126 -1.06769,7.57092 2.13539,3.88253 0.19412,7.0856 2.62071,4.95022 0,0.0971 -0.0971,0.0971 3.30014,5.14434 45.81379,-5.72672 1.35889,3.49427 1.45594,-7.47386 2.62071,-2.03832 6.69735,0.38825 0,0 -0.58237,-10.48282 1.26182,-2.23245 -0.67945,-4.17371 1.35889,-3.97959 2.03832,-2.23245 -1.45594,-1.35889 3.39721,-4.17371 -0.0971,0 -5.82378,-5.43554 -7.95918,-11.35638 -4.36784,-2.03833 -18.73318,-15.72422 -4.56197,-5.82379 -8.83274,-3.6884 -0.48532,-1.94126 2.71777,-5.33847 0,0 z' },
  MS: { name: 'Mississippi', d: 'm 716.76,442.78427 -0.48531,0.0971 0,0.0971 0.48531,-0.19412 z m 9.02687,-1.16476 -1.35888,0 1.26182,0.0971 0.0971,-0.0971 z m -11.25932,0.97063 -0.38825,0.38825 0.0971,0.0971 0.29119,-0.48532 z m 9.12394,-0.7765 -3.6884,0 3.49427,0.0971 0.19413,-0.0971 z m -40.47533,-92.50116 0,0.0971 -4.07665,6.79442 0.38826,5.2414 -5.5326,6.11498 1.45595,1.74714 -3.6884,15.5301 1.74713,3.30014 -0.97063,0.67944 0.0971,2.13539 0,0.67944 2.23246,5.24141 -0.19413,3.20309 3.59134,4.36784 -7.3768,12.6182 -1.16476,7.57092 -2.03832,3.00896 1.35888,3.49427 -1.26182,1.26182 33.48678,-3.68839 -1.16476,4.65903 4.27078,8.34742 2.23245,2.81483 0,-0.0971 3.59133,-4.07665 7.57093,-1.65007 6.98854,0.7765 1.06769,-1.35888 0,-0.0971 -4.95021,-29.89545 -0.19413,-21.8392 -0.58238,-39.79588 -1.35888,-0.87356 -0.38826,-0.77651 -0.19412,0 -4.85316,0.67944 -8.54155,1.16476 -19.41263,2.42658 -2.13539,0.19412 z' },
  SC: { name: 'South Carolina', d: 'm 801.49611,330.48224 0,0 -2.71777,5.33847 0.48532,1.94126 8.83274,3.6884 4.56197,5.82379 18.73318,15.72422 4.36784,2.03833 7.95918,11.35638 5.82378,5.43554 0,0 0.97063,-4.4649 -1.55301,-4.27078 4.17372,3.10602 2.32951,-1.8442 -3.97959,-3.30015 4.85316,-0.29119 7.57092,-6.40616 -0.87356,-1.65008 4.65903,-3.59133 -0.48532,-1.74714 3.39721,-2.13539 0.19413,-4.95022 5.33847,-9.90043 3.59133,-4.56197 0.38826,-0.19413 -21.64508,-13.6859 -8.05624,1.55301 -10.96813,-0.38825 -5.43554,-2.81483 -32.22495,10.19163 -0.29119,0 z' },
  IL: { name: 'Illinois', d: 'm 661.43403,198.18521 -0.19413,0.48531 3.6884,2.32952 1.16476,2.32951 3.88252,3.6884 -0.0971,3.10602 -2.13539,6.11498 -4.85316,3.49427 -4.36784,0.87357 -0.87357,5.04728 1.45595,0.67944 -1.45595,9.90044 -3.59133,2.23245 0.67944,3.78546 -0.87357,0.38825 0,0 -0.7765,4.27078 3.10602,8.63862 11.06519,9.31806 0.97063,4.4649 2.13539,2.23245 6.98855,-0.38825 -1.26182,6.50323 -0.48532,6.98855 4.17372,3.3972 6.60029,2.9119 3.49427,2.71777 1.94126,5.53259 -1.06769,2.03833 6.89148,5.62966 0.29119,0.0971 -0.58238,-0.58238 1.94126,-4.56196 7.47386,2.03832 1.8442,-2.13539 -1.45594,-4.27077 6.11497,-3.59134 -1.65007,-2.32951 1.45595,-3.30015 0,-0.29119 -0.38826,-0.0971 0.0971,-8.63862 2.13539,-1.55301 3.68839,-8.63862 -0.7765,-3.78546 -2.42658,-4.56196 1.35888,-5.14435 -6.79441,-47.85212 -0.97064,-1.06769 -2.52364,-5.72673 -2.03832,-2.13539 -0.87357,-5.62966 0,-0.19412 -13.10352,1.8442 -7.86211,0.97063 -21.15976,2.42658 0,0 z' },
  IN: { name: 'Indiana', d: 'm 750.34384,200.22353 -14.85065,2.62071 -3.39721,0.67944 -12.03583,1.94126 -2.52364,2.03833 -3.78546,1.74713 -1.45595,-0.0971 -1.74714,-0.87357 -0.58237,-0.58238 6.79441,47.85212 -1.35888,5.14435 2.42658,4.56196 0.7765,3.78546 -3.68839,8.63862 -2.13539,1.55301 -0.0971,8.63862 0.38826,0.0971 0.38825,-0.0971 1.45595,-2.71777 3.59133,0 4.36784,-1.45595 5.43554,2.03833 0.58237,-2.23245 3.10602,-2.32952 4.65903,0.67945 2.52365,-4.95022 6.89148,0.58237 -0.0971,-2.81483 6.11498,-8.05623 -0.97063,-3.6884 4.27078,-0.0971 5.2414,-4.17371 -1.26182,-4.75609 0.19413,-0.19413 -0.19413,-1.65007 -5.82378,-34.36035 -2.62071,-14.65653 -0.29119,-1.55301 -0.29119,-1.26182 z' },
  KY: { name: 'Kentucky', d: 'm 693.17367,317.18459 -0.29119,-0.7765 -0.58238,-0.19413 -0.38825,1.26182 0.0971,0.0971 1.06769,-0.0971 0.0971,-0.29119 z m 66.39117,-63.47928 -0.19413,0.19413 1.26182,4.75609 -5.2414,4.17371 -4.27078,0.0971 0.97063,3.6884 -6.11498,8.05623 0.0971,2.81483 -6.89148,-0.58237 -2.52365,4.95022 -4.65903,-0.67945 -3.10602,2.32952 -0.58237,2.23245 -5.43554,-2.03833 -4.36784,1.45595 -3.59133,0 -1.45595,2.71777 -0.38825,0.0971 0,0.29119 -1.45595,3.30015 1.65007,2.32951 -6.11497,3.59134 1.45594,4.27077 -1.8442,2.13539 -7.47386,-2.03832 -1.94126,4.56196 0.58238,0.58238 0.19413,0.38826 -0.87357,7.95917 -0.38826,0.19413 -2.52364,1.55301 -0.0971,0.29119 2.81483,-0.38826 19.60675,-2.6207 -0.97063,-3.88252 3.30015,-0.0971 39.50469,-5.24141 27.76005,-4.65903 0.38825,-0.29119 0.67944,-0.7765 7.27974,-3.88252 5.62966,-7.3768 0.7765,-2.52364 3.6884,-2.9119 4.65903,-5.92085 0.67944,-0.97063 -0.29119,-0.0971 -2.42657,0 -3.10602,-1.74714 -5.5326,-6.69735 -1.94126,-6.79442 0,-0.19413 -0.19413,-0.19412 -4.07665,-2.32952 -1.8442,-3.10602 -3.6884,3.59134 -2.32951,0.58238 -2.9119,-1.16476 -2.52364,1.94126 -5.24141,-2.32951 -1.35888,0.58237 -4.95022,-4.27077 -2.52364,-1.26182 -4.75609,0.58238 -0.77651,0.7765 z' },
  NC: { name: 'North Carolina', d: 'm 890.2118,332.22937 -1.06769,1.0677 0.19412,0.19413 0.87357,-1.26183 z m 0.7765,-5.62966 -0.48531,0.77651 0.19413,0.7765 0.29118,-1.55301 z m 5.82379,-9.02687 -1.45594,0.97063 -0.77651,1.16476 2.23245,-2.13539 z m 12.52114,-6.11497 -0.58237,-0.38826 -1.26182,-0.0971 1.84419,0.48532 z m -2.6207,-0.58238 -0.87357,0 -1.45594,0.7765 2.32951,-0.7765 z m 3.00896,1.06769 2.81483,-6.98854 -1.94126,2.91189 -0.87357,4.07665 z m 4.17371,-9.22099 1.26182,-1.8442 -0.67944,0 -0.58238,1.8442 z m 8.1533,-7.57093 -2.13539,-10.774 1.8442,5.62966 0.29119,5.14434 z m -11.8417,-24.55697 -0.19412,0.0971 -0.29119,0.0971 0,0 0.0971,0 5.33847,9.02687 4.17372,4.17371 -9.12394,-13.39471 0,0 z m -1.74713,0.58238 -0.77651,0.19413 0,0 0.19413,0.0971 1.65007,0 -0.19413,-0.58238 0,0 -0.29118,0.0971 -0.29119,0 0,0 0,0.19412 -0.19413,0.0971 -0.0971,-0.0971 0,0 z m -89.78339,22.13039 -0.48532,1.45595 0.0971,4.17371 -1.0677,-0.0971 -2.52364,5.14435 -2.81483,0.29119 -5.24141,5.14434 -2.32951,-0.87357 -3.00896,4.46491 -7.95917,7.18267 -3.88253,0.97063 -4.07665,3.78546 -0.19413,2.52364 -3.59133,1.94126 0.0971,4.27078 0,0.97063 1.26182,-0.29119 13.58884,-2.81483 3.6884,-0.7765 1.26182,-0.29119 0.29119,0 32.22495,-10.19163 5.43554,2.81483 10.96813,0.38825 8.05624,-1.55301 21.64508,13.6859 0.38825,-0.29119 9.9975,-4.07665 0.0971,-5.33847 3.59134,-6.50323 3.88252,-3.6884 8.05624,-5.33847 1.0677,-1.94126 2.13538,0.97063 0.97064,-6.40616 -1.16476,2.23245 -4.07665,1.35888 -3.88253,0.0971 4.7561,-3.49427 -1.45595,-1.55301 1.65007,-3.49427 -9.12393,-1.45595 -0.38825,-0.48531 7.76505,-1.45595 2.52364,1.26182 3.20308,-0.29119 2.6207,-1.94126 1.94127,-3.78546 1.74713,-0.48532 -0.29119,-5.33847 -2.23245,-2.13539 -2.23245,2.03833 0.48531,5.14434 -1.65007,-6.3091 -1.26182,-0.29119 -9.60925,3.97959 4.27078,-4.17372 0.19413,-1.65007 4.4649,-1.06769 1.26182,-3.30015 3.00896,1.74714 -3.20309,-4.7561 -2.23245,-1.94126 0,0 -38.82525,11.0652 -24.75109,6.3091 -25.04229,4.65903 -0.0971,-0.19413 z' },
  OH: { name: 'Ohio', d: 'm 818.19096,206.6297 -2.42657,-10.48282 -0.48532,-2.13539 -2.71777,-11.93876 -3.49427,2.23245 -7.47386,5.72672 -4.85315,5.92085 -3.78547,0.58238 -6.98854,3.97959 -3.88253,-2.32951 -11.74463,-1.35889 0,0 -6.21204,1.55301 -6.11498,1.45595 -6.40617,1.35888 -0.97063,0.29119 0.29119,1.55301 2.62071,14.65653 5.82378,34.36035 0.19413,1.65007 0.77651,-0.7765 4.75609,-0.58238 2.52364,1.26182 4.95022,4.27077 1.35888,-0.58237 5.24141,2.32951 2.52364,-1.94126 2.9119,1.16476 2.32951,-0.58238 3.6884,-3.59134 1.8442,3.10602 4.07665,2.32952 0.19413,0.19412 0,0 4.17371,-2.03832 1.45595,-3.20309 -1.16476,-3.30014 3.30014,-5.04728 2.42658,-0.38826 -0.29119,-4.27077 3.97959,-5.43554 0.67944,0.77651 3.59134,-2.71777 3.10602,-4.65903 0.48531,-21.25682 0.19413,-0.0971 -0.48532,-2.03832 z' },
  TN: { name: 'Tennessee', d: 'm 786.2572,300.48973 -27.76005,4.65903 -39.50469,5.24141 -3.30015,0.0971 0.97063,3.88252 -19.60675,2.6207 -2.81483,0.38826 0,0.0971 -0.7765,0.97063 -0.38826,-0.0971 0,-0.77651 0,-0.0971 -1.06769,0.0971 0.0971,0.0971 0.58238,2.71776 -1.94126,2.42658 -0.19413,4.46491 0,0.7765 0,0.0971 -2.91189,5.62966 0.58238,3.97959 -2.71777,4.27078 0.97063,3.88252 -3.49427,3.20309 0.19412,0.19412 2.13539,-0.19412 19.41263,-2.42658 8.54155,-1.16476 4.85316,-0.67944 0.19412,0 -0.0971,-0.19413 16.30661,-2.23245 7.76504,-0.97063 15.5301,-2.52364 2.9119,-0.48532 1.74713,-0.19412 8.25037,-1.55301 2.03832,-0.38825 7.57093,-1.45595 1.35888,-0.19413 0,-0.97063 -0.0971,-4.27078 3.59133,-1.94126 0.19413,-2.52364 4.07665,-3.78546 3.88253,-0.97063 7.95917,-7.18267 3.00896,-4.46491 2.32951,0.87357 5.24141,-5.14434 2.81483,-0.29119 2.52364,-5.14435 1.0677,0.0971 -0.0971,-4.17371 0.48532,-1.45595 -1.55301,0.29119 -5.5326,1.55301 -6.60029,1.35889 -16.59779,3.39721 -1.74714,0.29118 -0.38825,0.29119 z' },
  VA: { name: 'Virginia', d: 'm 908.75086,270.98255 0.29119,0 0.29118,-0.0971 0,0 -0.19412,-0.48531 -0.38825,0.58238 0,0 z m -3.30015,-10.87107 0,0.48531 0.48532,-0.29119 -0.48532,-0.19412 z m 1.74714,-3.39721 -0.0971,-0.77651 0,0 0.0971,0.77651 z m -0.58238,1.16475 -0.19413,1.26183 -0.29119,0.48531 0.48532,-1.74714 z m 0.87357,-2.52364 0.0971,-0.58238 -0.19413,0.58238 0.0971,0 z m 0.58237,-2.6207 0.29119,-0.67944 -0.48531,1.74713 0.19412,-1.06769 z m 0.0971,-1.45595 0.38825,-2.13539 -0.48532,0.48532 0.0971,1.65007 z m 1.74713,-9.60925 0.19413,-0.87356 -0.0971,0.19412 -0.0971,0.67944 z m -0.38825,-2.23245 -1.26182,0.48532 -1.94126,0.87357 -0.67944,0.87356 0.29119,0.0971 -2.32952,14.4624 0.87357,2.32952 1.35888,-6.01792 2.52364,-7.86211 1.16476,-5.14435 0,-0.0971 z m 1.94126,-0.7765 -0.29119,0.0971 -0.0971,0.38825 -0.48531,3.00896 0.38825,-1.0677 0.48531,-2.42657 z m -101.43096,37.17517 -0.67944,0.97063 -4.65903,5.92085 -3.6884,2.9119 -0.7765,2.52364 -5.62966,7.3768 -7.27974,3.88252 -0.67944,0.7765 1.74714,-0.29118 16.59779,-3.39721 6.60029,-1.35889 5.5326,-1.55301 1.55301,-0.29119 0.0971,0.19413 25.04229,-4.65903 24.75109,-6.3091 38.82525,-11.0652 0,0 -0.29119,-0.48531 -0.0971,-0.29119 0.67944,0.67944 0,0 0,0 0.77651,-0.19413 -0.0971,-0.0971 -0.67944,-3.30015 0.48532,0.0971 1.55301,2.91189 0,0 0,0 0.29119,-0.0971 0.19412,-0.0971 -0.38825,-0.7765 -3.97959,-6.11498 -4.95022,0.87357 -2.23245,1.8442 -2.13539,-1.94126 -7.27973,-2.42658 -5.04728,-0.19413 9.80337,-0.87357 5.43554,3.6884 1.55301,-2.42658 -4.36784,-5.53259 3.10602,0.19412 -1.65008,-4.4649 -3.88252,0.19413 -9.221,-7.47386 -1.16476,0 13.00646,6.40616 -0.87357,-4.4649 0.87357,-1.45595 -6.60029,-2.52364 -5.72672,-0.38825 -2.81483,-2.52364 -2.32952,1.45594 -0.87357,-6.69735 0.97063,0.19412 -0.19412,-5.43553 -0.19413,-0.19413 -0.19413,0.0971 -0.19412,-0.0971 -0.48532,-0.38825 -0.29119,-0.29119 -3.10602,-1.35888 -3.20308,-2.32952 -4.4649,-1.16475 -0.29119,-0.0971 0,0.0971 -0.58238,4.07665 -9.02687,-3.88253 0.19413,5.62966 -4.95022,9.41513 -3.00896,3.30014 -1.94126,5.72673 -5.92085,-2.03833 -2.9119,13.20058 -2.32951,4.46491 -0.38825,5.82379 -1.74714,2.81483 -6.50323,1.94126 -5.33847,4.17371 -2.52364,0.38825 -2.42658,2.13539 -6.11498,-2.23245 -1.06769,-3.00896 -0.19413,-0.0971 z' },
  WI: { name: 'Wisconsin', d: 'm 705.79187,134.80299 -2.42658,3.00896 -1.45594,4.36784 0.67944,2.42657 3.20308,-9.80337 z m -55.71423,-22.80983 1.45595,-2.03833 -1.0677,0.97063 -0.38825,1.0677 z m 2.23245,-3.20309 -0.48531,-0.58238 -1.0677,0.67945 1.55301,-0.0971 z m -21.15976,5.43554 -2.23245,2.52364 1.0677,11.64757 -6.21204,5.62966 -1.16476,5.43554 3.39721,3.10602 -0.97063,13.39471 3.59133,2.71777 2.32952,0.19412 7.37679,4.46491 4.65903,4.85315 5.92085,3.00896 1.35889,7.47386 0,0.48531 0,0 2.81483,3.39721 -0.77651,2.62071 0.97063,5.72672 2.9119,3.97959 5.33847,2.81483 -0.0971,0.48532 0,0 21.15976,-2.42658 7.86211,-0.97063 13.10352,-1.8442 -0.38825,-1.45595 0,-4.56197 -2.62071,-4.85315 -0.67944,-6.11498 1.26182,-6.79442 -0.67944,-5.24141 2.32952,-6.50322 -0.87357,-1.0677 0.19412,-6.01791 1.26182,-4.56197 -1.45594,-1.55301 -2.81483,0.97063 -1.55301,4.07665 -3.6884,2.13539 1.16476,-5.14434 3.30014,-4.36784 0.19413,-1.94127 0.0971,-0.0971 -4.65903,-4.65903 0,-6.60029 -5.24141,-4.27078 -7.18267,-0.48531 -7.3768,-1.94127 -15.91835,-4.85315 -3.10602,-1.74714 -0.29119,0.29119 -4.95022,-0.67944 -1.65007,0.97063 0.67944,-7.08561 -7.95917,4.07665 -9.70631,1.55301 -0.0971,-0.19412 z' },
  WV: { name: 'West Virginia', d: 'm 836.73002,223.71281 -13.78296,3.39721 -4.27078,-18.442 0,0 -0.19413,0.0971 -0.48531,21.25682 -3.10602,4.65903 -3.59134,2.71777 -0.67944,-0.77651 -3.97959,5.43554 0.29119,4.27077 -2.42658,0.38826 -3.30014,5.04728 1.16476,3.30014 -1.45595,3.20309 -4.17371,2.03832 0,0 0,0.19413 1.94126,6.79442 5.5326,6.69735 3.10602,1.74714 2.42657,0 0.29119,0.0971 0.19413,0.0971 1.06769,3.00896 6.11498,2.23245 2.42658,-2.13539 2.52364,-0.38825 5.33847,-4.17371 6.50323,-1.94126 1.74714,-2.81483 0.38825,-5.82379 2.32951,-4.46491 2.9119,-13.20058 5.92085,2.03833 1.94126,-5.72673 3.00896,-3.30014 4.95022,-9.41513 -0.19413,-5.62966 9.02687,3.88253 0.58238,-4.07665 0,-0.0971 0,0 -2.81483,-4.85315 -5.82379,-0.67945 -3.39721,2.62071 0,1.94126 -2.91189,0.67944 -4.27078,3.00896 -2.23245,0.48532 -4.46491,6.3091 -2.23245,-10.19163 -1.94126,0.48532 z' },
  DE: { name: 'Delaware', d: 'm 893.80314,207.69739 0.38825,1.45595 8.05624,23.00396 9.22099,-2.71777 -0.0971,-0.19413 0.19413,0 0.29119,0.0971 0,0 0.19412,-0.0971 -0.19412,-0.38825 -2.32952,-6.21204 -11.35638,-10.774 0.48531,-7.47386 0,0 -2.32951,0 -1.74714,1.35888 -0.7765,1.94126 0,0 z' },
  MD: { name: 'Maryland', d: 'm 911.56569,238.27227 0.67944,-5.2414 -0.58238,3.88252 -0.38825,1.65007 -0.0971,0.19413 0.29119,-0.0971 0.0971,-0.38826 z m 0.48531,-9.02687 -0.19412,0.0971 0.19412,0.58238 0,1.16475 0,-1.8442 0,0 z m -73.37972,-6.01791 2.23245,10.19163 4.46491,-6.3091 2.23245,-0.48532 4.27078,-3.00896 2.91189,-0.67944 0,-1.94126 3.39721,-2.62071 5.82379,0.67945 2.81483,4.85315 0,0 0.29119,0.0971 4.4649,1.16475 3.20308,2.32952 3.10602,1.35888 0.29119,0.29119 0.38826,-0.7765 1.65007,-0.0971 1.35888,0.77651 -1.26182,2.32951 0,0.0971 -1.8442,5.62966 6.01792,3.88252 6.01791,0.29119 3.97959,1.8442 -1.65008,-4.65903 -5.14434,-1.74714 -1.26182,-3.97958 3.20308,4.27077 2.62071,0.38826 -2.32952,-2.32952 -1.8442,-6.89148 0.48532,-3.97959 -2.03833,-4.36784 2.13539,-1.74713 1.55301,-5.62967 -0.58238,8.34743 1.65007,2.81483 1.55301,-3.30014 0.87357,5.43553 -1.65007,3.97959 4.75609,1.74714 -4.07665,1.35888 2.13539,3.97959 3.49427,1.16475 1.94126,-3.3972 -0.19412,4.75609 3.30014,-0.0971 2.13539,2.42657 0.0971,0 0.67944,-0.87356 1.94126,-0.87357 1.26182,-0.48532 -0.0971,-0.19412 2.52364,-7.47386 0,-0.29119 -0.48532,-1.94127 0,-0.0971 -9.22099,2.71777 -8.05624,-23.00396 -0.38825,-1.45595 -1.65008,0.48532 -6.89148,2.13539 -37.95168,10.57988 -6.89148,1.8442 -1.74714,0.48531 z' },
  NJ: { name: 'New Jersey', d: 'm 916.80709,207.30914 -0.48531,-1.16476 0,1.16476 0.48531,0 z m 0.97064,-3.59134 0.29119,-2.91189 -0.58238,2.52364 0.29119,0.38825 z m -3.97959,-29.79837 -10.19163,-2.52365 -1.74714,-0.48531 -1.65007,-0.38825 0,0 -4.07665,9.02687 1.74714,2.13539 -0.0971,6.50322 1.8442,0.29119 3.78546,9.90044 -0.19412,0.29119 -4.75609,6.98855 0.48531,5.33847 11.45345,3.88252 0.0971,4.46491 2.62071,-3.6884 0.38825,-5.33847 2.71777,-1.8442 -1.0677,-3.97959 2.03833,-4.75609 0,-10.38576 -0.67944,-3.39721 -4.56197,0.0971 1.16476,-4.65903 0.67944,-7.47386 0,0 z' },
  NY: { name: 'New York', d: 'm 913.50695,181.78154 -1.45595,2.03832 -0.38825,0.58238 1.8442,-2.6207 z m 13.39471,-4.75609 4.85316,-4.27078 0,-0.19413 -4.85316,4.46491 z m -12.71527,3.00895 0,-3.30014 -0.29119,1.74713 0.29119,1.55301 z m 22.51864,-15.5301 -1.16475,-0.29119 -0.19413,0.87357 1.35888,-0.58238 z m 2.62071,-1.74713 -0.0971,0.97063 0.19412,-0.58238 -0.0971,-0.38825 z m -2.71777,0.0971 -6.50323,6.01791 -9.9975,4.27078 -2.6207,2.23245 -0.19413,2.13539 -2.71777,2.23245 0.38826,2.9119 4.17371,-1.65008 6.11498,-4.95022 6.79441,-3.59133 10.2887,-9.70631 -7.27974,5.53259 -2.32951,0.97064 3.88252,-6.40617 z m 3.00896,-4.07665 0.38825,-0.58238 -1.16476,1.35888 0.77651,-0.7765 z m -109.09895,-3.59134 -1.55301,-0.19412 1.16476,1.55301 0.38825,-1.35889 z m 32.22496,-29.70131 0.19412,-1.0677 -0.7765,0.97064 0.58238,0.0971 z m 0.48531,-6.98855 -0.38825,0.19413 -0.48532,1.06769 0.87357,-1.26182 z m -41.0577,55.13186 0.67944,2.91189 5.14435,1.26182 29.50719,-8.05624 29.70131,-8.92981 5.43554,4.17372 1.06769,2.42658 6.3091,2.71776 0.19413,0.38826 1.65007,0.38825 1.74714,0.48531 10.19163,2.52365 -0.19413,-0.48532 0.87357,3.97959 1.94126,-0.48532 1.0677,-4.36784 0,-0.0971 -1.74714,-1.65007 2.52364,-3.10602 -1.16476,-1.45595 -3.68839,-14.26828 -0.19413,-0.97063 -0.48532,-0.29119 -0.29119,-4.27078 -0.29119,-4.65903 -0.29118,-5.04728 0,-0.29119 -0.19413,0.0971 -4.85316,-15.91835 -5.14434,-8.05624 -1.45595,-9.60924 -4.36784,-10.191633 -0.58238,0.29119 -20.28619,6.794418 -4.07665,4.367845 -4.56197,8.73568 0.19413,1.94126 -6.01791,9.12393 3.68839,1.26182 1.0677,6.89148 -4.27078,5.62967 -12.81233,7.76504 -2.42658,-0.97063 -9.51218,1.35889 -8.83275,5.33847 0.48532,2.81483 3.10602,2.71777 -1.74714,8.54155 -6.98854,8.1533 -0.0971,0.0971 z' },
  PA: { name: 'Pennsylvania', d: 'm 900.01517,170.13396 -6.3091,-2.71776 -1.06769,-2.42658 -5.43554,-4.17372 -29.70131,8.92981 -29.50719,8.05624 -5.14435,-1.26182 -0.67944,-2.91189 -1.65007,1.26182 -2.6207,1.8442 -4.7561,4.85315 -0.58238,0.48532 2.71777,11.93876 0.48532,2.13539 2.42657,10.48282 0.48532,2.03832 0,0 4.27078,18.442 13.78296,-3.39721 1.94126,-0.48532 1.74714,-0.48531 6.89148,-1.8442 37.95168,-10.57988 6.89148,-2.13539 1.65008,-0.48532 0,0 0.7765,-1.94126 1.74714,-1.35888 2.32951,0 0.29119,-0.87357 3.78546,-4.27078 0.38825,-0.67944 0.29119,-0.19413 -3.78546,-9.90044 -1.8442,-0.29119 0.0971,-6.50322 -1.74714,-2.13539 4.07665,-9.02687 0,0 -0.19413,-0.38826 z' },
  ME: { name: 'Maine', d: 'm 946.7996,118.39932 -0.0971,0 0.19412,0.0971 -0.0971,-0.0971 z m 7.18267,-20.674443 -0.77651,-1.164758 0,0.582379 0.77651,0.582379 z m -1.35888,-1.067695 0,-0.970631 -0.0971,-0.582379 0.0971,1.55301 z m 3.49427,-4.076651 -0.19413,-0.09706 0.0971,0.291189 0.0971,-0.194126 z m 9.70631,-4.853156 -0.19413,-1.455947 -0.38825,0.679442 0.58238,0.776505 z m -2.42658,0.582379 0.0971,-1.067694 -1.16476,0.194126 1.06769,0.873568 z m 3.59134,-3.203083 -0.38825,0 0,0.194126 0.38825,-0.194126 z m -4.85316,1.455947 -0.87357,-0.194126 -0.0971,0.873568 0.97063,-0.679442 z m 4.95022,-3.008957 0.87357,0.679442 -0.29119,-0.776505 -0.58238,0.09706 z m -2.6207,0.09706 -0.87357,1.650073 1.16476,-0.582379 -0.29119,-1.067694 z m -4.17372,0.09706 -0.38825,0.582379 0.29119,0.873568 0.0971,-1.455947 z m 5.72673,-3.203083 -0.0971,-0.776505 -0.29119,0.485316 0.38826,0.291189 z m -0.48532,0.388253 -0.87357,-0.776505 0,0.679442 0.87357,0.09706 z m -5.43553,2.232452 -0.19413,-1.067695 -0.38825,0.873568 0.58238,0.194127 z m 9.22099,-3.39721 -1.45594,2.135389 -0.0971,-1.55301 1.55301,-0.582379 z m 7.08561,-6.503229 -0.67944,-0.970631 -0.38825,0.194126 1.06769,0.776505 z m 2.6207,-4.36784 -0.58237,-0.291189 -0.0971,0.291189 0.67944,0 z m 1.26183,-7.570923 -0.87357,0 0.97063,0.291189 -0.0971,-0.291189 z m 1.45594,0.970631 -0.29119,-1.747136 -0.7765,-0.09706 1.06769,1.8442 z m -1.55301,-1.55301 -0.19412,-1.844199 -0.67945,1.26182 0.87357,0.582379 z m -56.29661,15.23891 14.07415,33.001458 0.19413,0.67944 6.11498,7.47386 0,-0.0971 0.97063,-0.29119 0.19413,-5.5326 1.55301,-1.94126 0.97063,-5.14435 -0.87357,-0.87357 1.65007,-5.047274 5.62966,-2.620704 3.6884,-4.464904 1.35888,-7.765049 5.92085,-0.388253 -0.7765,-3.979588 7.3768,-2.81483 0.48531,-4.36784 1.74714,0.388252 4.85315,-3.979588 2.13539,-5.144345 -4.95022,-4.950219 -5.2414,-1.067695 -1.94127,-3.979588 0,-2.329515 -3.20308,0.970632 -3.59134,-1.261821 0,-3.979588 -9.70631,-20.965634 -7.0856,-3.688398 -7.86212,6.600292 -2.13539,-0.388253 -1.8442,-3.397209 -2.52364,0.970631 -3.59133,17.859614 1.26182,5.823788 1.06769,11.8417 -2.81483,9.123934 1.94126,1.455946 -2.32951,4.464904 -2.52364,-0.388253 -0.19413,0.194127 z' },
  MI: { name: 'Michigan', d: 'm 719.96309,138.2002 -0.48532,-0.77651 -0.0971,0.97063 0.58238,-0.19412 z m 1.55301,-1.74714 -1.16476,-1.55301 -0.19413,0.67944 1.35889,0.87357 z m 0.97063,-6.98854 -0.97063,-0.87357 0,0.19412 0.97063,0.67945 z m -2.42658,76.00042 12.03583,-1.94126 3.39721,-0.67944 14.85065,-2.62071 0.29119,1.26182 0.97063,-0.29119 6.40617,-1.35888 6.11498,-1.45595 6.21204,-1.55301 -0.0971,-0.29119 3.20309,-6.3091 -0.29119,-5.24141 3.59133,-9.02687 2.81483,1.65007 1.0677,-2.03832 -0.29119,-7.76505 -2.62071,-4.85316 -3.88252,-10.28869 -3.39721,-3.78546 -1.74714,-0.48531 -6.3091,4.36784 0.67944,0.87356 -3.30014,6.21204 -3.20309,-0.58238 -0.97063,-6.50322 1.35889,-0.48532 2.81483,-6.50323 0.29119,-11.45345 -4.36784,-9.70631 -9.70632,-1.65007 -0.97063,-1.45595 -9.02687,-2.6207 -4.07665,5.04728 0.38825,4.36784 -3.10602,3.88252 0.67945,6.01792 -3.00896,2.13539 0,-7.57093 -2.71777,5.72673 -3.20308,5.04728 -2.13539,1.65007 1.06769,5.33847 -1.35888,5.5326 0.77651,6.89148 -0.97064,3.39721 6.98855,13.39471 0.87357,5.14435 -0.87357,9.51218 -4.65903,10.67695 -0.58238,0.38825 z' },
  AK: { name: 'Alaska', d: 'm 101.28276,542.95341 -0.48532,0.19412 0.38826,0.0971 0.0971,-0.29119 z m 3.59134,0.58238 0,0 0,0.0971 0,-0.0971 z m -1.74714,-1.65008 0,0.29119 0.19413,-0.0971 -0.19413,-0.19413 z m -0.87357,-0.48531 0,-0.0971 0,0 0,0.0971 z m 1.8442,0.97063 0,-0.19413 -0.0971,0.0971 0.0971,0.0971 z m -0.19413,-0.19413 0,-0.0971 -0.19412,0 0.19412,0.0971 z' },
  DC: { name: 'District of Columbia', d: 'm 878.17597,229.14834 0.48532,0.38825 0.19412,0.0971 0.19413,-0.0971 0.19413,0.0971 0.67944,0.38825 0.19413,0.29119 0,0.67944 0.19412,0.38825 1.26182,-2.32951 -1.35888,-0.77651 -1.65007,0.0971 -0.38826,0.7765 z' },
};

const stateIdToAbbr = {
  illinois: 'IL', california: 'CA', washington: 'WA',
};

function USMapInteractive({ variant = 'planning' }) {
  const navigate = useNavigate();
  const [hoveredState, setHoveredState] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const availableStates = hubDirectory.reduce((acc, hub) => {
    const abbr = stateIdToAbbr[hub.id];
    if (abbr) acc[abbr] = hub;
    return acc;
  }, {});

  const handleStateClick = (abbr) => {
    const hub = availableStates[abbr];
    if (hub) {
      const basePath = variant === 'immediate' ? '/immediate' : '/states';
      navigate(`${basePath}/${hub.id}`);
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 30,
    });
  };

  return (
    <div className="us-map-wrapper">
      <div className="us-map-container" onMouseMove={handleMouseMove}>
        {hoveredState && (
          <div
            className="us-map-tooltip"
            style={{ left: tooltipPos.x, top: tooltipPos.y }}
          >
            {statePathData[hoveredState]?.name}
            {availableStates[hoveredState] ? '' : ' - Coming soon'}
          </div>
        )}
        <svg
          viewBox="0 0 1000 589"
          className="us-map-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Object.entries(statePathData).map(([abbr, state]) => {
            const isAvailable = !!availableStates[abbr];
            return (
              <path
                key={abbr}
                d={state.d}
                className={`us-map-state ${isAvailable ? 'us-map-state--available' : 'us-map-state--unavailable'}`}
                onClick={() => handleStateClick(abbr)}
                onMouseEnter={() => setHoveredState(abbr)}
                onMouseLeave={() => setHoveredState(null)}
                style={{ cursor: isAvailable ? 'pointer' : 'default' }}
              />
            );
          })}
        </svg>
      </div>
      <p className="us-map-hint">Click a highlighted state to open its {variant === 'immediate' ? 'logistics' : 'planning'} page.</p>
    </div>
  );
}

function StateSearchBlock({ placeholder, buttonLabel, variant = 'default', basePath = '/states' }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const isInlineSearch = variant === 'inline-search';

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
      navigate(`${basePath}/${matchedHub.id}`);
    }
  };

  return (
    <div className={`state-search-block ${isInlineSearch ? 'state-search-block--inline' : ''}`}>
      <form
        className={`path-state-search ${isInlineSearch ? 'path-state-search--inline' : ''}`}
        onSubmit={handleSearch}
      >
        <div className={`state-search-field ${isInlineSearch ? 'state-search-field--inline' : ''}`}>
          <input
            type="text"
            className="state-search-input"
            placeholder={placeholder || 'Enter a state name'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isInlineSearch ? (
            <button
              type="submit"
              className="state-search-icon-button"
              aria-label={buttonLabel || 'Open State Page'}
              disabled={!matchedHub}
            >
              <svg
                className="state-search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={!matchedHub}>
              {buttonLabel || 'Open State Page'}
            </button>
          )}
        </div>
      </form>
      {query.trim().length > 0 && !matchedHub && (
        <p className="state-search-no-match">No matching state found. Check spelling or try the full state name.</p>
      )}
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
              Alternative funeral planning resources with state-specific information. Helpful next steps and guidance for all.
            </p>
          </div>
          <div className="footer-col">
            <h4>Start Here</h4>
            <ul>
              <li>
                <Link to="/funeralplanning">When You Have Time</Link>
              </li>
              <li>
                <Link to="/funeral-services">Funeral Services</Link>
              </li>
              <li>
                <Link to="/after-death-steps">After Death Steps</Link>
              </li>
              <li>
                <Link to="/exploreoptions">Explore Your Options</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>More</h4>
            <ul>
              <li>
                <Link to="/providers">Providers</Link>
              </li>
              <li>
                <Link to="/legal-resources">Legal Resources</Link>
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
      image: '/time-w.png',
      imageLabel: 'When You Have Time',
      imageLink: { path: '/funeralplanning', label: 'Start Pre-Planning' },
      title: 'Resources for planning uncommon after-death services.',
      description: '',
      items: [
        'Alternative options tied to the state',
        'Questions, timing, and next steps',
        'Provider and document pathways',
      ],
      link: { path: '/funeralplanning#future-planning', label: 'Options for when you have time to plan' },
    },
    {
      eyebrow: 'Planning now',
      variant: 'state',
      image: '/no-time-w.png',
      imageLabel: 'Funeral Services',
      imageLink: { path: '/funeral-services', label: 'Get Started Now' },
      title: 'Resources for uncommon services during a loss.',
      description: '',
      items: [
        'What to do first',
        'State-specific options and logistics',
        'Provider and document pathways',
      ],
      link: { path: '/funeralplanning#current-planning', label: 'Direction when you are experiencing a loss' },
    },
    {
      eyebrow: 'Support',
      variant: 'providers',
      image: '/questions-w.png',
      imageLabel: 'After Death Steps',
      imageLink: { path: '/after-death-steps', label: 'Navigate the Steps' },
      title: 'Know what to do when a loss occurs.',
      description: '',
      items: [
        'What to do when a death occurs',
        'Legal and official resources',
        'Provider paths when needed',
      ],
      link: { path: '/after-death-steps', label: 'Know what to do when a death occurs' },
    },
  ];

  return (
    <EditorialSections sections={sections} />
  );
}

function HomePage() {
  useDocumentTitle('GoodbyeYou - Alternative Funeral Planning Resources');
  useMetaDescription('Find alternative funeral options by state, including home funeral, green burial, aquamation, and other non-traditional after-death services with clear next steps.');

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
          </div>
        </div>
      </section>

      <section className="section home-plan-preview" id="support">
        <div className="container">
          <p className="section-eyebrow" style={{ textAlign: 'center', marginBottom: '32px' }}>Navigate the Process</p>
          <div className="home-plan-preview-shell">
            <div className="home-plan-preview-art">
              <img src="/state-page-mock.svg" alt="State page layout preview" />
            </div>
            <div className="home-plan-preview-copy">
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
            </div>
          </div>
        </div>
      </section>

      <HomeAboutSection />
    </>
  );
}

function OptionsPage() {
  useDocumentTitle('Funeral Services - Immediate After-Death Steps - GoodbyeYou');
  useMetaDescription('Immediate steps after a death for alternative funeral arrangements. Search your state for checklists, providers, and documents for uncommon services.');

  const immediateSteps = [
    {
      number: '01',
      title: 'Do not rush into a decision',
      description:
        'You are not required to call a funeral home immediately. In most states, you have time. Take a moment before committing to any service.',
    },
    {
      number: '02',
      title: 'Confirm the death has been pronounced',
      description:
        'A physician, hospice nurse, or coroner will need to officially pronounce the death. If the person died at home under hospice care, call the hospice team first.',
    },
    {
      number: '03',
      title: 'Search for your state',
      description:
        'Open your state page below to see what alternative services are allowed, what providers are available, and what documents you may need in the next 24 to 48 hours.',
    },
    {
      number: '04',
      title: 'Check if the person left any documented wishes',
      description:
        'Look for advance directives, disposition authorizations, or written instructions about the type of service they wanted. This shapes what happens next.',
    },
    {
      number: '05',
      title: 'Identify who has legal authority',
      description:
        'The next-of-kin or designated agent usually has authority over disposition. Confirm this early to avoid delays or disagreements.',
    },
    {
      number: '06',
      title: 'Contact providers that match the service path',
      description:
        'If the person wanted a home funeral, green burial, aquamation, or another alternative service, your state page will point you toward the right providers.',
    },
    {
      number: '07',
      title: 'Handle required paperwork',
      description:
        'Death certificates, burial or transit permits, and disposition authorizations may all need attention within specific timeframes. Your state page covers what applies there.',
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Funeral Services"
        titleClassName="page-hero-title--centered"
        title="Resources for uncommon services during a loss."
        subtitle="Navigate available options, state regulations, and local resources."
      />

      <section className="section">
        <div className="container">
          <SectionIntro
            title="Search for your state."
            subtitle="Your state page will show available alternative services, providers, required documents, and the steps that apply where you are."
          />
          <USMapInteractive variant="immediate" />
          <StateSearchBlock
            placeholder="Enter the state where the death occurred"
            buttonLabel="Open State Page"
            basePath="/immediate"
            variant="inline-search"
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            title="What to do in the first 24 to 48 hours."
            subtitle={<>These are the steps that most people need to work through right away.<br />Your state page will fill in the specifics.</>}
          />
          <div className="option-detail-list">
            {immediateSteps.map((step) => (
              <div className="option-detail" key={step.number}>
                <div className="option-detail-header">
                  <h2>{step.title}</h2>
                </div>
                <div className="option-detail-body">
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            title="What your state page covers."
            subtitle="Once you open your state, everything you need will be in one place."
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

      <CTASection
        title="Not dealing with an immediate loss?"
        description="If you are planning ahead for yourself or someone else, use the pre-planning path instead."
        primary={{ path: '/funeralplanning', label: 'When You Have Time' }}
        secondary={{ path: '/after-death-steps', label: 'Open Resources' }}
      />
    </>
  );
}

function ExploreOptionsPage() {
  useDocumentTitle('Explore Alternative Funeral Options - GoodbyeYou');
  useMetaDescription('Browse alternative funeral services including home funeral, green burial, aquamation, natural organic reduction, and whole-body donation.');

  return (
    <>
      <PageHero
        eyebrow="Explore Your Options"
        title="Alternative funeral services at a glance."
        subtitle="See the service types people consider most, what each one involves, and what to keep in mind before choosing a path."
      />

      <section className="section">
        <div className="container">
          <div className="option-detail-list">
            {optionDetails.map((option) => (
              <div className="option-detail" id={option.id} key={option.id}>
                <div className="option-detail-header">
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
        title="Ready to search your state?"
        description="Open the state page that matches where your arrangements will take place."
        primary={{ path: '/funeralplanning', label: 'When You Have Time' }}
        secondary={{ path: '/funeral-services', label: 'Funeral Services' }}
      />
    </>
  );
}

function PlanningHubsPage() {
  useDocumentTitle('When You Have Time - Pre-Plan Funeral Options - GoodbyeYou');
  useMetaDescription('Pre-plan alternative funeral options by state. Search your state for available services, providers, and resources for uncommon after-death services.');

  return (
    <>
      <PageHero
        eyebrow="When You Have Time"
        titleClassName="page-hero-title--planning page-hero-title--centered"
        title={<>Resources for planning<br />uncommon after-death services.</>}
        subtitle="Explore available options, state regulations, and local providers."
      />

      <section className="section">
        <div className="container">
          <SectionIntro
            title="Search Your State"
            subtitle="Search or select a state to view uncommon service logistics and resources."
          />
          <USMapInteractive />
          <StateSearchBlock
            placeholder="Enter the state you want to plan in"
            buttonLabel="Open State Page"
            variant="inline-search"
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            title="What your state page covers."
            subtitle="Everything is organized so you can focus on what matters to you without jumping between sites."
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

      <CTASection
        title="Already dealing with a loss?"
        description="If someone has died and you need to act now, use the immediate-need path instead."
        primary={{ path: '/funeral-services', label: 'Funeral Services' }}
        secondary={{ path: '/after-death-steps', label: 'Open Resources' }}
      />
    </>
  );
}

function StateDetailLayout({ eyebrow, title, intro, sections, hub, cta }) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sectionEls = document.querySelectorAll('.sdl-section');
      let current = 0;
      sectionEls.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= 180) {
          current = i;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index) => {
    const el = document.querySelectorAll('.sdl-section')[index];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={intro} />

      <section className="section sdl-body">
        <div className="container">
          <div className="sdl-grid">
            <aside className="sdl-sidebar">
              <div className="sdl-sidebar-inner">
                <h2 className="sdl-sidebar-title">{hub.region}</h2>
                <p className="sdl-sidebar-sub">{intro}</p>
                <nav className="sdl-nav">
                  {sections.map((s, i) => (
                    <button
                      key={s.title}
                      className={`sdl-nav-item${i === activeSection ? ' sdl-nav-item--active' : ''}`}
                      onClick={() => scrollToSection(i)}
                    >
                      {s.title}
                    </button>
                  ))}
                </nav>
                {hub.tags && (
                  <div className="sdl-sidebar-tags">
                    {hub.tags.map((tag) => (
                      <span className="sdl-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </aside>

            <div className="sdl-main">
              {sections.map((section, idx) => (
                <div className="sdl-section" key={section.title} id={`section-${idx}`}>
                  <div className="sdl-section-header">
                    <h2>{section.title}</h2>
                    <div className="sdl-section-tags">
                      {section.items.map((item) => (
                        <span className="sdl-section-tag" key={item.label}>{item.label}</span>
                      ))}
                    </div>
                  </div>
                  <div className="sdl-cards">
                    {section.items.map((item) => (
                      <div className="sdl-card" key={item.label}>
                        <h3>{item.label}</h3>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={cta.title}
        description={cta.description}
        primary={cta.primary}
        secondary={cta.secondary}
      />
    </>
  );
}

function PlanningHubDetailPage() {
  const { hubId } = useParams();
  const hub = hubDirectory.find((entry) => entry.id === hubId);

  useDocumentTitle(hub ? `State-Specific Planning: ${hub.region} - GoodbyeYou` : 'Funeral Options - GoodbyeYou');
  useMetaDescription(hub ? `Pre-plan alternative funeral options in ${hub.region}. Explore ${hub.region} service availability, providers, costs, and legal documentation for home funeral, green burial, aquamation, and more.` : 'Find alternative funeral options by state.');

  if (!hub) {
    return <Navigate to="/funeralplanning" replace />;
  }

  return (
    <StateDetailLayout
      eyebrow="When You Have Time"
      title={`State-Specific Planning: ${hub.region}`}
      intro={hub.planning ? hub.planning.intro : hub.summary}
      sections={hub.planning ? hub.planning.sections : []}
      hub={hub}
      cta={{
        title: 'Already dealing with a loss?',
        description: 'If someone has died and you need to act now, use the immediate-need path instead.',
        primary: { path: `/immediate/${hub.id}`, label: 'Funeral Services' },
        secondary: { path: '/after-death-steps', label: 'Open Resources' },
      }}
    />
  );
}

function ImmediateStateDetailPage() {
  const { hubId } = useParams();
  const hub = hubDirectory.find((entry) => entry.id === hubId);

  useDocumentTitle(hub ? `Immediate Logistics: ${hub.region} - GoodbyeYou` : 'Immediate Logistics - GoodbyeYou');
  useMetaDescription(hub ? `Immediate after-death logistics in ${hub.region}. Navigate authority, custody, transport, providers, paperwork, and deadlines for alternative funeral services.` : 'Find immediate after-death logistics by state.');

  if (!hub) {
    return <Navigate to="/funeral-services" replace />;
  }

  return (
    <StateDetailLayout
      eyebrow="Funeral Services"
      title={`Immediate Logistics: ${hub.region}`}
      intro={hub.immediate ? hub.immediate.intro : hub.summary}
      sections={hub.immediate ? hub.immediate.sections : []}
      hub={hub}
      cta={{
        title: 'Not dealing with an immediate loss?',
        description: 'If you are planning ahead for yourself or someone else, use the pre-planning path instead.',
        primary: { path: `/states/${hub.id}`, label: 'When You Have Time' },
        secondary: { path: '/after-death-steps', label: 'Open Resources' },
      }}
    />
  );
}

function ResourcesPage() {
  useDocumentTitle('After Death Steps - What to Do After a Death - GoodbyeYou');
  useMetaDescription('After-death resources covering what to do first, who to contact, official steps, documents, and supporting paths for alternative funeral arrangements.');

  return (
    <>
      <PageHero
        eyebrow="After Death Steps"
        titleClassName="page-hero-title--centered"
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
        primary={{ path: '/funeralplanning', label: 'Search Your State' }}
        secondary={{ path: '/legal-resources', label: 'Legal Resources' }}
      />
    </>
  );
}

function ProvidersPage() {
  useDocumentTitle('Alternative Funeral Providers - GoodbyeYou');
  useMetaDescription('Find alternative funeral providers including home funeral directors, green burial cemeteries, aquamation facilities, and non-traditional service providers.');

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
      link: { path: '/funeral-services', label: 'Match Providers to Options ->' },
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
      link: { path: '/funeralplanning', label: 'Search Your State ->' },
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
      link: { path: '/after-death-steps', label: 'Use Resource Paths ->' },
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
              Availability, legality, and service mix vary by state. Search your state to narrow
              the provider list to what is actually possible where you are.
            </p>
            <Link to="/funeralplanning" className="btn btn-outline-dark more-link-button">
              Search Your State
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Start connecting."
        description="Open your state for local providers, or compare options before you choose a path."
        primary={{ path: '/funeralplanning', label: 'Search Your State' }}
        secondary={{ path: '/funeral-services', label: 'Funeral Services' }}
      />
    </>
  );
}

function LegalResourcesPage() {
  useDocumentTitle('Legal and Official Resources - Funeral Planning - GoodbyeYou');
  useMetaDescription('Legal resources for alternative funeral planning including advance directives, disposition authorizations, and state-specific official documents.');

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
      link: { path: '/funeralplanning', label: 'Search Your State ->' },
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
      link: { path: '/after-death-steps', label: 'Browse Resource Paths ->' },
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
      link: { path: '/funeralplanning#current-planning', label: 'Go to Planning Now ->' },
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
        primary={{ path: '/funeralplanning', label: 'Search Your State' }}
        secondary={{ path: '/after-death-steps', label: 'All Resources' }}
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
        <Route path="/funeralplanning" element={<PlanningHubsPage />} />
        <Route path="/states/:hubId" element={<PlanningHubDetailPage />} />
        <Route path="/immediate/:hubId" element={<ImmediateStateDetailPage />} />
        <Route path="/funeral-services" element={<OptionsPage />} />
        <Route path="/exploreoptions" element={<ExploreOptionsPage />} />
        <Route path="/after-death-steps" element={<ResourcesPage />} />
        <Route path="/providers" element={<ProvidersPage />} />
        <Route path="/legal-resources" element={<LegalResourcesPage />} />

        {/* Redirects from old URLs */}
        <Route path="/funeraloptions" element={<Navigate to="/funeralplanning" replace />} />
        <Route path="/planning-hubs" element={<Navigate to="/funeralplanning" replace />} />
        <Route path="/planning-hubs/:hubId" element={<Navigate to="/funeralplanning" replace />} />
        <Route path="/afterdeathguide" element={<Navigate to="/funeral-services" replace />} />
        <Route path="/options" element={<Navigate to="/funeral-services" replace />} />
        <Route path="/options/:optionId" element={<Navigate to="/funeral-services" replace />} />
        <Route path="/plan-ahead" element={<Navigate to="/funeralplanning#future-planning" replace />} />
        <Route path="/planning-now" element={<Navigate to="/funeralplanning#current-planning" replace />} />
        <Route path="/resources" element={<Navigate to="/after-death-steps" replace />} />
        <Route path="/vault" element={<Navigate to="/after-death-steps" replace />} />
        <Route path="/legal" element={<Navigate to="/legal-resources" replace />} />
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

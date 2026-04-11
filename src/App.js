import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import { hubDirectory } from './siteContent';


const optionCategories = [
  {
    category: 'Direct Disposition Methods',
    description: 'Primary methods for handling the body after death, each with distinct legal, logistical, and environmental considerations.',
    options: [
      {
        id: 'direct-cremation',
        title: 'Direct Cremation',
        description:
          'Cremation without a prior funeral service, viewing, or visitation. The body goes directly from the place of death to the cremation facility. Remains are returned to the family for private handling.',
        involves: [
          'No viewing, visitation, or funeral service before cremation',
          'Body transported directly to cremation facility',
          'Cremation performed within the timeframe set by the provider',
          'Ashes returned to family in a basic container or chosen urn',
          'Family arranges a memorial separately if desired',
        ],
        considerations: [
          'One of the lowest-cost disposition options',
          'Legal in all states',
          'Some families feel the absence of a viewing or service',
          'Cremation is irreversible - no option for burial later',
          'Can be combined with a memorial service at any time afterward',
        ],
      },
      {
        id: 'immediate-burial',
        title: 'Immediate Burial',
        description:
          'Burial shortly after death without embalming, viewing, or a formal funeral service beforehand. The body is placed in a simple container and buried directly.',
        involves: [
          'No embalming, viewing, or visitation',
          'Body transported to cemetery for prompt burial',
          'Simple casket or alternative container used',
          'Cemetery plot and grave opening arranged in advance or at need',
          'Memorial service may be held separately',
        ],
        considerations: [
          'Lower cost than traditional burial with services',
          'Time-sensitive - burial must happen relatively quickly without embalming',
          'Cemetery availability and scheduling can affect timing',
          'Some families prefer the simplicity and directness',
          'Religious traditions may align well with this approach',
        ],
      },
      {
        id: 'home-funeral',
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
        id: 'home-burial',
        title: 'Home Burial on Private Land',
        description:
          'Burial of the body on private property owned by the family, where local zoning and state law permit it. This is distinct from green burial in a cemetery and involves navigating property, county, and state requirements.',
        involves: [
          'Verification that state law and local zoning allow private land burial',
          'Compliance with setback distances from wells, waterways, and property lines',
          'Grave depth and preparation meeting local specifications',
          'Filing of required permits and recording of the burial location',
          'Long-term documentation tied to the property deed or plat',
        ],
        considerations: [
          'Not permitted in every state or county',
          'Zoning and HOA restrictions can prevent it even where state law allows',
          'Future property sale may be affected by the presence of a burial',
          'Families must handle or arrange transport, preparation, and burial logistics',
          'No perpetual care or maintenance guarantee unless arranged privately',
        ],
      },
      {
        id: 'aquamation',
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
        id: 'burial-at-sea',
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
        id: 'witness-cremation',
        title: 'Witness Cremation',
        description:
          'A cremation where family members or close friends are present to observe the beginning of the cremation process. Some facilities allow a brief ceremony or moment of reflection before the cremation begins.',
        involves: [
          'Cremation facility that permits family presence',
          'Brief viewing, ceremony, or moment of reflection before cremation',
          'Family observes the start of the cremation process',
          'Cremation completed and ashes returned as with standard cremation',
          'Coordinated scheduling with the cremation provider',
        ],
        considerations: [
          'Not all crematories offer this option',
          'Facility policies vary on how many people can attend',
          'Some families find it meaningful for closure and peace of mind',
          'May involve additional scheduling or fees',
          'Can be combined with a home funeral or direct cremation arrangement',
        ],
      },
      {
        id: 'cryonics',
        title: 'Cryonics',
        description:
          'Vitrification and ultra-low temperature storage of the body or head in liquid nitrogen, with the intent of potential future revival. Offered by a small number of organizations such as Alcor and the Cryonics Institute, this is one of the most unconventional after-death options available.',
        involves: [
          'Pre-registration and membership with a cryonics organization',
          'Rapid response team dispatched at the time of legal death',
          'Blood replaced with cryoprotectant solution to prevent ice crystal damage',
          'Body or head cooled to approximately -196 degrees Celsius in liquid nitrogen',
          'Long-term storage in a vacuum-insulated vessel at the cryonics facility',
        ],
        considerations: [
          'No scientific evidence that revival will ever be possible',
          'Significant cost - whole-body preservation can exceed $200,000',
          'Ongoing storage fees and organizational stability are long-term factors',
          'Legal death must be declared before the process can begin',
          'Requires advance planning, funding arrangements, and coordination with the provider',
        ],
      },
      {
        id: 'mushroom-suits',
        title: 'Mushroom Suits (Infinite Burial)',
        description:
          'Burial in a shroud or suit infused with mushroom mycelium designed to neutralize toxins in the body and facilitate natural decomposition. The mycelium acts as a biological filter as the body breaks down in the soil.',
        involves: [
          'Body dressed in a mycelium-infused shroud or burial suit',
          'Burial in the ground without embalming or a traditional casket',
          'Mycelium activates after burial and aids decomposition',
          'Compatible with green burial and conservation burial grounds',
          'No vault, concrete liner, or chemical preservation used',
        ],
        considerations: [
          'This is a commercially available product but still relatively new',
          'Long-term scientific data on the effectiveness of toxin neutralization is limited',
          'Cost is higher than a standard burial shroud',
          'Requires a burial ground that permits green burial practices',
          'Not all green burial providers are familiar with or accept this product',
        ],
      },
      {
        id: 'tree-pods',
        title: 'Tree Pods (Capsula Mundi)',
        description:
          'A biodegradable pod designed to hold the body in a fetal position and serve as the organic base for a tree planted above it. The concept envisions burial grounds becoming memorial forests over time.',
        involves: [
          'Body placed inside a biodegradable egg-shaped pod',
          'Pod buried in the ground with a tree planted directly above',
          'Decomposition provides nutrients to the growing tree',
          'Intended to replace traditional headstones with living trees',
          'The urn version for cremated ashes is currently available for purchase',
        ],
        considerations: [
          'The full-body pod version is a concept and prototype only - it is not commercially available',
          'Only the ashes urn version is currently sold',
          'Whether the full-body version becomes a commercial product may depend on funding and demand',
          'No burial grounds currently accept or support the full-body pod format',
          'The concept has generated significant public interest but remains unproven at scale',
        ],
      },
      {
        id: 'direct-nourishment-tree-burial',
        title: 'Direct-Nourishment Tree Burial',
        description:
          'A shrouded burial combined with a specific nutrient mix designed to directly feed a newly planted sapling. The goal is to create a more direct biological connection between the burial and the growth of the tree than standard green burial.',
        involves: [
          'Body buried in a biodegradable shroud without embalming',
          'Specialized nutrient mix placed with the body to support tree growth',
          'Tree or sapling planted directly above the burial site',
          'Burial depth and nutrient placement follow the provider\'s protocol',
          'Compatible with green burial and conservation burial grounds where accepted',
        ],
        considerations: [
          'This is an emerging concept with very limited commercial availability',
          'Scientific evidence on how much the burial directly feeds the tree is still developing',
          'Not all green burial grounds offer or support this specific method',
          'Soil conditions, climate, and tree species all affect the outcome',
          'Cost and provider availability vary significantly by region',
        ],
      },
      {
        id: 'promession',
        title: 'Promession',
        description:
          'An experimental method that uses liquid nitrogen to freeze the body, followed by vibration to reduce it to a fine powder. The powder is then freeze-dried and can be buried in a biodegradable container. The process was developed in Sweden but has not reached commercial availability.',
        involves: [
          'Body frozen to approximately -196 degrees Celsius using liquid nitrogen',
          'Frozen body subjected to vibration, breaking it into fine particles',
          'Particles freeze-dried to remove remaining moisture',
          'Resulting powder placed in a biodegradable container for shallow burial',
          'Intended to be an environmentally low-impact alternative to cremation',
        ],
        considerations: [
          'This method is not commercially available anywhere in the world as of now',
          'The concept has been promoted since the early 2000s but no functioning facility has opened',
          'Whether it becomes available may depend on funding, regulation, and technical development',
          'No regulatory framework exists for this process in the United States',
          'Should not be considered a current option - included here for awareness only',
        ],
      },
      {
        id: 'open-air-funeral-pyre',
        title: 'Open-Air Funeral Pyre',
        description:
          'Outdoor cremation on a wood-fueled fire, conducted in the open air rather than in a closed cremation chamber. This ancient practice is legally permitted in only a very small number of locations in the United States.',
        involves: [
          'Body placed on a constructed wood pyre in an open-air setting',
          'Fire lit and maintained until cremation is complete',
          'Ceremony or gathering may accompany the burning',
          'Remaining bone fragments collected after the fire',
          'Process conducted at a permitted outdoor cremation site',
        ],
        considerations: [
          'Legal only in Crestone, Colorado and through specific nonprofit organizations in Maine',
          'Extremely limited access - not available in the vast majority of the country',
          'May require travel and advance coordination with the site operator',
          'Environmental regulations, air quality rules, and local permits apply',
          'Deeply meaningful for some cultural and spiritual traditions',
        ],
      },
      {
        id: 'modern-mummification',
        title: 'Modern Mummification',
        description:
          'Permanent preservation of the body through chemical baths, specialized wrapping, and sealing techniques inspired by ancient practices but using modern materials and methods. Summum, based in Utah, is the most well-known provider of this service.',
        involves: [
          'Body preserved through a multi-step chemical immersion and treatment process',
          'Organs may be preserved separately or treated in place depending on the provider',
          'Body wrapped in specialized materials and sealed in a custom-made encasement',
          'Process takes several months to complete',
          'Preserved body returned to the family or placed in a chosen location',
        ],
        considerations: [
          'Extremely limited availability - Summum in Salt Lake City, Utah is the primary known provider',
          'Cost is significantly higher than most other disposition methods',
          'The process is irreversible and the body is permanently preserved',
          'Cemetery or storage arrangements for the preserved body must be planned separately',
          'May appeal to individuals with specific spiritual, philosophical, or personal motivations',
        ],
      },
      {
        id: 'sky-burial',
        title: 'Sky Burial (International)',
        description:
          'A ritual practice in which the body is placed on an elevated site and exposed to the elements and scavenging birds, allowing it to return to nature through consumption rather than burial or cremation. This practice is rooted in Tibetan Buddhist tradition and is performed in parts of Tibet, Mongolia, and other regions.',
        involves: [
          'Body transported to a designated sky burial site, typically at high elevation',
          'Body prepared and placed according to the cultural and ritual protocol of the tradition',
          'Vultures and other birds consume the remains over a period of hours or days',
          'A rogyapa (body breaker) may prepare the body to facilitate the process',
          'Ritual prayers and ceremonies typically accompany the process',
        ],
        considerations: [
          'Not legal or practiced in the United States',
          'Requires international travel to Tibet, Mongolia, or another region where the practice exists',
          'Deeply tied to Tibetan Buddhist beliefs about impermanence and the cycle of life',
          'Access for non-residents or non-practitioners may be restricted or culturally inappropriate',
          'Included here for awareness - this is not a domestically available option',
        ],
      },
    ],
  },
  {
    category: 'Alternative Donation and Research Pathways',
    description: 'Options for contributing the body or organs to science, education, or medical advancement.',
    options: [
      {
        id: 'whole-body-donation',
        title: 'Whole-Body Donation Programs',
        description:
          'Donating the body to a medical school, university, anatomical program, research institution, or other approved whole-body donation program for education, research, or surgical training. Depending on the program, remains are often cremated and returned to family after the donation process concludes.',
        involves: [
          'Pre-registration with a medical school, university, anatomical donation program, or other approved whole-body donation program',
          'Acceptance reviewed again at the time of death',
          'Body transport to the receiving school, program, or partner facility',
          'Used for medical education, surgical training, or research',
          'Cremated remains may be returned to family when the program is complete',
        ],
        considerations: [
          'Not every donor is accepted at the time of death - health and timing criteria apply',
          'Pre-registration strongly recommended',
          'Costs, transport coverage, and return of remains vary by program',
          'Medical schools, universities, nonprofits, and research programs have different service areas and requirements',
          'Backup plan needed in case of non-acceptance',
        ],
      },
      {
        id: 'state-anatomical-boards',
        title: 'State Anatomical Boards',
        description:
          'Donation of the body through a state-run anatomical board that distributes remains to medical schools and universities within its jurisdiction for physician training and student education. These programs are distinct from private donation companies and are administered by state government or designated institutions.',
        involves: [
          'Pre-registration or at-need donation through the state anatomical board',
          'Body transported to the board or a designated medical school',
          'Remains used for anatomy courses, surgical training, and medical education',
          'Study period typically lasts one to two years',
          'Cremated remains usually returned to family after the program is complete',
        ],
        considerations: [
          'Not every state operates an anatomical board - availability varies',
          'Acceptance criteria and logistics differ by state',
          'Transport and cremation costs may or may not be covered by the program',
          'Separate from private non-transplant anatomical donation organizations',
          'Backup plan needed in case of non-acceptance at the time of death',
        ],
      },
      {
        id: 'nado-non-transplant-anatomical-donation',
        title: 'Non-Transplant Anatomical Donation (NADO)',
        description:
          'Donation of the body to a private, non-transplant anatomical donation organization that provides tissues and remains to surgical training programs, medical device companies, and research facilities. Companies such as Science Care operate in this space and function differently from state anatomical boards or university programs.',
        involves: [
          'Pre-registration with a private anatomical donation organization',
          'Body transported to the organization\'s facility at the time of death',
          'Tissues and remains distributed to medical device companies, surgical training programs, or research partners',
          'Donor body may be used across multiple programs or purposes',
          'Cremated remains may be returned to family after the process is complete',
        ],
        considerations: [
          'These are private, often for-profit companies - not state or university programs',
          'The range of uses for donated remains is broader and may include commercial purposes',
          'Families should review the organization\'s disclosure and consent documents carefully',
          'Industry oversight and regulation vary - not all organizations operate under the same standards',
          'Transport and cremation costs are typically covered by the organization',
        ],
      },
      {
        id: 'organ-and-tissue-donation',
        title: 'Organ and Tissue Donation',
        description:
          'Donation of organs and tissues for transplantation at the time of death. This is handled through organ procurement organizations and is separate from whole-body donation or funeral arrangements.',
        involves: [
          'Registration as an organ donor through state registry or driver license',
          'Organ procurement organization notified at the time of death',
          'Medical evaluation to determine which organs and tissues are viable',
          'Surgical recovery of organs and tissues in a hospital setting',
          'Body returned to the family for funeral or disposition arrangements',
        ],
        considerations: [
          'Does not prevent a funeral, viewing, or any other disposition choice',
          'Not every registered donor will be eligible at the time of death',
          'Family may still be consulted even with a registered designation',
          'Timing and hospital setting are critical factors',
          'Separate from and not a replacement for whole-body donation',
        ],
      },
      {
        id: 'forensic-body-farms',
        title: 'Forensic Body Farms',
        description:
          'Donation of the body to a forensic anthropology research facility for the study of human decomposition in various outdoor environments. These facilities, operated by universities such as Texas State and UT Knoxville, advance forensic science, criminal investigation methods, and victim identification techniques.',
        involves: [
          'Pre-registration with an accredited forensic anthropology facility',
          'Body placed in a controlled outdoor environment under research conditions',
          'Decomposition studied across variables such as climate, terrain, and exposure',
          'Research contributes to forensic identification, law enforcement training, and criminal case methods',
          'Cremated remains may be returned to family depending on the program',
        ],
        considerations: [
          'Very limited number of facilities in the United States',
          'Acceptance is not guaranteed at the time of death',
          'The nature of the research may not be comfortable for all families',
          'No cost to the family in most cases',
          'Backup plan needed in case of non-acceptance',
        ],
      },
      {
        id: 'k9-public-safety-training',
        title: 'K9 and Public Safety Training Donation',
        description:
          'Donation of the body or remains for training cadaver dogs, search-and-rescue teams, and other public safety personnel. These programs help train detection teams that are used in missing persons cases, disaster response, and criminal investigations.',
        involves: [
          'Donation coordinated through a program affiliated with law enforcement, military, or university research',
          'Remains used in controlled training exercises for cadaver dogs or search teams',
          'Training environments may include outdoor, indoor, or water-based scenarios',
          'Program duration and use of remains vary by organization',
          'Cremated remains may be returned to family depending on the program',
        ],
        considerations: [
          'Very few programs accept donations specifically for this purpose',
          'Some forensic research facilities include K9 training as part of their broader program',
          'Families should verify the program is affiliated with an accredited institution',
          'The nature of the training may not be comfortable for all families',
          'Backup plan needed in case of non-acceptance',
        ],
      },
      {
        id: 'specialized-disease-research',
        title: 'Specialized Disease Research Donation',
        description:
          'Targeted donation of the body or specific organs to research programs focused on particular diseases or conditions. This includes brain banks studying Alzheimer\'s disease, CTE, Parkinson\'s, and other neurological conditions, as well as programs focused on rare genetic diseases.',
        involves: [
          'Pre-registration with a disease-specific research program or brain bank',
          'Medical history and diagnosis documentation shared with the program',
          'Tissue, organ, or whole-body donation coordinated at the time of death',
          'Specimens used for targeted research on specific conditions',
          'Remaining remains may be returned to family depending on the program',
        ],
        considerations: [
          'Programs are often tied to specific institutions or research networks',
          'Eligibility may depend on the donor\'s medical history or diagnosis',
          'Brain banks and organ-specific programs have their own intake criteria',
          'Timing at death is critical for tissue viability in some programs',
          'Families should confirm logistics, costs, and return of remains in advance',
        ],
      },
      {
        id: 'product-testing-impact-research',
        title: 'Product Testing and Impact Research Donation',
        description:
          'Donation of the body for use in automotive safety testing, military equipment evaluation, ballistics research, or other impact studies. These programs use cadavers to improve protective equipment, vehicle safety systems, and body armor performance.',
        involves: [
          'Donation arranged through a university, research institution, or government-affiliated program',
          'Body used in controlled crash testing, blast studies, or protective equipment evaluation',
          'Research contributes to vehicle safety ratings, military gear standards, and injury prevention',
          'Programs may be operated by automotive manufacturers, defense agencies, or academic labs',
          'Cremated remains may be returned to family depending on the program',
        ],
        considerations: [
          'This type of donation is not widely known and may surprise some families',
          'Programs are limited and not available through standard donation registries',
          'The nature of the testing may not be comfortable for all families',
          'Families should verify the program and its institutional affiliation',
          'Backup plan needed in case of non-acceptance',
        ],
      },
      {
        id: 'museum-plastination-donation',
        title: 'Museum and Plastination Donation',
        description:
          'Donation of the body for permanent anatomical display through plastination or similar preservation techniques. Programs like Body Worlds use donated bodies to create educational exhibits that show human anatomy in detail for public viewing. Some plastination programs are based internationally and may require transport coordination to facilities in Germany or other countries.',
        involves: [
          'Pre-registration and consent through a plastination or anatomical exhibit program',
          'Body preserved through plastination, replacing water and fat with durable polymers',
          'Preserved specimen used in traveling or permanent public exhibitions',
          'Donor identity is typically kept anonymous in the exhibit',
          'Body is not returned to family - the donation is permanent',
          'International programs may require coordination for transport to facilities outside the United States',
        ],
        considerations: [
          'This is a permanent and irreversible donation - there is no return of remains',
          'Very few programs accept donations for this purpose',
          'The public display aspect may not be comfortable for all families',
          'Donor consent and legal documentation requirements are specific to each program',
          'International transport logistics and costs may apply for programs based outside the U.S.',
          'Families should understand the full scope of the display before committing',
        ],
      },
    ],
  },
  {
    category: 'Post-Disposition and Ashes-Based Alternatives',
    description: 'Options for what to do with cremated remains or ashes after cremation, aquamation, or another process has been completed.',
    options: [
      {
        id: 'ash-scattering',
        title: 'Ash Scattering',
        description:
          'Scattering ashes after cremation in a place that mattered to the person, such as the ocean, private land, or another meaningful location. For many families, it feels more personal than placing remains in a cemetery.',
        involves: [
          'Cremation completed before scattering takes place',
          'Location chosen based on personal meaning and access',
          'Scattering method chosen such as hand scattering, sea scattering, or aerial release',
          'Permissions confirmed for private land or restricted areas',
          'Family gathering, private moment, or guided ceremony',
        ],
        considerations: [
          'Rules vary by location, property type, and water access',
          'EPA rules apply when scattering at sea',
          'Public parks or protected land may have restrictions',
          'Aerial ash scattering is a specialty variation with added cost',
          'Families may still want a separate memorial gathering',
        ],
      },
      {
        id: 'tree-and-nature-memorials',
        title: 'Tree and Nature-Based Memorials',
        description:
          'Tree memorials and other nature-based memorial products are often used after cremation. These can include biodegradable urns, tree-planting products, coral reef memorial structures, or other living memorials.',
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
        id: 'reef-memorials',
        title: 'Reef Memorials',
        description:
          'Cremated remains are mixed into a reef-safe concrete structure and placed on the ocean floor to become part of a living reef system. This is a nature-based memorial option offered through specialty providers.',
        involves: [
          'Cremated remains mixed into a reef ball or reef structure',
          'Structure deployed at an approved ocean site',
          'GPS coordinates provided for the memorial location',
          'Families may attend a placement ceremony or boat trip',
          'Reef structure becomes part of the marine ecosystem over time',
        ],
        considerations: [
          'Offered through a small number of specialty providers',
          'Coastal access and deployment logistics apply',
          'Cost varies by provider, structure type, and ceremony options',
          'Long-term memorial tied to a living marine environment',
          'Not a primary disposition method - requires prior cremation',
        ],
      },
      {
        id: 'memorial-diamonds',
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
        id: 'ashes-in-art',
        title: 'Ashes in Art or Keepsakes',
        description:
          'Ashes can be incorporated into jewelry, glass art, pottery, and other keepsake items. This is not a primary funeral method but a memorial option for people who want something tangible to keep.',
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
        id: 'space-burials',
        title: 'Space Burials',
        description:
          'A symbolic portion of cremated remains is sent into space through a memorial launch service. It is one of the most unusual memorial options and often appeals to people with a strong connection to astronomy or exploration.',
        involves: [
          'Cremation completed before the memorial launch takes place',
          'A symbolic portion of ashes provided to a specialty launch company',
          'Type of flight chosen such as suborbital, orbital, lunar, or deep-space memorial mission',
          'Launch timing coordinated around the provider\'s scheduled missions',
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
        id: 'aerial-ash-scattering',
        title: 'Aerial Ash Scattering',
        description:
          'Scattering of cremated remains from an aircraft over a chosen landscape, coastline, or other meaningful location. This is a specialty service offered by charter or memorial flight providers.',
        involves: [
          'Cremated remains provided to an aerial scattering service',
          'Flight location and route chosen by the family',
          'Scattering performed by the pilot or with family present during the flight',
          'GPS coordinates and flight documentation may be provided',
          'Certificate or memorial record issued by some providers',
        ],
        considerations: [
          'FAA and local airspace rules apply',
          'Weather and scheduling can affect timing',
          'Cost varies by flight type, location, and whether family is on board',
          'Not available in all areas',
          'Some families combine this with a ground-based memorial gathering',
        ],
      },
      {
        id: 'keepsake-urns',
        title: 'Keepsake Urns and Divided Remains',
        description:
          'Cremated remains can be divided among multiple small urns or keepsake containers, allowing different family members to each keep a portion. This is a common option when ashes are being shared.',
        involves: [
          'Cremated remains divided into smaller containers by the family or provider',
          'Keepsake urns, mini urns, or specialty containers selected',
          'Portions distributed among family members or kept together',
          'Some families combine keepsake urns with scattering or burial of the remaining ashes',
          'No legal restriction on dividing cremated remains in most states',
        ],
        considerations: [
          'Families should discuss division preferences in advance when possible',
          'Container quality and material vary widely',
          'Some families find comfort in each person having their own portion',
          'Can be combined with other memorial options like jewelry, art, or scattering',
          'Provider or funeral home can assist with the division process',
        ],
      },
      {
        id: 'high-altitude-balloon-scattering',
        title: 'High-Altitude Balloon Scattering',
        description:
          'Cremated remains are carried to the upper atmosphere or stratosphere via a helium balloon, where the ashes are released at high altitude and dispersed by wind currents. This is a specialty memorial service offered by a small number of providers.',
        involves: [
          'Cremated remains placed in a biodegradable container attached to a helium balloon',
          'Balloon launched from a designated site and tracked during ascent',
          'Ashes released at high altitude, typically in the stratosphere',
          'Some providers include GPS tracking, video footage, or a flight certificate',
          'Families may attend the launch or receive documentation afterward',
        ],
        considerations: [
          'Very limited number of providers offer this service',
          'FAA regulations and weather conditions can affect launch timing',
          'Cost varies by provider, location, and documentation included',
          'Only a portion of ashes is typically sent per launch',
          'This is a memorial option after cremation, not a primary disposition method',
        ],
      },
      {
        id: 'solidified-remains',
        title: 'Solidified Remains',
        description:
          'A process that transforms 100% of cremated remains into smooth, ceramic-like stones. Companies such as Parting Stone use a proprietary process to convert loose ashes into solid, handleable objects that can be held, displayed, or distributed among family members.',
        involves: [
          'All cremated remains sent to the processing company',
          'Ashes transformed into solid stones through a proprietary solidification process',
          'Stones returned to the family in a range of natural shapes and sizes',
          'Number of stones depends on the volume of remains',
          'Stones can be kept, displayed, shared among family, or placed in a memorial setting',
        ],
        considerations: [
          'This is a relatively new commercial product with limited long-term track record',
          'All ashes are used in the process - none are discarded',
          'Cost is in addition to cremation and may vary by provider',
          'The result is a permanent, solid object rather than loose ashes',
          'Families should review the provider and process before committing',
        ],
      },
      {
        id: 'vinyl-records',
        title: 'Vinyl Records',
        description:
          'A portion of cremated ashes is pressed into a playable 12-inch vinyl record. The record can include music, spoken words, or other audio chosen by the family. This is a niche memorial product offered by specialty companies.',
        involves: [
          'A small portion of cremated ashes provided to the pressing company',
          'Audio content selected by the family - music, voice recordings, or messages',
          'Ashes incorporated into the vinyl during the pressing process',
          'Finished record returned to the family as a playable memorial item',
          'Remaining ashes kept by the family for other use',
        ],
        considerations: [
          'This is a novelty memorial product, not a primary disposition method',
          'Very limited number of companies offer this service',
          'Audio quality may differ from standard vinyl pressings',
          'Only a small amount of ash is used per record',
          'Cost and turnaround time vary by provider',
        ],
      },
      {
        id: 'tattoo-ink',
        title: 'Tattoo Ink',
        description:
          'A small amount of sterilized cremated ash is infused into professional tattoo ink, which is then used to create a memorial tattoo. This is a deeply personal option chosen by some family members or close friends as a permanent physical tribute.',
        involves: [
          'A small portion of cremated ashes sterilized and prepared for use',
          'Ash mixed into professional-grade tattoo ink by a specialty provider or tattoo artist',
          'Tattoo designed and applied by a licensed tattoo artist',
          'The memorial tattoo becomes a permanent part of the person receiving it',
          'Remaining ashes kept by the family for other use',
        ],
        considerations: [
          'Not all tattoo artists are willing or experienced with ash-infused ink',
          'Sterilization and preparation methods vary - families should verify the process',
          'Health and safety standards for ash-infused ink are not formally regulated',
          'Only a very small amount of ash is needed',
          'This is a personal memorial choice, not a primary disposition method',
        ],
      },
      {
        id: 'cremation-jewelry',
        title: 'Cremation Jewelry',
        description:
          'Jewelry designed to hold or incorporate a small amount of cremated ashes, typically in a sealed pendant, locket, ring, or bracelet. This is one of the more common memorial keepsake options and is widely available from specialty and mainstream jewelry providers.',
        involves: [
          'A small portion of cremated ashes placed inside or sealed into a piece of jewelry',
          'Jewelry type selected - pendants, rings, bracelets, lockets, or custom designs',
          'Ash sealed using resin, glass, or a threaded compartment depending on the design',
          'Finished piece worn or kept as a personal memorial item',
          'Remaining ashes kept by the family for other use or disposition',
        ],
        considerations: [
          'Widely available from online and local providers at a range of price points',
          'Quality, materials, and craftsmanship vary significantly across vendors',
          'Some families purchase multiple pieces for different family members',
          'Not a primary disposition method - used alongside cremation or another process',
          'Families may want to verify the seal quality to ensure ashes are secure',
        ],
      },
    ],
  },
  {
    category: 'Memorial, Digital Legacy, and Service Options',
    description: 'Ways to honor, remember, and celebrate the deceased.',
    options: [
      {
        id: 'celebration-of-life',
        title: 'Celebration of Life',
        description:
          'A celebration of life moves away from the structure of a traditional funeral and focuses more on the person, their story, and the way they lived. It can be simple or elaborate as long as it reflects the person.',
        involves: [
          'Service format built around the person rather than funeral convention',
          'Flexible timing before or after burial, cremation, or another disposition',
          'Personal stories, music, photos, video, or tribute material used',
          'Venue chosen based on meaning, scale, or accessibility',
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
        id: 'home-vigil',
        title: 'Home Vigil',
        description:
          'A period of time where the body remains at home for family visitation, reflection, and farewell before the body is moved for final disposition. This can be part of a home funeral or arranged independently.',
        involves: [
          'Body kept at home for a defined period, usually one to three days',
          'Dry ice or cooling methods used for preservation',
          'Family and close friends visit in a private home setting',
          'Rituals, readings, or quiet time arranged as the family chooses',
          'Body transferred to a funeral home, crematory, or burial site afterward',
        ],
        considerations: [
          'State laws on home custody of the body vary',
          'Preservation and hygiene are time-sensitive responsibilities',
          'Some families find it deeply meaningful for processing grief',
          'A home funeral guide can assist with logistics and body care',
          'Can be combined with green burial, cremation, or other disposition methods',
        ],
      },
      {
        id: 'memorial-without-body',
        title: 'Memorial Service Without the Body Present',
        description:
          'A memorial service held after the body has already been cremated, buried, or otherwise handled. There is no viewing or casket present, and the focus is entirely on remembrance and tribute.',
        involves: [
          'Service held after disposition is already complete',
          'No body, casket, or urn required to be present',
          'Photos, videos, stories, and personal items used as focal points',
          'Timing is flexible - can be days, weeks, or months after the death',
          'Venue chosen based on the gathering size and personal preference',
        ],
        considerations: [
          'Allows more time for planning and travel arrangements',
          'Lower cost than a service with the body present',
          'Some families prefer the flexibility of separating the service from the logistics',
          'Can feel less formal, which may or may not suit the family',
          'Works well when family members are spread across different locations',
        ],
      },
      {
        id: 'celebrant-led-services',
        title: 'Nonreligious or Celebrant-Led Services',
        description:
          'A funeral or memorial service led by a certified celebrant or secular officiant rather than a religious leader. The service is personalized and does not follow a religious format unless the family requests it.',
        involves: [
          'Certified celebrant or secular officiant selected',
          'Service written and designed around the person and family preferences',
          'No required religious readings, prayers, or structure',
          'Can be held at any venue, indoors or outdoors',
          'Often includes personal stories, music, and tribute material chosen by the family',
        ],
        considerations: [
          'Celebrant availability varies by region',
          'Cost depends on the celebrant and level of customization',
          'Can be combined with any disposition method',
          'Some families blend secular and religious elements',
          'Works well when the person did not identify with a specific faith tradition',
        ],
      },
      {
        id: 'digital-memorials',
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
      {
        id: 'video-tribute',
        title: 'Video Tribute Services',
        description:
          'A professionally produced or family-assembled video tribute that tells the story of the person through photos, video clips, music, and narration. Often shown during a service or shared digitally afterward.',
        involves: [
          'Photos, video clips, and audio gathered from family and friends',
          'Video assembled by a professional service or created by the family',
          'Music, narration, or captions added to personalize the tribute',
          'Shown during a funeral, memorial, or celebration of life',
          'Digital copy shared with family for long-term keeping',
        ],
        considerations: [
          'Quality and cost depend on whether a professional service is used',
          'Gathering materials can take time, especially from multiple sources',
          'Works well as a centerpiece for services without the body present',
          'Can be updated or extended over time for anniversaries or remembrance',
          'Digital distribution makes it easy to share with people who could not attend',
        ],
      },
      {
        id: 'legacy-planning',
        title: 'Digital Legacy and Account Planning',
        description:
          'Planning for what happens to online accounts, social media profiles, digital files, and subscriptions after death. This is not a funeral service but an increasingly relevant part of after-death planning.',
        involves: [
          'Inventory of online accounts, subscriptions, and digital assets',
          'Legacy contact or digital executor designated where platforms allow',
          'Instructions for account closure, memorialization, or data transfer',
          'Password management or secure access documentation prepared',
          'Integration with broader estate or end-of-life planning documents',
        ],
        considerations: [
          'Platform policies for deceased users vary widely',
          'Some accounts cannot be transferred or accessed without prior setup',
          'Digital assets may have financial value that needs to be addressed',
          'Privacy preferences should be documented clearly',
          'This is best handled as part of advance planning, not after the fact',
        ],
      },
    ],
  },
  {
    category: 'Support and Guidance Services',
    description: 'Professional support and guidance resources that help families navigate alternative funeral planning and after-death logistics.',
    options: [
      {
        id: 'home-funeral-guide',
        title: 'Home Funeral Guide',
        description:
          'A trained professional who helps families care for the body at home, navigate legal requirements, and coordinate logistics for a family-directed funeral. They do not replace a funeral director but support the family through the process.',
        involves: [
          'Consultation on body care, cooling, and preparation at home',
          'Guidance on legal requirements, permits, and paperwork for the state',
          'Support with transport logistics and coordination with final disposition providers',
          'Emotional and practical support for the family during the vigil period',
          'Referrals to other providers as needed',
        ],
        considerations: [
          'Not licensed or regulated in most states - credentials vary',
          'Availability depends on location',
          'Costs vary by guide and level of involvement',
          'Can make a home funeral much more manageable for families doing it for the first time',
          'Some guides also serve as death doulas or end-of-life planners',
        ],
      },
      {
        id: 'death-doula',
        title: 'Death Doula',
        description:
          'A nonmedical professional who supports individuals and families through the end-of-life process, including planning, vigil, and after-death logistics. Also known as an end-of-life doula.',
        involves: [
          'Emotional, spiritual, and practical support before and after death',
          'Help with advance planning, legacy work, and final wishes documentation',
          'Vigil support and guidance during the dying process',
          'After-death body care guidance and family support',
          'Coordination with funeral providers, hospice, and other services',
        ],
        considerations: [
          'Not a licensed medical or legal professional',
          'Training and certification programs vary in scope and recognition',
          'Costs range widely depending on services and duration of involvement',
          'Can be especially helpful for families choosing a home-based or alternative path',
          'Some death doulas specialize in specific cultural or spiritual traditions',
        ],
      },
      {
        id: 'funeral-consumer-advocacy',
        title: 'Funeral Consumer Advocacy Organizations',
        description:
          'Nonprofit organizations that provide information, pricing transparency, and consumer protection resources related to funeral planning. They help families understand their rights and options.',
        involves: [
          'Access to funeral pricing surveys and cost comparisons',
          'Information on consumer rights under the FTC Funeral Rule',
          'Guidance on alternative options and provider types',
          'Complaint filing resources for funeral-related issues',
          'Educational materials on funeral planning and decision-making',
        ],
        considerations: [
          'These are informational and advocacy resources, not service providers',
          'Membership or donation may be requested by some organizations',
          'Local funeral consumer alliances may exist in some states',
          'Helpful for families who want to verify pricing or understand their rights',
          'Can be a useful starting point before contacting providers directly',
        ],
      },
      {
        id: 'green-burial-council',
        title: 'Green Burial Council Certification',
        description:
          'The Green Burial Council certifies burial grounds, funeral homes, and products that meet specific environmental standards. Their certification helps families identify providers committed to green practices.',
        involves: [
          'Certification of burial grounds at different conservation levels',
          'Certification of funeral homes that offer green burial services',
          'Product certification for biodegradable caskets, shrouds, and urns',
          'Public directory of certified providers and burial grounds',
          'Standards for environmental sustainability in funeral practices',
        ],
        considerations: [
          'Certification is voluntary, not required by law',
          'Not all green burial providers are GBC-certified',
          'Different certification levels indicate different levels of environmental commitment',
          'The directory is a useful tool for finding verified green options',
          'Certification standards are updated periodically',
        ],
      },
    ],
  },
];


const planningChecklist = {
  title: 'Planning Checklist for Alternative Services',
  purpose:
    'Prepare an alternative or uncommon after-death service plan that accounts for service-specific logistics, legal conditions, and the standard information others will need to carry it out.',
  sections: [
    {
      title: 'Service Decisions',
      items: [
        'Choose the preferred alternative disposition or service path',
        'Choose a backup option in case the first choice is not available',
        'Decide where the disposition and any service will take place',
        'Decide whether there will be a vigil, memorial, witness event, or no ceremony',
        'Identify the person responsible for carrying out the plan',
        'Note any religious, cultural, or family instructions that should shape the plan',
      ],
    },
    {
      title: 'Alternative-Service Logistics',
      items: [
        'Confirm whether the option is allowed in the relevant state and under what conditions',
        'Identify the providers, guides, cemeteries, facilities, or donation programs needed for the chosen path',
        'Ask what must happen immediately after death to preserve the option',
        'Record refrigeration, holding, transfer, or body-care requirements if applicable',
        'Document who to contact first, second, third',
        'Include a transport plan if the provider or place of disposition is not local',
      ],
    },
    {
      title: 'Legal and Documentation',
      items: [
        'Document disposition wishes clearly in the right forms',
        'Assign executor or decision authority',
        'Create or update will, advance directive, and any authorization forms',
        'Record full legal identity details and where key documents are stored',
        'Note whether permits, medical approvals, or funeral director involvement may be required',
        'Identify who will begin the death certificate process',
      ],
    },
    {
      title: 'Standard Planning Steps',
      items: [
        'Write clear, step-by-step instructions others can follow',
        'Provide provider contact information and any prepaid account details',
        'Make sure the responsible person understands both the primary and backup plan',
        'Note that Social Security, benefit notifications, and account follow-up will still be required later',
        'Keep all documents accessible and known',
        'Review and update the plan periodically',
      ],
    },
  ],
};

const currentLossChecklist = {
  title: 'Immediate Need Checklist for Alternative Services',
  purpose:
    'Protect the ability to carry out an alternative after-death service while also covering the standard actions that still need attention after a death occurs.',
  sections: [
    {
      title: 'Immediate Decisions',
      items: [
        'Determine whether the person left a plan or written wishes and follow them',
        'Confirm the preferred service path and a backup option if needed',
        'Decide who will manage decisions and communication',
        'Decide whether local, out-of-state, or facility transfer will be required',
        'Confirm whether a vigil, witness event, service, or memorial needs immediate planning',
      ],
    },
    {
      title: 'Alternative-Service Logistics',
      items: [
        'Confirm the death through the proper authority and identify who has custody of the body',
        'Verify that the chosen option is allowed in the state and currently available',
        'Contact the specific provider, guide, facility, cemetery, or donation program that can handle the chosen path',
        'Arrange transfer to the correct location without authorizing services you do not want',
        'Coordinate timing, refrigeration, or preservation requirements that could affect the option',
        'Keep costs, commitments, and instructions in writing',
      ],
    },
    {
      title: 'Legal and Documentation',
      items: [
        'Confirm who has legal authority to direct disposition',
        'Begin the death certificate and permit process',
        'Gather identification, written wishes, and any required authorizations',
        'Confirm whether additional approvals are needed for transport, donation, home care, or the chosen service',
        'Notify Social Security or confirm provider will',
        'Identify any benefits, accounts, or obligations to address',
      ],
    },
    {
      title: 'Standard Process Steps',
      items: [
        'Secure home, property, dependents, and immediate responsibilities',
        'Communicate clearly with those involved',
        'Do not commit before confirming legality, timing, and provider availability',
        'Track costs, conversations, and documents as you go',
        'Proceed once the path is verified and the needed logistics are in place',
      ],
    },
  ],
};

const generalChecklist = {
  title: 'General After Death Checklist',
  purpose:
    'Use this checklist for the broader process after a death, regardless of service type. It focuses on common tasks, notifications, documentation, and follow-through from the first urgent steps through final affairs.',
  sections: [
    {
      title: 'First 24 Hours',
      items: [
        {
          label: 'Get a legal pronouncement of death',
          text: 'Call 911 if at home. Hospital or hospice staff will handle this.',
        },
        {
          label: 'Arrange transportation',
          text: 'Contact the funeral home, cremation provider, cemetery, or other disposition service handling the body.',
        },
        {
          label: 'Notify close family and friends',
          text: 'Start with immediate family. Split calls if needed.',
        },
        {
          label: 'Arrange care for dependents',
          text: 'Children, pets, or adults who cannot care for themselves.',
        },
        {
          label: 'Secure the property',
          text: 'Lock home and vehicles. Bring in deliveries. Clean out refrigerator.',
        },
        {
          label: 'Check for organ donation wishes',
          text: "Check driver's license or advance directive. Act quickly.",
        },
      ],
    },
    {
      title: 'First Week',
      items: [
        {
          label: 'Obtain death certificates',
          text: 'Request 6 to 10 copies. You will need many.',
        },
        {
          label: 'Find the will and identify the executor',
          text: 'Search desk, safe deposit box, or important papers.',
        },
        {
          label: 'Notify the deceased employer',
          text: 'Ask about owed pay, benefits, and life insurance.',
        },
        {
          label: 'Notify extended family and friends',
          text: 'Personal calls, emails, or social media.',
        },
        {
          label: 'Start mail forwarding',
          text: 'Visit your local post office.',
        },
      ],
    },
    {
      title: 'Final Arrangements',
      items: [
        {
          label: 'Review any prepaid plans',
          text: 'Check for written wishes or prepaid arrangements related to final disposition or services.',
        },
        {
          label: 'Locate any documentation',
          text: 'Prepaid contracts, cemetery paperwork, military eligibility papers, or service instructions.',
        },
        {
          label: 'Decide on final disposition and service preferences',
          text: 'Use known wishes, family needs, timing, and availability to determine the path forward.',
        },
        {
          label: 'Choose provider or providers',
          text: 'Ask for price lists, next steps, and required paperwork before moving forward.',
        },
        {
          label: 'Choose location and date',
          text: 'Funeral home, house of worship, cemetery, home, outdoors, or virtual.',
        },
        {
          label: 'Select an officiant',
          text: 'Clergy, celebrant, family member, or self-led.',
        },
        {
          label: 'Plan the program',
          text: 'Music, readings, eulogy, photos, and video tribute.',
        },
        {
          label: 'Write the obituary',
          text: 'Post online, in newspapers, or both.',
        },
        {
          label: 'Handle logistics',
          text: 'Transportation, flowers, food, venue, and seating.',
        },
      ],
    },
    {
      title: 'Government and Benefits',
      items: [
        {
          label: 'Social Security',
          text: 'Call 1-800-772-1213. Funeral homes often handle this.',
        },
        {
          label: 'Veterans Affairs',
          text: 'Apply for benefits if the deceased was a veteran.',
        },
        {
          label: 'DMV',
          text: "Cancel driver's license to help prevent identity theft.",
        },
        {
          label: 'Passport Office',
          text: 'Return or cancel the passport.',
        },
        {
          label: 'Unemployment office',
          text: 'Notify them if applicable.',
        },
      ],
    },
    {
      title: 'Financial and Accounts',
      items: [
        {
          label: 'Banks and credit unions',
          text: 'Notify them and handle joint accounts or payable-on-death accounts.',
        },
        {
          label: 'Life insurance',
          text: 'File claims with policy numbers and a death certificate.',
        },
        {
          label: 'Financial advisors and brokers',
          text: 'Determine beneficiaries and next steps.',
        },
        {
          label: 'Mortgage provider',
          text: 'Notify them of the death.',
        },
        {
          label: 'Credit card companies',
          text: 'Close accounts or remove the deceased name.',
        },
        {
          label: 'Credit bureaus',
          text: 'Notify one so they can alert the others.',
        },
        {
          label: 'Pension providers',
          text: 'Claim survivor benefits if applicable.',
        },
      ],
    },
    {
      title: 'Insurance and Subscriptions',
      items: [
        {
          label: 'Health, home, and auto insurance',
          text: 'Terminate or update policies as needed.',
        },
        {
          label: 'Cancel subscriptions',
          text: 'Streaming, magazines, gyms, and clubs.',
        },
        {
          label: 'Cancel utilities',
          text: 'If they are in the deceased name.',
        },
        {
          label: 'Memberships',
          text: 'Churches, unions, and associations.',
        },
      ],
    },
    {
      title: 'Digital and Online',
      items: [
        {
          label: 'Social media',
          text: 'Close or memorialize accounts as needed.',
        },
        {
          label: 'Email accounts',
          text: 'Close them to help prevent identity theft.',
        },
        {
          label: 'Loyalty programs',
          text: 'Transfer or cancel frequent flyer or buyer points.',
        },
        {
          label: 'Online accounts',
          text: 'Delete or memorialize them as needed.',
        },
      ],
    },
    {
      title: 'Estate Settlement (Weeks to Months)',
      items: [
        {
          label: 'File the will at probate court',
          text: 'Start the probate process.',
        },
        {
          label: 'Identify the executor',
          text: 'If named in the will, they manage the estate.',
        },
        {
          label: 'Inventory all assets',
          text: 'Bank accounts, property, vehicles, investments, and belongings.',
        },
        {
          label: 'Track down all assets',
          text: 'Search tax returns, mail, and safe deposit boxes.',
        },
        {
          label: 'List all bills and debts',
          text: 'Mortgage, taxes, utilities, and credit cards.',
        },
        {
          label: 'Open an estate bank account',
          text: 'Use it for incoming funds and payments.',
        },
        {
          label: 'Pay debts in proper order',
          text: 'Follow legal priority and do not pay them alone.',
        },
        {
          label: 'File final tax returns',
          text: 'For the deceased and the estate.',
        },
        {
          label: 'Distribute assets',
          text: 'To beneficiaries according to the will or trust.',
        },
        {
          label: 'Settle any trusts',
          text: 'Work with legal or financial advisors.',
        },
      ],
    },
    {
      title: 'What NOT to Do',
      items: [
        {
          label: 'Do not give away items before probate',
          text: 'They may belong to the estate.',
        },
        {
          label: 'Do not sell property',
          text: 'Wait until the will is reviewed.',
        },
        {
          label: 'Do not let someone move in',
          text: 'Wait until probate is settled.',
        },
        {
          label: 'Do not pay creditors alone',
          text: 'Follow the proper legal order.',
        },
        {
          label: 'Do not rush decisions',
          text: 'Estate settlement takes time, and it is okay to pause.',
        },
      ],
    },
    {
      title: 'Take Care of Yourself',
      items: [
        {
          label: 'Ask for help',
          text: 'Lean on friends, family, and professionals.',
        },
        {
          label: 'Take breaks',
          text: 'Grief is exhausting.',
        },
        {
          label: 'Go slow',
          text: 'You do not have to do everything at once.',
        },
        {
          label: 'Seek support',
          text: 'Reach out to grief counselors, support groups, or hotlines.',
        },
      ],
    },
  ],
  tipTitle: 'Keep in Mind',
  tipText:
    'Executor duties in the weeks-to-months phase can run up to a year to fully close out, but initiating contact with an attorney early helps keep that process on track.',
};

const checklistPageSections = [
  {
    id: 'alternative-planning-checklist',
    eyebrow: 'Planning Ahead',
    title: 'Alternative planning checklist',
    description:
      'Alternative and uncommon services can require more planning before a death because availability, timing, legal conditions, and provider logistics may affect what is possible. This checklist focuses on those service-specific needs while also covering the standard planning steps that help others carry the plan out.',
    checklist: planningChecklist,
  },
  {
    id: 'immediate-need-checklist',
    eyebrow: 'Recent Loss',
    title: 'Immediate need checklist',
    description:
      'Alternative and uncommon services can be harder to navigate after a death because transport, timing, provider access, and legal conditions can quickly shape what remains possible. This checklist focuses on protecting those options while also covering the standard actions that still need immediate attention.',
    checklist: currentLossChecklist,
  },
  {
    id: 'general-complete-checklist',
    eyebrow: 'Final Affairs',
    title: 'General complete checklist',
    description:
      <>This broader checklist is not tied to a specific service type. It is meant to<br />help bring more clarity to the process after a death, from the first<br />urgent steps through final affairs, while recognizing that exact needs can still vary by location and individual circumstance.</>,
    checklist: generalChecklist,
  },
];

const checklistLinks = {
  planning: {
    path: '/after-death-steps#alternative-planning-checklist',
    title: 'Alternative planning checklist',
    description:
      'Open the planning checklist for alternative or uncommon services, including option-specific logistics and the standard preparation steps.',
    linkLabel: 'Open the planning checklist',
  },
  immediate: {
    path: '/after-death-steps#immediate-need-checklist',
    title: 'Immediate need checklist',
    description:
      'Open the recent-loss checklist for alternative or uncommon services, including immediate logistics and the standard actions that still need attention.',
    linkLabel: 'Open the immediate need checklist',
  },
  general: {
    path: '/after-death-steps#general-complete-checklist',
    title: 'General complete checklist',
    description:
      'Open the broader checklist for the overall process after a death, from urgent steps through final affairs.',
    linkLabel: 'Open the complete checklist',
  },
};


const navItems = [
  { path: '/funeralplanning', label: 'When You Have Time' },
  { path: '/when-time-has-run-out', label: 'When Time Has Run Out' },
  { path: '/after-death-steps', label: 'After Death Checklist' },
  { path: '/exploreoptions', label: 'Explore Your Options' },
];

const utilityNavItems = [
  { path: '/exploreoptions', label: 'Explore Alternative Service Options' },
  { path: '/after-death-steps', label: 'After Death Checklist' },
];

const desktopNavLeft = [
  { path: '/funeralplanning', label: 'When You Have Time' },
];

const desktopNavRight = [
  { path: '/when-time-has-run-out', label: 'When Time Has Run Out' },
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
        {subtitle ? <p className="page-hero-sub">{subtitle}</p> : null}
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

function getChecklistSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function getChecklistFileName(title, extension = 'doc') {
  return `${getChecklistSlug(title) || 'checklist'}.${extension}`;
}

function getChecklistStorageKey(title) {
  return `goodbyeyou-checklist-progress:${getChecklistSlug(title) || 'checklist'}`;
}

function getChecklistItemKey(sectionTitle, index) {
  return `${sectionTitle}::${index}`;
}

function getChecklistItemText(item) {
  if (typeof item === 'string') {
    return item;
  }

  return [item.label, item.text].filter(Boolean).join(' - ');
}

function readChecklistProgress(title) {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(getChecklistStorageKey(title));
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    return {};
  }
}

function writeChecklistProgress(title, progress) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(getChecklistStorageKey(title), JSON.stringify(progress));
  } catch (error) {
    // Ignore storage failures so the checklist still works in-memory.
  }
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildChecklistDocumentHtml(checklist, checkedItems, { autoPrint = false } = {}) {
  const notesTitle = checklist.notesTitle || 'Notes';
  const notesLines = checklist.notesLines || 4;
  const sectionsHtml = checklist.sections.map((section) => {
    const itemsHtml = section.items.map((item, index) => {
      const itemKey = getChecklistItemKey(section.title, index);
      const isChecked = Boolean(checkedItems[itemKey]);
      const noteHtml = typeof item === 'object' && item.note
        ? `<p class="item-note">${escapeHtml(item.note)}</p>`
        : '';
      const detailsHtml = typeof item === 'object' && item.details?.length
        ? `<ul class="item-details">${item.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join('')}</ul>`
        : '';

      return `
        <li class="item">
          <div class="item-row">
            <span class="item-check">${isChecked ? '[x]' : '[ ]'}</span>
            <div class="item-copy">
              <p class="item-text">${escapeHtml(getChecklistItemText(item))}</p>
              ${noteHtml}
              ${detailsHtml}
              <div class="item-writein-line"></div>
            </div>
          </div>
        </li>
      `;
    }).join('');

    return `
      <section class="section">
        <h2>${escapeHtml(section.title)}</h2>
        ${section.description ? `<p class="section-description">${escapeHtml(section.description)}</p>` : ''}
        <ul class="item-list">${itemsHtml}</ul>
      </section>
    `;
  }).join('');

  const tipHtml = checklist.tipTitle && checklist.tipText
    ? `
      <section class="tip">
        <p class="eyebrow">${escapeHtml(checklist.tipTitle)}</p>
        <p>${escapeHtml(checklist.tipText)}</p>
      </section>
    `
    : '';

  const notesHtml = Array.from({ length: notesLines }, () => '<div class="notes-line"></div>').join('');
  const printScript = autoPrint
    ? `<script>window.onload=function(){setTimeout(function(){window.focus();window.print();},250)};window.onafterprint=function(){window.close();};</script>`
    : '';

  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(checklist.title)}</title>
  <style>
    body { font-family: Georgia, 'Times New Roman', serif; color: #1f2230; margin: 36px; line-height: 1.45; }
    h1 { font-size: 22px; margin: 0 0 10px; }
    h2 { font-size: 15px; margin: 0 0 8px; }
    p { margin: 0; }
    .purpose { margin-bottom: 24px; font-size: 12.5px; color: #52586d; }
    .section { margin-top: 26px; }
    .section-description { margin-bottom: 12px; font-size: 11.5px; color: #667085; }
    .item-list { list-style: none; padding: 0; margin: 0; }
    .item { margin-bottom: 12px; }
    .item-row { display: table; width: 100%; }
    .item-check, .item-copy { display: table-cell; vertical-align: top; }
    .item-check { width: 36px; font-size: 13px; }
    .item-text { font-size: 12.5px; }
    .item-note { margin-top: 5px; font-size: 11px; color: #667085; }
    .item-details { margin: 7px 0 0 18px; padding: 0; }
    .item-details li { margin: 2px 0; font-size: 11px; }
    .item-writein-line { margin-top: 8px; border-bottom: 1px solid #c9cfdb; height: 10px; }
    .eyebrow { margin-bottom: 6px; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #4b4f75; }
    .tip { margin-top: 28px; padding-top: 18px; border-top: 1px solid #d9deea; }
    .notes { margin-top: 28px; padding-top: 18px; border-top: 1px solid #d9deea; }
    .notes-line { height: 20px; border-bottom: 1px solid #c9cfdb; }
  </style>
  ${printScript}
</head>
<body>
  <h1>${escapeHtml(checklist.title)}</h1>
  <p class="purpose">${escapeHtml(checklist.purpose)}</p>
  ${sectionsHtml}
  ${tipHtml}
  <section class="notes">
    <p class="eyebrow">${escapeHtml(notesTitle)}</p>
    ${notesHtml}
  </section>
</body>
</html>`;
}

function saveChecklistPdf(checklist, checkedItems) {
  const printWindow = window.open('', '_blank', 'noopener,noreferrer');
  if (!printWindow) {
    return;
  }

  printWindow.document.open();
  printWindow.document.write(buildChecklistDocumentHtml(checklist, checkedItems, { autoPrint: true }));
  printWindow.document.close();
}

function downloadChecklistWord(checklist, checkedItems) {
  const blob = new Blob([`\ufeff${buildChecklistDocumentHtml(checklist, checkedItems)}`], {
    type: 'application/msword;charset=utf-8',
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = getChecklistFileName(checklist.title, 'doc');
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

function ChecklistCard({ checklist, className = '' }) {
  const notesTitle = checklist.notesTitle || 'Notes';
  const notesLines = checklist.notesLines || 4;
  const [checkedItems, setCheckedItems] = useState(() => readChecklistProgress(checklist.title));

  useEffect(() => {
    setCheckedItems(readChecklistProgress(checklist.title));
  }, [checklist.title]);

  useEffect(() => {
    writeChecklistProgress(checklist.title, checkedItems);
  }, [checklist.title, checkedItems]);

  const toggleChecklistItem = (sectionTitle, index) => {
    const itemKey = getChecklistItemKey(sectionTitle, index);

    setCheckedItems((current) => {
      const next = { ...current };

      if (next[itemKey]) {
        delete next[itemKey];
      } else {
        next[itemKey] = true;
      }

      return next;
    });
  };

  return (
    <div className={`checklist-card ${className}`.trim()}>
      <div className="checklist-header">
        <h3 className="checklist-title">{checklist.title}</h3>
        <div className="checklist-actions">
          <button
            type="button"
            className="checklist-download"
            onClick={() => saveChecklistPdf(checklist, checkedItems)}
          >
            Save PDF
          </button>
          <button
            type="button"
            className="checklist-download"
            onClick={() => downloadChecklistWord(checklist, checkedItems)}
          >
            Download Word
          </button>
        </div>
      </div>
      <div className="checklist-purpose">
        <p className="checklist-label">Purpose</p>
        <p className="checklist-purpose-text">{checklist.purpose}</p>
      </div>
      {checklist.sections.map((section) => (
        <div className="checklist-group" key={section.title}>
          <h4>{section.title}</h4>
          {section.description ? <p className="checklist-group-description">{section.description}</p> : null}
          <ul className="checklist-list">
            {section.items.map((item, index) => (
              <li key={`${section.title}-${index}`}>
                <div className="checklist-item-row">
                  <label className="checklist-item">
                    <input
                      type="checkbox"
                      className="checklist-checkbox"
                      checked={Boolean(checkedItems[getChecklistItemKey(section.title, index)])}
                      onChange={() => toggleChecklistItem(section.title, index)}
                    />
                    <span className="checklist-item-copy">
                      {typeof item === 'string' ? (
                        item
                      ) : (
                        <>
                          {item.label ? <strong>{item.label}</strong> : null}
                          {item.text ? (
                            <>
                              {item.label ? ' - ' : null}
                              {item.text}
                            </>
                          ) : null}
                          {item.note ? <span className="checklist-item-note">{item.note}</span> : null}
                        </>
                      )}
                    </span>
                  </label>
                  {typeof item === 'object' && item.details?.length ? (
                    <ul className="checklist-item-sublist">
                      {item.details.map((detail, detailIndex) => (
                        <li key={`${section.title}-${index}-${detailIndex}`}>{detail}</li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="checklist-item-writein" aria-hidden="true">
                    <span className="checklist-item-writein-line" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {checklist.tipTitle && checklist.tipText ? (
        <div className="checklist-tip">
          <p className="checklist-label">{checklist.tipTitle}</p>
          <p className="checklist-purpose-text">{checklist.tipText}</p>
        </div>
      ) : null}
      <div className="checklist-notes">
        <p className="checklist-label">{notesTitle}</p>
        <div className="checklist-notes-lines" aria-hidden="true">
          {Array.from({ length: notesLines }, (_, index) => (
            <span className="checklist-notes-line" key={`${notesTitle}-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChecklistLinkCard({ title, description, path, linkLabel }) {
  return (
    <div className="checklist-link-card">
      <p className="checklist-label">Checklist</p>
      <h3 className="checklist-link-title">{title}</h3>
      <p className="checklist-purpose-text">{description}</p>
      <Link to={path} className="checklist-link-action">
        {linkLabel} &rarr;
      </Link>
    </div>
  );
}

function normalizeCtaLabel(label) {
  if (label === 'When You Have Time') {
    return 'Planning for the future';
  }

  if (label === 'When Time Has Run Out') {
    return 'Planning for a recent death';
  }

  if (label === 'Open Resources' || label === 'All Resources') {
    return 'After Death Checklist';
  }

  return label;
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

function EditorialSections({ sections, className = '' }) {
  return (
    <section className={`section section-editorial ${className}`.trim()}>
      <div className="container">
        <div className="editorial-stack">
          {sections.map((story, index) => (
            <article className={`editorial-section${index % 2 === 1 ? ' reverse' : ''}`} key={story.imageLabel || story.eyebrow || index}>
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

function CTASection({ title, description, primary, secondary, note, textLinks, className = '' }) {
  const actionLinks = textLinks?.length
    ? textLinks
    : [primary, secondary]
        .filter(Boolean)
        .map((item, index) => ({
          path: item.path,
          label: normalizeCtaLabel(item.label),
          arrow: index === 0 ? 'left' : 'right',
        }));

  return (
    <section className={`section section-cta ${className}`.trim()}>
      <div className="container">
        <div className="cta-box">
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
          {actionLinks.length ? (
            <div className="cta-actions cta-actions-text">
              {actionLinks.map((item, index) => (
                <React.Fragment key={item.path}>
                  <Link to={item.path} className="cta-text-link">
                    {item.arrow === 'left' ? <span className="cta-text-link-arrow" aria-hidden="true">&larr;</span> : null}
                    <span>{item.label}</span>
                    {item.arrow === 'right' ? <span className="cta-text-link-arrow" aria-hidden="true">&rarr;</span> : null}
                  </Link>
                  {index < actionLinks.length - 1 ? <span className="cta-text-separator" aria-hidden="true">|</span> : null}
                </React.Fragment>
              ))}
            </div>
          ) : null}
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
            <img src="/logo-full-cropped.png" alt="Goodbye You" className="nav-logo-image" />
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
              <img src="/logo-wordmark.png" alt="Goodbye You" className="footer-logo-image" />
            </Link>
            <p>
              Alternative funeral planning resources with state-specific information. Helpful next steps and guidance for all.
            </p>
          </div>
          <div className="footer-col">
            <h4>GoodbyeYou</h4>
            <ul>
              <li>
                <Link to="/funeralplanning">When You Have Time</Link>
              </li>
              <li>
                <Link to="/when-time-has-run-out">When Time Has Run Out</Link>
              </li>
              <li>
                <Link to="/after-death-steps">After Death Checklist</Link>
              </li>
              <li>
                <Link to="/exploreoptions">Explore Your Options</Link>
              </li>
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
      title: 'Resources for planning uncommon after-death services',
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
      imageLabel: 'When Time Has Run Out',
      imageLink: { path: '/when-time-has-run-out', label: 'Get Started Now' },
      title: <>Resources for arranging uncommon services<br />for<br />a recent loss</>,
      description: '',
      items: [
        'What to do first',
        'State-specific options and logistics',
        'Provider and document pathways',
      ],
      link: { path: '/when-time-has-run-out', label: 'Direction when you are experiencing a loss' },
    },
    {
      eyebrow: 'Support',
      variant: 'providers',
      image: '/questions-w.png',
      imageLabel: 'After Death Checklist',
      imageLink: { path: '/after-death-steps', label: 'Navigate the Steps' },
      title: <>Know what to do<br />when a loss occurs</>,
      description: '',
      items: [
        'Get organized with the checklist',
        'Who to communicate with',
        'Provider paths when needed',
      ],
      link: { path: '/after-death-steps', label: 'Steps to take when a death occurs' },
    },
  ];

  return (
    <EditorialSections sections={sections} className="section-editorial--home" />
  );
}

function HomePage() {
  useDocumentTitle('GoodbyeYou - Alternative Funeral Planning Resources');
  useMetaDescription('Find alternative funeral options by state, including home funeral, green burial, aquamation, and other non-traditional after-death services with clear next steps.');

  const homeGuidanceItems = [
    {
      title: 'Select your state',
      description:
        'Access the specific legal and logistical requirements for the state where the service will occur.',
      icon: <img src="/Select%20your%20state.png" alt="" className="home-guidance-icon-image" />,
    },
    {
      title: 'View integrated logistics',
      description:
        'Review state-specific availability, service provider information and regulatory resources in one unified interface as needed throughout the process.',
      icon: <img src="/View%20integrated%20logistics.png" alt="" className="home-guidance-icon-image" />,
    },
    {
      title: 'Get Organized',
      description:
        'Navigate comprehensive checklists, designed for clarity, to walk you through every step, from immediate essential tasks to final arrangements.',
      icon: <img src="/Access%20regulatory%20resources.png" alt="" className="home-guidance-icon-image" />,
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
            <p className="home-hero-sub">Checklists, state-specific resources, and provider information for alternative funeral options and next steps after a death, so you can move forward with clarity.</p>
          </div>
        </div>
      </section>

      <section className="section home-plan-preview" id="support">
        <div className="container">
          <p className="section-eyebrow" style={{ textAlign: 'center', marginBottom: '32px' }}>Navigate the Process</p>
          <p className="home-plan-preview-intro">
            Navigate uncommon after-death services with state-specific regulations
            and clear steps for both pre-planning and immediate-need scenarios,
            from the first call to final arrangements.
          </p>
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
  useDocumentTitle('When Time Has Run Out - Immediate After-Death Steps - GoodbyeYou');
  useMetaDescription('Immediate steps after a death for alternative funeral arrangements. Search your state for checklists, providers, and documents for uncommon services.');

  return (
    <>
      <PageHero
        eyebrow="When Time Has Run Out"
        titleClassName="page-hero-title--centered page-hero-title--recent-loss"
        title={<>Resources for arranging<br />uncommon services<br />for a recent loss</>}
      />

      <section className="section section-state-search-followup">
        <div className="container">
          <SectionIntro
            title="State Search"
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

      <CTASection
        className="section-cta-tight-top"
        title="Choose the path for your situation"
        primary={{ path: '/funeralplanning', label: 'When You Have Time' }}
        secondary={{ path: '/after-death-steps', label: 'Open Resources' }}
      />
    </>
  );
}

function ExploreOptionsPage() {
  useDocumentTitle('Explore Alternative Funeral Options - GoodbyeYou');
  useMetaDescription('Browse alternative funeral services including home funeral, green burial, aquamation, natural organic reduction, whole-body donation, and more.');

  return (
    <>
      <PageHero
        eyebrow="Explore Your Options"
        titleClassName="page-hero-title--centered page-hero-title--explore"
        title="Alternative funeral service options"
      />

      <section className="section section-state-search-followup">
        <div className="container">
          <p className="section-lead">
            The following is a comprehensive list of legally available after-death options and pathways that are actually offered somewhere in the United States. Not every option is available in every state, and availability, cost, and logistics vary by location and provider.
          </p>

          {optionCategories.map((cat) => (
            <div className="option-category" key={cat.category}>
              <div className="option-category-header">
                <h2 className="option-category-title">{cat.category}</h2>
                <p className="option-category-description">{cat.description}</p>
              </div>
              <div className="option-detail-list">
                {cat.options.map((option) => (
                  <div className="option-detail" id={option.id} key={option.id}>
                    <div className="option-detail-header">
                      <h3>{option.title}</h3>
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
          ))}
        </div>
      </section>

      <CTASection
        title="Search your state for resources"
        primary={{ path: '/funeralplanning', label: 'When You Have Time' }}
        secondary={{ path: '/when-time-has-run-out', label: 'When Time Has Run Out' }}
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
        title={<>Resources for planning<br />uncommon after-death services</>}
      />

      <section className="section section-state-search-followup">
        <div className="container">
          <SectionIntro
            title="State Search"
            subtitle={<>Search or select a state to view uncommon service logistics and resources.<br />Explore available options, state regulations, and local providers.</>}
          />
          <USMapInteractive />
          <StateSearchBlock
            placeholder="Enter the state you want to plan in"
            buttonLabel="Open State Page"
            variant="inline-search"
          />
        </div>
      </section>

      <CTASection
        title="Dealing with a recent loss?"
        primary={{ path: '/when-time-has-run-out', label: 'When Time Has Run Out' }}
        secondary={{ path: '/after-death-steps', label: 'Open Resources' }}
      />
    </>
  );
}

function StateDetailLayout({ eyebrow, title, intro, sections, hub, cta, checklistLink }) {
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
            <aside className={`sdl-sidebar${checklistLink ? ' sdl-sidebar--with-checklist' : ''}`}>
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
              {checklistLink ? (
                <ChecklistLinkCard
                  title={checklistLink.title}
                  description={checklistLink.description}
                  path={checklistLink.path}
                  linkLabel={checklistLink.linkLabel}
                />
              ) : null}
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
      checklistLink={checklistLinks.planning}
      cta={{
        title: 'Dealing with a recent loss?',
        primary: { path: `/immediate/${hub.id}`, label: 'When Time Has Run Out' },
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
    return <Navigate to="/when-time-has-run-out" replace />;
  }

  return (
    <StateDetailLayout
      eyebrow="When Time Has Run Out"
      title={`Immediate Logistics: ${hub.region}`}
      intro={hub.immediate ? hub.immediate.intro : hub.summary}
      sections={hub.immediate ? hub.immediate.sections : []}
      hub={hub}
      checklistLink={checklistLinks.immediate}
      cta={{
        title: 'Choose the path for your situation',
        primary: { path: `/states/${hub.id}`, label: 'When You Have Time' },
        secondary: { path: '/after-death-steps', label: 'Open Resources' },
      }}
    />
  );
}

function ResourcesPage() {
  useDocumentTitle('After Death Checklist - GoodbyeYou');
  useMetaDescription('Download planning, immediate-need, and general after-death checklists, plus follow-up resources covering what to do first, who to contact, documents, and provider pathways.');

  return (
    <>
      <PageHero
        eyebrow="After Death"
        titleClassName="page-hero-title--centered"
        title="After Death Checklist"
      />

      <section className="section">
        <div className="container">
          <div className="checklist-page-stack">
            {checklistPageSections.map((entry) => (
              <div className="checklist-page-section" id={entry.id} key={entry.id}>
                <SectionIntro
                  eyebrow={entry.eyebrow}
                  title={entry.title}
                  subtitle={entry.description}
                />
                <ChecklistCard checklist={entry.checklist} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Find what you need"
        description="Choose the path for your situation"
        textLinks={[
          { path: '/funeralplanning', label: 'Planning for the future', arrow: 'left' },
          { path: '/when-time-has-run-out', label: 'Planning for a recent death', arrow: 'right' },
        ]}
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
        <Route path="/when-time-has-run-out" element={<OptionsPage />} />
        <Route path="/exploreoptions" element={<ExploreOptionsPage />} />
        <Route path="/after-death-steps" element={<ResourcesPage />} />
        <Route path="/checklists" element={<Navigate to="/after-death-steps" replace />} />
        {/* Redirects from old URLs */}
        <Route path="/funeraloptions" element={<Navigate to="/funeralplanning" replace />} />
        <Route path="/planning-hubs" element={<Navigate to="/funeralplanning" replace />} />
        <Route path="/planning-hubs/:hubId" element={<Navigate to="/funeralplanning" replace />} />
        <Route path="/funeral-services" element={<Navigate to="/when-time-has-run-out" replace />} />
        <Route path="/afterdeathguide" element={<Navigate to="/when-time-has-run-out" replace />} />
        <Route path="/options" element={<Navigate to="/when-time-has-run-out" replace />} />
        <Route path="/options/:optionId" element={<Navigate to="/when-time-has-run-out" replace />} />
        <Route path="/plan-ahead" element={<Navigate to="/funeralplanning#future-planning" replace />} />
        <Route path="/planning-now" element={<Navigate to="/when-time-has-run-out" replace />} />
        <Route path="/resources" element={<Navigate to="/after-death-steps" replace />} />
        <Route path="/vault" element={<Navigate to="/after-death-steps" replace />} />
        <Route path="/providers" element={<Navigate to="/funeralplanning" replace />} />
        <Route path="/legal-resources" element={<Navigate to="/funeralplanning" replace />} />
        <Route path="/legal" element={<Navigate to="/funeralplanning" replace />} />
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

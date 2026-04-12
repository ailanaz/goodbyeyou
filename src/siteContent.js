export const hubDirectory = [
  {
    id: 'illinois',
    region: 'Illinois',
    title: 'Illinois Planning',
    summary:
      'Alternative funeral options, next steps, provider paths, and official resources for arrangements happening in Illinois.',
    definition:
      'Use Illinois Planning for alternative funeral choices, timing, documents, providers, and supporting resources tied to Illinois.',
    tags: ['Home funeral', 'Green burial', 'Documents'],
    searchTerms: ['Illinois', 'IL', 'Chicago', 'Springfield'],
    modules: [
      {
        kicker: 'Options',
        title: 'Alternative services in Illinois',
        description:
          'See the service types people may consider in Illinois, including home funeral, green burial, aquamation, whole-body donation, and other non-traditional paths.',
      },
      {
        kicker: 'Steps',
        title: 'Documents, timing, and next steps',
        description:
          'Use this page to work through permits, paperwork, transport, disposition questions, and the order of what needs to happen.',
      },
      {
        kicker: 'Support',
        title: 'Providers, resources, and official support',
        description:
          'Move from state information into providers, resources, and official support so the arrangement keeps moving.',
      },
    ],
    focusAreas: [
      'Alternative options that may be available in Illinois',
      'Next steps and timing for Illinois arrangements',
      'Provider paths, official resources, and document needs',
      'Questions to settle before the arrangement is finalized',
    ],
    note:
      'Start here when the arrangements are happening in Illinois or when your future plans depend on Illinois providers, paperwork, and service availability.',
    planning: {
      intro: 'Alternative after-death options, providers, state-specific considerations and more.',
      sections: [
        {
          title: 'Availability: Uncommon Service Menu',
          items: [
            { label: 'Legal Status', description: 'Home funeral, green burial, and aquamation are authorized in Illinois. Whole-body donation is available through approved facilities.' },
            { label: 'Status of Legislation', description: 'No pending legislation restricting current alternative options. Illinois permits family-directed disposition with proper documentation.' },
          ],
        },
        {
          title: 'Explore Options',
          items: [
            { label: 'Method Deep Dives', description: 'Links to technical descriptions of home funeral care, green burial preparation, aquamation processing, and whole-body donation programs available in Illinois.' },
            { label: 'Environmental & Practical Impact', description: 'Comparative data on environmental footprint, space requirements, and processing timelines for each method.' },
          ],
        },
        {
          title: 'Provider Directory',
          items: [],
          intro: 'California has a broad mix of alternative providers, including aquamation specialists, conservation burial grounds, and organizations coordinating out-of-state NOR transport. These cards collect the provider focus, service coverage, and contact details in one place.',
          providers: [
            {
              name: 'Earth Funeral',
              description: 'A specialized Natural Organic Reduction (NOR) provider that coordinates the interstate transport process for California families seeking soil transformation services.',
              services: 'Natural Organic Reduction (Body Composting), out-of-state transport logistics, and family guidance throughout the NOR process.',
              locations: [
                'Serving California statewide; operational NOR hub in Las Vegas, NV',
              ],
              phone: '(818) 698-2358',
              email: '',
              website: 'earthfuneral.com',
            },
            {
              name: 'Bravo Family Mortuary',
              description: 'A leading Southern California provider for aquamation and certified green burial preparation, with a focus on lower-impact alternatives to conventional arrangements.',
              services: 'Aquamation (Water Cremation), certified green burial preparation, and direct family support.',
              locations: [
                '4427 Poplar Ave, San Diego, CA 92120',
              ],
              phone: '(833) 782-7296',
              email: '',
              website: 'bravofamilymortuary.com',
            },
            {
              name: 'Forever Fernwood',
              description: 'A premier conservation burial forest offering a fully natural, vault-free burial setting in a protected landscape.',
              services: 'Conservation burial, natural burial, and scenic forest interment.',
              locations: [
                '301 Tennessee Valley Rd, Mill Valley, CA 94941',
              ],
              phone: '(415) 383-3284',
              email: '',
              website: 'fernwood.com',
            },
            {
              name: 'Anubis Cremations',
              description: 'A California-wide provider focused on eco-friendly water cremation and simple, streamlined arrangements for families seeking lower-impact disposition.',
              services: 'Eco-friendly water cremation, direct cremation, and statewide coordination.',
              locations: [
                'Serving all California counties',
              ],
              phone: '(323) 644-3323',
              email: '',
              website: 'anubiscremation.com',
            },
            {
              name: 'Life\'s Plan Inc.',
              description: 'Chicago-area coordination for organ donation and family-led home vigils.',
              services: 'Organ donation coordination, family-led home vigils, and comprehensive planning.',
              locations: ['Chicago, IL and surrounding areas'],
              phone: '(630) 628-7189',
              email: '',
              website: 'lifesplaninc.org',
              costEstimate: '$1,000 - $3,200 for comprehensive planning and bedside presence.',
            },
          ],
        },
        {
          title: 'Cost Estimates',
          items: [
            { label: 'Pricing Ranges', description: 'General cost comparison between uncommon and standard services within Illinois.' },
            { label: 'Transparent Fees', description: 'Common add-on costs including transport, filing fees, and facility charges.' },
          ],
        },
      ],
    },
    immediate: {
      intro: 'Navigate alternative options and state specific resources needed for a recent death service plan.',
      sections: [],
    },
  },
  {
    id: 'california',
    region: 'California',
    title: 'California Planning',
    summary:
      'Alternative funeral options, next steps, provider paths, and official resources for arrangements happening in California.',
    definition:
      'Use California Planning for alternative funeral choices, timing, documents, providers, and supporting resources tied to California.',
    tags: ['Aquamation', 'Green burial', 'NOR', 'Tree burial'],
    costs: {
      'direct-cremation': { range: '$900 - $1,900', includes: 'Transport, the cremation process, a basic urn, and the mandatory California state regulatory fee.' },
      'home-funeral': { range: '$500 - $2,500', includes: 'Dry ice, local permits, and specialized transportation; the higher end can include a home funeral guide or consultant.' },
      'natural-organic-reduction': { range: '$5,000 - $7,500', includes: 'The reduction process, soil curing, and coordination of soil return or conservation donation.' },
      'aquamation': { range: '$2,000 - $3,500', includes: 'The resomation process, return of remains, urn, and standard filing support.' },
      'green-burial': { range: '$4,500 - $8,000', includes: 'The burial plot, opening and closing labor fees, and a basic biodegradable shroud or casket.' },
      'conservation-burial': { range: '$6,000 - $11,000', includes: 'Conservation land burial fees, opening and closing, and the long-term stewardship endowment or land-protection contribution.' },
      'burial-at-sea': { range: '$3,000 - $6,000', includes: 'Boat charter, specialized weighted casket or shroud, and required legal filings.' },
      'direct-nourishment-tree-burial': { range: '$5,500 - $9,500', includes: 'The burial plot, nutrient kit, sapling, and initial arboricultural care.' },
      'whole-body-donation': { range: '$0', includes: 'Most California university programs cover transport, study use, final cremation, and ash return when accepted.' },
      'cryonics': { range: '$80,000 - $200,000+', includes: 'Standby team mobilization, vitrification, and long-term storage fees.' },
      'reef-memorials': { range: '$3,000 - $5,000', includes: 'Reef casting, deployment boat trip, and GPS memorial coordinates, in addition to cremation or aquamation costs.' },
    },
    searchTerms: ['California', 'CA', 'Los Angeles', 'San Francisco', 'Sacramento', 'San Diego'],
    modules: [
      {
        kicker: 'Options',
        title: 'Alternative services in California',
        description:
          'See the service types people may consider in California, including green burial, aquamation, whole-body donation, and other non-traditional paths.',
      },
      {
        kicker: 'Steps',
        title: 'Documents, timing, and next steps',
        description:
          'Use this page to work through permits, paperwork, transport, provider coordination, and the order of what needs to happen.',
      },
      {
        kicker: 'Support',
        title: 'Providers, resources, and official support',
        description:
          'Move from California information into providers, resources, and official support so the arrangement keeps moving.',
      },
    ],
    focusAreas: [
      'Alternative options that may be available in California',
      'Next steps and timing for California arrangements',
      'Provider paths, official resources, and document needs',
      'Questions to settle before the arrangement is finalized',
    ],
    note:
      'Start here when the arrangements are happening in California or when your future plans depend on California providers, paperwork, and service availability.',
    planning: {
      intro: 'Alternative after-death options, providers, state-specific considerations and more.',
      sections: [
        {
          title: 'Availability: Uncommon Service Menu',
          items: [
            { label: 'Legal Status', description: 'Aquamation, green burial, whole-body donation, and home funeral are all accessible in California. Natural organic reduction is legal and available through specialized provider pathways, and California remains a national leader in natural burial grounds and coastal memorial options.' },
            { label: 'NOR Logistics', description: 'California families can access soil transformation through providers that coordinate intake, transport, reduction, and soil return or donation. Timing, provider coverage, and final soil-use plans should be confirmed before arrangements are finalized.' },
            { label: 'Top Providers', description: 'Earth Funeral supports California families seeking soil transformation. Bravo Family Mortuary offers aquamation and green burial preparation in Southern California. Forever Fernwood (Mill Valley) is a leading conservation burial destination, and California universities support major willed-body donation pathways.' },
          ],
        },
        {
          title: 'Explore Options',
          items: [
            { label: 'Method Deep Dives', description: 'Links to technical descriptions of green burial, conservation burial, aquamation, soil transformation, sea burial, whole-body donation, cryonics, and reef memorial pathways available in California.' },
            { label: 'Environmental & Practical Impact', description: 'Comparative data on environmental footprint, space requirements, and processing timelines for each method.' },
          ],
        },
        {
          title: 'Provider Directory',
          items: [],
          providers: [
            {
              name: 'Sacred Crossings',
              description: 'Home Funerals, Conscious Dying, and full-body sea burial coordination.',
              services: 'Home Funerals, Conscious Dying, and full-body sea burial coordination.',
              locations: ['Los Angeles, CA'],
              phone: '(310) 868-2444',
              email: '',
              website: 'sacredcrossings.com',
              costEstimate: '$1,500 - $5,000 for full-service packages; $100 - $200 per hour for consultations.',
            },
          ],
        },
        {
          title: 'Cost Estimates',
          items: [
            { label: 'Pricing Ranges', description: 'General cost comparison between uncommon and standard services within California.' },
            { label: 'Transparent Fees', description: 'Common add-on costs including transport, filing fees, and facility charges.' },
          ],
        },
      ],
    },
    immediate: {
      intro: 'Navigate alternative options and state specific resources needed for a recent death service plan.',
      sections: [],
    },
  },
  {
    id: 'washington',
    region: 'Washington',
    title: 'Washington Planning',
    summary:
      'Alternative funeral options, next steps, provider paths, and official resources for arrangements happening in Washington.',
    definition:
      'Use Washington Planning for alternative funeral choices, timing, documents, providers, and supporting resources tied to Washington.',
    tags: ['Natural organic reduction', 'Green burial', 'Documents'],
    searchTerms: ['Washington', 'WA', 'Seattle', 'Spokane', 'Olympia'],
    modules: [
      {
        kicker: 'Options',
        title: 'Alternative services in Washington',
        description:
          'See the service types people may consider in Washington, including green burial, natural organic reduction, home funeral, and other non-traditional paths.',
      },
      {
        kicker: 'Steps',
        title: 'Documents, timing, and next steps',
        description:
          'Use this page to work through permits, paperwork, transport, provider coordination, and the order of what needs to happen.',
      },
      {
        kicker: 'Support',
        title: 'Providers, resources, and official support',
        description:
          'Move from Washington information into providers, resources, and official support so the arrangement keeps moving.',
      },
    ],
    focusAreas: [
      'Alternative options that may be available in Washington',
      'Next steps and timing for Washington arrangements',
      'Provider paths, official resources, and document needs',
      'Questions to settle before the arrangement is finalized',
    ],
    note:
      'Start here when the arrangements are happening in Washington or when your future plans depend on Washington providers, paperwork, and service availability.',
    planning: {
      intro: 'Alternative after-death options, providers, state-specific considerations and more.',
      sections: [
        {
          title: 'Availability: Uncommon Service Menu',
          items: [
            { label: 'Legal Status', description: 'Natural organic reduction (human composting), aquamation, green burial, and home funeral are all fully legal and widely available. Washington was the first state to legalize human composting in 2019 and is the primary national hub for alternative death care.' },
            { label: 'NOR Logistics', description: 'As the first state to legalize and implement NOR, Washington serves as the destination for many out-of-state residents. Facilities here are fully operational and experienced in receiving legal transports from across the country.' },
            { label: 'Top Providers', description: 'Recompose (Seattle) is the global pioneer in human composting. Return Home (Auburn) focuses on terramation and family-led ceremonies. Herland Forest (Klickitat County) is a natural burial forest that also offers on-site NOR.' },
          ],
        },
        {
          title: 'Explore Options',
          items: [
            { label: 'Method Deep Dives', description: 'Links to technical descriptions of natural organic reduction, green burial preparation, aquamation processing, and home funeral care available in Washington.' },
            { label: 'Environmental & Practical Impact', description: 'Comparative data on environmental footprint, space requirements, and processing timelines for each method.' },
          ],
        },
        {
          title: 'Provider Directory',
          items: [],
          providers: [
            {
              name: 'A Sacred Moment (Char Barrett)',
              description: 'PNW leaders in Home Funerals, Green Burial, and coordinating with NOR facilities.',
              services: 'Home Funerals, Green Burial, and coordinating with NOR facilities.',
              locations: ['Serving Washington statewide'],
              phone: '(425) 316-8290',
              email: '',
              website: 'asacredmoment.com',
              costEstimate: '$1,200 - $4,000 for full-service vigil support.',
            },
          ],
        },
        {
          title: 'Cost Estimates',
          items: [
            { label: 'Pricing Ranges', description: 'General cost comparison between uncommon and standard services within Washington.' },
            { label: 'Transparent Fees', description: 'Common add-on costs including transport, filing fees, and facility charges.' },
          ],
        },
      ],
    },
    immediate: {
      intro: 'Navigate alternative options and state specific resources needed for a recent death service plan.',
      sections: [],
    },
  },
  {
    id: 'colorado',
    region: 'Colorado',
    title: 'Colorado Planning',
    summary:
      'Alternative funeral options, next steps, provider paths, and official resources for arrangements happening in Colorado.',
    definition:
      'Use Colorado Planning for alternative funeral choices, timing, documents, providers, and supporting resources tied to Colorado.',
    tags: ['NOR', 'Aquamation', 'Open-air pyre', 'Green burial'],
    costs: {
      'natural-organic-reduction': { range: '$6,200 - $7,500', includes: 'The 30-60 day reduction process, soil curing, and a portion of soil returned to the family or donated.' },
      'aquamation': { range: '$2,200 - $3,700', includes: 'The alkaline hydrolysis process, return of remains (similar to ashes), and basic transportation.' },
      'green-burial': { range: '$4,000 - $8,500', includes: 'Burial plot, opening/closing of the grave, and perpetual care. Lower end for simple meadows; higher for premium groves.' },
      'conservation-burial': { range: '$5,300 - $6,500', includes: 'Burial in a protected land trust; a portion of the fee typically goes directly to land preservation.' },
      'open-air-funeral-pyre': { range: '$500 - $800', includes: 'Suggested donation for the pyre ceremony itself; transportation and separate body preparation costs are usually additional.' },
      'home-funeral': { range: '$500 - $2,000', includes: 'Costs for dry ice, cooling boards, and required permits. Higher range if hiring a Home Funeral Guide.' },
      'home-burial': { range: '$100 - $1,000', includes: 'Recording fees, permit filings, and site documentation; grave digging, containers, and markers are usually separate.' },
      'whole-body-donation': { range: '$0', includes: 'Most accepted programs cover transport, use of remains, final cremation, and return of ashes.' },
      'medical-aid-in-dying': { range: '$500 - $4,000', includes: 'Medication and provider consultations; does not include funeral, cremation, or burial costs afterward.' },
      'direct-cremation': { range: '$995 - $1,800', includes: 'No viewing or service; body goes directly to the crematory. The baseline for comparison.' },
    },
    searchTerms: ['Colorado', 'CO', 'Denver', 'Boulder', 'Colorado Springs', 'Crestone'],
    modules: [
      {
        kicker: 'Options',
        title: 'Alternative services in Colorado',
        description:
          'See the service types people may consider in Colorado, including natural organic reduction, aquamation, green burial, open-air cremation, and other non-traditional paths.',
      },
      {
        kicker: 'Steps',
        title: 'Documents, timing, and next steps',
        description:
          'Use this page to work through permits, paperwork, transport, provider coordination, and the order of what needs to happen.',
      },
      {
        kicker: 'Support',
        title: 'Providers, resources, and official support',
        description:
          'Move from Colorado information into providers, resources, and official support so the arrangement keeps moving.',
      },
    ],
    focusAreas: [
      'Alternative options that may be available in Colorado',
      'Next steps and timing for Colorado arrangements',
      'Provider paths, official resources, and document needs',
      'Questions to settle before the arrangement is finalized',
    ],
    note:
      'Start here when the arrangements are happening in Colorado or when your future plans depend on Colorado providers, paperwork, and service availability.',
    planning: {
      intro: 'Alternative after-death options, providers, state-specific considerations and more.',
      sections: [
        {
          title: 'Availability: Uncommon Service Menu',
          items: [
            { label: 'Legal Status', description: 'NOR (human composting) and aquamation are both fully legal in Colorado. The state also allows private-property burial in qualifying circumstances, and it is the only state with a legal open-air pyre program through the Crestone End of Life Project under highly specific local rules. Colorado continues to have one of the country’s strongest concentrations of aquamation and green burial options.' },
            { label: 'NOR Logistics', description: 'Fully operational in-state. Residents have local access to NOR and aquamation without the need for out-of-state transport.' },
            { label: 'Top Providers', description: 'The Natural Funeral (Lafayette) is a holistic provider offering both aquamation and NOR in-state. Crestone End of Life Project manages the nation\'s only legal open-air pyre site under local eligibility rules. Colorado Burial Preserve (Florence) is a green-only cemetery focused on high-plains conservation, and Colorado medical donation programs offer strong whole-body donation pathways.' },
          ],
        },
        {
          title: 'Provider Directory',
          intro: 'Colorado has some of the most established "alternative-first" providers in the country. Below are the names and contact details for the primary organizations specializing in Natural Organic Reduction (NOR), Aquamation, and Green Burial.',
          items: [],
          providers: [
            {
              name: 'The Natural Funeral',
              description: 'The primary holistic funeral home in Colorado. They were the first in the state to offer both NOR and Aquamation and emphasize a hands-on, participatory experience for families.',
              services: 'Natural Organic Reduction (Body Composting), Alkaline Hydrolysis (Water Cremation), and Green Burial.',
              locations: [
                'Lafayette: 102 W. Chester St, Lafayette, CO 80026',
                'Loveland: 1440 N. Boise Ave, Loveland, CO 80538',
              ],
              phone: '(720) 515-2344 or (970) 837-7224',
              email: 'info@thenaturalfuneral.com',
              website: 'thenaturalfuneral.com',
            },
            {
              name: 'Colorado Burial Preserve',
              description: 'A dedicated conservation cemetery that focuses entirely on "return-to-earth" burial without the use of vaults, liners, or toxic embalming fluids.',
              services: 'Natural Burial and Cremated Remains Interment in a protected natural landscape.',
              locations: [
                '7997 CO-67, Florence, CO 81226 (By appointment only)',
              ],
              phone: '(719) 280-2614',
              email: 'emily@coloradoburialpreserve.com',
              website: 'coloradoburialpreserve.com',
            },
            {
              name: 'Crestone End of Life Project (CEOLP)',
              description: 'A unique community-based organization that facilitates open-air pyre cremations and natural burial under CEOLP\'s local registration rules. Current participation is limited and should be confirmed directly before planning.',
              services: 'Open-air Cremation and End-of-Life education.',
              locations: [
                'PO Box 1238, Crestone, CO 81131',
              ],
              phone: '(719) 588-7415',
              email: 'ceolp.info@gmail.com',
              website: 'crestoneendoflifeproject.org',
            },
            {
              name: 'Alternative Funeral & Cremation Service',
              description: 'While they offer traditional services, they have a dedicated wing for simpler, more direct arrangements that bypass the standard funeral industry up-selling model.',
              services: 'Simple Cremation and Natural Burial coordination.',
              locations: [
                '2377 North Academy Blvd, Colorado Springs, CO 80907',
              ],
              phone: '(719) 633-9999',
              email: '',
              website: 'alternativefuneralandcremation.com',
            },
            {
              name: 'Seven Stones Botanical Gardens Cemetery',
              description: 'A hybrid cemetery that has a strong commitment to natural burial and beautifully landscaped botanical environments, moving away from the traditional row of headstones look.',
              services: 'Green Burial and Botanical Cremation Gardens.',
              locations: [
                '9635 N. Rampart Range Rd, Littleton, CO 80125',
              ],
              phone: '(303) 717-7117',
              email: '',
              website: 'discoversevenstones.com',
            },
          ],
          attorneys: [
            {
              name: 'Braverman Law Group, LLC',
              focus: 'Leading specialists in Natural Organic Reduction (NOR) estate planning and Green Burial legalities.',
              phone: '(303) 800-1588',
              website: 'braverman-law.com',
              location: '507 Canyon Blvd #203, Boulder, CO 80302',
            },
            {
              name: 'Hammond Law Group',
              focus: 'Experts in Disposition of Last Remains declarations and multi-generational legacy planning.',
              phone: '(719) 520-1474',
              website: 'coloradoestateplan.com',
              location: '2955 Professional Pl #302, Colorado Springs, CO 80904',
            },
            {
              name: 'Meurer & Potter Law Office',
              focus: 'Focuses on using the CO Disposition of Last Remains Act to prevent family disputes over alternative wishes.',
              phone: '(303) 991-3544',
              website: 'meurerlawoffices.com',
              location: '5347 S Valentia Way #335, Greenwood Village, CO 80111',
            },
            {
              name: 'Law Office of Byron K. Hammond',
              focus: 'Specialized focus on customized estate plans and sensitive post-life remembrance arrangements.',
              phone: '(303) 501-1812',
              website: 'bkh-law.com',
              location: '3900 E Mexico Ave #300, Denver, CO 80210',
            },
            {
              name: 'Glatstein & O\'Brien LLP',
              focus: 'Experts in End-of-Life Directives and navigating the Medical Power of Attorney for complex cases.',
              phone: '(303) 731-3986',
              website: 'denverprobatelaw.com',
              location: '2696 S Colorado Blvd #350, Denver, CO 80222',
            },
          ],
        },
        {
          title: 'Cost Estimates',
          items: [
            { label: 'Pricing Ranges', description: 'General cost comparison between uncommon and standard services within Colorado.' },
            { label: 'Transparent Fees', description: 'Common add-on costs including transport, filing fees, and facility charges.' },
          ],
        },
      ],
    },
    extras: [
      {
        id: 'regenerative-soil-donation',
        title: 'Regenerative Soil Donation Program',
        description: 'For those choosing Natural Organic Reduction (NOR) but who do not have private land to receive a cubic yard of soil, Colorado offers a unique "giving back" pathway.',
        involves: [
          'You can opt to have your resulting soil donated to local land restoration projects, flower farms, or "living memorial" forests.',
          'It solves the urban logistics problem while ensuring your final act contributes to the local Colorado ecosystem.',
          'The Natural Funeral in Lafayette is the primary coordinator for these soil donation pathways.',
        ],
      },
      {
        id: 'shrouded-cremation',
        title: 'Full-Body Shrouded Cremation (Witnessing)',
        description: 'Colorado providers have expanded "Witness Cremation" into a more participatory ritual.',
        involves: [
          'Families can choose to have the body placed in a natural fiber shroud (no casket) and may participate in the "committal" - physically assisting with the placement or starting the sequence.',
          'Offered by specialized boutique providers who focus on "slow" and "reverent" disposition rather than industrial-speed cremation.',
        ],
      },
      {
        id: 'laying-in-honor',
        title: 'Laying-in-Honor (Non-Embalmed Viewing)',
        description: 'A middle path between a Home Funeral and a Direct Disposition.',
        involves: [
          'The body is kept in a natural, unembalmed state using specialized cooling techniques (chilling boards or dry ice) at a funeral facility.',
          'Families are given a private, sanctuary-like space for a multi-hour or multi-day "vigil" that feels like a home funeral but is managed by professional alternative-first staff.',
        ],
      },
      {
        id: 'land-locked-sea-memorials',
        title: 'Land-Locked Sea Memorials',
        description: 'While Colorado is a mountain state, local alternative providers specialize in the logistics of "Mountain to Sea" transitions.',
        involves: [
          'They handle the specialized preparation and legal transport of remains to coastal partners for Living Reef construction or Full-Body Burial at Sea.',
          'You can plan a sea-based ending through a local Colorado guide who understands the specific interstate transport permits required.',
        ],
      },
      {
        id: 'mushroom-suit',
        title: 'The Mushroom Suit',
        description: 'The original "Infinity Burial Suit" by Coeio (made famous by Luke Perry) is currently in a transition period and can be difficult to source as a standalone retail product. However, the technology has evolved into the Mushroom Coffin and Mycelium Shrouds.',
        involves: [
          'A biodegradable burial container or garment grown from mycelium (the root structure of mushrooms) and hemp/sawdust. Unlike the original "suit," these are "living" vessels that actively remediate toxins in the soil and facilitate a faster return to the earth.',
          'Loop Biotech is currently the leader in "Living Cocoon" mushroom coffins.',
          'Mycelium Shrouds are often handmade by green burial practitioners or sourced through specialty alternative funeral homes.',
          'Most green burial grounds in Colorado (like the Colorado Burial Preserve) accept mycelium-based products, but always confirm with the cemetery before purchase, as they must be buried without a concrete vault to function.',
        ],
      },
    ],
    legalResources: {
      intro: 'Colorado has transitioned from being the least regulated state in the country to one of the most proactive, following several high-profile industry scandals. Here are the key legal protections and tools available.',
      items: [
        {
          label: 'Designated Beneficiary Agreement (DBA)',
          description: 'In Colorado, the Designated Beneficiary Agreement is a state-specific tool that can give an unmarried partner, close friend, or other trusted adult legal standing in key end-of-life and after-death matters. It is often used when someone wants decision-making authority to be clear outside the standard next-of-kin order.',
          involves: [
            'It can help with body disposition, medical decision-making, and funeral and estate-related authority.',
            'It is especially important when the person you want making decisions is not your legal spouse or default next of kin.',
            'It should be completed carefully, notarized, and filed in the proper local office so it is available when needed.',
            'It works best when paired with other planning documents so your wishes and your decision-maker are both clearly documented.',
          ],
          links: [
            { label: 'DBA Template', agency: 'CO Gerontological Society', url: 'https://www.senioranswers.org/counseling/legal/advance-directives/financial/designated-beneficiary/' },
          ],
        },
        {
          label: 'Medical Durable Power of Attorney (MDPOA)',
          description: 'This document appoints the person who can make healthcare and end-of-life medical decisions if you cannot speak for yourself. It is separate from after-death disposition authority, but it is often part of the same planning process.',
          expandable: false,
        },
        {
          label: 'Medical Aid in Dying Information',
          description: 'Colorado\'s End-of-Life Options Act is a pre-death medical law rather than a funeral rule, but it can shape timing, location, witnesses, and immediate pickup plans after a death occurs.',
          expandable: false,
          links: [
            { label: 'Medical Aid in Dying Info', agency: 'Compassion & Choices Colorado', url: 'https://www.compassionandchoices.org/' },
          ],
        },
        {
          label: 'Consumer Protection and the Funeral Rule',
          description: 'Colorado families still rely on the federal Funeral Rule and related consumer protections when comparing providers, declining unwanted services, and asking what is actually required.',
          involves: [
            'You have the right to receive a General Price List when you ask, including when you are comparison shopping.',
            'You are not required to buy a bundled package if you only want certain services.',
            'A provider cannot charge an extra fee just because you bring in a casket, container, or shroud from somewhere else.',
            'Routine embalming is not automatically required under Colorado law, and refrigeration is often the practical alternative in the early period after death.',
          ],
          links: [
            { label: 'The Funeral Rule Guide', agency: 'Federal Trade Commission (FTC)', url: 'https://www.ftc.gov/business-guidance/resources/complying-funeral-rule' },
          ],
        },
        {
          label: 'Licensing and Oversight (Colorado DPO)',
          description: 'Colorado now regulates funeral, cremation, and natural reduction work through the Office of Funeral and Mortuary Science Services within DPO. The current rollout affects both family logistics after a death and how providers are licensed and supervised.',
          involves: [
            'Colorado rules require embalming or refrigeration when burial or cremation will not happen within 24 hours after death.',
            'The Office of Funeral and Mortuary Science Services is the state home for provider oversight, complaints, and compliance information.',
            'DPO has opened licensure for funeral directors, embalmers, cremationists, and natural reductionists as part of the new regulatory framework.',
            'According to current DPO guidance, practitioners can continue working during the transition, but individual licensure becomes mandatory on January 1, 2027.',
            'Families can use DORA tools to verify provider credentials and file complaints when something feels unclear or concerning.',
          ],
          links: [
            { label: 'Verify a Provider License', agency: 'DORA License Lookup', url: 'https://dpo.colorado.gov/' },
            { label: 'File a Complaint', agency: 'CO Division of Professions & Occupations', url: 'https://dpo.colorado.gov/' },
          ],
        },
        {
          label: 'Pre-Need Contract Safety (Colorado Division of Insurance)',
          description: 'If you are paying for funeral or disposition services in advance, Colorado consumer protections matter. This card covers the key safety questions around pre-need contracts and where to check the company behind them.',
          involves: [
            'Ask how the money is being held and what protections apply if the business changes hands or closes.',
            'Keep receipts, contract copies, and the name of the trustee or funding vehicle in your records.',
            'Confirm that the seller is properly authorized before paying in advance.',
            'Use the Division of Insurance consumer guidance when you are comparing or reviewing a pre-need arrangement.',
          ],
          links: [
            { label: 'Pre-Need Consumer Tips', agency: 'CO Division of Insurance', url: 'https://doi.colorado.gov/' },
          ],
        },
        {
          label: 'Funeral Consumer\'s Alliance of Colorado (FCAC)',
          description: 'FCAC is a consumer-focused resource for people who want clearer funeral information, stronger protections, and more confidence when making arrangements or reviewing provider practices.',
          expandable: false,
          links: [
            { label: 'Legal Aid for Seniors', agency: 'Colorado Legal Services', url: 'https://www.coloradolegalservices.org/' },
          ],
        },
      ],
    },
    immediate: {
      intro: '',
      sections: [],
    },
  },
  {
    id: 'oregon',
    region: 'Oregon',
    title: 'Oregon Planning',
    summary:
      'Alternative funeral options, next steps, provider paths, and official resources for arrangements happening in Oregon.',
    definition:
      'Use Oregon Planning for alternative funeral choices, timing, documents, providers, and supporting resources tied to Oregon.',
    tags: ['NOR', 'Aquamation', 'Green burial', 'Conservation burial'],
    searchTerms: ['Oregon', 'OR', 'Portland', 'Eugene', 'Salem', 'Bend'],
    modules: [
      {
        kicker: 'Options',
        title: 'Alternative services in Oregon',
        description:
          'See the service types people may consider in Oregon, including natural organic reduction, aquamation, green burial, conservation burial, and other non-traditional paths.',
      },
      {
        kicker: 'Steps',
        title: 'Documents, timing, and next steps',
        description:
          'Use this page to work through permits, paperwork, transport, provider coordination, and the order of what needs to happen.',
      },
      {
        kicker: 'Support',
        title: 'Providers, resources, and official support',
        description:
          'Move from Oregon information into providers, resources, and official support so the arrangement keeps moving.',
      },
    ],
    focusAreas: [
      'Alternative options that may be available in Oregon',
      'Next steps and timing for Oregon arrangements',
      'Provider paths, official resources, and document needs',
      'Questions to settle before the arrangement is finalized',
    ],
    note:
      'Start here when the arrangements are happening in Oregon or when your future plans depend on Oregon providers, paperwork, and service availability.',
    planning: {
      intro: 'Alternative after-death options, providers, state-specific considerations and more.',
      sections: [
        {
          title: 'Availability: Uncommon Service Menu',
          items: [
            { label: 'Legal Status', description: 'NOR (human composting), aquamation, green burial, and conservation burial are all fully legal. Oregon was an early adopter of alkaline hydrolysis and has since legalized human composting. Oregon has some of the most established regulatory frameworks for both NOR and aquamation.' },
            { label: 'NOR Logistics', description: 'Fully operational in-state. Oregon offers the most natural funeral service providers per capita in the country, with high consumer demand creating a competitive and transparent market.' },
            { label: 'Top Providers', description: 'Riverview Natural Burial Park (Portland) offers dedicated, vault-free natural burial grounds. Great River (Mosier) is a conservation cemetery focused on the Columbia River Gorge ecosystem. Tualatin Valley Funeral Alternatives is a primary specialist in alkaline hydrolysis (aquamation).' },
          ],
        },
        {
          title: 'Explore Options',
          items: [
            { label: 'Method Deep Dives', description: 'Links to technical descriptions of natural organic reduction, aquamation processing, green burial preparation, conservation burial, and home funeral care available in Oregon.' },
            { label: 'Environmental & Practical Impact', description: 'Comparative data on environmental footprint, space requirements, and processing timelines for each method.' },
          ],
        },
        {
          title: 'Provider Directory',
          items: [],
          providers: [
            {
              name: 'The Peaceful Presence Project',
              description: 'Sliding-scale services focused on equity, advance care planning, and rural support.',
              services: 'Sliding-scale end-of-life support, advance care planning, and rural outreach.',
              locations: ['Serving Oregon statewide'],
              phone: '(541) 583-2292',
              email: '',
              website: 'thepeacefulpresenceproject.org',
              costEstimate: 'Sliding Scale ($35 - $75/hr); Full packages range $600 - $2,900.',
            },
          ],
        },
        {
          title: 'Cost Estimates',
          items: [
            { label: 'Pricing Ranges', description: 'General cost comparison between uncommon and standard services within Oregon.' },
            { label: 'Transparent Fees', description: 'Common add-on costs including transport, filing fees, and facility charges.' },
          ],
        },
      ],
    },
    immediate: {
      intro: 'Navigate alternative options and state specific resources needed for a recent death\'s service plan.',
      sections: [],
    },
  },
  {
    id: 'vermont',
    region: 'Vermont',
    title: 'Vermont Planning',
    summary:
      'Alternative funeral options, next steps, provider paths, and official resources for arrangements happening in Vermont.',
    definition:
      'Use Vermont Planning for alternative funeral choices, timing, documents, providers, and supporting resources tied to Vermont.',
    tags: ['NOR', 'Green burial', 'Home funeral'],
    searchTerms: ['Vermont', 'VT', 'Burlington', 'Montpelier'],
    modules: [
      {
        kicker: 'Options',
        title: 'Alternative services in Vermont',
        description:
          'See the service types people may consider in Vermont, including natural organic reduction, green burial, home funeral, and other non-traditional paths.',
      },
      {
        kicker: 'Steps',
        title: 'Documents, timing, and next steps',
        description:
          'Use this page to work through permits, paperwork, transport, provider coordination, and the order of what needs to happen.',
      },
      {
        kicker: 'Support',
        title: 'Providers, resources, and official support',
        description:
          'Move from Vermont information into providers, resources, and official support so the arrangement keeps moving.',
      },
    ],
    focusAreas: [
      'Alternative options that may be available in Vermont',
      'Next steps and timing for Vermont arrangements',
      'Provider paths, official resources, and document needs',
      'Questions to settle before the arrangement is finalized',
    ],
    note:
      'Start here when the arrangements are happening in Vermont or when your future plans depend on Vermont providers, paperwork, and service availability.',
    planning: {
      intro: 'Alternative after-death options, providers, state-specific considerations and more.',
      sections: [
        {
          title: 'Availability: Uncommon Service Menu',
          items: [
            { label: 'Legal Status', description: 'NOR (human composting) and green burial are well-established. Home funeral with family-directed care is permitted. Vermont has some of the most progressive environmental laws in the country and is a leader in forest-based conservation burial.' },
            { label: 'NOR Logistics', description: 'NOR is legal; however, due to the smaller scale of local facilities, some residents still utilize regional transport to larger hubs. Check with local green-first providers for current in-state NOR processing capacity.' },
            { label: 'Top Providers', description: 'Vermont Forest Cemetery (Roxbury) is Vermont\'s first cemetery dedicated entirely to forest conservation burial. Green Mountain Natural Burial provides specialized support for biodegradable interment. Vermont is often ranked as the greenest state for natural burial due to its high number of hybrid cemeteries allowing vault-free interment.' },
          ],
        },
        {
          title: 'Explore Options',
          items: [
            { label: 'Method Deep Dives', description: 'Links to technical descriptions of natural organic reduction, green burial preparation, home funeral care, and other alternative services available in Vermont.' },
            { label: 'Environmental & Practical Impact', description: 'Comparative data on environmental footprint, space requirements, and processing timelines for each method.' },
          ],
        },
        {
          title: 'Provider Directory',
          items: [],
          providers: [
            {
              name: 'Lindsey Warren Doula Services',
              description: 'UVM-certified, specialized in green burial, shrouding, and Medical Aid in Dying (MAiD) support.',
              services: 'Green burial, shrouding, and Medical Aid in Dying (MAiD) support.',
              locations: ['Serving Vermont statewide'],
              phone: '(802) 498-5700',
              email: '',
              website: 'lindseywarrendoula.com',
              costEstimate: '$700 - $2,500; Highly personalized for forest burial traditions.',
            },
          ],
        },
        {
          title: 'Cost Estimates',
          items: [
            { label: 'Pricing Ranges', description: 'General cost comparison between uncommon and standard services within Vermont.' },
            { label: 'Transparent Fees', description: 'Common add-on costs including transport, filing fees, and facility charges.' },
          ],
        },
      ],
    },
    immediate: {
      intro: 'Navigate alternative options and state specific resources needed for a recent death\'s service plan.',
      sections: [],
    },
  },
  {
    id: 'minnesota',
    region: 'Minnesota',
    title: 'Minnesota Planning',
    summary:
      'Alternative funeral options, next steps, provider paths, and official resources for arrangements happening in Minnesota.',
    definition:
      'Use Minnesota Planning for alternative funeral choices, timing, documents, providers, and supporting resources tied to Minnesota.',
    tags: ['NOR', 'Green burial', 'Home funeral'],
    searchTerms: ['Minnesota', 'MN', 'Minneapolis', 'Saint Paul', 'St. Paul', 'Duluth'],
    modules: [
      {
        kicker: 'Options',
        title: 'Alternative services in Minnesota',
        description:
          'See the service types people may consider in Minnesota, including natural organic reduction, green burial, home funeral, and other non-traditional paths.',
      },
      {
        kicker: 'Steps',
        title: 'Documents, timing, and next steps',
        description:
          'Use this page to work through permits, paperwork, transport, provider coordination, and the order of what needs to happen.',
      },
      {
        kicker: 'Support',
        title: 'Providers, resources, and official support',
        description:
          'Move from Minnesota information into providers, resources, and official support so the arrangement keeps moving.',
      },
    ],
    focusAreas: [
      'Alternative options that may be available in Minnesota',
      'Next steps and timing for Minnesota arrangements',
      'Provider paths, official resources, and document needs',
      'Questions to settle before the arrangement is finalized',
    ],
    note:
      'Start here when the arrangements are happening in Minnesota or when your future plans depend on Minnesota providers, paperwork, and service availability.',
    planning: {
      intro: 'Alternative after-death options, providers, state-specific considerations and more.',
      sections: [
        {
          title: 'Availability: Uncommon Service Menu',
          items: [
            { label: 'Legal Status', description: 'Minnesota legalized NOR (human composting) in 2024 with programs becoming active in 2025-2026. Green burial and home funeral are permitted. Aquamation availability is expanding. Minnesota is one of the first Midwest states to legalize human composting.' },
            { label: 'NOR Logistics', description: 'Local NOR infrastructure is developing, but many alternative-first families still look to transport services for immediate NOR needs while in-state capacity builds out.' },
            { label: 'Top Providers', description: 'Prairie Oaks Memorial Eco-Gardens is Minnesota\'s first 100% green cemetery. Mound Cemetery (Brooklyn Center) features a dedicated Natural Path section for eco-friendly burial.' },
          ],
        },
        {
          title: 'Explore Options',
          items: [
            { label: 'Method Deep Dives', description: 'Links to technical descriptions of natural organic reduction, green burial preparation, home funeral care, and other alternative services available or becoming available in Minnesota.' },
            { label: 'Environmental & Practical Impact', description: 'Comparative data on environmental footprint, space requirements, and processing timelines for each method.' },
          ],
        },
        {
          title: 'Provider Directory',
          items: [],
          providers: [
            {
              name: 'Minnesota Death Collaborative',
              description: 'A network of practitioners focused on the "5 Domains of Life" and sacred passage.',
              services: 'End-of-life planning, legacy projects, and sacred passage coordination.',
              locations: ['Minneapolis-St. Paul Metro and statewide'],
              phone: '(612) 799-6782 (Befriending Death)',
              email: '',
              website: 'mndeathcollaborative.org',
              costEstimate: '$800 - $3,000 depending on the complexity of legacy projects.',
            },
          ],
        },
        {
          title: 'Cost Estimates',
          items: [
            { label: 'Pricing Ranges', description: 'General cost comparison between uncommon and standard services within Minnesota.' },
            { label: 'Transparent Fees', description: 'Common add-on costs including transport, filing fees, and facility charges.' },
          ],
        },
      ],
    },
    immediate: {
      intro: 'Navigate alternative options and state specific resources needed for a recent death\'s service plan.',
      sections: [],
    },
  },
  {
    id: 'georgia',
    region: 'Georgia',
    title: 'Georgia Planning',
    summary:
      'Alternative funeral options, next steps, provider paths, and official resources for arrangements happening in Georgia.',
    definition:
      'Use Georgia Planning for alternative funeral choices, timing, documents, providers, and supporting resources tied to Georgia.',
    tags: ['NOR', 'Green burial', 'Home funeral'],
    searchTerms: ['Georgia', 'GA', 'Atlanta', 'Savannah', 'Augusta'],
    modules: [
      {
        kicker: 'Options',
        title: 'Alternative services in Georgia',
        description:
          'See the service types people may consider in Georgia, including natural organic reduction, green burial, home funeral, and other non-traditional paths.',
      },
      {
        kicker: 'Steps',
        title: 'Documents, timing, and next steps',
        description:
          'Use this page to work through permits, paperwork, transport, provider coordination, and the order of what needs to happen.',
      },
      {
        kicker: 'Support',
        title: 'Providers, resources, and official support',
        description:
          'Move from Georgia information into providers, resources, and official support so the arrangement keeps moving.',
      },
    ],
    focusAreas: [
      'Alternative options that may be available in Georgia',
      'Next steps and timing for Georgia arrangements',
      'Provider paths, official resources, and document needs',
      'Questions to settle before the arrangement is finalized',
    ],
    note:
      'Start here when the arrangements are happening in Georgia or when your future plans depend on Georgia providers, paperwork, and service availability.',
    planning: {
      intro: 'Alternative after-death options, providers, state-specific considerations and more.',
      sections: [
        {
          title: 'Availability: Uncommon Service Menu',
          items: [
            { label: 'Legal Status', description: 'NOR (human composting) was recently legalized in Georgia in 2025. Green burial and home funeral are permitted under current law. Georgia is a Southern hub for conservation burial.' },
            { label: 'NOR Logistics', description: 'While the state is known for its conservation burial sites, NOR infrastructure is still in its early stages. Transport to established hubs is a common route for early adopters in the Southeast.' },
            { label: 'Top Providers', description: 'Honey Creek Woodlands (Conyers) is a premier national model for conservation burial within a monastery\'s protected land. Milton Fields (Milton) is Georgia\'s first dedicated green-only cemetery.' },
          ],
        },
        {
          title: 'Explore Options',
          items: [
            { label: 'Method Deep Dives', description: 'Links to technical descriptions of natural organic reduction, green burial preparation, home funeral care, and other alternative services available or becoming available in Georgia.' },
            { label: 'Environmental & Practical Impact', description: 'Comparative data on environmental footprint, space requirements, and processing timelines for each method.' },
          ],
        },
        {
          title: 'Provider Directory',
          items: [],
          providers: [
            {
              name: 'Sacred Infinity (Amanda Reams)',
              description: 'End-of-life education, death midwifery, and southern green burial support.',
              services: 'End-of-life education, death midwifery, and green burial support.',
              locations: ['Serving Georgia statewide'],
              phone: '(678) 993-3331',
              email: '',
              website: 'sacredinfinity.net',
              costEstimate: '$800 - $2,800; Hourly rates typically start at $75.',
            },
          ],
        },
        {
          title: 'Cost Estimates',
          items: [
            { label: 'Pricing Ranges', description: 'General cost comparison between uncommon and standard services within Georgia.' },
            { label: 'Transparent Fees', description: 'Common add-on costs including transport, filing fees, and facility charges.' },
          ],
        },
      ],
    },
    immediate: {
      intro: 'Navigate alternative options and state specific resources needed for a recent death\'s service plan.',
      sections: [],
    },
  },
  {
    id: 'new-york',
    region: 'New York',
    title: 'New York Planning',
    summary:
      'Alternative funeral options, next steps, provider paths, and official resources for arrangements happening in New York.',
    definition:
      'Use New York Planning for alternative funeral choices, timing, documents, providers, and supporting resources tied to New York.',
    tags: ['NOR', 'Green burial', 'Aquamation'],
    searchTerms: ['New York', 'NY', 'New York City', 'NYC', 'Brooklyn', 'Buffalo', 'Albany'],
    modules: [
      {
        kicker: 'Options',
        title: 'Alternative services in New York',
        description:
          'See the service types people may consider in New York, including natural organic reduction, green burial, aquamation, and other non-traditional paths.',
      },
      {
        kicker: 'Steps',
        title: 'Documents, timing, and next steps',
        description:
          'Use this page to work through permits, paperwork, transport, provider coordination, and the order of what needs to happen.',
      },
      {
        kicker: 'Support',
        title: 'Providers, resources, and official support',
        description:
          'Move from New York information into providers, resources, and official support so the arrangement keeps moving.',
      },
    ],
    focusAreas: [
      'Alternative options that may be available in New York',
      'Next steps and timing for New York arrangements',
      'Provider paths, official resources, and document needs',
      'Questions to settle before the arrangement is finalized',
    ],
    note:
      'Start here when the arrangements are happening in New York or when your future plans depend on New York providers, paperwork, and service availability.',
    planning: {
      intro: 'Alternative after-death options, providers, state-specific considerations and more.',
      sections: [
        {
          title: 'Availability: Uncommon Service Menu',
          items: [
            { label: 'Legal Status', description: 'New York legalized human composting (NOR) in late 2022-2024. Green burial is available at multiple sites across the state. Aquamation legality and provider access are expanding.' },
            { label: 'NOR Logistics', description: 'Licensing of high-capacity in-state NOR facilities is still in progress. Providers like Recompose currently service New York residents by coordinating transport to their Washington facility, handling all permits and legalities as part of the service.' },
            { label: 'Top Providers', description: 'Greensprings Natural Cemetery Preserve (Newfield) is a massive conservation preserve focused on meadow restoration through natural burial. The Green-Wood Cemetery (Brooklyn) leads urban alternative initiatives and offers green burial sections.' },
          ],
        },
        {
          title: 'Explore Options',
          items: [
            { label: 'Method Deep Dives', description: 'Links to technical descriptions of natural organic reduction, green burial preparation, aquamation processing, and other alternative services available in New York.' },
            { label: 'Environmental & Practical Impact', description: 'Comparative data on environmental footprint, space requirements, and processing timelines for each method.' },
          ],
        },
        {
          title: 'Provider Directory',
          items: [],
          providers: [
            {
              name: 'Rachel Cao (NYC End-of-Life Doula)',
              description: 'Serving the five boroughs with virtual and in-person ritual and legacy support.',
              services: 'Virtual and in-person ritual planning, legacy support, and end-of-life doula services.',
              locations: ['New York City (all five boroughs)'],
              phone: '(646) 926-4457',
              email: '',
              website: 'rachelendoflifedoula.com',
              costEstimate: '$2,000 - $5,500 for urban-intensive support packages.',
            },
          ],
        },
        {
          title: 'Cost Estimates',
          items: [
            { label: 'Pricing Ranges', description: 'General cost comparison between uncommon and standard services within New York.' },
            { label: 'Transparent Fees', description: 'Common add-on costs including transport, filing fees, and facility charges.' },
          ],
        },
      ],
    },
    immediate: {
      intro: 'Navigate alternative options and state specific resources needed for a recent death\'s service plan.',
      sections: [],
    },
  },
];

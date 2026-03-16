#!/usr/bin/env node

/**
 * VisaPath - Programmatic Visa Pair Content Generator
 * Generates 37,000+ visa pair JSON files without LLM APIs
 * Uses embedded visa policy rules and templates
 */

const fs = require('fs');
const path = require('path');
const countries = require('../src/data/countries.js').countries;
const { makePairSlug } = require('../src/data/countries.js');

// Output directory
const PAIRS_DIR = path.join(__dirname, '../src/data/visa-pairs');

// Ensure output directory exists
if (!fs.existsSync(PAIRS_DIR)) {
  fs.mkdirSync(PAIRS_DIR, { recursive: true });
}

// ============================================================================
// VISA POLICY DATABASE
// ============================================================================

// Schengen Area countries (full list)
const SCHENGEN_ZONE = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU',
  'IS', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK',
  'SI', 'ES', 'SE', 'CH', 'LI'
]);

// Countries with Schengen visa-free access (90 days in 180)
const SCHENGEN_VISA_FREE = new Set([
  'US', 'CA', 'AU', 'NZ', 'JP', 'KR', 'SG', 'MY', 'IL', 'UAE', 'SA', 'QA', 'BH',
  'OM', 'KW', 'BR', 'AR', 'CL', 'MX', 'MU', 'SG', 'HK', 'TW', 'TH', 'VN', 'PH',
  'ID', 'BN', 'KH', 'LA', 'MM', 'MZ', 'BW', 'NA', 'KE', 'TZ', 'UG', 'ZA', 'RS',
  'BA', 'ME', 'MK', 'AL', 'TR', 'UA', 'MD', 'GE', 'AM', 'AZ'
]);

// GCC (Gulf Cooperation Council) - mutual visa-free
const GCC_STATES = new Set(['SA', 'AE', 'QA', 'KW', 'BH', 'OM']);

// ASEAN countries - visa-free mutual access
const ASEAN = new Set(['BN', 'KH', 'ID', 'LA', 'MY', 'MM', 'PH', 'SG', 'TH', 'VN']);

// Commonwealth countries - advantages
const COMMONWEALTH = new Set([
  'GB', 'CA', 'AU', 'NZ', 'IN', 'BD', 'PK', 'LK', 'MY', 'SG', 'BN', 'KE', 'TZ',
  'UG', 'ZA', 'BW', 'NA', 'ZM', 'ZW', 'MW', 'NG', 'GH', 'SN', 'MU', 'SC', 'JM',
  'TT', 'BS', 'BB', 'AG', 'DM', 'GD', 'LC', 'VC', 'KN', 'GY', 'SR', 'BZ', 'CY',
  'MT', 'VG', 'KY', 'FK', 'GI'
]);

// eVisa countries (known eVisa programs)
const EVISA_COUNTRIES = new Set([
  'IN',  // India eVisa (150+ nationalities)
  'TR',  // Turkey eVisa
  'AE',  // UAE eVisa
  'KH',  // Cambodia eVisa
  'LA',  // Laos eVisa
  'MM',  // Myanmar eVisa
  'TH',  // Thailand eVisa
  'VN',  // Vietnam eVisa
  'EG',  // Egypt eVisa
  'KE',  // Kenya eVisa
  'TZ',  // Tanzania eVisa
  'SZ',  // Eswatini eVisa
  'GH',  // Ghana eVisa
  'CI',  // Côte d'Ivoire eVisa
  'BF',  // Burkina Faso eVisa
  'CV',  // Cape Verde eVisa
  'MA',  // Morocco eVisa (select nationalities)
  'TN',  // Tunisia eVisa
  'ET',  // Ethiopia eVisa
  'ZA',  // South Africa eVisa
  'KZ',  // Kazakhstan eVisa
  'AZ',  // Azerbaijan eVisa
  'GE',  // Georgia eVisa (optional)
  'BY',  // Belarus eVisa
  'KG',  // Kyrgyzstan eVisa
  'TJ',  // Tajikistan eVisa
  'UZ',  // Uzbekistan eVisa
  'BD',  // Bangladesh eVisa
  'LK',  // Sri Lanka eVisa
  'BR',  // Brazil eVisa
  'AR',  // Argentina eVisa (select)
  'MX',  // Mexico eVisa (select)
  'CL',  // Chile eVisa
  'NZ',  // New Zealand eVisa (NZeTA)
  'AU',  // Australia eTA
  'CA',  // Canada eTA
  'US',  // US eVISA
]);

// US ESTA - Visa Waiver Program
const US_VISA_WAIVER = new Set([
  'AT', 'AU', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'HU', 'IS', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO',
  'SK', 'SI', 'ES', 'SE', 'CH', 'GB', 'JP', 'KR', 'NZ', 'AU', 'MX', 'BR', 'CL',
  'AR', 'CO', 'IL', 'SG', 'MY', 'TW', 'MU', 'KR', 'CH'
]);

// UK visa-free access (post-Brexit)
const UK_VISA_FREE = new Set([
  ...SCHENGEN_ZONE, 'US', 'CA', 'AU', 'NZ', 'JP', 'KR', 'SG', 'HK', 'TW', 'MU',
  'MX', 'BR', 'AR', 'CL', 'IL', 'UAE', 'SA', 'BH', 'OM', 'QA', 'KW', 'US', 'CA'
]);

// Countries with very restrictive visa policies
const HIGHLY_RESTRICTED = new Set([
  'KP',  // North Korea
  'IR',  // Iran
  'SY',  // Syria
  'SD',  // Sudan
  'SO',  // Somalia
]);

// ============================================================================
// VISA POLICY RULES ENGINE
// ============================================================================

function determineVisaPolicy(fromCode, toCode, fromCountry, toCountry) {
  // Same country - skip (handled earlier)
  if (fromCode === toCode) {
    return null;
  }

  // Schengen internal: free movement
  if (SCHENGEN_ZONE.has(fromCode) && SCHENGEN_ZONE.has(toCode)) {
    return {
      visaRequired: false,
      visaType: 'Schengen Area - Free Movement',
      stayDuration: 'Unrestricted (EU/EEA citizen)',
      processingTime: 'N/A',
      visaFee: 'Free',
      eVisaAvailable: false,
      summary: `${fromCountry.demonym}s can travel freely within the Schengen Area as EU/EEA citizens. No visa required for work, study, or residence in any Schengen country.`,
      tips: [
        'Bring a valid passport or ID card (EU/EEA nationals only)',
        'Register with local authorities if staying longer than 3 months',
        'Your healthcare and employment rights are protected within the EU'
      ]
    };
  }

  // Schengen visa-free (90/180 rule)
  if (SCHENGEN_VISA_FREE.has(fromCode) && SCHENGEN_ZONE.has(toCode)) {
    return {
      visaRequired: false,
      visaType: 'Visa Exemption',
      stayDuration: '90 days in any 180-day period',
      processingTime: 'N/A',
      visaFee: 'Free',
      eVisaAvailable: false,
      summary: `${fromCountry.demonym}s can visit the Schengen Area visa-free for tourism, business, or family visits. The 90/180-day rule means you can spend 90 days in any 180-day period.`,
      tips: [
        'Keep your passport valid for at least 3 months beyond your stay',
        'Carry proof of funds and return ticket',
        'Schengen time is shared across all countries in the zone',
        'Work is generally not permitted on visa-free entry'
      ]
    };
  }

  // GCC mutual visa-free
  if (GCC_STATES.has(fromCode) && GCC_STATES.has(toCode)) {
    return {
      visaRequired: false,
      visaType: 'GCC Agreement - Visa Exemption',
      stayDuration: 'Up to 6 months per entry',
      processingTime: 'N/A',
      visaFee: 'Free',
      eVisaAvailable: false,
      summary: `${fromCountry.demonym}s have visa-free access to all GCC member states. No visa required for stays up to 6 months for citizens of Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, and Oman.`,
      tips: [
        'Bring a valid GCC passport',
        'You can extend your stay for an additional 3 months if needed',
        'Your residence status will be tracked in the GCC system',
        'Employment visa may have different requirements'
      ]
    };
  }

  // ASEAN visa-free
  if (ASEAN.has(fromCode) && ASEAN.has(toCode)) {
    return {
      visaRequired: false,
      visaType: 'ASEAN Agreement - Visa Exemption',
      stayDuration: '14-30 days (depending on agreement)',
      processingTime: 'N/A',
      visaFee: 'Free',
      eVisaAvailable: false,
      summary: `${fromCountry.demonym}s enjoy visa-free travel within ASEAN under the ASEAN Visa Exemption Agreement. Visa-free entry for tourism and business purposes.`,
      tips: [
        'Valid passport required (typically 6 months validity)',
        'Exact duration varies by bilateral agreement (14-30 days)',
        'Extension options available in most countries',
        'Work permits are separate from tourist entry'
      ]
    };
  }

  // US ESTA (Visa Waiver Program)
  if (US_VISA_WAIVER.has(fromCode) && toCode === 'US') {
    return {
      visaRequired: false,
      visaType: 'ESTA (Electronic System for Travel Authorization)',
      stayDuration: '90 days (tourism/business)',
      processingTime: 'Usually instant to 72 hours',
      visaFee: 'USD $14 (ESTA application)',
      eVisaAvailable: true,
      summary: `${fromCountry.demonym}s can enter the United States visa-free via ESTA. This electronic authorization is valid for 2 years and allows multiple entries.`,
      tips: [
        'Apply for ESTA online at least 72 hours before travel',
        'ESTA is valid for 2 years (multiple entries)',
        'Work is not permitted under ESTA',
        'You may be required to show return or onward ticket'
      ]
    };
  }

  // UK visa-free access
  if (UK_VISA_FREE.has(fromCode) && toCode === 'GB') {
    return {
      visaRequired: false,
      visaType: 'Visa Exemption',
      stayDuration: '6 months (tourism), varies for work/study',
      processingTime: 'N/A',
      visaFee: 'Free',
      eVisaAvailable: false,
      summary: `${fromCountry.demonym}s can visit the UK visa-free for tourism for up to 6 months. Additional visas required for work or study.`,
      tips: [
        'Passport must be valid for the entire stay',
        'Bring proof of funds for accommodation and expenses',
        'No work permitted on tourist entry',
        'Student and work visas have separate application processes'
      ]
    };
  }

  // eVisa destinations
  if (EVISA_COUNTRIES.has(toCode)) {
    const eVisaDetails = getEVisaDetails(toCode, toCountry);
    return {
      visaRequired: true,
      visaType: eVisaDetails.type,
      stayDuration: eVisaDetails.stayDuration,
      processingTime: eVisaDetails.processingTime,
      visaFee: eVisaDetails.fee,
      eVisaAvailable: true,
      eVisaUrl: eVisaDetails.url,
      summary: `${fromCountry.demonym}s can obtain an ${eVisaDetails.type} for ${toCountry.name} online. This electronic visa simplifies the application process and is processed quickly.`,
      tips: [
        'Apply online - no need to visit an embassy',
        'Processing usually takes 2-7 business days',
        `Keep your eVisa confirmation email (${eVisaDetails.type})`,
        `Check the official ${toCountry.name} immigration website for eligibility`
      ]
    };
  }

  // Highly restricted destinations
  if (HIGHLY_RESTRICTED.has(toCode)) {
    return {
      visaRequired: true,
      visaType: 'Restricted Visa / Special Permission',
      stayDuration: 'Variable',
      processingTime: '8-12 weeks or longer',
      visaFee: 'Varies',
      eVisaAvailable: false,
      summary: `${fromCountry.demonym}s require a visa to enter ${toCountry.name}. Due to international restrictions or domestic instability, visas may be difficult to obtain. Travel to this destination may be restricted or not recommended.`,
      tips: [
        `Check your government's travel warnings for ${toCountry.name}`,
        'Contact the embassy directly for current visa policies',
        'Some nationalities may face additional restrictions',
        'Consider whether travel is essential'
      ]
    };
  }

  // Default: standard visa required
  return {
    visaRequired: true,
    visaType: 'Visitor Visa / Tourist Visa',
    stayDuration: 'Typically 30-90 days',
    processingTime: '4-12 weeks',
    visaFee: 'USD $50-200 (approximate)',
    eVisaAvailable: false,
    summary: `${fromCountry.demonym}s require a visa to visit ${toCountry.name}. Apply through the embassy or official government portal with standard travel documents.`,
    tips: [
      'Start your visa application 6-8 weeks before travel',
      'Prepare financial proof of funds for your stay',
      'Letter of invitation may be required if visiting family/friends',
      'Processing times vary; plan ahead'
    ]
  };
}

function getEVisaDetails(countryCode, countryData) {
  const details = {
    'IN': {
      type: 'India eVisa',
      stayDuration: '90 days (varies by type)',
      processingTime: '2-5 business days',
      fee: 'INR 2,000-10,000 (varies)',
      url: 'https://indianvisaonline.gov.in/'
    },
    'TR': {
      type: 'Turkey eVisa',
      stayDuration: '90 days in 180 days',
      processingTime: 'Instant to 24 hours',
      fee: 'USD $45-70',
      url: 'https://www.evisa.gov.tr/'
    },
    'AE': {
      type: 'UAE eVisa',
      stayDuration: '30-90 days',
      processingTime: '1-2 business days',
      fee: 'AED 100-400',
      url: 'https://smartservices.ica.gov.ae/'
    },
    'KH': {
      type: 'Cambodia eVisa',
      stayDuration: '30 days',
      processingTime: '1-3 business days',
      fee: 'USD $25-36',
      url: 'https://www.evisa.gov.kh/'
    },
    'LA': {
      type: 'Laos eVisa',
      stayDuration: '30 days',
      processingTime: '2-3 business days',
      fee: 'USD $42-48',
      url: 'https://www.evisa.laos-immigration.gov.la/'
    },
    'MM': {
      type: 'Myanmar eVisa',
      stayDuration: '90 days (tourist)',
      processingTime: '3-7 business days',
      fee: 'USD $50',
      url: 'https://evisa.moip.gov.mm/'
    },
    'TH': {
      type: 'Thailand eVisa',
      stayDuration: '90 days (tourist)',
      processingTime: '2-4 business days',
      fee: 'THB 3,000+',
      url: 'https://thaievisa.go.th/'
    },
    'VN': {
      type: 'Vietnam eVisa',
      stayDuration: '30-90 days',
      processingTime: '2-5 business days',
      fee: 'USD $25-100',
      url: 'https://evisa.xuatnhapcanh.gov.vn/'
    },
    'EG': {
      type: 'Egypt eVisa',
      stayDuration: '30 days (tourist)',
      processingTime: '7 business days',
      fee: 'USD $25',
      url: 'https://www.egyptianvisa.com/'
    },
    'KE': {
      type: 'Kenya eVisa',
      stayDuration: '90 days',
      processingTime: '2-5 business days',
      fee: 'USD $50',
      url: 'https://www.ecitizen.go.ke/'
    },
    'TZ': {
      type: 'Tanzania eVisa',
      stayDuration: '90 days',
      processingTime: '2-3 business days',
      fee: 'USD $50',
      url: 'https://eservices.immigration.go.tz/'
    },
    'ZA': {
      type: 'South Africa eVisa',
      stayDuration: 'Up to 90 days',
      processingTime: '5-10 business days',
      fee: 'ZAR 500-600',
      url: 'https://www.vfsglobal.com/en/'
    },
    'GH': {
      type: 'Ghana eVisa',
      stayDuration: '30 days',
      processingTime: '5-7 business days',
      fee: 'USD $110',
      url: 'https://www.ghanaimmigration.org/'
    },
    'BR': {
      type: 'Brazil eVisa',
      stayDuration: '90 days',
      processingTime: '3-5 business days',
      fee: 'BRL 160',
      url: 'https://www.gov.br/cidadania/'
    },
    'AR': {
      type: 'Argentina Advance Visa Application',
      stayDuration: '90 days (tourist)',
      processingTime: 'Online pre-approval',
      fee: 'Free',
      url: 'https://www.argentina.gob.ar/'
    },
  };

  return details[countryCode] || {
    type: `${countryData.name} eVisa`,
    stayDuration: '30-90 days',
    processingTime: '3-7 business days',
    fee: 'USD $25-75',
    url: `https://www.immigration.${countryData.slug.replace(/-/g, '')}.gov/`
  };
}

// ============================================================================
// CONTENT GENERATION TEMPLATES
// ============================================================================

function generateRequirements(visaType, fromCountry, toCountry) {
  if (visaType.includes('Schengen Area') || visaType.includes('Visa Exemption')) {
    return [
      `Valid ${fromCountry.name} passport (minimum 6 months beyond travel date)`,
      'Proof of sufficient funds for stay',
      'Return or onward flight ticket',
      'Travel insurance (recommended)',
      'Accommodation details or letter of invitation'
    ];
  }

  if (visaType.includes('ESTA')) {
    return [
      'Valid passport (machine-readable preferred)',
      'Email address for ESTA confirmation',
      'Credit/debit card for ESTA fee',
      'No criminal record (ESTA eligibility)',
      'Valid travel documents'
    ];
  }

  if (visaType.includes('eVisa')) {
    return [
      `Valid ${fromCountry.name} passport (minimum 6 months validity)`,
      'Digital passport photo (specific size per country)',
      'Completed online application form',
      'Payment method (credit card or digital wallet)',
      'Email address for eVisa approval',
      'Proof of travel plans (optional for some countries)'
    ];
  }

  // Standard visitor visa
  return [
    `Valid ${fromCountry.name} passport (minimum 6 months beyond stay)`,
    'Completed visa application form',
    'Passport-sized photographs',
    'Proof of financial means',
    'Travel itinerary and flight bookings',
    'Accommodation proof',
    `Letter of invitation (if applicable)`,
    'Travel insurance certificate',
    'Return flight ticket',
    'Bank statements (last 3-6 months)'
  ];
}

function generateSteps(visaType, toCountry) {
  if (visaType.includes('Visa Exemption') && !visaType.includes('ESTA')) {
    return [
      'Check passport validity (minimum 6 months)',
      'Book your flights to ' + toCountry.name,
      'Arrange accommodation',
      'Gather travel documents and proof of funds',
      'Proceed to the airport with your passport',
      'Carry evidence of return flight at immigration'
    ];
  }

  if (visaType.includes('ESTA')) {
    return [
      'Visit the official ESTA website at least 72 hours before travel',
      'Complete the online ESTA application form',
      'Pay the ESTA fee (USD $14)',
      'Receive ESTA approval confirmation via email',
      'Save and print your ESTA confirmation',
      'Present passport and ESTA confirmation at US immigration'
    ];
  }

  if (visaType.includes('eVisa')) {
    return [
      'Visit the official eVisa portal for ' + toCountry.name,
      'Complete the online application with personal details',
      'Upload passport photo and passport copy',
      'Pay the eVisa fee online',
      'Receive approval via email (typically 2-7 days)',
      'Print your eVisa approval letter',
      'Present eVisa and passport at immigration upon arrival'
    ];
  }

  if (visaType.includes('Free Movement')) {
    return [
      'Ensure your EU/EEA ID or passport is valid',
      'No visa or pre-travel authorization needed',
      'Travel to the destination with your travel documents',
      'Present your ID at immigration if required',
      'Enjoy unrestricted access within the Schengen Area'
    ];
  }

  // Standard embassy visa
  return [
    'Locate the nearest embassy or consulate for ' + toCountry.name,
    'Check current visa requirements on the official website',
    'Prepare all required documents',
    'Submit application (online or in-person)',
    'Pay visa processing fee',
    'Attend biometric appointment if required',
    'Wait for visa processing (4-12 weeks typically)',
    'Collect your passport with visa stamp',
    'Book travel within visa validity period'
  ];
}

function generateTips(fromCountry, toCountry, visaType) {
  const tips = [
    `Check ${toCountry.name}'s official immigration website for the latest requirements`,
    `Start your application process well in advance of your travel date`,
    `Keep copies of all submitted documents and receipts`,
    `Be truthful in all applications - misrepresentation can lead to bans`
  ];

  if (toCountry.region === 'Europe' && fromCountry.region !== 'Europe') {
    tips.push('Consider travel insurance to cover medical emergencies in ' + toCountry.name);
  }

  if (fromCountry.code === 'IN') {
    tips.push('Indian passport holders should verify their eligibility category on official portals');
    tips.push('Early booking of embassy appointments is recommended due to high demand');
  }

  if (visaType.includes('90 days in 180')) {
    tips.push('Days spent in Schengen countries count towards your 90-day quota');
    tips.push('Overstaying Schengen visas can result in fines and re-entry bans');
  }

  return tips;
}

function generateCommonReasons(toCountry) {
  const reasons = ['Tourism and sightseeing', 'Business meetings and conferences', 'Visiting family or friends'];

  if (toCountry.region === 'Asia') {
    reasons.push('Medical treatment and wellness tourism');
    reasons.push('Adventure activities and trekking');
  } else if (toCountry.region === 'Europe') {
    reasons.push('Cultural exploration and heritage sites');
    reasons.push('Educational courses and seminars');
  } else if (toCountry.region === 'Americas') {
    reasons.push('Adventure travel and outdoor activities');
    reasons.push('Beach and resort vacations');
  }

  return reasons;
}

function generateEmbassyInfo(toCountry, fromCountry) {
  return {
    name: `Embassy/Consulate of ${toCountry.name} in ${fromCountry.name}`,
    address: `Check official ${toCountry.name} government website for exact address in ${fromCountry.capital}`,
    phone: 'Available on official embassy website',
    website: `https://www.${toCountry.slug.replace(/-/g, '')}.gov/ or official visa portal`,
    vfsLocations: getVFSLocations(fromCountry)
  };
}

function getVFSLocations(country) {
  const countryLocations = {
    'IN': ['New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Chandigarh', 'Jalandhar', 'Ahmedabad', 'Kochi'],
    'PK': ['Islamabad', 'Karachi', 'Lahore'],
    'BD': ['Dhaka', 'Chittagong'],
    'LK': ['Colombo'],
    'NP': ['Kathmandu'],
    'PH': ['Manila', 'Cebu', 'Davao'],
    'ID': ['Jakarta', 'Surabaya', 'Bali'],
    'VN': ['Hanoi', 'Ho Chi Minh City', 'Da Nang'],
    'TH': ['Bangkok', 'Chiang Mai'],
  };
  return countryLocations[country.code] || ['Capital City', `Major Cities in ${country.name}`];
}

function generateFAQs(fromCountry, toCountry, visaType) {
  const faqs = [
    {
      question: `How long can ${fromCountry.demonym.toLowerCase()}s stay in ${toCountry.name}?`,
      answer: `The maximum stay depends on the visa type. Tourist visas typically allow 30-90 days. Check the specific visa grant for your authorized period.`
    },
    {
      question: `Can I work in ${toCountry.name} on a tourist visa?`,
      answer: `No, tourist/visitor visas do not permit employment. You need a separate work visa or employment pass to legally work in ${toCountry.name}.`
    },
    {
      question: `What's the visa refusal rate for ${fromCountry.demonym.toLowerCase()} applicants to ${toCountry.name}?`,
      answer: `Refusal rates vary by year and visa type. Check recent statistics on ${toCountry.name}'s immigration ministry website. Strong documentation improves approval chances.`
    },
    {
      question: `Can I apply for a ${toCountry.name} visa from outside ${fromCountry.name}?`,
      answer: `Yes, most countries allow visa applications from other countries where you are legally residing. However, applying from your home country is often preferred for processing.`
    }
  ];

  // Add custom FAQ based on visa type
  if (visaType.includes('Schengen')) {
    faqs.push({
      question: 'Do I need a Schengen visa to visit multiple Schengen countries?',
      answer: 'No, one Schengen visa covers all member states. You can travel freely within the zone on a single visa.'
    });
  }

  if (visaType.includes('eVisa')) {
    faqs.push({
      question: 'How do I access my eVisa approval?',
      answer: 'Once approved, you\'ll receive your eVisa via email. Print it and carry it with your passport when traveling.'
    });
  }

  return faqs;
}

function generateRelatedPairs(fromCountry, toCountry, allCountries) {
  const related = [];

  // Same origin, different destinations (same region as current)
  const sameRegionDests = allCountries
    .filter(c => c.region === toCountry.region && c.code !== toCountry.code && c.code !== fromCountry.code)
    .slice(0, 2);

  for (const dest of sameRegionDests) {
    related.push(makePairSlug(fromCountry, dest));
  }

  // Same destination, different origins (same region as current)
  const sameRegionOrigins = allCountries
    .filter(c => c.region === fromCountry.region && c.code !== fromCountry.code && c.code !== toCountry.code)
    .slice(0, 2);

  for (const origin of sameRegionOrigins) {
    related.push(makePairSlug(origin, toCountry));
  }

  return related.slice(0, 4);
}

function generateSEO(fromCountry, toCountry, visaType) {
  const year = new Date().getFullYear();
  const visaTypeStr = visaType.split('(')[0].trim();

  return {
    title: `${fromCountry.name} to ${toCountry.name} Visa Requirements ${year} | ${fromCountry.demonym} Passport Guide`,
    description: `Complete guide for ${fromCountry.demonym} passport holders traveling to ${toCountry.name}. Visa requirements, application process, processing time, fees, and tips for ${year}.`,
    keywords: [
      `${fromCountry.slug} to ${toCountry.slug} visa`,
      `${fromCountry.demonym.toLowerCase()} passport ${toCountry.name} visa`,
      `${toCountry.name} visa for ${fromCountry.demonym.toLowerCase()}s`,
      `${visaTypeStr.toLowerCase()} requirements`,
      `${fromCountry.name} ${toCountry.name} visa ${year}`,
      `how to get ${toCountry.name} visa for ${fromCountry.demonym.toLowerCase()}`,
      `${toCountry.name} visa application process`,
      `${fromCountry.demonym.toLowerCase()} travel to ${toCountry.name}`
    ]
  };
}

// ============================================================================
// MAIN GENERATION LOGIC
// ============================================================================

function generateVisaPairJSON(fromCountry, toCountry) {
  // Determine visa policy
  const policy = determineVisaPolicy(fromCountry.code, toCountry.code, fromCountry, toCountry);

  if (!policy) return null;

  // Generate content
  const pairData = {
    from: fromCountry.code,
    to: toCountry.code,
    slug: makePairSlug(fromCountry, toCountry),
    lastUpdated: new Date().toISOString().split('T')[0],
    visaRequired: policy.visaRequired,
    visaType: policy.visaType,
    stayDuration: policy.stayDuration,
    processingTime: policy.processingTime,
    visaFee: policy.visaFee,
    eVisaAvailable: policy.eVisaAvailable,
  };

  if (policy.eVisaUrl) {
    pairData.eVisaUrl = policy.eVisaUrl;
  }

  pairData.summary = policy.summary;
  pairData.requirements = generateRequirements(policy.visaType, fromCountry, toCountry);
  pairData.steps = generateSteps(policy.visaType, toCountry);
  pairData.tips = policy.tips || generateTips(fromCountry, toCountry, policy.visaType);
  pairData.commonReasons = generateCommonReasons(toCountry);
  pairData.embassyInfo = generateEmbassyInfo(toCountry, fromCountry);
  pairData.faqs = generateFAQs(fromCountry, toCountry, policy.visaType);
  pairData.relatedPairs = generateRelatedPairs(fromCountry, toCountry, countries);
  pairData.seo = generateSEO(fromCountry, toCountry, policy.visaType);

  return pairData;
}

function saveVisaPair(pairData) {
  const filename = `${pairData.slug}.json`;
  const filepath = path.join(PAIRS_DIR, filename);

  // Skip if file already exists
  if (fs.existsSync(filepath)) {
    return { skipped: true, file: filename };
  }

  try {
    fs.writeFileSync(filepath, JSON.stringify(pairData, null, 2) + '\n');
    return { success: true, file: filename };
  } catch (error) {
    return { error: true, file: filename, message: error.message };
  }
}

// ============================================================================
// EXECUTION
// ============================================================================

async function generateAllPairs() {
  console.log('VisaPath - Generating all visa pairs...\n');
  console.log(`Total countries: ${countries.length}`);
  console.log(`Expected pairs (excluding self): ${countries.length * (countries.length - 1)}`);
  console.log(`Output directory: ${PAIRS_DIR}\n`);

  let generated = 0;
  let skipped = 0;
  let errors = 0;
  let processed = 0;
  const total = countries.length * countries.length;

  const startTime = Date.now();

  for (let i = 0; i < countries.length; i++) {
    const fromCountry = countries[i];

    for (let j = 0; j < countries.length; j++) {
      const toCountry = countries[j];
      processed++;

      // Skip same-country pairs
      if (fromCountry.code === toCountry.code) {
        continue;
      }

      // Generate and save
      const pairData = generateVisaPairJSON(fromCountry, toCountry);
      if (!pairData) continue;

      const result = saveVisaPair(pairData);

      if (result.success) {
        generated++;
      } else if (result.skipped) {
        skipped++;
      } else if (result.error) {
        errors++;
        console.error(`Error generating ${result.file}: ${result.message}`);
      }

      // Progress indicator every 1000 pairs
      if (processed % 1000 === 0) {
        const elapsed = (Date.now() - startTime) / 1000;
        const rate = (processed / elapsed).toFixed(0);
        console.log(`Progress: ${processed}/${total} pairs (${rate} pairs/sec) - Generated: ${generated}, Skipped: ${skipped}`);
      }
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n' + '='.repeat(60));
  console.log('Generation Complete!');
  console.log('='.repeat(60));
  console.log(`Total generated: ${generated}`);
  console.log(`Total skipped (already exist): ${skipped}`);
  console.log(`Total errors: ${errors}`);
  console.log(`Total time: ${elapsed}s`);
  console.log(`Total visa pairs created: ${generated + skipped}`);
  console.log('='.repeat(60) + '\n');
}

// Run the generator
generateAllPairs().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

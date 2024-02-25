export const PROFILE_INPUTS = [
  {
    id: 'firstname',
    backend_property: 'firstname',
    label: 'First Name',
    type: 'text',
    required: true,
  },
  {
    id: 'lastname',
    backend_property: 'lastname',
    label: 'Last Name',
    type: 'text',
    required: true,
  },
  {
    id: 'position',
    backend_property: 'position',
    label: 'Position',
    type: 'text',
    required: true,
  },
  {
    id: 'meeting_link',
    backend_property: 'meeting_link',
    label: 'Meeting Link (e.g. Calendly)',
    type: 'text',
    required: false,
  },
  {
    id: 'interests',
    backend_property: 'interests',
    label: 'Interests',
    type: 'multiselect',
    required: false,
    options: [
      {
        id: 1,
        value: 'business-development',
        label: 'Business Development',
      },
      {
        id: 2,
        value: 'collaboration',
        label: 'Collaboration',
      },
      {
        id: 3,
        value: 'contracting-services',
        label: 'Contracting Services',
      },
      {
        id: 4,
        value: 'distribution',
        label: 'Distribution',
      },
      {
        id: 5,
        value: 'equity-investment',
        label: 'Equity Investment',
      },
      {
        id: 6,
        value: 'franchising',
        label: 'Franchising',
      },
      {
        id: 7,
        value: 'joint-venture',
        label: 'Joint Venture',
      },
      {
        id: 8,
        value: 'licensing',
        label: 'Licensing',
      },
      {
        id: 9,
        value: 'mergers-acquisitions',
        label: 'Mergers & Acquisitions',
      },
      {
        id: 10,
        value: 'outsourcing',
        label: 'Outsourcing',
      },
      {
        id: 11,
        value: 'product-development',
        label: 'Product Development',
      },
      {
        id: 12,
        value: 'research-development',
        label: 'Research & Development',
      },
      {
        id: 13,
        value: 'sales-marketing',
        label: 'Sales & Marketing',
      },
      {
        id: 14,
        value: 'sponsorship',
        label: 'Sponsorship',
      },
      {
        id: 15,
        value: 'strategic-alliance',
        label: 'Strategic Alliance',
      },
      {
        id: 16,
        value: 'supply-chain',
        label: 'Supply Chain',
      },
      {
        id: 17,
        value: 'technology-transfer',
        label: 'Technology Transfer',
      },
      {
        id: 18,
        value: 'venture-capital',
        label: 'Venture Capital',
      },
      {
        id: 19,
        value: 'white-labeling',
        label: 'White Labeling',
      },
    ],
  },
];

export const COMPANY_INPUTS = [
  {
    id: 'company_name',
    backend_property: 'company_name',
    label: 'Company Name',
    type: 'text',
    required: true,
  },
  {
    id: 'company_valuation',
    backend_property: 'company_valuation',
    label: 'Company Valuation (USD)',
    type: 'text',
    required: false,
  },
  {
    id: 'company_employees',
    backend_property: 'company_employees',
    label: 'Number of employees',
    type: 'text',
    required: false,
  },
  {
    id: 'company_investment',
    backend_property: 'company_investment',
    label: 'Last investment (USD)',
    type: 'text',
    required: false,
  },

  {
    id: 'company_type',
    backend_property: 'company_type',
    label: 'Company type',
    type: 'select',
    required: false,
    options: [
      {
        id: 1,
        value: 'startup',
        label: 'Startup',
      },
      {
        id: 2,
        value: 'corporation',
        label: 'Corporation',
      },
    ],
  },

  {
    id: 'company_industry',
    backend_property: 'company_industry',
    label: 'Industry',
    type: 'select',
    required: false,
    options: [
      { id: 1, type: 'param', value: 'agriculture', label: 'Agriculture' },
      { id: 2, type: 'param', value: 'construction', label: 'Construction' },
      { id: 3, type: 'param', value: 'education', label: 'Education' },
      { id: 4, type: 'param', value: 'energy', label: 'Energy' },
      { id: 5, type: 'param', value: 'engineering', label: 'Engineering' },
      { id: 6, type: 'param', value: 'environment', label: 'Environment' },
      { id: 7, type: 'param', value: 'finance', label: 'Finance' },
      {
        id: 8,
        type: 'param',
        value: 'food-beverages',
        label: 'Food & Beverages',
      },
      { id: 9, type: 'param', value: 'healthcare', label: 'Healthcare' },
      { id: 10, type: 'param', value: 'hospitality', label: 'Hospitality' },
      {
        id: 11,
        type: 'param',
        value: 'information-technology',
        label: 'Information Technology',
      },
      { id: 12, type: 'param', value: 'internet', label: 'Internet' },
      { id: 13, type: 'param', value: 'legal', label: 'Legal' },
      { id: 14, type: 'param', value: 'logistics', label: 'Logistics' },
      { id: 15, type: 'param', value: 'manufacturing', label: 'Manufacturing' },
      { id: 16, type: 'param', value: 'media', label: 'Media' },
      { id: 17, type: 'param', value: 'mining', label: 'Mining' },
      { id: 18, type: 'param', value: 'music', label: 'Music' },
      {
        id: 19,
        type: 'param',
        value: 'pharmaceuticals',
        label: 'Pharmaceuticals',
      },
      {
        id: 20,
        type: 'param',
        value: 'public-administration',
        label: 'Public Administration',
      },
      { id: 21, type: 'param', value: 'real-estate', label: 'Real Estate' },
      { id: 22, type: 'param', value: 'recreation', label: 'Recreation' },
      { id: 23, type: 'param', value: 'retail', label: 'Retail' },
      { id: 24, type: 'param', value: 'science', label: 'Science' },
      { id: 25, type: 'param', value: 'services', label: 'Services' },
      { id: 26, type: 'param', value: 'technology', label: 'Technology' },
      {
        id: 27,
        type: 'param',
        value: 'telecommunications',
        label: 'Telecommunications',
      },
      { id: 28, type: 'param', value: 'textiles', label: 'Textiles' },
      {
        id: 29,
        type: 'param',
        value: 'transportation',
        label: 'Transportation',
      },
      { id: 30, type: 'param', value: 'travel', label: 'Travel' },
    ],
  },

  {
    id: 'company_description',
    backend_property: 'company_description',
    label: 'Your company in 50 words',
    type: 'texttarea',
    required: false,
  },
];

export const MODAL_INPUTS = [
  {
    id: 'message',
    backend_property: 'message',
    label: 'Message',
    type: 'texttarea',
    required: false,
  },
  {
    id: 'interest',
    backend_property: 'interest',
    label: 'Interest',
    type: 'select',
    required: false,
    options: [
      {
        id: 1,
        value: 'business-development',
        label: 'Business Development',
      },
      {
        id: 2,
        value: 'collaboration',
        label: 'Collaboration',
      },
      {
        id: 3,
        value: 'contracting-services',
        label: 'Contracting Services',
      },
      {
        id: 4,
        value: 'distribution',
        label: 'Distribution',
      },
      {
        id: 5,
        value: 'equity-investment',
        label: 'Equity Investment',
      },
      {
        id: 6,
        value: 'franchising',
        label: 'Franchising',
      },
      {
        id: 7,
        value: 'joint-venture',
        label: 'Joint Venture',
      },
      {
        id: 8,
        value: 'licensing',
        label: 'Licensing',
      },
      {
        id: 9,
        value: 'mergers-acquisitions',
        label: 'Mergers & Acquisitions',
      },
      {
        id: 10,
        value: 'outsourcing',
        label: 'Outsourcing',
      },
      {
        id: 11,
        value: 'product-development',
        label: 'Product Development',
      },
      {
        id: 12,
        value: 'research-development',
        label: 'Research & Development',
      },
      {
        id: 13,
        value: 'sales-marketing',
        label: 'Sales & Marketing',
      },
      {
        id: 14,
        value: 'sponsorship',
        label: 'Sponsorship',
      },
      {
        id: 15,
        value: 'strategic-alliance',
        label: 'Strategic Alliance',
      },
      {
        id: 16,
        value: 'supply-chain',
        label: 'Supply Chain',
      },
      {
        id: 17,
        value: 'technology-transfer',
        label: 'Technology Transfer',
      },
      {
        id: 18,
        value: 'venture-capital',
        label: 'Venture Capital',
      },
      {
        id: 19,
        value: 'white-labeling',
        label: 'White Labeling',
      },
    ],
  },
];

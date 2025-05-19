import { Tenant, User } from '../types'

// Mock User Data
export const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'user1',
    accessibleTenantIds: ['tenant-a', 'tenant-b'],
  },
  { id: 'user-2', username: 'user2', accessibleTenantIds: ['tenant-b'] },
]

// Mock Tenant Data
export const mockTenantData: Tenant[] = [
  {
    id: 'tenant-a',
    name: 'Alpha Bank',
    theme: {
      colors: {
        primary: '#0056b3',
        headerBackground: '#004085',
        headerText: '#ffffff',
        secondary: '#0000FF',
        background: '#FAFAFA',
        text: '#353E43',
      },
      logoUrl: 'alpha-bank-logo.png',
    },
    labels: [
      { id: 'label-x', name: 'Retail Division X', config: { featureA: true } },
      {
        id: 'label-y',
        name: 'Corporate Banking Y',
        config: { featureB: true },
      },
    ],
  },
  {
    id: 'tenant-b',
    name: 'Beta Financial',
    theme: {
      colors: {
        primary: '#1e7e34',
        headerBackground: '#155724',
        headerText: '#ffffff',
        secondary: '#7F00FF',
        background: '#FFFAFA',
        text: '#353839',
      },
      logoUrl: 'beta-financial-logo.png',
    },
    labels: [
      {
        id: 'label-z',
        name: 'Wealth Management Z',
        config: {
          blahblahblah: 'yes please',
          dropdownsInsteadOfRadioButtons: true,
        },
      },
      {
        id: 'label-w',
        name: 'Regional Branch West',
        config: {
          specificLegalText:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          weWantSquares: true,
        },
      },
    ],
  },
  {
    id: 'tenant-c',
    name: 'Gamma Capital (No Custom Theme)',
    theme: {},
    labels: [{ id: 'label-p', name: 'Private Equity P' }],
  },
]

export interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  rateToEur: number; // For indicative local currency
}

export const WEST_AFRICAN_COUNTRIES: Country[] = [
  { code: 'ALL', name: 'Tous les pays', flag: '🌍', currency: 'EUR', symbol: '€', rateToEur: 1 },
  { code: 'BJ', name: 'Bénin', flag: '🇧🇯', currency: 'XOF', symbol: 'FCFA', rateToEur: 655.957 },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', currency: 'XOF', symbol: 'FCFA', rateToEur: 655.957 },
  { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮', currency: 'XOF', symbol: 'FCFA', rateToEur: 655.957 },
  { code: 'SN', name: 'Sénégal', flag: '🇸🇳', currency: 'XOF', symbol: 'FCFA', rateToEur: 655.957 },
  { code: 'TG', name: 'Togo', flag: '🇹🇬', currency: 'XOF', symbol: 'FCFA', rateToEur: 655.957 },
  { code: 'ML', name: 'Mali', flag: '🇲🇱', currency: 'XOF', symbol: 'FCFA', rateToEur: 655.957 },
  { code: 'GN', name: 'Guinée', flag: '🇬🇳', currency: 'GNF', symbol: 'FG', rateToEur: 9350 },
  { code: 'NE', name: 'Niger', flag: '🇳🇪', currency: 'XOF', symbol: 'FCFA', rateToEur: 655.957 },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', currency: 'GHS', symbol: 'GH₵', rateToEur: 16.5 },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currency: 'NGN', symbol: '₦', rateToEur: 1680 },
  { code: 'MR', name: 'Mauritanie', flag: '🇲🇷', currency: 'MRU', symbol: 'MRU', rateToEur: 42.8 },
  { code: 'CV', name: 'Cap-Vert', flag: '🇨🇻', currency: 'CVE', symbol: 'Esc', rateToEur: 110.265 },
  { code: 'GM', name: 'Gambie', flag: '🇬🇲', currency: 'GMD', symbol: 'D', rateToEur: 75.5 },
  { code: 'GW', name: 'Guinée-Bissau', flag: '🇬🇼', currency: 'XOF', symbol: 'FCFA', rateToEur: 655.957 },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷', currency: 'LRD', symbol: 'L$', rateToEur: 205 },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', currency: 'SLE', symbol: 'Le', rateToEur: 24.5 },
];

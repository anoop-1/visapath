// VisaPath — Complete Country Database
// 195 countries with slugs, demonyms, codes, regions, passport power rankings
// Passport rank: 1 = most powerful (most visa-free access)

const countries = [
  // === ASIA ===
  { name: 'Afghanistan', slug: 'afghanistan', demonym: 'Afghan', code: 'AF', region: 'Asia', subregion: 'South Asia', passportRank: 190, capital: 'Kabul', currency: 'AFN', languages: ['Pashto', 'Dari'] },
  { name: 'Armenia', slug: 'armenia', demonym: 'Armenian', code: 'AM', region: 'Asia', subregion: 'West Asia', passportRank: 78, capital: 'Yerevan', currency: 'AMD', languages: ['Armenian'] },
  { name: 'Azerbaijan', slug: 'azerbaijan', demonym: 'Azerbaijani', code: 'AZ', region: 'Asia', subregion: 'West Asia', passportRank: 77, capital: 'Baku', currency: 'AZN', languages: ['Azerbaijani'] },
  { name: 'Bahrain', slug: 'bahrain', demonym: 'Bahraini', code: 'BH', region: 'Asia', subregion: 'West Asia', passportRank: 60, capital: 'Manama', currency: 'BHD', languages: ['Arabic'] },
  { name: 'Bangladesh', slug: 'bangladesh', demonym: 'Bangladeshi', code: 'BD', region: 'Asia', subregion: 'South Asia', passportRank: 167, capital: 'Dhaka', currency: 'BDT', languages: ['Bengali'] },
  { name: 'Bhutan', slug: 'bhutan', demonym: 'Bhutanese', code: 'BT', region: 'Asia', subregion: 'South Asia', passportRank: 91, capital: 'Thimphu', currency: 'BTN', languages: ['Dzongkha'] },
  { name: 'Brunei', slug: 'brunei', demonym: 'Bruneian', code: 'BN', region: 'Asia', subregion: 'Southeast Asia', passportRank: 22, capital: 'Bandar Seri Begawan', currency: 'BND', languages: ['Malay'] },
  { name: 'Cambodia', slug: 'cambodia', demonym: 'Cambodian', code: 'KH', region: 'Asia', subregion: 'Southeast Asia', passportRank: 140, capital: 'Phnom Penh', currency: 'KHR', languages: ['Khmer'] },
  { name: 'China', slug: 'china', demonym: 'Chinese', code: 'CN', region: 'Asia', subregion: 'East Asia', passportRank: 62, capital: 'Beijing', currency: 'CNY', languages: ['Mandarin'] },
  { name: 'Cyprus', slug: 'cyprus', demonym: 'Cypriot', code: 'CY', region: 'Asia', subregion: 'West Asia', passportRank: 16, capital: 'Nicosia', currency: 'EUR', languages: ['Greek', 'Turkish'] },
  { name: 'Georgia', slug: 'georgia', demonym: 'Georgian', code: 'GE', region: 'Asia', subregion: 'West Asia', passportRank: 53, capital: 'Tbilisi', currency: 'GEL', languages: ['Georgian'] },
  { name: 'India', slug: 'india', demonym: 'Indian', code: 'IN', region: 'Asia', subregion: 'South Asia', passportRank: 82, capital: 'New Delhi', currency: 'INR', languages: ['Hindi', 'English'] },
  { name: 'Indonesia', slug: 'indonesia', demonym: 'Indonesian', code: 'ID', region: 'Asia', subregion: 'Southeast Asia', passportRank: 73, capital: 'Jakarta', currency: 'IDR', languages: ['Indonesian'] },
  { name: 'Iran', slug: 'iran', demonym: 'Iranian', code: 'IR', region: 'Asia', subregion: 'West Asia', passportRank: 186, capital: 'Tehran', currency: 'IRR', languages: ['Persian'] },
  { name: 'Iraq', slug: 'iraq', demonym: 'Iraqi', code: 'IQ', region: 'Asia', subregion: 'West Asia', passportRank: 188, capital: 'Baghdad', currency: 'IQD', languages: ['Arabic', 'Kurdish'] },
  { name: 'Israel', slug: 'israel', demonym: 'Israeli', code: 'IL', region: 'Asia', subregion: 'West Asia', passportRank: 21, capital: 'Jerusalem', currency: 'ILS', languages: ['Hebrew', 'Arabic'] },
  { name: 'Japan', slug: 'japan', demonym: 'Japanese', code: 'JP', region: 'Asia', subregion: 'East Asia', passportRank: 1, capital: 'Tokyo', currency: 'JPY', languages: ['Japanese'] },
  { name: 'Jordan', slug: 'jordan', demonym: 'Jordanian', code: 'JO', region: 'Asia', subregion: 'West Asia', passportRank: 82, capital: 'Amman', currency: 'JOD', languages: ['Arabic'] },
  { name: 'Kazakhstan', slug: 'kazakhstan', demonym: 'Kazakhstani', code: 'KZ', region: 'Asia', subregion: 'Central Asia', passportRank: 65, capital: 'Astana', currency: 'KZT', languages: ['Kazakh', 'Russian'] },
  { name: 'Kuwait', slug: 'kuwait', demonym: 'Kuwaiti', code: 'KW', region: 'Asia', subregion: 'West Asia', passportRank: 55, capital: 'Kuwait City', currency: 'KWD', languages: ['Arabic'] },
  { name: 'Kyrgyzstan', slug: 'kyrgyzstan', demonym: 'Kyrgyz', code: 'KG', region: 'Asia', subregion: 'Central Asia', passportRank: 87, capital: 'Bishkek', currency: 'KGS', languages: ['Kyrgyz', 'Russian'] },
  { name: 'Laos', slug: 'laos', demonym: 'Laotian', code: 'LA', region: 'Asia', subregion: 'Southeast Asia', passportRank: 140, capital: 'Vientiane', currency: 'LAK', languages: ['Lao'] },
  { name: 'Lebanon', slug: 'lebanon', demonym: 'Lebanese', code: 'LB', region: 'Asia', subregion: 'West Asia', passportRank: 102, capital: 'Beirut', currency: 'LBP', languages: ['Arabic'] },
  { name: 'Malaysia', slug: 'malaysia', demonym: 'Malaysian', code: 'MY', region: 'Asia', subregion: 'Southeast Asia', passportRank: 12, capital: 'Kuala Lumpur', currency: 'MYR', languages: ['Malay'] },
  { name: 'Maldives', slug: 'maldives', demonym: 'Maldivian', code: 'MV', region: 'Asia', subregion: 'South Asia', passportRank: 92, capital: 'Male', currency: 'MVR', languages: ['Dhivehi'] },
  { name: 'Mongolia', slug: 'mongolia', demonym: 'Mongolian', code: 'MN', region: 'Asia', subregion: 'East Asia', passportRank: 85, capital: 'Ulaanbaatar', currency: 'MNT', languages: ['Mongolian'] },
  { name: 'Myanmar', slug: 'myanmar', demonym: 'Burmese', code: 'MM', region: 'Asia', subregion: 'Southeast Asia', passportRank: 150, capital: 'Naypyidaw', currency: 'MMK', languages: ['Burmese'] },
  { name: 'Nepal', slug: 'nepal', demonym: 'Nepalese', code: 'NP', region: 'Asia', subregion: 'South Asia', passportRank: 140, capital: 'Kathmandu', currency: 'NPR', languages: ['Nepali'] },
  { name: 'North Korea', slug: 'north-korea', demonym: 'North Korean', code: 'KP', region: 'Asia', subregion: 'East Asia', passportRank: 189, capital: 'Pyongyang', currency: 'KPW', languages: ['Korean'] },
  { name: 'Oman', slug: 'oman', demonym: 'Omani', code: 'OM', region: 'Asia', subregion: 'West Asia', passportRank: 63, capital: 'Muscat', currency: 'OMR', languages: ['Arabic'] },
  { name: 'Pakistan', slug: 'pakistan', demonym: 'Pakistani', code: 'PK', region: 'Asia', subregion: 'South Asia', passportRank: 185, capital: 'Islamabad', currency: 'PKR', languages: ['Urdu', 'English'] },
  { name: 'Palestine', slug: 'palestine', demonym: 'Palestinian', code: 'PS', region: 'Asia', subregion: 'West Asia', passportRank: 170, capital: 'Ramallah', currency: 'ILS', languages: ['Arabic'] },
  { name: 'Philippines', slug: 'philippines', demonym: 'Filipino', code: 'PH', region: 'Asia', subregion: 'Southeast Asia', passportRank: 76, capital: 'Manila', currency: 'PHP', languages: ['Filipino', 'English'] },
  { name: 'Qatar', slug: 'qatar', demonym: 'Qatari', code: 'QA', region: 'Asia', subregion: 'West Asia', passportRank: 51, capital: 'Doha', currency: 'QAR', languages: ['Arabic'] },
  { name: 'Saudi Arabia', slug: 'saudi-arabia', demonym: 'Saudi', code: 'SA', region: 'Asia', subregion: 'West Asia', passportRank: 59, capital: 'Riyadh', currency: 'SAR', languages: ['Arabic'] },
  { name: 'Singapore', slug: 'singapore', demonym: 'Singaporean', code: 'SG', region: 'Asia', subregion: 'Southeast Asia', passportRank: 2, capital: 'Singapore', currency: 'SGD', languages: ['English', 'Malay', 'Mandarin', 'Tamil'] },
  { name: 'South Korea', slug: 'south-korea', demonym: 'South Korean', code: 'KR', region: 'Asia', subregion: 'East Asia', passportRank: 3, capital: 'Seoul', currency: 'KRW', languages: ['Korean'] },
  { name: 'Sri Lanka', slug: 'sri-lanka', demonym: 'Sri Lankan', code: 'LK', region: 'Asia', subregion: 'South Asia', passportRank: 130, capital: 'Colombo', currency: 'LKR', languages: ['Sinhala', 'Tamil'] },
  { name: 'Syria', slug: 'syria', demonym: 'Syrian', code: 'SY', region: 'Asia', subregion: 'West Asia', passportRank: 191, capital: 'Damascus', currency: 'SYP', languages: ['Arabic'] },
  { name: 'Taiwan', slug: 'taiwan', demonym: 'Taiwanese', code: 'TW', region: 'Asia', subregion: 'East Asia', passportRank: 35, capital: 'Taipei', currency: 'TWD', languages: ['Mandarin'] },
  { name: 'Tajikistan', slug: 'tajikistan', demonym: 'Tajik', code: 'TJ', region: 'Asia', subregion: 'Central Asia', passportRank: 95, capital: 'Dushanbe', currency: 'TJS', languages: ['Tajik'] },
  { name: 'Thailand', slug: 'thailand', demonym: 'Thai', code: 'TH', region: 'Asia', subregion: 'Southeast Asia', passportRank: 64, capital: 'Bangkok', currency: 'THB', languages: ['Thai'] },
  { name: 'Timor-Leste', slug: 'timor-leste', demonym: 'Timorese', code: 'TL', region: 'Asia', subregion: 'Southeast Asia', passportRank: 130, capital: 'Dili', currency: 'USD', languages: ['Portuguese', 'Tetum'] },
  { name: 'Turkey', slug: 'turkey', demonym: 'Turkish', code: 'TR', region: 'Asia', subregion: 'West Asia', passportRank: 50, capital: 'Ankara', currency: 'TRY', languages: ['Turkish'] },
  { name: 'Turkmenistan', slug: 'turkmenistan', demonym: 'Turkmen', code: 'TM', region: 'Asia', subregion: 'Central Asia', passportRank: 95, capital: 'Ashgabat', currency: 'TMT', languages: ['Turkmen'] },
  { name: 'United Arab Emirates', slug: 'uae', demonym: 'Emirati', code: 'AE', region: 'Asia', subregion: 'West Asia', passportRank: 15, capital: 'Abu Dhabi', currency: 'AED', languages: ['Arabic'] },
  { name: 'Uzbekistan', slug: 'uzbekistan', demonym: 'Uzbek', code: 'UZ', region: 'Asia', subregion: 'Central Asia', passportRank: 86, capital: 'Tashkent', currency: 'UZS', languages: ['Uzbek'] },
  { name: 'Vietnam', slug: 'vietnam', demonym: 'Vietnamese', code: 'VN', region: 'Asia', subregion: 'Southeast Asia', passportRank: 89, capital: 'Hanoi', currency: 'VND', languages: ['Vietnamese'] },
  { name: 'Yemen', slug: 'yemen', demonym: 'Yemeni', code: 'YE', region: 'Asia', subregion: 'West Asia', passportRank: 187, capital: 'Sanaa', currency: 'YER', languages: ['Arabic'] },

  // === EUROPE ===
  { name: 'Albania', slug: 'albania', demonym: 'Albanian', code: 'AL', region: 'Europe', subregion: 'Southeast Europe', passportRank: 52, capital: 'Tirana', currency: 'ALL', languages: ['Albanian'] },
  { name: 'Andorra', slug: 'andorra', demonym: 'Andorran', code: 'AD', region: 'Europe', subregion: 'Western Europe', passportRank: 38, capital: 'Andorra la Vella', currency: 'EUR', languages: ['Catalan'] },
  { name: 'Austria', slug: 'austria', demonym: 'Austrian', code: 'AT', region: 'Europe', subregion: 'Western Europe', passportRank: 4, capital: 'Vienna', currency: 'EUR', languages: ['German'] },
  { name: 'Belarus', slug: 'belarus', demonym: 'Belarusian', code: 'BY', region: 'Europe', subregion: 'Eastern Europe', passportRank: 72, capital: 'Minsk', currency: 'BYN', languages: ['Belarusian', 'Russian'] },
  { name: 'Belgium', slug: 'belgium', demonym: 'Belgian', code: 'BE', region: 'Europe', subregion: 'Western Europe', passportRank: 6, capital: 'Brussels', currency: 'EUR', languages: ['Dutch', 'French', 'German'] },
  { name: 'Bosnia and Herzegovina', slug: 'bosnia', demonym: 'Bosnian', code: 'BA', region: 'Europe', subregion: 'Southeast Europe', passportRank: 50, capital: 'Sarajevo', currency: 'BAM', languages: ['Bosnian', 'Croatian', 'Serbian'] },
  { name: 'Bulgaria', slug: 'bulgaria', demonym: 'Bulgarian', code: 'BG', region: 'Europe', subregion: 'Southeast Europe', passportRank: 18, capital: 'Sofia', currency: 'BGN', languages: ['Bulgarian'] },
  { name: 'Croatia', slug: 'croatia', demonym: 'Croatian', code: 'HR', region: 'Europe', subregion: 'Southeast Europe', passportRank: 17, capital: 'Zagreb', currency: 'EUR', languages: ['Croatian'] },
  { name: 'Czech Republic', slug: 'czech-republic', demonym: 'Czech', code: 'CZ', region: 'Europe', subregion: 'Central Europe', passportRank: 7, capital: 'Prague', currency: 'CZK', languages: ['Czech'] },
  { name: 'Denmark', slug: 'denmark', demonym: 'Danish', code: 'DK', region: 'Europe', subregion: 'Northern Europe', passportRank: 5, capital: 'Copenhagen', currency: 'DKK', languages: ['Danish'] },
  { name: 'Estonia', slug: 'estonia', demonym: 'Estonian', code: 'EE', region: 'Europe', subregion: 'Northern Europe', passportRank: 10, capital: 'Tallinn', currency: 'EUR', languages: ['Estonian'] },
  { name: 'Finland', slug: 'finland', demonym: 'Finnish', code: 'FI', region: 'Europe', subregion: 'Northern Europe', passportRank: 4, capital: 'Helsinki', currency: 'EUR', languages: ['Finnish', 'Swedish'] },
  { name: 'France', slug: 'france', demonym: 'French', code: 'FR', region: 'Europe', subregion: 'Western Europe', passportRank: 5, capital: 'Paris', currency: 'EUR', languages: ['French'] },
  { name: 'Germany', slug: 'germany', demonym: 'German', code: 'DE', region: 'Europe', subregion: 'Western Europe', passportRank: 3, capital: 'Berlin', currency: 'EUR', languages: ['German'] },
  { name: 'Greece', slug: 'greece', demonym: 'Greek', code: 'GR', region: 'Europe', subregion: 'Southern Europe', passportRank: 8, capital: 'Athens', currency: 'EUR', languages: ['Greek'] },
  { name: 'Hungary', slug: 'hungary', demonym: 'Hungarian', code: 'HU', region: 'Europe', subregion: 'Central Europe', passportRank: 10, capital: 'Budapest', currency: 'HUF', languages: ['Hungarian'] },
  { name: 'Iceland', slug: 'iceland', demonym: 'Icelandic', code: 'IS', region: 'Europe', subregion: 'Northern Europe', passportRank: 9, capital: 'Reykjavik', currency: 'ISK', languages: ['Icelandic'] },
  { name: 'Ireland', slug: 'ireland', demonym: 'Irish', code: 'IE', region: 'Europe', subregion: 'Northern Europe', passportRank: 6, capital: 'Dublin', currency: 'EUR', languages: ['Irish', 'English'] },
  { name: 'Italy', slug: 'italy', demonym: 'Italian', code: 'IT', region: 'Europe', subregion: 'Southern Europe', passportRank: 4, capital: 'Rome', currency: 'EUR', languages: ['Italian'] },
  { name: 'Kosovo', slug: 'kosovo', demonym: 'Kosovar', code: 'XK', region: 'Europe', subregion: 'Southeast Europe', passportRank: 90, capital: 'Pristina', currency: 'EUR', languages: ['Albanian', 'Serbian'] },
  { name: 'Latvia', slug: 'latvia', demonym: 'Latvian', code: 'LV', region: 'Europe', subregion: 'Northern Europe', passportRank: 11, capital: 'Riga', currency: 'EUR', languages: ['Latvian'] },
  { name: 'Liechtenstein', slug: 'liechtenstein', demonym: 'Liechtensteiner', code: 'LI', region: 'Europe', subregion: 'Western Europe', passportRank: 5, capital: 'Vaduz', currency: 'CHF', languages: ['German'] },
  { name: 'Lithuania', slug: 'lithuania', demonym: 'Lithuanian', code: 'LT', region: 'Europe', subregion: 'Northern Europe', passportRank: 10, capital: 'Vilnius', currency: 'EUR', languages: ['Lithuanian'] },
  { name: 'Luxembourg', slug: 'luxembourg', demonym: 'Luxembourgish', code: 'LU', region: 'Europe', subregion: 'Western Europe', passportRank: 5, capital: 'Luxembourg City', currency: 'EUR', languages: ['Luxembourgish', 'French', 'German'] },
  { name: 'Malta', slug: 'malta', demonym: 'Maltese', code: 'MT', region: 'Europe', subregion: 'Southern Europe', passportRank: 9, capital: 'Valletta', currency: 'EUR', languages: ['Maltese', 'English'] },
  { name: 'Moldova', slug: 'moldova', demonym: 'Moldovan', code: 'MD', region: 'Europe', subregion: 'Eastern Europe', passportRank: 48, capital: 'Chisinau', currency: 'MDL', languages: ['Romanian'] },
  { name: 'Monaco', slug: 'monaco', demonym: 'Monégasque', code: 'MC', region: 'Europe', subregion: 'Western Europe', passportRank: 15, capital: 'Monaco', currency: 'EUR', languages: ['French'] },
  { name: 'Montenegro', slug: 'montenegro', demonym: 'Montenegrin', code: 'ME', region: 'Europe', subregion: 'Southeast Europe', passportRank: 44, capital: 'Podgorica', currency: 'EUR', languages: ['Montenegrin'] },
  { name: 'Netherlands', slug: 'netherlands', demonym: 'Dutch', code: 'NL', region: 'Europe', subregion: 'Western Europe', passportRank: 5, capital: 'Amsterdam', currency: 'EUR', languages: ['Dutch'] },
  { name: 'North Macedonia', slug: 'north-macedonia', demonym: 'Macedonian', code: 'MK', region: 'Europe', subregion: 'Southeast Europe', passportRank: 46, capital: 'Skopje', currency: 'MKD', languages: ['Macedonian'] },
  { name: 'Norway', slug: 'norway', demonym: 'Norwegian', code: 'NO', region: 'Europe', subregion: 'Northern Europe', passportRank: 6, capital: 'Oslo', currency: 'NOK', languages: ['Norwegian'] },
  { name: 'Poland', slug: 'poland', demonym: 'Polish', code: 'PL', region: 'Europe', subregion: 'Central Europe', passportRank: 8, capital: 'Warsaw', currency: 'PLN', languages: ['Polish'] },
  { name: 'Portugal', slug: 'portugal', demonym: 'Portuguese', code: 'PT', region: 'Europe', subregion: 'Southern Europe', passportRank: 5, capital: 'Lisbon', currency: 'EUR', languages: ['Portuguese'] },
  { name: 'Romania', slug: 'romania', demonym: 'Romanian', code: 'RO', region: 'Europe', subregion: 'Southeast Europe', passportRank: 14, capital: 'Bucharest', currency: 'RON', languages: ['Romanian'] },
  { name: 'Russia', slug: 'russia', demonym: 'Russian', code: 'RU', region: 'Europe', subregion: 'Eastern Europe', passportRank: 49, capital: 'Moscow', currency: 'RUB', languages: ['Russian'] },
  { name: 'San Marino', slug: 'san-marino', demonym: 'Sammarinese', code: 'SM', region: 'Europe', subregion: 'Southern Europe', passportRank: 25, capital: 'San Marino', currency: 'EUR', languages: ['Italian'] },
  { name: 'Serbia', slug: 'serbia', demonym: 'Serbian', code: 'RS', region: 'Europe', subregion: 'Southeast Europe', passportRank: 38, capital: 'Belgrade', currency: 'RSD', languages: ['Serbian'] },
  { name: 'Slovakia', slug: 'slovakia', demonym: 'Slovak', code: 'SK', region: 'Europe', subregion: 'Central Europe', passportRank: 10, capital: 'Bratislava', currency: 'EUR', languages: ['Slovak'] },
  { name: 'Slovenia', slug: 'slovenia', demonym: 'Slovenian', code: 'SI', region: 'Europe', subregion: 'Central Europe', passportRank: 10, capital: 'Ljubljana', currency: 'EUR', languages: ['Slovenian'] },
  { name: 'Spain', slug: 'spain', demonym: 'Spanish', code: 'ES', region: 'Europe', subregion: 'Southern Europe', passportRank: 3, capital: 'Madrid', currency: 'EUR', languages: ['Spanish'] },
  { name: 'Sweden', slug: 'sweden', demonym: 'Swedish', code: 'SE', region: 'Europe', subregion: 'Northern Europe', passportRank: 5, capital: 'Stockholm', currency: 'SEK', languages: ['Swedish'] },
  { name: 'Switzerland', slug: 'switzerland', demonym: 'Swiss', code: 'CH', region: 'Europe', subregion: 'Western Europe', passportRank: 4, capital: 'Bern', currency: 'CHF', languages: ['German', 'French', 'Italian', 'Romansh'] },
  { name: 'Ukraine', slug: 'ukraine', demonym: 'Ukrainian', code: 'UA', region: 'Europe', subregion: 'Eastern Europe', passportRank: 36, capital: 'Kyiv', currency: 'UAH', languages: ['Ukrainian'] },
  { name: 'United Kingdom', slug: 'uk', demonym: 'British', code: 'GB', region: 'Europe', subregion: 'Northern Europe', passportRank: 4, capital: 'London', currency: 'GBP', languages: ['English'] },
  { name: 'Vatican City', slug: 'vatican', demonym: 'Vatican', code: 'VA', region: 'Europe', subregion: 'Southern Europe', passportRank: 30, capital: 'Vatican City', currency: 'EUR', languages: ['Italian', 'Latin'] },

  // === AFRICA ===
  { name: 'Algeria', slug: 'algeria', demonym: 'Algerian', code: 'DZ', region: 'Africa', subregion: 'North Africa', passportRank: 92, capital: 'Algiers', currency: 'DZD', languages: ['Arabic', 'French'] },
  { name: 'Angola', slug: 'angola', demonym: 'Angolan', code: 'AO', region: 'Africa', subregion: 'Central Africa', passportRank: 100, capital: 'Luanda', currency: 'AOA', languages: ['Portuguese'] },
  { name: 'Benin', slug: 'benin', demonym: 'Beninese', code: 'BJ', region: 'Africa', subregion: 'West Africa', passportRank: 115, capital: 'Porto-Novo', currency: 'XOF', languages: ['French'] },
  { name: 'Botswana', slug: 'botswana', demonym: 'Motswana', code: 'BW', region: 'Africa', subregion: 'Southern Africa', passportRank: 66, capital: 'Gaborone', currency: 'BWP', languages: ['English', 'Tswana'] },
  { name: 'Burkina Faso', slug: 'burkina-faso', demonym: 'Burkinabe', code: 'BF', region: 'Africa', subregion: 'West Africa', passportRank: 125, capital: 'Ouagadougou', currency: 'XOF', languages: ['French'] },
  { name: 'Burundi', slug: 'burundi', demonym: 'Burundian', code: 'BI', region: 'Africa', subregion: 'East Africa', passportRank: 145, capital: 'Gitega', currency: 'BIF', languages: ['Kirundi', 'French'] },
  { name: 'Cameroon', slug: 'cameroon', demonym: 'Cameroonian', code: 'CM', region: 'Africa', subregion: 'Central Africa', passportRank: 120, capital: 'Yaounde', currency: 'XAF', languages: ['French', 'English'] },
  { name: 'Cape Verde', slug: 'cape-verde', demonym: 'Cape Verdean', code: 'CV', region: 'Africa', subregion: 'West Africa', passportRank: 75, capital: 'Praia', currency: 'CVE', languages: ['Portuguese'] },
  { name: 'Central African Republic', slug: 'central-african-republic', demonym: 'Central African', code: 'CF', region: 'Africa', subregion: 'Central Africa', passportRank: 150, capital: 'Bangui', currency: 'XAF', languages: ['French', 'Sango'] },
  { name: 'Chad', slug: 'chad', demonym: 'Chadian', code: 'TD', region: 'Africa', subregion: 'Central Africa', passportRank: 145, capital: "N'Djamena", currency: 'XAF', languages: ['French', 'Arabic'] },
  { name: 'Comoros', slug: 'comoros', demonym: 'Comorian', code: 'KM', region: 'Africa', subregion: 'East Africa', passportRank: 120, capital: 'Moroni', currency: 'KMF', languages: ['Comorian', 'Arabic', 'French'] },
  { name: 'DR Congo', slug: 'dr-congo', demonym: 'Congolese', code: 'CD', region: 'Africa', subregion: 'Central Africa', passportRank: 150, capital: 'Kinshasa', currency: 'CDF', languages: ['French'] },
  { name: 'Republic of Congo', slug: 'congo', demonym: 'Congolese', code: 'CG', region: 'Africa', subregion: 'Central Africa', passportRank: 120, capital: 'Brazzaville', currency: 'XAF', languages: ['French'] },
  { name: "Côte d'Ivoire", slug: 'ivory-coast', demonym: 'Ivorian', code: 'CI', region: 'Africa', subregion: 'West Africa', passportRank: 110, capital: 'Yamoussoukro', currency: 'XOF', languages: ['French'] },
  { name: 'Djibouti', slug: 'djibouti', demonym: 'Djiboutian', code: 'DJ', region: 'Africa', subregion: 'East Africa', passportRank: 115, capital: 'Djibouti', currency: 'DJF', languages: ['French', 'Arabic'] },
  { name: 'Egypt', slug: 'egypt', demonym: 'Egyptian', code: 'EG', region: 'Africa', subregion: 'North Africa', passportRank: 93, capital: 'Cairo', currency: 'EGP', languages: ['Arabic'] },
  { name: 'Equatorial Guinea', slug: 'equatorial-guinea', demonym: 'Equatoguinean', code: 'GQ', region: 'Africa', subregion: 'Central Africa', passportRank: 120, capital: 'Malabo', currency: 'XAF', languages: ['Spanish', 'French', 'Portuguese'] },
  { name: 'Eritrea', slug: 'eritrea', demonym: 'Eritrean', code: 'ER', region: 'Africa', subregion: 'East Africa', passportRank: 170, capital: 'Asmara', currency: 'ERN', languages: ['Tigrinya', 'Arabic'] },
  { name: 'Eswatini', slug: 'eswatini', demonym: 'Swazi', code: 'SZ', region: 'Africa', subregion: 'Southern Africa', passportRank: 80, capital: 'Mbabane', currency: 'SZL', languages: ['Swati', 'English'] },
  { name: 'Ethiopia', slug: 'ethiopia', demonym: 'Ethiopian', code: 'ET', region: 'Africa', subregion: 'East Africa', passportRank: 140, capital: 'Addis Ababa', currency: 'ETB', languages: ['Amharic'] },
  { name: 'Gabon', slug: 'gabon', demonym: 'Gabonese', code: 'GA', region: 'Africa', subregion: 'Central Africa', passportRank: 85, capital: 'Libreville', currency: 'XAF', languages: ['French'] },
  { name: 'Gambia', slug: 'gambia', demonym: 'Gambian', code: 'GM', region: 'Africa', subregion: 'West Africa', passportRank: 110, capital: 'Banjul', currency: 'GMD', languages: ['English'] },
  { name: 'Ghana', slug: 'ghana', demonym: 'Ghanaian', code: 'GH', region: 'Africa', subregion: 'West Africa', passportRank: 95, capital: 'Accra', currency: 'GHS', languages: ['English'] },
  { name: 'Guinea', slug: 'guinea', demonym: 'Guinean', code: 'GN', region: 'Africa', subregion: 'West Africa', passportRank: 120, capital: 'Conakry', currency: 'GNF', languages: ['French'] },
  { name: 'Guinea-Bissau', slug: 'guinea-bissau', demonym: 'Bissau-Guinean', code: 'GW', region: 'Africa', subregion: 'West Africa', passportRank: 110, capital: 'Bissau', currency: 'XOF', languages: ['Portuguese'] },
  { name: 'Kenya', slug: 'kenya', demonym: 'Kenyan', code: 'KE', region: 'Africa', subregion: 'East Africa', passportRank: 80, capital: 'Nairobi', currency: 'KES', languages: ['Swahili', 'English'] },
  { name: 'Lesotho', slug: 'lesotho', demonym: 'Mosotho', code: 'LS', region: 'Africa', subregion: 'Southern Africa', passportRank: 80, capital: 'Maseru', currency: 'LSL', languages: ['Sesotho', 'English'] },
  { name: 'Liberia', slug: 'liberia', demonym: 'Liberian', code: 'LR', region: 'Africa', subregion: 'West Africa', passportRank: 120, capital: 'Monrovia', currency: 'LRD', languages: ['English'] },
  { name: 'Libya', slug: 'libya', demonym: 'Libyan', code: 'LY', region: 'Africa', subregion: 'North Africa', passportRank: 110, capital: 'Tripoli', currency: 'LYD', languages: ['Arabic'] },
  { name: 'Madagascar', slug: 'madagascar', demonym: 'Malagasy', code: 'MG', region: 'Africa', subregion: 'East Africa', passportRank: 115, capital: 'Antananarivo', currency: 'MGA', languages: ['Malagasy', 'French'] },
  { name: 'Malawi', slug: 'malawi', demonym: 'Malawian', code: 'MW', region: 'Africa', subregion: 'East Africa', passportRank: 100, capital: 'Lilongwe', currency: 'MWK', languages: ['English', 'Chichewa'] },
  { name: 'Mali', slug: 'mali', demonym: 'Malian', code: 'ML', region: 'Africa', subregion: 'West Africa', passportRank: 115, capital: 'Bamako', currency: 'XOF', languages: ['French'] },
  { name: 'Mauritania', slug: 'mauritania', demonym: 'Mauritanian', code: 'MR', region: 'Africa', subregion: 'West Africa', passportRank: 115, capital: 'Nouakchott', currency: 'MRU', languages: ['Arabic'] },
  { name: 'Mauritius', slug: 'mauritius', demonym: 'Mauritian', code: 'MU', region: 'Africa', subregion: 'East Africa', passportRank: 33, capital: 'Port Louis', currency: 'MUR', languages: ['English', 'French'] },
  { name: 'Morocco', slug: 'morocco', demonym: 'Moroccan', code: 'MA', region: 'Africa', subregion: 'North Africa', passportRank: 80, capital: 'Rabat', currency: 'MAD', languages: ['Arabic', 'Berber'] },
  { name: 'Mozambique', slug: 'mozambique', demonym: 'Mozambican', code: 'MZ', region: 'Africa', subregion: 'East Africa', passportRank: 110, capital: 'Maputo', currency: 'MZN', languages: ['Portuguese'] },
  { name: 'Namibia', slug: 'namibia', demonym: 'Namibian', code: 'NA', region: 'Africa', subregion: 'Southern Africa', passportRank: 68, capital: 'Windhoek', currency: 'NAD', languages: ['English'] },
  { name: 'Niger', slug: 'niger', demonym: 'Nigerien', code: 'NE', region: 'Africa', subregion: 'West Africa', passportRank: 125, capital: 'Niamey', currency: 'XOF', languages: ['French'] },
  { name: 'Nigeria', slug: 'nigeria', demonym: 'Nigerian', code: 'NG', region: 'Africa', subregion: 'West Africa', passportRank: 145, capital: 'Abuja', currency: 'NGN', languages: ['English'] },
  { name: 'Rwanda', slug: 'rwanda', demonym: 'Rwandan', code: 'RW', region: 'Africa', subregion: 'East Africa', passportRank: 85, capital: 'Kigali', currency: 'RWF', languages: ['Kinyarwanda', 'French', 'English'] },
  { name: 'Senegal', slug: 'senegal', demonym: 'Senegalese', code: 'SN', region: 'Africa', subregion: 'West Africa', passportRank: 95, capital: 'Dakar', currency: 'XOF', languages: ['French'] },
  { name: 'Seychelles', slug: 'seychelles', demonym: 'Seychellois', code: 'SC', region: 'Africa', subregion: 'East Africa', passportRank: 28, capital: 'Victoria', currency: 'SCR', languages: ['Seychellois Creole', 'English', 'French'] },
  { name: 'Sierra Leone', slug: 'sierra-leone', demonym: 'Sierra Leonean', code: 'SL', region: 'Africa', subregion: 'West Africa', passportRank: 120, capital: 'Freetown', currency: 'SLE', languages: ['English'] },
  { name: 'Somalia', slug: 'somalia', demonym: 'Somali', code: 'SO', region: 'Africa', subregion: 'East Africa', passportRank: 185, capital: 'Mogadishu', currency: 'SOS', languages: ['Somali', 'Arabic'] },
  { name: 'South Africa', slug: 'south-africa', demonym: 'South African', code: 'ZA', region: 'Africa', subregion: 'Southern Africa', passportRank: 52, capital: 'Pretoria', currency: 'ZAR', languages: ['Zulu', 'Xhosa', 'Afrikaans', 'English'] },
  { name: 'South Sudan', slug: 'south-sudan', demonym: 'South Sudanese', code: 'SS', region: 'Africa', subregion: 'East Africa', passportRank: 185, capital: 'Juba', currency: 'SSP', languages: ['English'] },
  { name: 'Sudan', slug: 'sudan', demonym: 'Sudanese', code: 'SD', region: 'Africa', subregion: 'North Africa', passportRank: 160, capital: 'Khartoum', currency: 'SDG', languages: ['Arabic', 'English'] },
  { name: 'Tanzania', slug: 'tanzania', demonym: 'Tanzanian', code: 'TZ', region: 'Africa', subregion: 'East Africa', passportRank: 80, capital: 'Dodoma', currency: 'TZS', languages: ['Swahili', 'English'] },
  { name: 'Togo', slug: 'togo', demonym: 'Togolese', code: 'TG', region: 'Africa', subregion: 'West Africa', passportRank: 115, capital: 'Lome', currency: 'XOF', languages: ['French'] },
  { name: 'Tunisia', slug: 'tunisia', demonym: 'Tunisian', code: 'TN', region: 'Africa', subregion: 'North Africa', passportRank: 75, capital: 'Tunis', currency: 'TND', languages: ['Arabic', 'French'] },
  { name: 'Uganda', slug: 'uganda', demonym: 'Ugandan', code: 'UG', region: 'Africa', subregion: 'East Africa', passportRank: 100, capital: 'Kampala', currency: 'UGX', languages: ['English', 'Swahili'] },
  { name: 'Zambia', slug: 'zambia', demonym: 'Zambian', code: 'ZM', region: 'Africa', subregion: 'East Africa', passportRank: 85, capital: 'Lusaka', currency: 'ZMW', languages: ['English'] },
  { name: 'Zimbabwe', slug: 'zimbabwe', demonym: 'Zimbabwean', code: 'ZW', region: 'Africa', subregion: 'East Africa', passportRank: 95, capital: 'Harare', currency: 'ZWL', languages: ['English', 'Shona', 'Ndebele'] },

  // === NORTH AMERICA ===
  { name: 'Antigua and Barbuda', slug: 'antigua', demonym: 'Antiguan', code: 'AG', region: 'Americas', subregion: 'Caribbean', passportRank: 28, capital: "St. John's", currency: 'XCD', languages: ['English'] },
  { name: 'Bahamas', slug: 'bahamas', demonym: 'Bahamian', code: 'BS', region: 'Americas', subregion: 'Caribbean', passportRank: 30, capital: 'Nassau', currency: 'BSD', languages: ['English'] },
  { name: 'Barbados', slug: 'barbados', demonym: 'Barbadian', code: 'BB', region: 'Americas', subregion: 'Caribbean', passportRank: 24, capital: 'Bridgetown', currency: 'BBD', languages: ['English'] },
  { name: 'Belize', slug: 'belize', demonym: 'Belizean', code: 'BZ', region: 'Americas', subregion: 'Central America', passportRank: 55, capital: 'Belmopan', currency: 'BZD', languages: ['English'] },
  { name: 'Canada', slug: 'canada', demonym: 'Canadian', code: 'CA', region: 'Americas', subregion: 'North America', passportRank: 7, capital: 'Ottawa', currency: 'CAD', languages: ['English', 'French'] },
  { name: 'Costa Rica', slug: 'costa-rica', demonym: 'Costa Rican', code: 'CR', region: 'Americas', subregion: 'Central America', passportRank: 30, capital: 'San Jose', currency: 'CRC', languages: ['Spanish'] },
  { name: 'Cuba', slug: 'cuba', demonym: 'Cuban', code: 'CU', region: 'Americas', subregion: 'Caribbean', passportRank: 80, capital: 'Havana', currency: 'CUP', languages: ['Spanish'] },
  { name: 'Dominica', slug: 'dominica', demonym: 'Dominican', code: 'DM', region: 'Americas', subregion: 'Caribbean', passportRank: 35, capital: 'Roseau', currency: 'XCD', languages: ['English'] },
  { name: 'Dominican Republic', slug: 'dominican-republic', demonym: 'Dominican', code: 'DO', region: 'Americas', subregion: 'Caribbean', passportRank: 70, capital: 'Santo Domingo', currency: 'DOP', languages: ['Spanish'] },
  { name: 'El Salvador', slug: 'el-salvador', demonym: 'Salvadoran', code: 'SV', region: 'Americas', subregion: 'Central America', passportRank: 40, capital: 'San Salvador', currency: 'USD', languages: ['Spanish'] },
  { name: 'Grenada', slug: 'grenada', demonym: 'Grenadian', code: 'GD', region: 'Americas', subregion: 'Caribbean', passportRank: 33, capital: "St. George's", currency: 'XCD', languages: ['English'] },
  { name: 'Guatemala', slug: 'guatemala', demonym: 'Guatemalan', code: 'GT', region: 'Americas', subregion: 'Central America', passportRank: 40, capital: 'Guatemala City', currency: 'GTQ', languages: ['Spanish'] },
  { name: 'Haiti', slug: 'haiti', demonym: 'Haitian', code: 'HT', region: 'Americas', subregion: 'Caribbean', passportRank: 95, capital: 'Port-au-Prince', currency: 'HTG', languages: ['French', 'Haitian Creole'] },
  { name: 'Honduras', slug: 'honduras', demonym: 'Honduran', code: 'HN', region: 'Americas', subregion: 'Central America', passportRank: 40, capital: 'Tegucigalpa', currency: 'HNL', languages: ['Spanish'] },
  { name: 'Jamaica', slug: 'jamaica', demonym: 'Jamaican', code: 'JM', region: 'Americas', subregion: 'Caribbean', passportRank: 60, capital: 'Kingston', currency: 'JMD', languages: ['English'] },
  { name: 'Mexico', slug: 'mexico', demonym: 'Mexican', code: 'MX', region: 'Americas', subregion: 'North America', passportRank: 25, capital: 'Mexico City', currency: 'MXN', languages: ['Spanish'] },
  { name: 'Nicaragua', slug: 'nicaragua', demonym: 'Nicaraguan', code: 'NI', region: 'Americas', subregion: 'Central America', passportRank: 45, capital: 'Managua', currency: 'NIO', languages: ['Spanish'] },
  { name: 'Panama', slug: 'panama', demonym: 'Panamanian', code: 'PA', region: 'Americas', subregion: 'Central America', passportRank: 38, capital: 'Panama City', currency: 'PAB', languages: ['Spanish'] },
  { name: 'Saint Kitts and Nevis', slug: 'saint-kitts', demonym: 'Kittitian', code: 'KN', region: 'Americas', subregion: 'Caribbean', passportRank: 26, capital: 'Basseterre', currency: 'XCD', languages: ['English'] },
  { name: 'Saint Lucia', slug: 'saint-lucia', demonym: 'Saint Lucian', code: 'LC', region: 'Americas', subregion: 'Caribbean', passportRank: 33, capital: 'Castries', currency: 'XCD', languages: ['English'] },
  { name: 'Saint Vincent', slug: 'saint-vincent', demonym: 'Vincentian', code: 'VC', region: 'Americas', subregion: 'Caribbean', passportRank: 33, capital: 'Kingstown', currency: 'XCD', languages: ['English'] },
  { name: 'Trinidad and Tobago', slug: 'trinidad', demonym: 'Trinidadian', code: 'TT', region: 'Americas', subregion: 'Caribbean', passportRank: 32, capital: 'Port of Spain', currency: 'TTD', languages: ['English'] },
  { name: 'United States', slug: 'usa', demonym: 'American', code: 'US', region: 'Americas', subregion: 'North America', passportRank: 8, capital: 'Washington D.C.', currency: 'USD', languages: ['English'] },

  // === SOUTH AMERICA ===
  { name: 'Argentina', slug: 'argentina', demonym: 'Argentine', code: 'AR', region: 'Americas', subregion: 'South America', passportRank: 19, capital: 'Buenos Aires', currency: 'ARS', languages: ['Spanish'] },
  { name: 'Bolivia', slug: 'bolivia', demonym: 'Bolivian', code: 'BO', region: 'Americas', subregion: 'South America', passportRank: 65, capital: 'Sucre', currency: 'BOB', languages: ['Spanish'] },
  { name: 'Brazil', slug: 'brazil', demonym: 'Brazilian', code: 'BR', region: 'Americas', subregion: 'South America', passportRank: 20, capital: 'Brasilia', currency: 'BRL', languages: ['Portuguese'] },
  { name: 'Chile', slug: 'chile', demonym: 'Chilean', code: 'CL', region: 'Americas', subregion: 'South America', passportRank: 16, capital: 'Santiago', currency: 'CLP', languages: ['Spanish'] },
  { name: 'Colombia', slug: 'colombia', demonym: 'Colombian', code: 'CO', region: 'Americas', subregion: 'South America', passportRank: 42, capital: 'Bogota', currency: 'COP', languages: ['Spanish'] },
  { name: 'Ecuador', slug: 'ecuador', demonym: 'Ecuadorian', code: 'EC', region: 'Americas', subregion: 'South America', passportRank: 55, capital: 'Quito', currency: 'USD', languages: ['Spanish'] },
  { name: 'Guyana', slug: 'guyana', demonym: 'Guyanese', code: 'GY', region: 'Americas', subregion: 'South America', passportRank: 65, capital: 'Georgetown', currency: 'GYD', languages: ['English'] },
  { name: 'Paraguay', slug: 'paraguay', demonym: 'Paraguayan', code: 'PY', region: 'Americas', subregion: 'South America', passportRank: 36, capital: 'Asuncion', currency: 'PYG', languages: ['Spanish', 'Guarani'] },
  { name: 'Peru', slug: 'peru', demonym: 'Peruvian', code: 'PE', region: 'Americas', subregion: 'South America', passportRank: 38, capital: 'Lima', currency: 'PEN', languages: ['Spanish'] },
  { name: 'Suriname', slug: 'suriname', demonym: 'Surinamese', code: 'SR', region: 'Americas', subregion: 'South America', passportRank: 70, capital: 'Paramaribo', currency: 'SRD', languages: ['Dutch'] },
  { name: 'Uruguay', slug: 'uruguay', demonym: 'Uruguayan', code: 'UY', region: 'Americas', subregion: 'South America', passportRank: 26, capital: 'Montevideo', currency: 'UYU', languages: ['Spanish'] },
  { name: 'Venezuela', slug: 'venezuela', demonym: 'Venezuelan', code: 'VE', region: 'Americas', subregion: 'South America', passportRank: 42, capital: 'Caracas', currency: 'VES', languages: ['Spanish'] },

  // === OCEANIA ===
  { name: 'Australia', slug: 'australia', demonym: 'Australian', code: 'AU', region: 'Oceania', subregion: 'Australia and NZ', passportRank: 7, capital: 'Canberra', currency: 'AUD', languages: ['English'] },
  { name: 'Fiji', slug: 'fiji', demonym: 'Fijian', code: 'FJ', region: 'Oceania', subregion: 'Melanesia', passportRank: 60, capital: 'Suva', currency: 'FJD', languages: ['English', 'Fijian', 'Hindi'] },
  { name: 'Kiribati', slug: 'kiribati', demonym: 'I-Kiribati', code: 'KI', region: 'Oceania', subregion: 'Micronesia', passportRank: 80, capital: 'Tarawa', currency: 'AUD', languages: ['English', 'Gilbertese'] },
  { name: 'Marshall Islands', slug: 'marshall-islands', demonym: 'Marshallese', code: 'MH', region: 'Oceania', subregion: 'Micronesia', passportRank: 48, capital: 'Majuro', currency: 'USD', languages: ['Marshallese', 'English'] },
  { name: 'Micronesia', slug: 'micronesia', demonym: 'Micronesian', code: 'FM', region: 'Oceania', subregion: 'Micronesia', passportRank: 60, capital: 'Palikir', currency: 'USD', languages: ['English'] },
  { name: 'Nauru', slug: 'nauru', demonym: 'Nauruan', code: 'NR', region: 'Oceania', subregion: 'Micronesia', passportRank: 60, capital: 'Yaren', currency: 'AUD', languages: ['Nauruan', 'English'] },
  { name: 'New Zealand', slug: 'new-zealand', demonym: 'New Zealander', code: 'NZ', region: 'Oceania', subregion: 'Australia and NZ', passportRank: 7, capital: 'Wellington', currency: 'NZD', languages: ['English', 'Maori'] },
  { name: 'Palau', slug: 'palau', demonym: 'Palauan', code: 'PW', region: 'Oceania', subregion: 'Micronesia', passportRank: 48, capital: 'Ngerulmud', currency: 'USD', languages: ['Palauan', 'English'] },
  { name: 'Papua New Guinea', slug: 'papua-new-guinea', demonym: 'Papua New Guinean', code: 'PG', region: 'Oceania', subregion: 'Melanesia', passportRank: 85, capital: 'Port Moresby', currency: 'PGK', languages: ['English', 'Tok Pisin', 'Hiri Motu'] },
  { name: 'Samoa', slug: 'samoa', demonym: 'Samoan', code: 'WS', region: 'Oceania', subregion: 'Polynesia', passportRank: 45, capital: 'Apia', currency: 'WST', languages: ['Samoan', 'English'] },
  { name: 'Solomon Islands', slug: 'solomon-islands', demonym: 'Solomon Islander', code: 'SB', region: 'Oceania', subregion: 'Melanesia', passportRank: 55, capital: 'Honiara', currency: 'SBD', languages: ['English'] },
  { name: 'Tonga', slug: 'tonga', demonym: 'Tongan', code: 'TO', region: 'Oceania', subregion: 'Polynesia', passportRank: 42, capital: "Nuku'alofa", currency: 'TOP', languages: ['Tongan', 'English'] },
  { name: 'Tuvalu', slug: 'tuvalu', demonym: 'Tuvaluan', code: 'TV', region: 'Oceania', subregion: 'Polynesia', passportRank: 55, capital: 'Funafuti', currency: 'AUD', languages: ['Tuvaluan', 'English'] },
  { name: 'Vanuatu', slug: 'vanuatu', demonym: 'Ni-Vanuatu', code: 'VU', region: 'Oceania', subregion: 'Melanesia', passportRank: 42, capital: 'Port Vila', currency: 'VUV', languages: ['Bislama', 'English', 'French'] },
];

// Lookup helpers
const countryBySlug = {};
const countryByCode = {};
countries.forEach(c => {
  countryBySlug[c.slug] = c;
  countryByCode[c.code] = c;
});

function getCountry(slug) {
  return countryBySlug[slug] || null;
}

function getCountryByCode(code) {
  return countryByCode[code] || null;
}

function getAllCountries() {
  return countries;
}

function getCountriesByRegion(region) {
  return countries.filter(c => c.region === region);
}

function getAllSlugs() {
  return countries.map(c => c.slug);
}

// Generate pair slug: "indian-to-canada"
function makePairSlug(fromCountry, toCountry) {
  return `${fromCountry.demonym.toLowerCase().replace(/\s+/g, '-')}-to-${toCountry.slug}`;
}

// Generate all valid pairs (exclude same-country)
function getAllPairs() {
  const pairs = [];
  for (const from of countries) {
    for (const to of countries) {
      if (from.code !== to.code) {
        pairs.push({
          from,
          to,
          slug: makePairSlug(from, to),
        });
      }
    }
  }
  return pairs;
}

module.exports = {
  countries,
  getCountry,
  getCountryByCode,
  getAllCountries,
  getCountriesByRegion,
  getAllSlugs,
  makePairSlug,
  getAllPairs,
};

export type Generation = {
  yearStart: number
  yearEnd: number // 9999 = still in production
  label: string
  notes: string
  imagePath: string
}

export type Model = {
  id: string
  name: string
  generations: Generation[]
}

export type Make = {
  id: string
  name: string
  logoPath: string
  models: Model[]
}

export const makes: Make[] = [
  // 1. CHEVROLET
  {
    id: "chevrolet",
    name: "Chevrolet",
    logoPath: "/logos/chevrolet.svg",
    models: [
      {
        id: "impala",
        name: "Impala",
        generations: [
          {
            yearStart: 2006,
            yearEnd: 2013,
            label: "4th Gen W-Body",
            notes: "High auction volume, affordable parts, preferred by independents and BHPH. Very common in Southern markets. Strong daily driver demand.",
            imagePath: "/models/chevrolet-impala-2006.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2020,
            label: "5th Gen Alpha",
            notes: "Significant upgrade — better interior, stronger safety scores. More retail appeal. Watch for transmission issues on high-mileage units.",
            imagePath: "/models/chevrolet-impala-2014.jpg",
          },
        ],
      },
      {
        id: "malibu",
        name: "Malibu",
        generations: [
          {
            yearStart: 2008,
            yearEnd: 2012,
            label: "7th Gen",
            notes: "Solid entry-level sedan. High auction supply. Lower retail price point — good for BHPH and independent lots.",
            imagePath: "/models/chevrolet-malibu-2008.jpg",
          },
          {
            yearStart: 2013,
            yearEnd: 2015,
            label: "8th Gen",
            notes: "Refreshed styling, eco engine option. Moderate demand.",
            imagePath: "/models/chevrolet-malibu-2013.jpg",
          },
          {
            yearStart: 2016,
            yearEnd: 2022,
            label: "9th Gen",
            notes: "Cleaner look, better fuel economy. Watch for 1.5T turbo issues above 80k miles. Strong retail appeal at right price.",
            imagePath: "/models/chevrolet-malibu-2016.jpg",
          },
        ],
      },
      {
        id: "silverado-1500",
        name: "Silverado 1500",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2013,
            label: "GMT900",
            notes: "Bulletproof platform, extremely high demand. One of the best auction trucks in any market. Simple mechanicals, easy to recondition.",
            imagePath: "/models/chevrolet-silverado-1500-2007.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2018,
            label: "K2XX",
            notes: "Updated interior, EcoTec3 engines. Strong resale. 5.3L V8 is the sweet spot — avoid 4-cylinder in this gen.",
            imagePath: "/models/chevrolet-silverado-1500-2014.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "T1XX",
            notes: "Redesigned inside and out. High demand but higher acquisition cost. Watch for diesel emissions issues.",
            imagePath: "/models/chevrolet-silverado-1500-2019.jpg",
          },
        ],
      },
      {
        id: "equinox",
        name: "Equinox",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2017,
            label: "2nd Gen",
            notes: "High volume auction car. Watch for timing chain issues on 2.4L engine. 3.6L V6 is preferred by buyers.",
            imagePath: "/models/chevrolet-equinox-2010.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 9999,
            label: "3rd Gen",
            notes: "Turbocharged only. Cleaner styling. Strong retail demand. 1.5T is adequate but 2.0T preferred for resale.",
            imagePath: "/models/chevrolet-equinox-2018.jpg",
          },
        ],
      },
      {
        id: "traverse",
        name: "Traverse",
        generations: [
          {
            yearStart: 2009,
            yearEnd: 2017,
            label: "1st Gen Lambda",
            notes: "3-row SUV with strong family appeal. Watch for timing chain on 3.6L. High mileage units move well at right price.",
            imagePath: "/models/chevrolet-traverse-2009.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 9999,
            label: "2nd Gen C1XX",
            notes: "Much improved — better build quality, sharper styling. Strong demand at auction and retail.",
            imagePath: "/models/chevrolet-traverse-2018.jpg",
          },
        ],
      },
      {
        id: "cruze",
        name: "Cruze",
        generations: [
          {
            yearStart: 2011,
            yearEnd: 2016,
            label: "1st Gen",
            notes: "High volume entry-level car. Watch for coolant issues on 1.4T. Great BHPH and independent lot car at right miles.",
            imagePath: "/models/chevrolet-cruze-2011.jpg",
          },
          {
            yearStart: 2016,
            yearEnd: 2019,
            label: "2nd Gen",
            notes: "Cleaner, more refined. Discontinued after 2019. Declining supply makes clean units more valuable.",
            imagePath: "/models/chevrolet-cruze-2016.jpg",
          },
        ],
      },
      {
        id: "tahoe",
        name: "Tahoe",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2014,
            label: "3rd Gen GMT900",
            notes: "Massive demand — full-size SUV never goes out of style. Simple 5.3L V8, easy to service.",
            imagePath: "/models/chevrolet-tahoe-2007.jpg",
          },
          {
            yearStart: 2015,
            yearEnd: 2020,
            label: "4th Gen K2XX",
            notes: "Updated interior but same platform. Strong resale. 4WD units carry premium.",
            imagePath: "/models/chevrolet-tahoe-2015.jpg",
          },
          {
            yearStart: 2021,
            yearEnd: 9999,
            label: "5th Gen T1XX",
            notes: "Fully redesigned with independent rear suspension. High demand but high cost to acquire.",
            imagePath: "/models/chevrolet-tahoe-2021.jpg",
          },
        ],
      },
    ],
  },

  // 2. FORD
  {
    id: "ford",
    name: "Ford",
    logoPath: "/logos/ford.svg",
    models: [
      {
        id: "f-150",
        name: "F-150",
        generations: [
          {
            yearStart: 2009,
            yearEnd: 2014,
            label: "12th Gen Steel Body",
            notes: "Last steel-body F-150. Very high demand — buyers who distrust aluminum prefer this gen. 5.0L V8 is the top seller.",
            imagePath: "/models/ford-f-150-2009.jpg",
          },
          {
            yearStart: 2015,
            yearEnd: 2020,
            label: "13th Gen Aluminum",
            notes: "Highest auction volume pickup in the country. EcoBoost 2.7L and 3.5L dominate. Aluminum body means lower weight but higher repair cost — factor into buy price.",
            imagePath: "/models/ford-f-150-2015.jpg",
          },
          {
            yearStart: 2021,
            yearEnd: 9999,
            label: "14th Gen",
            notes: "PowerBoost hybrid available. High demand, high acquisition cost. Max Tow and Lariat trims bring premium.",
            imagePath: "/models/ford-f-150-2021.jpg",
          },
        ],
      },
      {
        id: "fusion",
        name: "Fusion",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2012,
            label: "3rd Gen Facelift",
            notes: "Solid mid-size sedan. Good fuel economy. High auction supply. Declining but still moves.",
            imagePath: "/models/ford-fusion-2010.jpg",
          },
          {
            yearStart: 2013,
            yearEnd: 2020,
            label: "4th Gen CD4",
            notes: "Sharp European-influenced styling. High demand for SE and SE Sport trims. Hybrid version commands premium. Discontinued — clean units getting harder to find.",
            imagePath: "/models/ford-fusion-2013.jpg",
          },
        ],
      },
      {
        id: "explorer",
        name: "Explorer",
        generations: [
          {
            yearStart: 2011,
            yearEnd: 2019,
            label: "5th Gen CD4",
            notes: "3-row SUV, massive demand. Watch for transmission issues on 2013–2017 units. 3.5L V6 preferred over EcoBoost for reliability.",
            imagePath: "/models/ford-explorer-2011.jpg",
          },
          {
            yearStart: 2020,
            yearEnd: 9999,
            label: "6th Gen CD6",
            notes: "Fully redesigned — rear-wheel drive based. Much improved reliability and driving dynamics. High retail demand.",
            imagePath: "/models/ford-explorer-2020.jpg",
          },
        ],
      },
      {
        id: "escape",
        name: "Escape",
        generations: [
          {
            yearStart: 2008,
            yearEnd: 2012,
            label: "3rd Gen (Old Body)",
            notes: "Basic but reliable. High parts availability. Good BHPH and entry-level lot car.",
            imagePath: "/models/ford-escape-2008.jpg",
          },
          {
            yearStart: 2013,
            yearEnd: 2019,
            label: "4th Gen",
            notes: "Modern styling, EcoBoost engines. 1.6T had some issues — 2.0T more reliable. High auction volume.",
            imagePath: "/models/ford-escape-2013.jpg",
          },
          {
            yearStart: 2020,
            yearEnd: 9999,
            label: "5th Gen",
            notes: "Refreshed platform. PHEV option available. Strong retail demand.",
            imagePath: "/models/ford-escape-2020.jpg",
          },
        ],
      },
      {
        id: "mustang",
        name: "Mustang",
        generations: [
          {
            yearStart: 2005,
            yearEnd: 2014,
            label: "5th Gen S197",
            notes: "Retro styling — timeless appeal. GT with 5.0L most desirable. High demand year-round, especially V8 coupes.",
            imagePath: "/models/ford-mustang-2005.jpg",
          },
          {
            yearStart: 2015,
            yearEnd: 2023,
            label: "6th Gen S550",
            notes: "Fully modern platform — independent rear suspension. GT, EcoBoost, and Shelby trims all trade well. GT350/GT500 are specialty buys.",
            imagePath: "/models/ford-mustang-2015.jpg",
          },
        ],
      },
      {
        id: "edge",
        name: "Edge",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2014,
            label: "1st Gen CD3",
            notes: "Mid-size crossover with steady demand. AWD units preferred in Northern sales but still move South.",
            imagePath: "/models/ford-edge-2007.jpg",
          },
          {
            yearStart: 2015,
            yearEnd: 2023,
            label: "2nd Gen CD4",
            notes: "Sharper styling, EcoBoost engines. Sport and ST trims command premium. Discontinued after 2023 — clean units will appreciate.",
            imagePath: "/models/ford-edge-2015.jpg",
          },
        ],
      },
      {
        id: "focus",
        name: "Focus",
        generations: [
          {
            yearStart: 2008,
            yearEnd: 2011,
            label: "2nd Gen",
            notes: "Entry-level car, moderate demand. Good fuel economy car.",
            imagePath: "/models/ford-focus-2008.jpg",
          },
          {
            yearStart: 2012,
            yearEnd: 2018,
            label: "3rd Gen",
            notes: "PowerShift DCT transmission had well-documented issues — avoid or price accordingly. SE and SEL trim preferred. Discontinued in US.",
            imagePath: "/models/ford-focus-2012.jpg",
          },
        ],
      },
    ],
  },

  // 3. TOYOTA
  {
    id: "toyota",
    name: "Toyota",
    logoPath: "/logos/toyota.svg",
    models: [
      {
        id: "camry",
        name: "Camry",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2011,
            label: "XV40",
            notes: "Bulletproof reliability. One of the highest-volume auction cars in any market. 4-cylinder and V6 both move well.",
            imagePath: "/models/toyota-camry-2007.jpg",
          },
          {
            yearStart: 2012,
            yearEnd: 2017,
            label: "XV50",
            notes: "Updated styling, improved fuel economy. Still extremely high auction volume. XLE and SE trims most desirable.",
            imagePath: "/models/toyota-camry-2012.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 9999,
            label: "XV70",
            notes: "Complete redesign — sportier styling, standard safety suite. High demand. Hybrid commands strong premium.",
            imagePath: "/models/toyota-camry-2018.jpg",
          },
        ],
      },
      {
        id: "corolla",
        name: "Corolla",
        generations: [
          {
            yearStart: 2009,
            yearEnd: 2013,
            label: "10th Gen E140",
            notes: "Extremely reliable entry-level car. High auction volume. Good BHPH and independent lot car.",
            imagePath: "/models/toyota-corolla-2009.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2019,
            label: "11th Gen E170",
            notes: "Refreshed, more refined. LE and S trims dominate. High supply at auction.",
            imagePath: "/models/toyota-corolla-2014.jpg",
          },
          {
            yearStart: 2020,
            yearEnd: 9999,
            label: "12th Gen E210",
            notes: "New TNGA platform — major improvement. Strong retail demand. Hybrid version growing in popularity.",
            imagePath: "/models/toyota-corolla-2020.jpg",
          },
        ],
      },
      {
        id: "highlander",
        name: "Highlander",
        generations: [
          {
            yearStart: 2008,
            yearEnd: 2013,
            label: "2nd Gen XU40",
            notes: "3-row SUV with strong family demand. 3.5L V6 preferred. High miles units still move — parts readily available.",
            imagePath: "/models/toyota-highlander-2008.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2019,
            label: "3rd Gen XU50",
            notes: "Updated platform, better interior. High auction demand. 8-speed transmission smoother than predecessor.",
            imagePath: "/models/toyota-highlander-2014.jpg",
          },
          {
            yearStart: 2020,
            yearEnd: 9999,
            label: "4th Gen XU70",
            notes: "Redesigned on TNGA platform. Platinum and Limited trims command strong premiums. High demand.",
            imagePath: "/models/toyota-highlander-2020.jpg",
          },
        ],
      },
      {
        id: "rav4",
        name: "RAV4",
        generations: [
          {
            yearStart: 2006,
            yearEnd: 2012,
            label: "3rd Gen XA30",
            notes: "Compact SUV with consistent demand. Simple mechanics, easy to service.",
            imagePath: "/models/toyota-rav4-2006.jpg",
          },
          {
            yearStart: 2013,
            yearEnd: 2018,
            label: "4th Gen XA40",
            notes: "Higher auction volume. Adventure and SE trims popular. TRD Off-Road brings premium.",
            imagePath: "/models/toyota-rav4-2013.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "5th Gen XA50",
            notes: "Complete redesign — bolder styling. Highest demand in current Toyota lineup. Hybrid version commands $2,000–3,000 premium.",
            imagePath: "/models/toyota-rav4-2019.jpg",
          },
        ],
      },
      {
        id: "tacoma",
        name: "Tacoma",
        generations: [
          {
            yearStart: 2005,
            yearEnd: 2015,
            label: "2nd Gen N200",
            notes: "One of the best-holding used vehicles in America. Clean units are hard to find and command high prices. TRD Off-Road most desirable.",
            imagePath: "/models/toyota-tacoma-2005.jpg",
          },
          {
            yearStart: 2016,
            yearEnd: 2023,
            label: "3rd Gen N300",
            notes: "Updated styling and features. Extremely high demand — often trades above book at auction. V6 AT preferred.",
            imagePath: "/models/toyota-tacoma-2016.jpg",
          },
        ],
      },
      {
        id: "sienna",
        name: "Sienna",
        generations: [
          {
            yearStart: 2004,
            yearEnd: 2010,
            label: "2nd Gen XL20",
            notes: "Reliable minivan. High supply, steady demand from families. AWD units bring premium.",
            imagePath: "/models/toyota-sienna-2004.jpg",
          },
          {
            yearStart: 2011,
            yearEnd: 2020,
            label: "3rd Gen XL30",
            notes: "Better styling, more refined. V6 only. LE and XLE dominate. AWD sells well in any market.",
            imagePath: "/models/toyota-sienna-2011.jpg",
          },
          {
            yearStart: 2021,
            yearEnd: 9999,
            label: "4th Gen XL40",
            notes: "Hybrid-only powertrain. Very high demand. Limited production means strong resale.",
            imagePath: "/models/toyota-sienna-2021.jpg",
          },
        ],
      },
    ],
  },

  // 4. HONDA
  {
    id: "honda",
    name: "Honda",
    logoPath: "/logos/honda.svg",
    models: [
      {
        id: "accord",
        name: "Accord",
        generations: [
          {
            yearStart: 2008,
            yearEnd: 2012,
            label: "8th Gen CP/CU",
            notes: "Simple, reliable mechanics. One of the most popular auction cars in the country. High supply — easy to source.",
            imagePath: "/models/honda-accord-2008.jpg",
          },
          {
            yearStart: 2013,
            yearEnd: 2017,
            label: "9th Gen CR",
            notes: "CVT transmission added — watch for CVT issues above 100k. 6-speed manual and V6 6-speed most reliable in this gen.",
            imagePath: "/models/honda-accord-2013.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 9999,
            label: "10th Gen CV",
            notes: "Turbocharged 4-cylinder only (US). Sport 2.0T is most desirable. Strong retail demand. Honda Sensing standard.",
            imagePath: "/models/honda-accord-2018.jpg",
          },
        ],
      },
      {
        id: "civic",
        name: "Civic",
        generations: [
          {
            yearStart: 2006,
            yearEnd: 2011,
            label: "8th Gen FD/FA",
            notes: "Extremely reliable entry-level car. High volume at auction. Good BHPH car at right miles.",
            imagePath: "/models/honda-civic-2006.jpg",
          },
          {
            yearStart: 2012,
            yearEnd: 2015,
            label: "9th Gen FB",
            notes: "Mixed reviews on reliability. CVT concerns — check service history. Still moves at right price.",
            imagePath: "/models/honda-civic-2012.jpg",
          },
          {
            yearStart: 2016,
            yearEnd: 2021,
            label: "10th Gen FC",
            notes: "Major improvement — sporty design, strong reliability. Sport and EX trims most desirable. High demand.",
            imagePath: "/models/honda-civic-2016.jpg",
          },
          {
            yearStart: 2022,
            yearEnd: 9999,
            label: "11th Gen FL",
            notes: "Fully redesigned. Clean styling. Strong retail demand growing.",
            imagePath: "/models/honda-civic-2022.jpg",
          },
        ],
      },
      {
        id: "cr-v",
        name: "CR-V",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2011,
            label: "3rd Gen RE",
            notes: "Compact SUV with consistent demand. Simple mechanics, good fuel economy.",
            imagePath: "/models/honda-cr-v-2007.jpg",
          },
          {
            yearStart: 2012,
            yearEnd: 2016,
            label: "4th Gen RM",
            notes: "Refreshed styling, CVT optional. High auction volume. EX-L most desirable trim.",
            imagePath: "/models/honda-cr-v-2012.jpg",
          },
          {
            yearStart: 2017,
            yearEnd: 2022,
            label: "5th Gen RW",
            notes: "Turbocharged 1.5T — watch for oil dilution issue in cold climates. Strong demand overall. Touring trim commands premium.",
            imagePath: "/models/honda-cr-v-2017.jpg",
          },
          {
            yearStart: 2023,
            yearEnd: 9999,
            label: "6th Gen",
            notes: "New platform. Hybrid available. High demand growing.",
            imagePath: "/models/honda-cr-v-2023.jpg",
          },
        ],
      },
      {
        id: "pilot",
        name: "Pilot",
        generations: [
          {
            yearStart: 2009,
            yearEnd: 2015,
            label: "2nd Gen YF",
            notes: "3-row SUV with strong family demand. 3.5L V6 only. Reliable — high mileage units still move.",
            imagePath: "/models/honda-pilot-2009.jpg",
          },
          {
            yearStart: 2016,
            yearEnd: 2022,
            label: "3rd Gen YF2",
            notes: "Refreshed platform, 9-speed transmission (watch for rough shifts on early units). Elite and Touring trims bring premium.",
            imagePath: "/models/honda-pilot-2016.jpg",
          },
          {
            yearStart: 2023,
            yearEnd: 9999,
            label: "4th Gen",
            notes: "Completely redesigned. TrailSport trim new and popular.",
            imagePath: "/models/honda-pilot-2023.jpg",
          },
        ],
      },
      {
        id: "odyssey",
        name: "Odyssey",
        generations: [
          {
            yearStart: 2005,
            yearEnd: 2010,
            label: "3rd Gen RL",
            notes: "Reliable family minivan. High supply. Good entry-level dealer car.",
            imagePath: "/models/honda-odyssey-2005.jpg",
          },
          {
            yearStart: 2011,
            yearEnd: 2017,
            label: "4th Gen RB",
            notes: "Updated styling. Watch for transmission issues on 2014–2016 units. EX-L and Touring most desirable.",
            imagePath: "/models/honda-odyssey-2011.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 9999,
            label: "5th Gen RU",
            notes: "Major redesign — much improved. Magic Slide seats a differentiator. Strong retail demand.",
            imagePath: "/models/honda-odyssey-2018.jpg",
          },
        ],
      },
    ],
  },

  // 5. DODGE
  {
    id: "dodge",
    name: "Dodge",
    logoPath: "/logos/dodge.svg",
    models: [
      {
        id: "charger",
        name: "Charger",
        generations: [
          {
            yearStart: 2011,
            yearEnd: 2014,
            label: "LX 2nd Gen Facelift",
            notes: "Full-size muscle sedan. Massive demand in Southern and Southeastern markets — Memphis, Atlanta, Birmingham. V6 and 5.7L HEMI both move.",
            imagePath: "/models/dodge-charger-2011.jpg",
          },
          {
            yearStart: 2015,
            yearEnd: 2023,
            label: "LD 3rd Gen",
            notes: "Refreshed front end, updated interior. 392 and Hellcat trims are specialty buys. SXT and R/T move highest volume at auction. Watch for rear brake issues.",
            imagePath: "/models/dodge-charger-2015.jpg",
          },
        ],
      },
      {
        id: "challenger",
        name: "Challenger",
        generations: [
          {
            yearStart: 2008,
            yearEnd: 2014,
            label: "LC 1st Gen",
            notes: "Retro muscle car — consistent demand. SXT and R/T most common at auction. V6 buyers exist but V8 always preferred.",
            imagePath: "/models/dodge-challenger-2008.jpg",
          },
          {
            yearStart: 2015,
            yearEnd: 2023,
            label: "LC Refreshed",
            notes: "Updated interior and tech. ScatPack and Hellcat trims command major premiums. Discontinued after 2023 — prices rising on clean units.",
            imagePath: "/models/dodge-challenger-2015.jpg",
          },
        ],
      },
      {
        id: "durango",
        name: "Durango",
        generations: [
          {
            yearStart: 2011,
            yearEnd: 2013,
            label: "3rd Gen WD Pre-refresh",
            notes: "3-row SUV with strong towing capability. 3.6L Pentastar V6 and 5.7L HEMI both sell.",
            imagePath: "/models/dodge-durango-2011.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2020,
            label: "3rd Gen WD Refresh",
            notes: "Updated front end and interior. SXT Plus and GT trims most common at auction. AWD brings premium.",
            imagePath: "/models/dodge-durango-2014.jpg",
          },
          {
            yearStart: 2021,
            yearEnd: 9999,
            label: "3rd Gen WD Final",
            notes: "Further updates, new interior. Hellcat trim a specialty buy. Strong demand for Citadel and R/T.",
            imagePath: "/models/dodge-durango-2021.jpg",
          },
        ],
      },
      {
        id: "grand-caravan",
        name: "Grand Caravan",
        generations: [
          {
            yearStart: 2008,
            yearEnd: 2010,
            label: "5th Gen RT",
            notes: "Family minivan with extremely high volume at auction. Reliable 3.8L V6. Good BHPH car.",
            imagePath: "/models/dodge-grand-caravan-2008.jpg",
          },
          {
            yearStart: 2011,
            yearEnd: 2020,
            label: "5th Gen Refresh",
            notes: "Updated styling and features. SE Plus most common. High supply, moderate demand. Stow-N-Go seating is key selling point. Discontinued 2020.",
            imagePath: "/models/dodge-grand-caravan-2011.jpg",
          },
        ],
      },
    ],
  },

  // 6. RAM
  {
    id: "ram",
    name: "RAM",
    logoPath: "/logos/ram.svg",
    models: [
      {
        id: "ram-1500",
        name: "Ram 1500",
        generations: [
          {
            yearStart: 2009,
            yearEnd: 2012,
            label: "4th Gen DS Pre-refresh",
            notes: "Split from Dodge brand in 2010. Coil spring rear suspension sets it apart. 5.7L HEMI preferred.",
            imagePath: "/models/ram-ram-1500-2009.jpg",
          },
          {
            yearStart: 2013,
            yearEnd: 2018,
            label: "4th Gen DS Refresh",
            notes: "Updated interior and tech. EcoDiesel available — high demand from buyers who want fuel economy in a full-size truck. Watch for EcoDiesel issues on 2014–2016. Big Horn and Laramie move well.",
            imagePath: "/models/ram-ram-1500-2013.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "5th Gen DT",
            notes: "Completely redesigned. eTorque mild hybrid. Multi-function tailgate a selling point. Very high demand — one of the top auction trucks currently.",
            imagePath: "/models/ram-ram-1500-2019.jpg",
          },
        ],
      },
      {
        id: "ram-2500",
        name: "Ram 2500",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2013,
            label: "4th Gen DJ",
            notes: "Heavy duty — commercial and towing buyers. 6.7L Cummins Diesel commands significant premium. Gas 5.7L HEMI is adequate.",
            imagePath: "/models/ram-ram-2500-2010.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2018,
            label: "4th Gen DJ Refresh",
            notes: "Updated tech and safety features. Cummins Diesel still the preferred powertrain. Tradesman and SLT most common at auction.",
            imagePath: "/models/ram-ram-2500-2014.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "5th Gen DJ",
            notes: "New body, same proven platforms. Cummins high-output 6.7L in Laramie and above brings strong premiums.",
            imagePath: "/models/ram-ram-2500-2019.jpg",
          },
        ],
      },
      {
        id: "promaster-city",
        name: "Ram ProMaster City",
        generations: [
          {
            yearStart: 2015,
            yearEnd: 9999,
            label: "1st Gen BV",
            notes: "Compact cargo and passenger van. Fleet-heavy auction supply. Tradesman Cargo most common. Good commercial lot car — trades on utility not style.",
            imagePath: "/models/ram-promaster-city-2015.jpg",
          },
        ],
      },
    ],
  },

  // 7. NISSAN
  {
    id: "nissan",
    name: "Nissan",
    logoPath: "/logos/nissan.svg",
    models: [
      {
        id: "altima",
        name: "Altima",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2012,
            label: "5th Gen L32",
            notes: "High volume auction sedan. CVT concerns above 120k — price accordingly. 2.5L 4-cylinder dominant.",
            imagePath: "/models/nissan-altima-2007.jpg",
          },
          {
            yearStart: 2013,
            yearEnd: 2018,
            label: "6th Gen L33",
            notes: "Refreshed styling. Same CVT concerns persist. Watch transmission fluid service history. SV and SL trims most desirable.",
            imagePath: "/models/nissan-altima-2013.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "7th Gen L34",
            notes: "Complete redesign. Variable Compression Turbo engine on SR and above. Improved CVT reliability. Strong demand.",
            imagePath: "/models/nissan-altima-2019.jpg",
          },
        ],
      },
      {
        id: "sentra",
        name: "Sentra",
        generations: [
          {
            yearStart: 2013,
            yearEnd: 2019,
            label: "7th Gen B17",
            notes: "Entry-level sedan. High supply at auction. Good BHPH and independent lot car at right mileage. CVT same concerns as Altima.",
            imagePath: "/models/nissan-sentra-2013.jpg",
          },
          {
            yearStart: 2020,
            yearEnd: 9999,
            label: "8th Gen B18",
            notes: "Significantly improved — larger, better interior. SR and SV most common. Growing demand.",
            imagePath: "/models/nissan-sentra-2020.jpg",
          },
        ],
      },
      {
        id: "maxima",
        name: "Maxima",
        generations: [
          {
            yearStart: 2009,
            yearEnd: 2014,
            label: "7th Gen A35",
            notes: "Full-size sport sedan. 3.5L V6 only — no CVT in this gen. Reliable and desirable.",
            imagePath: "/models/nissan-maxima-2009.jpg",
          },
          {
            yearStart: 2016,
            yearEnd: 2023,
            label: "8th Gen A36",
            notes: "Aggressive styling. CVT in this gen. SR trim most popular. Discontinued after 2023 — supply tightening.",
            imagePath: "/models/nissan-maxima-2016.jpg",
          },
        ],
      },
      {
        id: "rogue",
        name: "Rogue",
        generations: [
          {
            yearStart: 2008,
            yearEnd: 2013,
            label: "1st Gen S35",
            notes: "Compact SUV with growing demand. CVT — same service history check applies.",
            imagePath: "/models/nissan-rogue-2008.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2020,
            label: "2nd Gen T32",
            notes: "Highest volume Nissan at auction. SV trim dominant. AWD units preferred in any climate. Very high retail demand.",
            imagePath: "/models/nissan-rogue-2014.jpg",
          },
          {
            yearStart: 2021,
            yearEnd: 9999,
            label: "3rd Gen T33",
            notes: "New platform, much better interior. Platinum and SL trims command premium. Strong and growing demand.",
            imagePath: "/models/nissan-rogue-2021.jpg",
          },
        ],
      },
      {
        id: "murano",
        name: "Murano",
        generations: [
          {
            yearStart: 2009,
            yearEnd: 2014,
            label: "2nd Gen Z51",
            notes: "Mid-size crossover. 3.5L V6 only. Moderate auction volume. AWD preferred.",
            imagePath: "/models/nissan-murano-2009.jpg",
          },
          {
            yearStart: 2015,
            yearEnd: 9999,
            label: "3rd Gen Z52",
            notes: "Dramatic styling change — love it or hate it. Platinum trim popular. Moderate demand, niche buyer.",
            imagePath: "/models/nissan-murano-2015.jpg",
          },
        ],
      },
      {
        id: "pathfinder",
        name: "Pathfinder",
        generations: [
          {
            yearStart: 2005,
            yearEnd: 2012,
            label: "3rd Gen R51",
            notes: "Body-on-frame-adjacent — moderate off-road capability. Timing chain issues on 4.0L V6. Research before buying.",
            imagePath: "/models/nissan-pathfinder-2005.jpg",
          },
          {
            yearStart: 2013,
            yearEnd: 2020,
            label: "4th Gen R52",
            notes: "Switched to car-based platform. CVT — check service history. SV and SL most common. 3-row family SUV demand solid.",
            imagePath: "/models/nissan-pathfinder-2013.jpg",
          },
          {
            yearStart: 2021,
            yearEnd: 9999,
            label: "5th Gen R53",
            notes: "New 9-speed auto replaces CVT — major improvement. Redesigned interior. Growing demand.",
            imagePath: "/models/nissan-pathfinder-2021.jpg",
          },
        ],
      },
    ],
  },

  // 8. KIA
  {
    id: "kia",
    name: "Kia",
    logoPath: "/logos/kia.svg",
    models: [
      {
        id: "optima-k5",
        name: "Optima / K5",
        generations: [
          {
            yearStart: 2011,
            yearEnd: 2015,
            label: "3rd Gen TF",
            notes: "Strong design brought Kia into the mainstream. EX and SX trims move well. Reliable 2.4L and 2.0T.",
            imagePath: "/models/kia-optima-k5-2011.jpg",
          },
          {
            yearStart: 2016,
            yearEnd: 2020,
            label: "4th Gen JF",
            notes: "Refreshed styling, updated tech. SX Turbo brings premium. High auction volume.",
            imagePath: "/models/kia-optima-k5-2016.jpg",
          },
          {
            yearStart: 2021,
            yearEnd: 9999,
            label: "K5",
            notes: "Rebranded as K5. Bold aggressive styling. GT-Line most common. High demand.",
            imagePath: "/models/kia-optima-k5-2021.jpg",
          },
        ],
      },
      {
        id: "sorento",
        name: "Sorento",
        generations: [
          {
            yearStart: 2011,
            yearEnd: 2015,
            label: "2nd Gen XM",
            notes: "3-row capable mid-size SUV. 3.5L V6 preferred for towing. EX and SX move well.",
            imagePath: "/models/kia-sorento-2011.jpg",
          },
          {
            yearStart: 2016,
            yearEnd: 2020,
            label: "3rd Gen UM",
            notes: "Updated platform, better interior. 3-row buyers specifically seek this out. AWD premium applies.",
            imagePath: "/models/kia-sorento-2016.jpg",
          },
          {
            yearStart: 2021,
            yearEnd: 9999,
            label: "4th Gen MQ4",
            notes: "New platform — car-based. Plug-in hybrid available. High demand growing rapidly.",
            imagePath: "/models/kia-sorento-2021.jpg",
          },
        ],
      },
      {
        id: "sportage",
        name: "Sportage",
        generations: [
          {
            yearStart: 2011,
            yearEnd: 2016,
            label: "3rd Gen SL",
            notes: "Compact SUV. Entry-level appeal. High supply. Good value car at right price.",
            imagePath: "/models/kia-sportage-2011.jpg",
          },
          {
            yearStart: 2017,
            yearEnd: 2021,
            label: "4th Gen QL",
            notes: "Sharper styling. EX and SX Turbo most desirable. Strong moderate demand.",
            imagePath: "/models/kia-sportage-2017.jpg",
          },
          {
            yearStart: 2022,
            yearEnd: 9999,
            label: "5th Gen NQ5",
            notes: "Complete redesign — very bold styling. Turbo only. Growing demand.",
            imagePath: "/models/kia-sportage-2022.jpg",
          },
        ],
      },
      {
        id: "soul",
        name: "Soul",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2013,
            label: "1st Gen AM",
            notes: "Unique box styling creates loyal following. High supply at auction. Youth-market car.",
            imagePath: "/models/kia-soul-2010.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2019,
            label: "2nd Gen PS",
            notes: "Updated and more refined. Exclaim trim most popular. Moderate steady demand.",
            imagePath: "/models/kia-soul-2014.jpg",
          },
          {
            yearStart: 2020,
            yearEnd: 9999,
            label: "3rd Gen SK3",
            notes: "Turbocharged option added. GT-Line most common. Consistent niche demand.",
            imagePath: "/models/kia-soul-2020.jpg",
          },
        ],
      },
      {
        id: "forte",
        name: "Forte",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2013,
            label: "1st Gen TD",
            notes: "Entry-level sedan. High auction supply. Good BHPH car.",
            imagePath: "/models/kia-forte-2010.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2018,
            label: "2nd Gen YD",
            notes: "Improved reliability and styling. EX trim preferred. Moderate demand.",
            imagePath: "/models/kia-forte-2014.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "3rd Gen BD",
            notes: "New platform. GT trim with turbo growing in popularity. Strong value proposition.",
            imagePath: "/models/kia-forte-2019.jpg",
          },
        ],
      },
    ],
  },

  // 9. HYUNDAI
  {
    id: "hyundai",
    name: "Hyundai",
    logoPath: "/logos/hyundai.svg",
    models: [
      {
        id: "sonata",
        name: "Sonata",
        generations: [
          {
            yearStart: 2011,
            yearEnd: 2014,
            label: "6th Gen YF",
            notes: "Major design upgrade that put Hyundai on the map. SE and GLS most common at auction. 2.4L reliable.",
            imagePath: "/models/hyundai-sonata-2011.jpg",
          },
          {
            yearStart: 2015,
            yearEnd: 2019,
            label: "7th Gen LF",
            notes: "Toned-down styling, more conservative. Engine recalls on some — check VIN. Sport trim preferred.",
            imagePath: "/models/hyundai-sonata-2015.jpg",
          },
          {
            yearStart: 2020,
            yearEnd: 9999,
            label: "8th Gen DN8",
            notes: "Bold new design. Turbo available. N Line growing in popularity. Strong retail demand.",
            imagePath: "/models/hyundai-sonata-2020.jpg",
          },
        ],
      },
      {
        id: "elantra",
        name: "Elantra",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2010,
            label: "4th Gen HD",
            notes: "Entry-level car. High auction supply. Basic but reliable. Good BHPH starter car.",
            imagePath: "/models/hyundai-elantra-2007.jpg",
          },
          {
            yearStart: 2011,
            yearEnd: 2016,
            label: "5th Gen MD",
            notes: "Sharp styling improvement. SE and GLS dominate supply. High volume auction car.",
            imagePath: "/models/hyundai-elantra-2011.jpg",
          },
          {
            yearStart: 2017,
            yearEnd: 2020,
            label: "6th Gen AD",
            notes: "Refined further. Eco and Sport trims added. Moderate demand at right price.",
            imagePath: "/models/hyundai-elantra-2017.jpg",
          },
          {
            yearStart: 2021,
            yearEnd: 9999,
            label: "7th Gen CN7",
            notes: "Striking design — love or hate. N and N Line trims growing. Strong retail demand.",
            imagePath: "/models/hyundai-elantra-2021.jpg",
          },
        ],
      },
      {
        id: "santa-fe",
        name: "Santa Fe",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2012,
            label: "2nd Gen CM",
            notes: "Mid-size SUV. 3.5L V6 preferred. Moderate auction volume.",
            imagePath: "/models/hyundai-santa-fe-2007.jpg",
          },
          {
            yearStart: 2013,
            yearEnd: 2018,
            label: "3rd Gen DM",
            notes: "Strong styling, updated tech. Sport 2.0T most desirable trim. High demand. 3-row Sport version in high demand.",
            imagePath: "/models/hyundai-santa-fe-2013.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "4th Gen TM",
            notes: "Separated into Santa Fe (2-row) and Santa Fe XL/Palisade (3-row). Smart refresh — consistent demand.",
            imagePath: "/models/hyundai-santa-fe-2019.jpg",
          },
        ],
      },
      {
        id: "tucson",
        name: "Tucson",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2015,
            label: "2nd Gen LM",
            notes: "Compact SUV. High auction supply. Entry-level appeal.",
            imagePath: "/models/hyundai-tucson-2010.jpg",
          },
          {
            yearStart: 2016,
            yearEnd: 2020,
            label: "3rd Gen TL",
            notes: "Aggressive new styling. 1.6T Eco available. SE and Sport most common. Solid moderate demand.",
            imagePath: "/models/hyundai-tucson-2016.jpg",
          },
          {
            yearStart: 2021,
            yearEnd: 9999,
            label: "4th Gen NX4",
            notes: "Major redesign — class-leading interior. Hybrid and PHEV available. Very high demand.",
            imagePath: "/models/hyundai-tucson-2021.jpg",
          },
        ],
      },
    ],
  },

  // 10. JEEP
  {
    id: "jeep",
    name: "Jeep",
    logoPath: "/logos/jeep.svg",
    models: [
      {
        id: "grand-cherokee",
        name: "Grand Cherokee",
        generations: [
          {
            yearStart: 2005,
            yearEnd: 2010,
            label: "3rd Gen WK",
            notes: "Body-on-frame Hemi available. Durable platform. High supply, steady demand.",
            imagePath: "/models/jeep-grand-cherokee-2005.jpg",
          },
          {
            yearStart: 2011,
            yearEnd: 2021,
            label: "4th Gen WK2",
            notes: "One of the most desirable used SUVs in the country. Laredo, Limited, Trailhawk all move fast. V8 HEMI commands premium. Watch for oil consumption on 3.6L. Long production run = high auction supply.",
            imagePath: "/models/jeep-grand-cherokee-2011.jpg",
          },
          {
            yearStart: 2022,
            yearEnd: 9999,
            label: "5th Gen WL",
            notes: "Completely redesigned. Available as Grand Cherokee L (3-row). Very high demand, higher acquisition cost.",
            imagePath: "/models/jeep-grand-cherokee-2022.jpg",
          },
        ],
      },
      {
        id: "cherokee",
        name: "Cherokee",
        generations: [
          {
            yearStart: 2014,
            yearEnd: 2018,
            label: "5th Gen KL Pre-refresh",
            notes: "Polarizing front end styling. 2.4L or 3.2L V6 — V6 preferred for performance. Trailhawk most sought-after trim. Watch for 9-speed transmission issues on early units.",
            imagePath: "/models/jeep-cherokee-2014.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 2023,
            label: "5th Gen KL Refresh",
            notes: "Updated front end addresses styling concerns. Latitude and Trailhawk highest demand. Discontinued after 2023.",
            imagePath: "/models/jeep-cherokee-2019.jpg",
          },
        ],
      },
      {
        id: "wrangler",
        name: "Wrangler",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2018,
            label: "JK",
            notes: "One of the strongest resale vehicles in America. 2-door and 4-door (Unlimited) both in demand — 4-door commands more. Rubicon brings major premium. Holds value better than nearly any other vehicle at auction.",
            imagePath: "/models/jeep-wrangler-2007.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 9999,
            label: "JL",
            notes: "Redesigned — better daily driver but retains off-road DNA. Turbocharged 2.0L option. Sahara and Rubicon dominate premium end. 4xe PHEV is specialty. Very high demand.",
            imagePath: "/models/jeep-wrangler-2018.jpg",
          },
        ],
      },
      {
        id: "compass",
        name: "Compass",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2016,
            label: "1st Gen MK",
            notes: "Entry-level Jeep. Basic but badge carries loyalty. CVT concerns — check service history.",
            imagePath: "/models/jeep-compass-2007.jpg",
          },
          {
            yearStart: 2017,
            yearEnd: 9999,
            label: "2nd Gen MP",
            notes: "Completely redesigned — much improved. Latitude and Trailhawk most common. Good entry-level Jeep demand.",
            imagePath: "/models/jeep-compass-2017.jpg",
          },
        ],
      },
    ],
  },

  // 11. GMC
  {
    id: "gmc",
    name: "GMC",
    logoPath: "/logos/gmc.svg",
    models: [
      {
        id: "sierra-1500",
        name: "Sierra 1500",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2013,
            label: "GMT900",
            notes: "Near-identical to Chevy Silverado GMT900 — shares all components. SLE and SLT most common. Same high demand as its Chevy counterpart.",
            imagePath: "/models/gmc-sierra-1500-2007.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2018,
            label: "K2XX",
            notes: "Updated with Denali trim expanding significantly. Premium positioning over Silverado. 5.3L most common, 6.2L in Denali and High Country.",
            imagePath: "/models/gmc-sierra-1500-2014.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "T1XX",
            notes: "Redesigned. MultiPro Tailgate is key differentiator from Silverado. Denali trim very high demand. AT4 off-road trim growing.",
            imagePath: "/models/gmc-sierra-1500-2019.jpg",
          },
        ],
      },
      {
        id: "terrain",
        name: "Terrain",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2017,
            label: "1st Gen",
            notes: "Compact SUV. 2.4L 4-cyl common — timing chain concerns. V6 preferred. SLE and SLT most common.",
            imagePath: "/models/gmc-terrain-2010.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 9999,
            label: "2nd Gen",
            notes: "Turbocharged only. Diesel option available — moderate demand from efficiency buyers. Denali trim strong demand.",
            imagePath: "/models/gmc-terrain-2018.jpg",
          },
        ],
      },
      {
        id: "acadia",
        name: "Acadia",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2016,
            label: "1st Gen Lambda",
            notes: "3-row SUV. Same timing chain concerns as Traverse. SLE and SLT dominate. Moderate to high demand.",
            imagePath: "/models/gmc-acadia-2007.jpg",
          },
          {
            yearStart: 2017,
            yearEnd: 9999,
            label: "2nd Gen",
            notes: "Smaller and lighter redesign. All Terrain trim new. SLT and Denali strong demand.",
            imagePath: "/models/gmc-acadia-2017.jpg",
          },
        ],
      },
      {
        id: "yukon",
        name: "Yukon",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2014,
            label: "3rd Gen GMT900",
            notes: "Full-size SUV — same platform as Tahoe. SLE and SLT common. XL brings 3-row capability and commands premium.",
            imagePath: "/models/gmc-yukon-2007.jpg",
          },
          {
            yearStart: 2015,
            yearEnd: 2020,
            label: "4th Gen K2XX",
            notes: "Updated luxury positioning. Denali trim highest demand and strong premium.",
            imagePath: "/models/gmc-yukon-2015.jpg",
          },
          {
            yearStart: 2021,
            yearEnd: 9999,
            label: "5th Gen T1XX",
            notes: "Redesigned with independent rear suspension — ride much improved. Denali and AT4 most desired.",
            imagePath: "/models/gmc-yukon-2021.jpg",
          },
        ],
      },
    ],
  },

  // 12. BUICK
  {
    id: "buick",
    name: "Buick",
    logoPath: "/logos/buick.svg",
    models: [
      {
        id: "lacrosse",
        name: "LaCrosse",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2016,
            label: "2nd Gen W Body",
            notes: "Premium mid-size sedan. Strong with older buyer demographic. V6 preferred. eAssist hybrid available.",
            imagePath: "/models/buick-lacrosse-2010.jpg",
          },
          {
            yearStart: 2017,
            yearEnd: 2019,
            label: "3rd Gen E2XX",
            notes: "Significantly refreshed — much more modern. Quieter and more refined. Discontinued after 2019. Clean units sought by buyers who want near-luxury at value prices.",
            imagePath: "/models/buick-lacrosse-2017.jpg",
          },
        ],
      },
      {
        id: "enclave",
        name: "Enclave",
        generations: [
          {
            yearStart: 2008,
            yearEnd: 2017,
            label: "1st Gen Lambda",
            notes: "Premium 3-row crossover. Same timing chain concerns as Traverse/Acadia. CXL and Premium trims most common. Strong demand from buyers who want luxury 3-row without European price.",
            imagePath: "/models/buick-enclave-2008.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 9999,
            label: "2nd Gen C1XX",
            notes: "Redesigned on updated platform. Avenir trim top of line. Quiet, refined, strong retail demand.",
            imagePath: "/models/buick-enclave-2018.jpg",
          },
        ],
      },
      {
        id: "verano",
        name: "Verano",
        generations: [
          {
            yearStart: 2012,
            yearEnd: 2017,
            label: "1st Gen (only gen)",
            notes: "Compact premium sedan. Unique niche — discontinued after 2017. Clean units are harder to find. Turbo trim preferred. Moderate but consistent demand.",
            imagePath: "/models/buick-verano-2012.jpg",
          },
        ],
      },
      {
        id: "regal",
        name: "Regal",
        generations: [
          {
            yearStart: 2011,
            yearEnd: 2017,
            label: "2nd Gen E2XX",
            notes: "Sport sedan with European roots (Opel Insignia). GS trim with AWD most desirable. Moderate demand.",
            imagePath: "/models/buick-regal-2011.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 2020,
            label: "3rd Gen Sportback/TourX",
            notes: "Sportback hatch and TourX wagon body styles. Very limited production — discontinued 2020. Specialty buy, niche demand.",
            imagePath: "/models/buick-regal-2018.jpg",
          },
        ],
      },
    ],
  },

  // 13. CHRYSLER
  {
    id: "chrysler",
    name: "Chrysler",
    logoPath: "/logos/chrysler.svg",
    models: [
      {
        id: "300",
        name: "300",
        generations: [
          {
            yearStart: 2005,
            yearEnd: 2010,
            label: "1st Gen LX",
            notes: "Full-size rear-wheel-drive sedan — unique positioning. HEMI V8 commands premium. High demand in Southern markets for the bold styling.",
            imagePath: "/models/chrysler-300-2005.jpg",
          },
          {
            yearStart: 2011,
            yearEnd: 2014,
            label: "2nd Gen LX Refresh",
            notes: "Updated interior and styling. SRT8 is specialty buy. 300S the most popular trim.",
            imagePath: "/models/chrysler-300-2011.jpg",
          },
          {
            yearStart: 2015,
            yearEnd: 2023,
            label: "2nd Gen LD",
            notes: "Further updates. Final generation before discontinuation. AWD available. Platinum and 300S most desirable. Discontinued 2023 — clean units will appreciate.",
            imagePath: "/models/chrysler-300-2015.jpg",
          },
        ],
      },
      {
        id: "town-country-pacifica",
        name: "Town & Country / Pacifica",
        generations: [
          {
            yearStart: 2008,
            yearEnd: 2016,
            label: "Town & Country 5th Gen RT",
            notes: "Reliable family minivan. High auction supply. Touring and Touring-L most common. Stow-N-Go seating is main selling point.",
            imagePath: "/models/chrysler-town-country-pacifica-2008.jpg",
          },
          {
            yearStart: 2017,
            yearEnd: 9999,
            label: "Pacifica",
            notes: "Rebranded and redesigned. Much improved over T&C. PHEV version (Pacifica Hybrid) commands significant premium — strong demand from buyers wanting fuel economy. Touring Plus and Touring L most common.",
            imagePath: "/models/chrysler-town-country-pacifica-2017.jpg",
          },
        ],
      },
    ],
  },

  // 14. SUBARU
  {
    id: "subaru",
    name: "Subaru",
    logoPath: "/logos/subaru.svg",
    models: [
      {
        id: "outback",
        name: "Outback",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2014,
            label: "4th Gen BR",
            notes: "AWD wagon/crossover — cult following. 2.5L reliable but head gasket issues exist on higher miles — check service history. 3.6R V6 avoids this concern.",
            imagePath: "/models/subaru-outback-2010.jpg",
          },
          {
            yearStart: 2015,
            yearEnd: 2019,
            label: "5th Gen BS",
            notes: "Refreshed styling, CVT standard. Improved head gasket fix by this gen. 3.6R Limited most desirable. High demand from outdoorsy and practical buyers.",
            imagePath: "/models/subaru-outback-2015.jpg",
          },
          {
            yearStart: 2020,
            yearEnd: 9999,
            label: "6th Gen BT",
            notes: "New platform. Standard EyeSight safety suite. Outback XT Turbo new top trim. High demand.",
            imagePath: "/models/subaru-outback-2020.jpg",
          },
        ],
      },
      {
        id: "forester",
        name: "Forester",
        generations: [
          {
            yearStart: 2009,
            yearEnd: 2013,
            label: "3rd Gen SH",
            notes: "Boxy but practical AWD SUV. 2.5L — same head gasket concern as Outback in this generation.",
            imagePath: "/models/subaru-forester-2009.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2018,
            label: "4th Gen SJ",
            notes: "Refreshed, more conventional SUV styling. CVT only. Head gasket improved. 2.5i Premium and Limited most common.",
            imagePath: "/models/subaru-forester-2014.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "5th Gen SK",
            notes: "New platform, better interior. Sport trim popular. Standard EyeSight. Strong consistent demand.",
            imagePath: "/models/subaru-forester-2019.jpg",
          },
        ],
      },
      {
        id: "legacy",
        name: "Legacy",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2014,
            label: "5th Gen BM",
            notes: "AWD sedan — practical and reliable. 3.6R V6 preferred by buyers. Moderate auction volume.",
            imagePath: "/models/subaru-legacy-2010.jpg",
          },
          {
            yearStart: 2015,
            yearEnd: 2019,
            label: "6th Gen BN",
            notes: "Refreshed, CVT only. 3.6R Limited most desirable. AWD sedan segment is niche but consistent.",
            imagePath: "/models/subaru-legacy-2015.jpg",
          },
          {
            yearStart: 2020,
            yearEnd: 9999,
            label: "7th Gen BS",
            notes: "New platform. XT Turbo added. Strong AWD value proposition.",
            imagePath: "/models/subaru-legacy-2020.jpg",
          },
        ],
      },
      {
        id: "crosstrek",
        name: "Crosstrek",
        generations: [
          {
            yearStart: 2013,
            yearEnd: 2017,
            label: "1st Gen GP/GJ",
            notes: "Lifted Impreza wagon — cult following. XV Crosstrek badge in early years. Solid demand from outdoor-oriented buyers.",
            imagePath: "/models/subaru-crosstrek-2013.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 2023,
            label: "2nd Gen GT",
            notes: "Dedicated model with improved capability. Limited trim adds power from 2.5L (vs 2.0L base). High demand — often moves above book at auction.",
            imagePath: "/models/subaru-crosstrek-2018.jpg",
          },
          {
            yearStart: 2024,
            yearEnd: 9999,
            label: "3rd Gen GU",
            notes: "Newly redesigned. Very high demand.",
            imagePath: "/models/subaru-crosstrek-2024.jpg",
          },
        ],
      },
    ],
  },

  // 15. BMW
  {
    id: "bmw",
    name: "BMW",
    logoPath: "/logos/bmw.svg",
    models: [
      {
        id: "3-series",
        name: "3 Series",
        generations: [
          {
            yearStart: 2006,
            yearEnd: 2011,
            label: "E90/E91/E92",
            notes: "Most popular BMW body style globally. 328i and 335i most common. Watch for cooling system and high-pressure fuel pump issues. High supply at auction.",
            imagePath: "/models/bmw-3-series-2006.jpg",
          },
          {
            yearStart: 2012,
            yearEnd: 2018,
            label: "F30/F31/F34",
            notes: "Turbocharged 4-cylinder (320i/328i) or inline-6 (335i/340i). 340i is the sweet spot. Watch for N20 timing chain on 328i. High demand from European luxury buyers on a budget.",
            imagePath: "/models/bmw-3-series-2012.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "G20",
            notes: "Completely redesigned. B58 engine in 330i is very reliable. High demand, higher acquisition cost.",
            imagePath: "/models/bmw-3-series-2019.jpg",
          },
        ],
      },
      {
        id: "5-series",
        name: "5 Series",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2016,
            label: "F10/F11",
            notes: "Executive sedan. 528i and 535i most common. Strong demand from buyers wanting full-size luxury. Watch for turbo wastegate rattle on 535i N55 engine.",
            imagePath: "/models/bmw-5-series-2010.jpg",
          },
          {
            yearStart: 2017,
            yearEnd: 9999,
            label: "G30",
            notes: "New platform. 530i and 540i dominant. xDrive AWD commands premium. B58 engine very reliable. High demand.",
            imagePath: "/models/bmw-5-series-2017.jpg",
          },
        ],
      },
      {
        id: "x3",
        name: "X3",
        generations: [
          {
            yearStart: 2011,
            yearEnd: 2017,
            label: "F25",
            notes: "Luxury compact SUV. xDrive28i most common. Strong demand. Watch for oil consumption on N52 engine.",
            imagePath: "/models/bmw-x3-2011.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 9999,
            label: "G01",
            notes: "New platform — major improvement. xDrive30i standard. M40i is specialty buy. Very high demand — one of the better used luxury SUV values.",
            imagePath: "/models/bmw-x3-2018.jpg",
          },
        ],
      },
      {
        id: "x5",
        name: "X5",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2013,
            label: "E70",
            notes: "Mid-size luxury SUV. xDrive35i most common. N55 turbo 6-cylinder reliable. High demand. Timing chain — check service history on N54 (35i pre-2012).",
            imagePath: "/models/bmw-x5-2007.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2018,
            label: "F15",
            notes: "Updated platform. xDrive35i and xDrive50i most common. Diesel xDrive35d strong niche demand.",
            imagePath: "/models/bmw-x5-2014.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "G05",
            notes: "Completely redesigned. Plug-in hybrid available. xDrive40i most common. Very high demand, high acquisition cost.",
            imagePath: "/models/bmw-x5-2019.jpg",
          },
        ],
      },
    ],
  },

  // 16. MERCEDES-BENZ
  {
    id: "mercedes-benz",
    name: "Mercedes-Benz",
    logoPath: "/logos/mercedes-benz.svg",
    models: [
      {
        id: "c-class",
        name: "C-Class",
        generations: [
          {
            yearStart: 2008,
            yearEnd: 2014,
            label: "W204",
            notes: "Entry-level Mercedes. C300 and C350 most common. Watch for balance shaft failure on V6 — research by VIN. High supply at auction.",
            imagePath: "/models/mercedes-benz-c-class-2008.jpg",
          },
          {
            yearStart: 2015,
            yearEnd: 2021,
            label: "W205",
            notes: "Significantly improved — more modern and refined. C300 (4-cylinder turbo) most common. 4MATIC AWD brings premium. High demand from near-luxury buyers.",
            imagePath: "/models/mercedes-benz-c-class-2015.jpg",
          },
          {
            yearStart: 2022,
            yearEnd: 9999,
            label: "W206",
            notes: "New generation. Growing demand.",
            imagePath: "/models/mercedes-benz-c-class-2022.jpg",
          },
        ],
      },
      {
        id: "e-class",
        name: "E-Class",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2016,
            label: "W212",
            notes: "Executive sedan. E350 most common. Watch for rust issues on lower body in Northern markets — less concern in Memphis. Luxury buyer on a budget target.",
            imagePath: "/models/mercedes-benz-e-class-2010.jpg",
          },
          {
            yearStart: 2017,
            yearEnd: 9999,
            label: "W213",
            notes: "Major redesign — class-defining interior. E300 and E350 most common. 4MATIC commands premium. High demand.",
            imagePath: "/models/mercedes-benz-e-class-2017.jpg",
          },
        ],
      },
      {
        id: "gle",
        name: "GLE / ML-Class",
        generations: [
          {
            yearStart: 2012,
            yearEnd: 2015,
            label: "ML-Class W166",
            notes: "Mid-size luxury SUV. ML350 most common. Moderate demand.",
            imagePath: "/models/mercedes-benz-gle-2012.jpg",
          },
          {
            yearStart: 2016,
            yearEnd: 2019,
            label: "GLE-Class W166",
            notes: "Rebranded as GLE. GLE350 and GLE400 most common. 4MATIC preferred. High demand.",
            imagePath: "/models/mercedes-benz-gle-2016.jpg",
          },
          {
            yearStart: 2020,
            yearEnd: 9999,
            label: "GLE-Class W167",
            notes: "Completely redesigned — new platform. GLE350 dominant. 7-seat option available. Very high demand.",
            imagePath: "/models/mercedes-benz-gle-2020.jpg",
          },
        ],
      },
      {
        id: "glc",
        name: "GLC",
        generations: [
          {
            yearStart: 2016,
            yearEnd: 2022,
            label: "X253 1st Gen",
            notes: "Replaced the GLK. GLC300 most common. 4MATIC standard on most. Strong demand from buyers wanting compact luxury SUV.",
            imagePath: "/models/mercedes-benz-glc-2016.jpg",
          },
          {
            yearStart: 2023,
            yearEnd: 9999,
            label: "X254 2nd Gen",
            notes: "New generation. High demand growing.",
            imagePath: "/models/mercedes-benz-glc-2023.jpg",
          },
        ],
      },
    ],
  },

  // 17. ACURA
  {
    id: "acura",
    name: "Acura",
    logoPath: "/logos/acura.svg",
    models: [
      {
        id: "tl-tlx",
        name: "TL / TLX",
        generations: [
          {
            yearStart: 2004,
            yearEnd: 2008,
            label: "TL 3rd Gen UA6",
            notes: "3.2L V6 — well-regarded. High supply. Good entry-level near-luxury car.",
            imagePath: "/models/acura-tl-tlx-2004.jpg",
          },
          {
            yearStart: 2009,
            yearEnd: 2014,
            label: "TL 4th Gen UA8",
            notes: "3.5L V6 standard, 3.7L SH-AWD preferred. Tech Package adds nav/safety — most desirable.",
            imagePath: "/models/acura-tl-tlx-2009.jpg",
          },
          {
            yearStart: 2015,
            yearEnd: 2020,
            label: "TLX 1st Gen UB1",
            notes: "Replaced TL. 2.4L or 3.5L V6. Tech and A-Spec trims most desirable. High demand from buyers who want near-luxury reliability.",
            imagePath: "/models/acura-tl-tlx-2015.jpg",
          },
          {
            yearStart: 2021,
            yearEnd: 9999,
            label: "TLX 2nd Gen",
            notes: "New platform. Turbocharged 2.0T only. Type S specialty buy.",
            imagePath: "/models/acura-tl-tlx-2021.jpg",
          },
        ],
      },
      {
        id: "mdx",
        name: "MDX",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2013,
            label: "2nd Gen YD2",
            notes: "3-row luxury SUV. Very reliable. SH-AWD preferred. High auction supply, strong steady demand.",
            imagePath: "/models/acura-mdx-2007.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2020,
            label: "3rd Gen YD3",
            notes: "Updated platform, improved tech. Advance and Tech Package most desirable. SH-AWD commands premium. Very high demand.",
            imagePath: "/models/acura-mdx-2014.jpg",
          },
          {
            yearStart: 2022,
            yearEnd: 9999,
            label: "4th Gen",
            notes: "New platform. High demand growing. Type S specialty buy.",
            imagePath: "/models/acura-mdx-2022.jpg",
          },
        ],
      },
      {
        id: "rdx",
        name: "RDX",
        generations: [
          {
            yearStart: 2013,
            yearEnd: 2018,
            label: "2nd Gen TB4",
            notes: "Compact luxury SUV. 3.5L V6 SH-AWD preferred. Technology Package most desirable. Steady demand.",
            imagePath: "/models/acura-rdx-2013.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "3rd Gen TC1",
            notes: "Completely redesigned — new A-Spec trim sportier. Turbocharged 2.0T. Very high demand — one of the best-used luxury compact SUV values.",
            imagePath: "/models/acura-rdx-2019.jpg",
          },
        ],
      },
      {
        id: "tsx-ilx",
        name: "TSX / ILX",
        generations: [
          {
            yearStart: 2009,
            yearEnd: 2014,
            label: "TSX 2nd Gen CU2",
            notes: "Near-luxury compact sedan. 4-cylinder base, V6 wagon specialty. Clean and reliable. Moderate steady demand.",
            imagePath: "/models/acura-tsx-ilx-2009.jpg",
          },
          {
            yearStart: 2013,
            yearEnd: 2022,
            label: "ILX 1st Gen DE2",
            notes: "Replaced TSX at lower price. Compact near-luxury sedan. Premium and A-Spec most desirable. Discontinued 2022 — tightening supply.",
            imagePath: "/models/acura-tsx-ilx-2013.jpg",
          },
        ],
      },
    ],
  },

  // 18. LEXUS
  {
    id: "lexus",
    name: "Lexus",
    logoPath: "/logos/lexus.svg",
    models: [
      {
        id: "es",
        name: "ES",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2012,
            label: "5th Gen XV40",
            notes: "Front-wheel-drive luxury sedan. Camry-based reliability. ES350 3.5L V6 dominant. Very reliable. High demand from buyers who want Toyota reliability with luxury badge.",
            imagePath: "/models/lexus-es-2007.jpg",
          },
          {
            yearStart: 2013,
            yearEnd: 2018,
            label: "6th Gen XV60",
            notes: "Sharp new spindle grille. ES300h Hybrid available — commands premium. Strong consistent demand.",
            imagePath: "/models/lexus-es-2013.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "7th Gen AXZH10",
            notes: "New platform. UX hybrid. F Sport trim growing. Very high demand.",
            imagePath: "/models/lexus-es-2019.jpg",
          },
        ],
      },
      {
        id: "rx",
        name: "RX",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2015,
            label: "3rd Gen AL10",
            notes: "Mid-size luxury SUV — Lexus's best-seller. RX350 most common. RX450h Hybrid commands premium. Very reliable — high demand at auction.",
            imagePath: "/models/lexus-rx-2010.jpg",
          },
          {
            yearStart: 2016,
            yearEnd: 2022,
            label: "4th Gen AL20",
            notes: "Aggressive new styling. RX350 and RX450h dominant. F Sport trim adds appeal. Very high auction demand — often trades strong.",
            imagePath: "/models/lexus-rx-2016.jpg",
          },
          {
            yearStart: 2023,
            yearEnd: 9999,
            label: "5th Gen AL30",
            notes: "New platform. Turbocharged only. High demand.",
            imagePath: "/models/lexus-rx-2023.jpg",
          },
        ],
      },
      {
        id: "is",
        name: "IS",
        generations: [
          {
            yearStart: 2006,
            yearEnd: 2013,
            label: "2nd Gen XE20",
            notes: "Sport sedan. IS250 and IS350 most common. AWD IS250 preferred. Reliable and fun to drive — strong demand from enthusiast buyers.",
            imagePath: "/models/lexus-is-2006.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2020,
            label: "3rd Gen XE30",
            notes: "Updated exterior. IS200t (turbo) added. IS300 and IS350 most desirable. F Sport trim strong demand and premium.",
            imagePath: "/models/lexus-is-2014.jpg",
          },
          {
            yearStart: 2021,
            yearEnd: 9999,
            label: "3rd Gen Facelift",
            notes: "Major front-end redesign. IS350 with V6 preferred. High demand — especially F Sport.",
            imagePath: "/models/lexus-is-2021.jpg",
          },
        ],
      },
      {
        id: "gx",
        name: "GX",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2013,
            label: "2nd Gen J150 Pre-refresh",
            notes: "Body-on-frame luxury SUV — one of the most reliable platforms ever. 4.6L V8 only. Premium 4WD buyers love this platform.",
            imagePath: "/models/lexus-gx-2010.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2023,
            label: "2nd Gen J150 Refresh",
            notes: "Updated interior and tech. GX460 Premium and Luxury most desirable. Commands strong premiums — holds value extremely well.",
            imagePath: "/models/lexus-gx-2014.jpg",
          },
          {
            yearStart: 2024,
            yearEnd: 9999,
            label: "3rd Gen J250",
            notes: "New platform. Very high demand.",
            imagePath: "/models/lexus-gx-2024.jpg",
          },
        ],
      },
      {
        id: "nx",
        name: "NX",
        generations: [
          {
            yearStart: 2015,
            yearEnd: 2021,
            label: "1st Gen AZ10",
            notes: "Compact luxury SUV. NX200t Turbo and NX300h Hybrid most common. F Sport trim preferred. Strong demand.",
            imagePath: "/models/lexus-nx-2015.jpg",
          },
          {
            yearStart: 2022,
            yearEnd: 9999,
            label: "2nd Gen AAZH20",
            notes: "New platform. Plug-in hybrid available. NX350 and NX350h most common. Very high demand.",
            imagePath: "/models/lexus-nx-2022.jpg",
          },
        ],
      },
    ],
  },

  // 19. INFINITI
  {
    id: "infiniti",
    name: "Infiniti",
    logoPath: "/logos/infiniti.svg",
    models: [
      {
        id: "g35-g37-q50",
        name: "G35 / G37 / Q50",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2008,
            label: "G35 V36",
            notes: "Sport sedan/coupe. 3.5L V6. Strong demand from buyers who want rear-wheel-drive sport sedan.",
            imagePath: "/models/infiniti-g35-g37-q50-2007.jpg",
          },
          {
            yearStart: 2009,
            yearEnd: 2013,
            label: "G37 V36",
            notes: "3.7L upgrade. Sport trim preferred. Coupe commands premium over sedan. Very desirable in enthusiast market.",
            imagePath: "/models/infiniti-g35-g37-q50-2009.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2017,
            label: "Q50 V37 1st Gen",
            notes: "Rebranded as Q50. Twin-turbo 3.0L in Q50S most desirable. Hybrid available. Watch for InTouch infotainment issues.",
            imagePath: "/models/infiniti-g35-g37-q50-2014.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 9999,
            label: "Q50 V37 Refresh",
            notes: "Updated exterior. Red Sport 400 high demand specialty trim. AWD preferred. Steady demand.",
            imagePath: "/models/infiniti-g35-g37-q50-2018.jpg",
          },
        ],
      },
      {
        id: "qx60",
        name: "QX60",
        generations: [
          {
            yearStart: 2013,
            yearEnd: 2020,
            label: "1st Gen L50",
            notes: "3-row luxury SUV. Pathfinder-based platform. CVT — same service history check. Premium and AWD most desirable. High demand from buyers wanting luxury 3-row at value price.",
            imagePath: "/models/infiniti-qx60-2013.jpg",
          },
          {
            yearStart: 2022,
            yearEnd: 9999,
            label: "2nd Gen L51",
            notes: "New platform, 9-speed auto replaces CVT. Much improved. Sensory and Autograph trims top demand.",
            imagePath: "/models/infiniti-qx60-2022.jpg",
          },
        ],
      },
      {
        id: "qx80",
        name: "QX80",
        generations: [
          {
            yearStart: 2013,
            yearEnd: 2016,
            label: "2nd Gen Z62 Pre-refresh",
            notes: "Full-size luxury SUV. 5.6L V8. Armada-based. Premium positioning. AWD commands premium.",
            imagePath: "/models/infiniti-qx80-2013.jpg",
          },
          {
            yearStart: 2017,
            yearEnd: 9999,
            label: "2nd Gen Z62 Refresh",
            notes: "Updated front end and interior. Luxe and Sensory highest demand. Strong demand from buyers wanting full-size luxury on a budget vs Escalade/Navigator.",
            imagePath: "/models/infiniti-qx80-2017.jpg",
          },
        ],
      },
      {
        id: "fx35-qx70",
        name: "FX35 / QX70",
        generations: [
          {
            yearStart: 2009,
            yearEnd: 2013,
            label: "FX35/50 2nd Gen S51",
            notes: "Sport crossover — distinctive shape. 3.5L and 5.0L V8. Enthusiast/style buyer niche. Moderate demand.",
            imagePath: "/models/infiniti-fx35-qx70-2009.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2017,
            label: "QX70",
            notes: "Rebranded FX. Same platform. Limited updates. Discontinued 2017 — tightening supply. Sport trim most desirable.",
            imagePath: "/models/infiniti-fx35-qx70-2014.jpg",
          },
        ],
      },
    ],
  },

  // 20. CADILLAC
  {
    id: "cadillac",
    name: "Cadillac",
    logoPath: "/logos/cadillac.svg",
    models: [
      {
        id: "cts",
        name: "CTS",
        generations: [
          {
            yearStart: 2008,
            yearEnd: 2013,
            label: "2nd Gen",
            notes: "Rear-wheel-drive sport luxury sedan. 3.0L and 3.6L V6. CTS-V specialty buy with V8. Strong demand in Southern markets.",
            imagePath: "/models/cadillac-cts-2008.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2019,
            label: "3rd Gen",
            notes: "New platform — significantly improved. Twin-turbo 2.0T base, 3.6L and V-Series. Vsport and V trim most desirable. Sedan and wagon variants. High demand.",
            imagePath: "/models/cadillac-cts-2014.jpg",
          },
        ],
      },
      {
        id: "ats",
        name: "ATS",
        generations: [
          {
            yearStart: 2013,
            yearEnd: 2018,
            label: "1st Gen (only)",
            notes: "Compact rear-wheel-drive luxury. Competed with BMW 3 Series. 2.0T Turbo most common. V6 and ATS-V specialty. Discontinued 2018 — steady moderate demand, tightening supply.",
            imagePath: "/models/cadillac-ats-2013.jpg",
          },
        ],
      },
      {
        id: "escalade",
        name: "Escalade",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2014,
            label: "3rd Gen GMT900",
            notes: "Full-size luxury SUV — the standard of the luxury truck segment. 6.2L V8 only. ESV (extended) brings premium. Very high demand — never sleeps at auction.",
            imagePath: "/models/cadillac-escalade-2007.jpg",
          },
          {
            yearStart: 2015,
            yearEnd: 2020,
            label: "4th Gen K2XX",
            notes: "Updated interior and tech. Magnetic Ride Control standard. Platinum most desirable. Very high demand and strong auction prices.",
            imagePath: "/models/cadillac-escalade-2015.jpg",
          },
          {
            yearStart: 2021,
            yearEnd: 9999,
            label: "5th Gen T1XX",
            notes: "Completely redesigned — OLED screens, independent rear suspension. Sport and Platinum command major premiums. Very high demand, very high acquisition cost.",
            imagePath: "/models/cadillac-escalade-2021.jpg",
          },
        ],
      },
      {
        id: "srx-xt5",
        name: "SRX / XT5",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2016,
            label: "SRX 2nd Gen",
            notes: "Mid-size luxury crossover. 3.6L V6. Performance and Premium trims most desirable. Strong consistent demand.",
            imagePath: "/models/cadillac-srx-xt5-2010.jpg",
          },
          {
            yearStart: 2017,
            yearEnd: 9999,
            label: "XT5",
            notes: "Replaced SRX. New platform, better interior. Platinum trim top of line. AWD preferred. Very high demand.",
            imagePath: "/models/cadillac-srx-xt5-2017.jpg",
          },
        ],
      },
      {
        id: "xts",
        name: "XTS",
        generations: [
          {
            yearStart: 2013,
            yearEnd: 2019,
            label: "1st Gen (only)",
            notes: "Full-size front-wheel-drive luxury sedan. Platinum and Vsport most desirable. Livery/town car buyers exist but declining. Moderate demand. Discontinued 2019.",
            imagePath: "/models/cadillac-xts-2013.jpg",
          },
        ],
      },
    ],
  },

  // 21. LINCOLN
  {
    id: "lincoln",
    name: "Lincoln",
    logoPath: "/logos/lincoln.svg",
    models: [
      {
        id: "mkz",
        name: "MKZ",
        generations: [
          {
            yearStart: 2013,
            yearEnd: 2016,
            label: "2nd Gen DF",
            notes: "Fusion-based luxury sedan. 2.0T EcoBoost or Hybrid most desirable. Distinctive grille styling. Moderate steady demand.",
            imagePath: "/models/lincoln-mkz-2013.jpg",
          },
          {
            yearStart: 2017,
            yearEnd: 2020,
            label: "2nd Gen Refresh",
            notes: "Updated front end. Reserve and Black Label trims top. Hybrid still popular. AWD available. Discontinued 2020. Steady demand from luxury sedan buyers.",
            imagePath: "/models/lincoln-mkz-2017.jpg",
          },
        ],
      },
      {
        id: "mkx-nautilus",
        name: "MKX / Nautilus",
        generations: [
          {
            yearStart: 2011,
            yearEnd: 2015,
            label: "MKX 2nd Gen",
            notes: "Mid-size luxury crossover. 3.7L V6. FWD and AWD. Moderate demand.",
            imagePath: "/models/lincoln-mkx-nautilus-2011.jpg",
          },
          {
            yearStart: 2016,
            yearEnd: 2018,
            label: "MKX 2nd Gen Refresh",
            notes: "Updated styling, EcoBoost 2.7L added. More desirable with turbo.",
            imagePath: "/models/lincoln-mkx-nautilus-2016.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "Nautilus",
            notes: "Rebranded as Nautilus. Much improved interior. Black Label trim. Reserve and Black Label highest demand. AWD preferred.",
            imagePath: "/models/lincoln-mkx-nautilus-2019.jpg",
          },
        ],
      },
      {
        id: "navigator",
        name: "Navigator",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2014,
            label: "3rd Gen U222",
            notes: "Full-size luxury SUV. 5.4L V8. Strong demand — luxury buyer who wants American iron. L (extended) commands premium.",
            imagePath: "/models/lincoln-navigator-2007.jpg",
          },
          {
            yearStart: 2015,
            yearEnd: 2017,
            label: "4th Gen U228",
            notes: "Updated — final year of this generation. Moderate updates. EcoBoost V6 replaced V8.",
            imagePath: "/models/lincoln-navigator-2015.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 9999,
            label: "5th Gen U553",
            notes: "Complete redesign — class-leading interior. 3.5L twin-turbo V6. Black Label highest demand. L (extended) commands premium. Reserve and Black Label move fastest. Very high demand — competes directly with Escalade.",
            imagePath: "/models/lincoln-navigator-2018.jpg",
          },
        ],
      },
      {
        id: "continental",
        name: "Continental",
        generations: [
          {
            yearStart: 2017,
            yearEnd: 2020,
            label: "10th Gen (only modern gen)",
            notes: "Full-size luxury sedan — brief revival of legendary nameplate. 2.7T and 3.0T engine options. Black Label most desirable. Limited production means tightening supply. Niche but loyal buyer base.",
            imagePath: "/models/lincoln-continental-2017.jpg",
          },
        ],
      },
      {
        id: "mkt",
        name: "MKT",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2019,
            label: "1st Gen (only)",
            notes: "3-row luxury crossover/wagon. Distinctive styling. 3.5L EcoBoost V6 preferred. Town Car replacement for livery — some fleet supply at auction. Niche demand.",
            imagePath: "/models/lincoln-mkt-2010.jpg",
          },
        ],
      },
    ],
  },

  // 22. MAZDA
  {
    id: "mazda",
    name: "Mazda",
    logoPath: "/logos/mazda.svg",
    models: [
      {
        id: "mazda3",
        name: "Mazda3",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2013,
            label: "2nd Gen BL",
            notes: "Compact car with driver-focused reputation. Reliable Skyactiv engines. High supply. Good value car.",
            imagePath: "/models/mazda-mazda3-2010.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2018,
            label: "3rd Gen BM/BN",
            notes: "Kodo design language — genuinely attractive compact. Skyactiv-G engine very reliable. i Touring and Grand Touring most common. High demand from quality-focused buyers.",
            imagePath: "/models/mazda-mazda3-2014.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "4th Gen BP",
            notes: "Premium compact car — upmarket move. Turbo available. Premium and Select trims most desirable. Strong growing demand.",
            imagePath: "/models/mazda-mazda3-2019.jpg",
          },
        ],
      },
      {
        id: "mazda6",
        name: "Mazda6",
        generations: [
          {
            yearStart: 2014,
            yearEnd: 2017,
            label: "3rd Gen GJ Pre-refresh",
            notes: "Sport sedan with genuine driver appeal. Skyactiv-G 2.5L. Grand Touring most desirable. Moderate demand.",
            imagePath: "/models/mazda-mazda6-2014.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 2021,
            label: "3rd Gen GJ Refresh",
            notes: "Turbo 2.5T added — Signature trim highly desirable. Premium positioning increasing. Discontinued in US 2021 — tightening supply.",
            imagePath: "/models/mazda-mazda6-2018.jpg",
          },
        ],
      },
      {
        id: "cx-5",
        name: "CX-5",
        generations: [
          {
            yearStart: 2013,
            yearEnd: 2016,
            label: "1st Gen KE",
            notes: "Compact crossover that raised the bar for the segment. Skyactiv-G 2.5L. AWD preferred. Strong consistent demand.",
            imagePath: "/models/mazda-cx-5-2013.jpg",
          },
          {
            yearStart: 2017,
            yearEnd: 2022,
            label: "2nd Gen KF",
            notes: "Significant refinement — near-luxury feel at mainstream price. Turbo 2.5T in Grand Touring Reserve and Signature. AWD most sought. Very high demand — one of best used crossover values.",
            imagePath: "/models/mazda-cx-5-2017.jpg",
          },
          {
            yearStart: 2023,
            yearEnd: 9999,
            label: "2nd Gen Refresh",
            notes: "Updated styling. Carbon Turbo trim new. High demand.",
            imagePath: "/models/mazda-cx-5-2023.jpg",
          },
        ],
      },
      {
        id: "cx-9",
        name: "CX-9",
        generations: [
          {
            yearStart: 2016,
            yearEnd: 2023,
            label: "2nd Gen TC",
            notes: "3-row SUV — turbocharged 2.5T only. Signature and Grand Touring most desirable. AWD preferred. Solid demand from buyers wanting Japanese reliability with premium feel.",
            imagePath: "/models/mazda-cx-9-2016.jpg",
          },
        ],
      },
      {
        id: "mx-5-miata",
        name: "MX-5 Miata",
        generations: [
          {
            yearStart: 2006,
            yearEnd: 2015,
            label: "3rd Gen NC",
            notes: "Roadster. Pure driving experience. Club and Grand Touring most desirable. Specialty/seasonal buy — demand varies by market.",
            imagePath: "/models/mazda-mx-5-miata-2006.jpg",
          },
          {
            yearStart: 2016,
            yearEnd: 9999,
            label: "4th Gen ND",
            notes: "Completely redesigned — lighter and sharper. RF (retractable fastback) available and commands premium. Sport and Club most common. Strong enthusiast demand.",
            imagePath: "/models/mazda-mx-5-miata-2016.jpg",
          },
        ],
      },
    ],
  },

  // 23. VOLKSWAGEN
  {
    id: "volkswagen",
    name: "Volkswagen",
    logoPath: "/logos/volkswagen.svg",
    models: [
      {
        id: "jetta",
        name: "Jetta",
        generations: [
          {
            yearStart: 2011,
            yearEnd: 2018,
            label: "6th Gen A6",
            notes: "High volume entry-level car. 1.4T and 2.0T most common. TDI Diesel had strong demand pre-emissions scandal — avoid Dieselgate-affected units or verify compliance. GLI sport trim preferred.",
            imagePath: "/models/volkswagen-jetta-2011.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "7th Gen A7",
            notes: "New platform. 1.4T base standard. SE and SEL most desirable. GLI still the performance pick. Moderate steady demand.",
            imagePath: "/models/volkswagen-jetta-2019.jpg",
          },
        ],
      },
      {
        id: "passat",
        name: "Passat",
        generations: [
          {
            yearStart: 2012,
            yearEnd: 2019,
            label: "US-market B7",
            notes: "American-market Passat — different from global version. 1.8T and V6 options. SE and SEL most common. Moderate demand.",
            imagePath: "/models/volkswagen-passat-2012.jpg",
          },
          {
            yearStart: 2020,
            yearEnd: 2022,
            label: "US-market B8",
            notes: "Final generation for US market. Discontinued in US after 2022. Clean units tightening in supply.",
            imagePath: "/models/volkswagen-passat-2020.jpg",
          },
        ],
      },
      {
        id: "tiguan",
        name: "Tiguan",
        generations: [
          {
            yearStart: 2009,
            yearEnd: 2017,
            label: "1st Gen 5N",
            notes: "Compact SUV. Reliable 2.0T turbo. SE most common. Moderate demand — grew with brand loyalty.",
            imagePath: "/models/volkswagen-tiguan-2009.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 9999,
            label: "2nd Gen AD1",
            notes: "Longer wheelbase adds 3rd row option. SE R-Line and SEL Premium most desirable. Stronger demand.",
            imagePath: "/models/volkswagen-tiguan-2018.jpg",
          },
        ],
      },
      {
        id: "atlas",
        name: "Atlas",
        generations: [
          {
            yearStart: 2018,
            yearEnd: 2023,
            label: "1st Gen CA1",
            notes: "3-row SUV. 2.0T or 3.6L V6 — V6 preferred for adequate performance. SE and SEL most common. AWD preferred for families. Moderate demand growing.",
            imagePath: "/models/volkswagen-atlas-2018.jpg",
          },
          {
            yearStart: 2024,
            yearEnd: 9999,
            label: "2nd Gen",
            notes: "New generation. Growing demand.",
            imagePath: "/models/volkswagen-atlas-2024.jpg",
          },
        ],
      },
      {
        id: "gti",
        name: "GTI",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2014,
            label: "6th Gen A6",
            notes: "Performance hatchback. 2.0T TSI. Enthusiast market — consistent strong demand for clean examples.",
            imagePath: "/models/volkswagen-gti-2010.jpg",
          },
          {
            yearStart: 2015,
            yearEnd: 2021,
            label: "7th Gen A7",
            notes: "Major refinement — best daily-driver hot hatch argument. SE and Autobahn trims most desirable. Very high demand.",
            imagePath: "/models/volkswagen-gti-2015.jpg",
          },
          {
            yearStart: 2022,
            yearEnd: 9999,
            label: "8th Gen",
            notes: "New generation. SE and Autobahn most common. Very high demand from enthusiast buyers.",
            imagePath: "/models/volkswagen-gti-2022.jpg",
          },
        ],
      },
    ],
  },

  // 24. AUDI
  {
    id: "audi",
    name: "Audi",
    logoPath: "/logos/audi.svg",
    models: [
      {
        id: "a4",
        name: "A4",
        generations: [
          {
            yearStart: 2009,
            yearEnd: 2016,
            label: "B8/B8.5",
            notes: "Compact luxury sedan. 2.0T TFSI. Quattro AWD preferred. Premium and Premium Plus most common. Watch for carbon buildup on direct-injection engine — factor into pricing.",
            imagePath: "/models/audi-a4-2009.jpg",
          },
          {
            yearStart: 2017,
            yearEnd: 9999,
            label: "B9",
            notes: "New platform — significant improvement. 2.0T with improved reliability. Premium Plus and Prestige most desirable. Quattro standard. High demand.",
            imagePath: "/models/audi-a4-2017.jpg",
          },
        ],
      },
      {
        id: "a6",
        name: "A6",
        generations: [
          {
            yearStart: 2012,
            yearEnd: 2018,
            label: "C7",
            notes: "Executive sedan. 2.0T and 3.0T TFSI. Supercharged 3.0T preferred for performance. Premium Plus most common.",
            imagePath: "/models/audi-a6-2012.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "C8",
            notes: "Complete redesign — class-leading tech. 3.0T 55 TFSI most desirable. Premium Plus standard equipment very high. High demand from executive buyer.",
            imagePath: "/models/audi-a6-2019.jpg",
          },
        ],
      },
      {
        id: "q5",
        name: "Q5",
        generations: [
          {
            yearStart: 2009,
            yearEnd: 2017,
            label: "1st Gen 8R",
            notes: "Luxury compact SUV. 2.0T Quattro most common. Premium Plus most desirable. Watch for timing chain on early 2.0T units. High demand.",
            imagePath: "/models/audi-q5-2009.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 9999,
            label: "2nd Gen FY",
            notes: "New platform — major improvement in luxury and tech. 2.0T standard. Prestige trim commands premium. SQ5 specialty buy. Very high demand.",
            imagePath: "/models/audi-q5-2018.jpg",
          },
        ],
      },
      {
        id: "q7",
        name: "Q7",
        generations: [
          {
            yearStart: 2007,
            yearEnd: 2015,
            label: "1st Gen 4L",
            notes: "3-row luxury SUV. 3.6L and 4.2L V8. TDI Diesel popular — verify Dieselgate compliance. Premium Plus most common.",
            imagePath: "/models/audi-q7-2007.jpg",
          },
          {
            yearStart: 2017,
            yearEnd: 9999,
            label: "2nd Gen 4M",
            notes: "Major redesign — lighter and more refined. 2.0T base, 3.0T preferred. Prestige and S-Line most desirable. Very high demand.",
            imagePath: "/models/audi-q7-2017.jpg",
          },
        ],
      },
      {
        id: "a3",
        name: "A3",
        generations: [
          {
            yearStart: 2015,
            yearEnd: 2020,
            label: "3rd Gen 8V",
            notes: "Entry-level luxury compact. 1.8T and 2.0T. e-tron PHEV available. Good value into the Audi brand. Premium and Premium Plus most common. Moderate steady demand.",
            imagePath: "/models/audi-a3-2015.jpg",
          },
          {
            yearStart: 2022,
            yearEnd: 9999,
            label: "4th Gen 8Y",
            notes: "New generation. 2.0T standard. Premium Plus most common. Growing demand as entry into Audi.",
            imagePath: "/models/audi-a3-2022.jpg",
          },
        ],
      },
    ],
  },

  // 25. MITSUBISHI
  {
    id: "mitsubishi",
    name: "Mitsubishi",
    logoPath: "/logos/mitsubishi.svg",
    models: [
      {
        id: "outlander",
        name: "Outlander",
        generations: [
          {
            yearStart: 2014,
            yearEnd: 2021,
            label: "3rd Gen GF/GG",
            notes: "Mid-size 3-row capable SUV. 2.4L or 3.0L V6. SE and SEL most common. Outlander Sport (subcompact) is a different model — make sure buyer knows the difference. PHEV version commands premium. Moderate demand.",
            imagePath: "/models/mitsubishi-outlander-2014.jpg",
          },
          {
            yearStart: 2022,
            yearEnd: 9999,
            label: "4th Gen",
            notes: "Complete redesign — huge improvement in quality and style. Ralliart and SEL most desirable. Growing demand significantly.",
            imagePath: "/models/mitsubishi-outlander-2022.jpg",
          },
        ],
      },
      {
        id: "eclipse-cross",
        name: "Eclipse Cross",
        generations: [
          {
            yearStart: 2018,
            yearEnd: 2021,
            label: "1st Gen GK",
            notes: "Compact crossover. 1.5T Turbo. LE and SE most common. Moderate demand — competes in crowded segment.",
            imagePath: "/models/mitsubishi-eclipse-cross-2018.jpg",
          },
          {
            yearStart: 2022,
            yearEnd: 9999,
            label: "1st Gen Refresh",
            notes: "Revised rear styling addresses earlier criticism. SE and SEL most desirable. Moderate steady demand.",
            imagePath: "/models/mitsubishi-eclipse-cross-2022.jpg",
          },
        ],
      },
      {
        id: "galant",
        name: "Galant",
        generations: [
          {
            yearStart: 2004,
            yearEnd: 2012,
            label: "9th Gen DJ",
            notes: "Mid-size sedan. Discontinued 2012. 2.4L 4-cylinder or 3.8L V6. ES and SE most common. Declining supply — older units age out. Budget buyer car.",
            imagePath: "/models/mitsubishi-galant-2004.jpg",
          },
        ],
      },
      {
        id: "lancer",
        name: "Lancer",
        generations: [
          {
            yearStart: 2008,
            yearEnd: 2016,
            label: "9th Gen CY/CZ",
            notes: "Compact sedan. DE and ES most common. Lancer Evolution (Evo) is specialty buy with strong enthusiast demand. Standard Lancer is basic transportation at budget price. Discontinued 2017.",
            imagePath: "/models/mitsubishi-lancer-2008.jpg",
          },
        ],
      },
    ],
  },

  // 26. VOLVO
  {
    id: "volvo",
    name: "Volvo",
    logoPath: "/logos/volvo.svg",
    models: [
      {
        id: "xc90",
        name: "XC90",
        generations: [
          {
            yearStart: 2003,
            yearEnd: 2014,
            label: "1st Gen C",
            notes: "3-row luxury SUV. 3.2L or 4-cylinder T6. Known for safety — loyal Volvo buyer follows this model. Parts can be expensive. Moderate demand from safety-conscious buyers.",
            imagePath: "/models/volvo-xc90-2003.jpg",
          },
          {
            yearStart: 2016,
            yearEnd: 9999,
            label: "2nd Gen L",
            notes: "Complete redesign on Scalable Platform Architecture. Supercharged/turbocharged T6 or T8 Plug-in Hybrid. Inscription trim most desirable. Very high demand — Volvo's halo product. T8 PHEV commands premium.",
            imagePath: "/models/volvo-xc90-2016.jpg",
          },
        ],
      },
      {
        id: "xc60",
        name: "XC60",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2017,
            label: "1st Gen DZ",
            notes: "Compact luxury SUV. T5 and T6 most common. Premier and Platinum trims. Strong Volvo brand loyalty demand.",
            imagePath: "/models/volvo-xc60-2010.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 9999,
            label: "2nd Gen UZ",
            notes: "New SPA platform. T5 and T6 AWD most common. Inscription trim most desirable. R-Design brings sport appeal. Very high demand from safety and luxury buyers.",
            imagePath: "/models/volvo-xc60-2018.jpg",
          },
        ],
      },
      {
        id: "s60",
        name: "S60",
        generations: [
          {
            yearStart: 2011,
            yearEnd: 2018,
            label: "2nd Gen FW",
            notes: "Compact luxury sedan. T5 and T6 AWD. Platinum and Inscription most desirable. Safety reputation drives moderate consistent demand.",
            imagePath: "/models/volvo-s60-2011.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "3rd Gen UZ",
            notes: "New SPA platform. T5 and T6 only — no V8. Inscription and R-Design most desirable. T8 Polestar Engineered specialty buy.",
            imagePath: "/models/volvo-s60-2019.jpg",
          },
        ],
      },
      {
        id: "v60",
        name: "V60",
        generations: [
          {
            yearStart: 2015,
            yearEnd: 2018,
            label: "1st Gen FW",
            notes: "Wagon body style — niche but very loyal buyer demographic. T5 and T6. Cross Country version adds SUV elements. Limited supply makes clean units valuable to right buyer.",
            imagePath: "/models/volvo-v60-2015.jpg",
          },
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "2nd Gen Z",
            notes: "New platform. Cross Country high demand from Subaru-like buyer who wants Swedish luxury. T5 AWD most common.",
            imagePath: "/models/volvo-v60-2019.jpg",
          },
        ],
      },
      {
        id: "xc40",
        name: "XC40",
        generations: [
          {
            yearStart: 2019,
            yearEnd: 9999,
            label: "1st Gen XK",
            notes: "Subcompact luxury SUV. T4 FWD and T5 AWD. R-Design most popular trim. Growing demand — Volvo's entry point into the brand. Recharge (fully electric) version growing.",
            imagePath: "/models/volvo-xc40-2019.jpg",
          },
        ],
      },
    ],
  },

  // 27. LAND ROVER
  {
    id: "land-rover",
    name: "Land Rover",
    logoPath: "/logos/land-rover.svg",
    models: [
      {
        id: "range-rover-sport",
        name: "Range Rover Sport",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2013,
            label: "1st Gen L320 Refresh",
            notes: "Supercharged V8 or HSE most common. Known for electrical and air suspension issues — factor high maintenance cost into max buy price. Specialty buyer who knows what they're getting into. Moderate demand.",
            imagePath: "/models/land-rover-range-rover-sport-2010.jpg",
          },
          {
            yearStart: 2014,
            yearEnd: 2017,
            label: "2nd Gen L494",
            notes: "New platform — significantly improved reliability over prior gen. 3.0L supercharged V6 and 5.0L V8. HSE and Autobiography most desirable. Higher demand from buyers who want the badge at a discount.",
            imagePath: "/models/land-rover-range-rover-sport-2014.jpg",
          },
          {
            yearStart: 2018,
            yearEnd: 9999,
            label: "2nd Gen L494 Refresh",
            notes: "Updated tech and PHEV option. P400e plug-in in growing demand. Autobiography Dynamic most desirable.",
            imagePath: "/models/land-rover-range-rover-sport-2018.jpg",
          },
        ],
      },
      {
        id: "discovery-lr4",
        name: "Discovery / LR4",
        generations: [
          {
            yearStart: 2010,
            yearEnd: 2016,
            label: "LR4 4th Gen L319",
            notes: "3-row body-on-frame luxury SUV. 5.0L V8 or 3.0L supercharged V6. High maintenance cost — air suspension and electronic issues common. Price buyer's max accordingly.",
            imagePath: "/models/land-rover-discovery-lr4-2010.jpg",
          },
          {
            yearStart: 2017,
            yearEnd: 9999,
            label: "Discovery 5th Gen L462",
            notes: "Completely redesigned. SE and HSE most common. More car-like platform. 3.0L V6 standard. Moderate growing demand from buyers who want unique 3-row.",
            imagePath: "/models/land-rover-discovery-lr4-2017.jpg",
          },
        ],
      },
      {
        id: "defender",
        name: "Defender",
        generations: [
          {
            yearStart: 2020,
            yearEnd: 9999,
            label: "New Defender L663",
            notes: "Complete revival of the legendary nameplate. 2.0T P300 base, 3.0T P400 preferred. 90 (2-door) and 110 (4-door) body styles. X-Dynamic HSE and above most desirable. High demand — especially for adventure/lifestyle buyers. P400 commands significant premium over base.",
            imagePath: "/models/land-rover-defender-2020.jpg",
          },
        ],
      },
    ],
  },
]

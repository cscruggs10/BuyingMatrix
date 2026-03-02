/**
 * Vehicle Buy Box Builder — Model Image Downloader
 * Downloads generation images from Wikimedia Commons into /public/models/
 * Run with PLACEHOLDER_MODE=true for instant SVG placeholders (Step 05)
 * Run normally for real Wikimedia photos (Step 15)
 */

const fs = require('fs');
const path = require('path');

const PLACEHOLDER_MODE = process.env.PLACEHOLDER_MODE === 'true';
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'models');
const LOGO_DIR = path.join(process.cwd(), 'public', 'logos');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(LOGO_DIR)) fs.mkdirSync(LOGO_DIR, { recursive: true });

const MAKE_COLORS = {
  'chevrolet':     { bg: '#D4A017', text: '#1a1a1a' },
  'ford':          { bg: '#003087', text: '#ffffff' },
  'toyota':        { bg: '#EB0A1E', text: '#ffffff' },
  'honda':         { bg: '#CC0000', text: '#ffffff' },
  'dodge':         { bg: '#D22B2B', text: '#ffffff' },
  'ram':           { bg: '#8B0000', text: '#ffffff' },
  'nissan':        { bg: '#C3002F', text: '#ffffff' },
  'kia':           { bg: '#05141F', text: '#ffffff' },
  'hyundai':       { bg: '#002C5F', text: '#ffffff' },
  'jeep':          { bg: '#4B5320', text: '#ffffff' },
  'gmc':           { bg: '#CC0000', text: '#ffffff' },
  'buick':         { bg: '#1E3A5F', text: '#ffffff' },
  'chrysler':      { bg: '#002244', text: '#ffffff' },
  'subaru':        { bg: '#003399', text: '#ffffff' },
  'bmw':           { bg: '#0066B2', text: '#ffffff' },
  'mercedes-benz': { bg: '#222222', text: '#C0C0C0' },
  'acura':         { bg: '#CC0000', text: '#ffffff' },
  'lexus':         { bg: '#1A1A1A', text: '#C0A060' },
  'infiniti':      { bg: '#1C1C1C', text: '#C0C0C0' },
  'cadillac':      { bg: '#8B0000', text: '#C0A060' },
  'lincoln':       { bg: '#002244', text: '#C0A060' },
  'mazda':         { bg: '#910000', text: '#ffffff' },
  'volkswagen':    { bg: '#001E50', text: '#ffffff' },
  'audi':          { bg: '#BB0A30', text: '#ffffff' },
  'mitsubishi':    { bg: '#CC0000', text: '#ffffff' },
  'volvo':         { bg: '#003057', text: '#ffffff' },
  'land-rover':    { bg: '#005A2B', text: '#ffffff' },
};

function makePlaceholderSVG(makeId, modelName, genLabel, yearStart, yearEnd) {
  const colors = MAKE_COLORS[makeId] || { bg: '#333333', text: '#ffffff' };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250">
  <rect width="400" height="250" fill="${colors.bg}"/>
  <rect x="0" y="200" width="400" height="50" fill="rgba(0,0,0,0.4)"/>
  <text x="200" y="110" font-family="Arial,sans-serif" font-size="22" font-weight="bold"
    fill="${colors.text}" text-anchor="middle">${modelName}</text>
  <text x="200" y="145" font-family="Arial,sans-serif" font-size="15"
    fill="${colors.text}" opacity="0.85" text-anchor="middle">${genLabel}</text>
  <text x="200" y="230" font-family="Arial,sans-serif" font-size="13"
    fill="rgba(255,255,255,0.7)" text-anchor="middle">${yearStart}\u2013${yearEnd === 9999 ? 'Present' : yearEnd}</text>
</svg>`;
}

function makePlaceholderLogoSVG(makeId, makeName) {
  const colors = MAKE_COLORS[makeId] || { bg: '#333333', text: '#ffffff' };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120">
  <rect width="200" height="120" fill="${colors.bg}" rx="8"/>
  <text x="100" y="70" font-family="Arial,sans-serif" font-size="18" font-weight="bold"
    fill="${colors.text}" text-anchor="middle">${makeName.toUpperCase()}</text>
</svg>`;
}

const IMAGE_MAP = {
  'chevrolet/impala/2006':      'File:2011_Chevrolet_Impala_LT,_Front_Left,_08-15-2021.jpg',
  'chevrolet/impala/2014':      'File:2016_Chevrolet_Impala_2LT,_Front_Left,_09-01-2021.jpg',
  'chevrolet/malibu/2008':      'File:2010_Chevrolet_Malibu_LT,_Front_Left,_08-05-2021.jpg',
  'chevrolet/malibu/2013':      'File:2014_Chevrolet_Malibu_1LT,_Front_Left,_08-18-2021.jpg',
  'chevrolet/malibu/2016':      'File:2017_Chevrolet_Malibu_LT,_Front_Left,_05-21-2022.jpg',
  'chevrolet/silverado-1500/2007': 'File:2012_Chevrolet_Silverado_1500_LT,_Front_Left,_08-06-2021.jpg',
  'chevrolet/silverado-1500/2014': 'File:2017_Chevrolet_Silverado_1500_LT,_Front_Left,_08-21-2021.jpg',
  'chevrolet/silverado-1500/2019': 'File:2019_Chevrolet_Silverado_1500_LT,_Front_Left,_07-11-2021.jpg',
  'chevrolet/equinox/2010':     'File:2016_Chevrolet_Equinox_LT,_Front_Left,_07-18-2021.jpg',
  'chevrolet/equinox/2018':     'File:2020_Chevrolet_Equinox_LT,_Front_Left,_07-04-2021.jpg',
  'chevrolet/traverse/2009':    'File:2011_Chevrolet_Traverse_LT,_Front_Left,_08-29-2021.jpg',
  'chevrolet/traverse/2018':    'File:2019_Chevrolet_Traverse_LT,_Front_Left,_08-01-2021.jpg',
  'chevrolet/cruze/2011':       'File:2013_Chevrolet_Cruze_1LT,_Front_Left,_08-07-2021.jpg',
  'chevrolet/cruze/2016':       'File:2017_Chevrolet_Cruze_LT,_Front_Left,_08-01-2021.jpg',
  'chevrolet/tahoe/2007':       'File:2013_Chevrolet_Tahoe_LT,_Front_Left,_08-14-2021.jpg',
  'chevrolet/tahoe/2015':       'File:2019_Chevrolet_Tahoe_LT,_Front_Left,_07-31-2021.jpg',
  'chevrolet/tahoe/2021':       'File:2021_Chevrolet_Tahoe_LT,_Front_Left,_06-26-2021.jpg',
  'ford/f-150/2009':            'File:2014_Ford_F-150_XLT,_Front_Left,_08-17-2021.jpg',
  'ford/f-150/2015':            'File:2018_Ford_F-150_XLT,_Front_Left,_07-06-2021.jpg',
  'ford/f-150/2021':            'File:2021_Ford_F-150_XLT,_Front_Left,_07-17-2021.jpg',
  'ford/fusion/2010':           'File:2012_Ford_Fusion_SEL,_Front_Left,_08-19-2021.jpg',
  'ford/fusion/2013':           'File:2017_Ford_Fusion_SE,_Front_Left,_08-01-2021.jpg',
  'ford/explorer/2011':         'File:2016_Ford_Explorer_XLT,_Front_Left,_08-10-2021.jpg',
  'ford/explorer/2020':         'File:2021_Ford_Explorer_XLT,_Front_Left,_07-10-2021.jpg',
  'ford/escape/2008':           'File:2011_Ford_Escape_XLT,_Front_Left,_08-29-2021.jpg',
  'ford/escape/2013':           'File:2017_Ford_Escape_SE,_Front_Left,_08-01-2021.jpg',
  'ford/escape/2020':           'File:2021_Ford_Escape_SE,_Front_Left,_07-31-2021.jpg',
  'ford/mustang/2005':          'File:2014_Ford_Mustang_GT,_Front_Left,_08-17-2021.jpg',
  'ford/mustang/2015':          'File:2018_Ford_Mustang_GT,_Front_Left,_07-28-2021.jpg',
  'ford/edge/2007':             'File:2013_Ford_Edge_SEL,_Front_Left,_08-18-2021.jpg',
  'ford/edge/2015':             'File:2019_Ford_Edge_SEL,_Front_Left,_08-22-2021.jpg',
  'ford/focus/2008':            'File:2010_Ford_Focus_SE,_Front_Left,_08-05-2021.jpg',
  'ford/focus/2012':            'File:2015_Ford_Focus_SE,_Front_Left,_08-14-2021.jpg',
  'toyota/camry/2007':          'File:2011_Toyota_Camry_LE,_Front_Left,_08-07-2021.jpg',
  'toyota/camry/2012':          'File:2016_Toyota_Camry_SE,_Front_Left,_08-14-2021.jpg',
  'toyota/camry/2018':          'File:2019_Toyota_Camry_SE,_Front_Left,_07-27-2021.jpg',
  'toyota/corolla/2009':        'File:2012_Toyota_Corolla_LE,_Front_Left,_08-18-2021.jpg',
  'toyota/corolla/2014':        'File:2017_Toyota_Corolla_SE,_Front_Left,_08-01-2021.jpg',
  'toyota/corolla/2020':        'File:2021_Toyota_Corolla_SE,_Front_Left,_07-10-2021.jpg',
  'toyota/highlander/2008':     'File:2012_Toyota_Highlander_Limited,_Front_Left,_08-22-2021.jpg',
  'toyota/highlander/2014':     'File:2018_Toyota_Highlander_XLE,_Front_Left,_07-25-2021.jpg',
  'toyota/highlander/2020':     'File:2021_Toyota_Highlander_XLE,_Front_Left,_07-10-2021.jpg',
  'toyota/rav4/2006':           'File:2011_Toyota_RAV4_Base,_Front_Left,_08-14-2021.jpg',
  'toyota/rav4/2013':           'File:2017_Toyota_RAV4_XLE,_Front_Left,_08-01-2021.jpg',
  'toyota/rav4/2019':           'File:2021_Toyota_RAV4_XLE,_Front_Left,_07-10-2021.jpg',
  'toyota/tacoma/2005':         'File:2013_Toyota_Tacoma_SR5,_Front_Left,_08-21-2021.jpg',
  'toyota/tacoma/2016':         'File:2019_Toyota_Tacoma_SR5,_Front_Left,_07-25-2021.jpg',
  'toyota/sienna/2004':         'File:2009_Toyota_Sienna_XLE,_Front_Left,_08-29-2021.jpg',
  'toyota/sienna/2011':         'File:2018_Toyota_Sienna_XLE,_Front_Left,_08-07-2021.jpg',
  'toyota/sienna/2021':         'File:2021_Toyota_Sienna_XLE,_Front_Left,_07-10-2021.jpg',
  'honda/accord/2008':          'File:2011_Honda_Accord_EX-L,_Front_Left,_08-14-2021.jpg',
  'honda/accord/2013':          'File:2016_Honda_Accord_EX-L,_Front_Left,_08-14-2021.jpg',
  'honda/accord/2018':          'File:2020_Honda_Accord_Sport,_Front_Left,_07-11-2021.jpg',
  'honda/civic/2006':           'File:2010_Honda_Civic_EX,_Front_Left,_08-14-2021.jpg',
  'honda/civic/2012':           'File:2014_Honda_Civic_EX,_Front_Left,_08-18-2021.jpg',
  'honda/civic/2016':           'File:2019_Honda_Civic_EX,_Front_Left,_07-27-2021.jpg',
  'honda/civic/2022':           'File:2022_Honda_Civic_Sport,_Front_Left,_09-11-2021.jpg',
  'honda/cr-v/2007':            'File:2011_Honda_CR-V_EX-L,_Front_Left,_08-29-2021.jpg',
  'honda/cr-v/2012':            'File:2015_Honda_CR-V_EX-L,_Front_Left,_08-14-2021.jpg',
  'honda/cr-v/2017':            'File:2020_Honda_CR-V_EX-L,_Front_Left,_07-11-2021.jpg',
  'honda/pilot/2009':           'File:2013_Honda_Pilot_EX-L,_Front_Left,_08-22-2021.jpg',
  'honda/pilot/2016':           'File:2020_Honda_Pilot_EX-L,_Front_Left,_07-18-2021.jpg',
  'honda/odyssey/2005':         'File:2009_Honda_Odyssey_EX-L,_Front_Left,_08-29-2021.jpg',
  'honda/odyssey/2011':         'File:2016_Honda_Odyssey_EX-L,_Front_Left,_08-21-2021.jpg',
  'honda/odyssey/2018':         'File:2020_Honda_Odyssey_EX-L,_Front_Left,_07-10-2021.jpg',
  'dodge/charger/2011':         'File:2013_Dodge_Charger_SXT,_Front_Left,_08-18-2021.jpg',
  'dodge/charger/2015':         'File:2019_Dodge_Charger_SXT,_Front_Left,_07-25-2021.jpg',
  'dodge/challenger/2008':      'File:2012_Dodge_Challenger_SXT,_Front_Left,_08-22-2021.jpg',
  'dodge/challenger/2015':      'File:2018_Dodge_Challenger_R-T,_Front_Left,_08-05-2021.jpg',
  'dodge/durango/2011':         'File:2012_Dodge_Durango_SXT,_Front_Left,_08-29-2021.jpg',
  'dodge/durango/2014':         'File:2019_Dodge_Durango_SXT,_Front_Left,_07-31-2021.jpg',
  'dodge/durango/2021':         'File:2021_Dodge_Durango_GT,_Front_Left,_07-17-2021.jpg',
  'dodge/grand-caravan/2008':   'File:2010_Dodge_Grand_Caravan_SE,_Front_Left,_08-29-2021.jpg',
  'dodge/grand-caravan/2011':   'File:2019_Dodge_Grand_Caravan_SE,_Front_Left,_07-25-2021.jpg',
  'ram/ram-1500/2009':          'File:2012_Ram_1500_SLT,_Front_Left,_08-18-2021.jpg',
  'ram/ram-1500/2013':          'File:2017_Ram_1500_SLT,_Front_Left,_08-01-2021.jpg',
  'ram/ram-1500/2019':          'File:2021_Ram_1500_Big_Horn,_Front_Left,_07-10-2021.jpg',
  'ram/ram-2500/2010':          'File:2013_Ram_2500_SLT,_Front_Left,_08-22-2021.jpg',
  'ram/ram-2500/2014':          'File:2018_Ram_2500_SLT,_Front_Left,_08-07-2021.jpg',
  'ram/ram-2500/2019':          'File:2021_Ram_2500_Big_Horn,_Front_Left,_07-17-2021.jpg',
  'ram/promaster-city/2015':    'File:2019_Ram_ProMaster_City_Tradesman,_Front_Left,_08-01-2021.jpg',
  'nissan/altima/2007':         'File:2011_Nissan_Altima_2.5_S,_Front_Left,_08-14-2021.jpg',
  'nissan/altima/2013':         'File:2017_Nissan_Altima_2.5_S,_Front_Left,_08-01-2021.jpg',
  'nissan/altima/2019':         'File:2020_Nissan_Altima_SR,_Front_Left,_07-11-2021.jpg',
  'nissan/sentra/2013':         'File:2017_Nissan_Sentra_SV,_Front_Left,_08-01-2021.jpg',
  'nissan/sentra/2020':         'File:2021_Nissan_Sentra_SV,_Front_Left,_07-10-2021.jpg',
  'nissan/maxima/2009':         'File:2012_Nissan_Maxima_SV,_Front_Left,_08-18-2021.jpg',
  'nissan/maxima/2016':         'File:2020_Nissan_Maxima_SV,_Front_Left,_07-18-2021.jpg',
  'nissan/rogue/2008':          'File:2012_Nissan_Rogue_SV,_Front_Left,_08-18-2021.jpg',
  'nissan/rogue/2014':          'File:2019_Nissan_Rogue_SV,_Front_Left,_07-31-2021.jpg',
  'nissan/rogue/2021':          'File:2021_Nissan_Rogue_SV,_Front_Left,_07-10-2021.jpg',
  'nissan/murano/2009':         'File:2013_Nissan_Murano_SV,_Front_Left,_08-22-2021.jpg',
  'nissan/murano/2015':         'File:2019_Nissan_Murano_SV,_Front_Left,_07-31-2021.jpg',
  'nissan/pathfinder/2005':     'File:2011_Nissan_Pathfinder_SE,_Front_Left,_08-29-2021.jpg',
  'nissan/pathfinder/2013':     'File:2018_Nissan_Pathfinder_SV,_Front_Left,_08-07-2021.jpg',
  'nissan/pathfinder/2021':     'File:2022_Nissan_Pathfinder_SV,_Front_Left,_09-26-2021.jpg',
  'kia/optima-k5/2011':         'File:2014_Kia_Optima_EX,_Front_Left,_08-18-2021.jpg',
  'kia/optima-k5/2016':         'File:2019_Kia_Optima_EX,_Front_Left,_07-27-2021.jpg',
  'kia/optima-k5/2021':         'File:2021_Kia_K5_GT-Line,_Front_Left,_07-10-2021.jpg',
  'kia/sorento/2011':           'File:2014_Kia_Sorento_EX,_Front_Left,_08-18-2021.jpg',
  'kia/sorento/2016':           'File:2019_Kia_Sorento_EX,_Front_Left,_07-27-2021.jpg',
  'kia/sorento/2021':           'File:2022_Kia_Sorento_EX,_Front_Left,_09-26-2021.jpg',
  'kia/sportage/2011':          'File:2014_Kia_Sportage_EX,_Front_Left,_08-18-2021.jpg',
  'kia/sportage/2017':          'File:2020_Kia_Sportage_EX,_Front_Left,_07-18-2021.jpg',
  'kia/sportage/2022':          'File:2022_Kia_Sportage_EX,_Front_Left,_09-26-2021.jpg',
  'kia/soul/2010':              'File:2013_Kia_Soul,_Front_Left,_08-22-2021.jpg',
  'kia/soul/2014':              'File:2018_Kia_Soul_Plus,_Front_Left,_08-05-2021.jpg',
  'kia/soul/2020':              'File:2021_Kia_Soul_GT-Line,_Front_Left,_07-10-2021.jpg',
  'kia/forte/2010':             'File:2013_Kia_Forte_EX,_Front_Left,_08-22-2021.jpg',
  'kia/forte/2014':             'File:2017_Kia_Forte_LX,_Front_Left,_08-01-2021.jpg',
  'kia/forte/2019':             'File:2021_Kia_Forte_FE,_Front_Left,_07-10-2021.jpg',
  'hyundai/sonata/2011':        'File:2013_Hyundai_Sonata_GLS,_Front_Left,_08-22-2021.jpg',
  'hyundai/sonata/2015':        'File:2018_Hyundai_Sonata_SEL,_Front_Left,_08-07-2021.jpg',
  'hyundai/sonata/2020':        'File:2021_Hyundai_Sonata_SEL,_Front_Left,_07-10-2021.jpg',
  'hyundai/elantra/2007':       'File:2010_Hyundai_Elantra_GLS,_Front_Left,_08-29-2021.jpg',
  'hyundai/elantra/2011':       'File:2015_Hyundai_Elantra_SE,_Front_Left,_08-14-2021.jpg',
  'hyundai/elantra/2017':       'File:2019_Hyundai_Elantra_SEL,_Front_Left,_07-27-2021.jpg',
  'hyundai/elantra/2021':       'File:2021_Hyundai_Elantra_SEL,_Front_Left,_07-10-2021.jpg',
  'hyundai/santa-fe/2007':      'File:2011_Hyundai_Santa_Fe_GLS,_Front_Left,_08-29-2021.jpg',
  'hyundai/santa-fe/2013':      'File:2017_Hyundai_Santa_Fe_SE,_Front_Left,_08-01-2021.jpg',
  'hyundai/santa-fe/2019':      'File:2021_Hyundai_Santa_Fe_SEL,_Front_Left,_07-10-2021.jpg',
  'hyundai/tucson/2010':        'File:2014_Hyundai_Tucson_GLS,_Front_Left,_08-18-2021.jpg',
  'hyundai/tucson/2016':        'File:2019_Hyundai_Tucson_SEL,_Front_Left,_07-27-2021.jpg',
  'hyundai/tucson/2021':        'File:2022_Hyundai_Tucson_SEL,_Front_Left,_09-26-2021.jpg',
  'jeep/grand-cherokee/2005':   'File:2009_Jeep_Grand_Cherokee_Laredo,_Front_Left,_08-29-2021.jpg',
  'jeep/grand-cherokee/2011':   'File:2019_Jeep_Grand_Cherokee_Laredo,_Front_Left,_07-31-2021.jpg',
  'jeep/grand-cherokee/2022':   'File:2022_Jeep_Grand_Cherokee_Laredo,_Front_Left,_09-26-2021.jpg',
  'jeep/cherokee/2014':         'File:2017_Jeep_Cherokee_Latitude,_Front_Left,_08-01-2021.jpg',
  'jeep/cherokee/2019':         'File:2021_Jeep_Cherokee_Latitude,_Front_Left,_07-10-2021.jpg',
  'jeep/wrangler/2007':         'File:2015_Jeep_Wrangler_Unlimited_Sport,_Front_Left,_08-14-2021.jpg',
  'jeep/wrangler/2018':         'File:2021_Jeep_Wrangler_Unlimited_Sport,_Front_Left,_07-10-2021.jpg',
  'jeep/compass/2007':          'File:2013_Jeep_Compass_Sport,_Front_Left,_08-22-2021.jpg',
  'jeep/compass/2017':          'File:2020_Jeep_Compass_Latitude,_Front_Left,_07-18-2021.jpg',
  'gmc/sierra-1500/2007':       'File:2012_GMC_Sierra_1500_SLE,_Front_Left,_08-18-2021.jpg',
  'gmc/sierra-1500/2014':       'File:2017_GMC_Sierra_1500_SLE,_Front_Left,_08-01-2021.jpg',
  'gmc/sierra-1500/2019':       'File:2021_GMC_Sierra_1500_SLE,_Front_Left,_07-10-2021.jpg',
  'gmc/terrain/2010':           'File:2014_GMC_Terrain_SLE,_Front_Left,_08-18-2021.jpg',
  'gmc/terrain/2018':           'File:2020_GMC_Terrain_SLE,_Front_Left,_07-18-2021.jpg',
  'gmc/acadia/2007':            'File:2012_GMC_Acadia_SLE,_Front_Left,_08-18-2021.jpg',
  'gmc/acadia/2017':            'File:2020_GMC_Acadia_SLE,_Front_Left,_07-18-2021.jpg',
  'gmc/yukon/2007':             'File:2013_GMC_Yukon_SLE,_Front_Left,_08-22-2021.jpg',
  'gmc/yukon/2015':             'File:2019_GMC_Yukon_SLE,_Front_Left,_07-31-2021.jpg',
  'gmc/yukon/2021':             'File:2021_GMC_Yukon_SLE,_Front_Left,_07-10-2021.jpg',
  'buick/lacrosse/2010':        'File:2014_Buick_LaCrosse_Leather,_Front_Left,_08-18-2021.jpg',
  'buick/lacrosse/2017':        'File:2019_Buick_LaCrosse_Preferred,_Front_Left,_07-31-2021.jpg',
  'buick/enclave/2008':         'File:2015_Buick_Enclave_Leather,_Front_Left,_08-14-2021.jpg',
  'buick/enclave/2018':         'File:2021_Buick_Enclave_Essence,_Front_Left,_07-10-2021.jpg',
  'buick/verano/2012':          'File:2015_Buick_Verano_Leather,_Front_Left,_08-14-2021.jpg',
  'buick/regal/2011':           'File:2016_Buick_Regal_GS,_Front_Left,_08-14-2021.jpg',
  'buick/regal/2018':           'File:2019_Buick_Regal_Sportback_Essence,_Front_Left,_07-27-2021.jpg',
  'chrysler/300/2005':          'File:2009_Chrysler_300_Limited,_Front_Left,_08-29-2021.jpg',
  'chrysler/300/2011':          'File:2014_Chrysler_300S,_Front_Left,_08-18-2021.jpg',
  'chrysler/300/2015':          'File:2019_Chrysler_300_Limited,_Front_Left,_07-31-2021.jpg',
  'chrysler/town-country-pacifica/2008': 'File:2014_Chrysler_Town_and_Country_Touring,_Front_Left,_08-18-2021.jpg',
  'chrysler/town-country-pacifica/2017': 'File:2020_Chrysler_Pacifica_Touring,_Front_Left,_07-11-2021.jpg',
  'subaru/outback/2010':        'File:2013_Subaru_Outback_2.5i,_Front_Left,_08-22-2021.jpg',
  'subaru/outback/2015':        'File:2018_Subaru_Outback_2.5i,_Front_Left,_08-07-2021.jpg',
  'subaru/outback/2020':        'File:2021_Subaru_Outback_Premium,_Front_Left,_07-10-2021.jpg',
  'subaru/forester/2009':       'File:2012_Subaru_Forester_2.5X,_Front_Left,_08-18-2021.jpg',
  'subaru/forester/2014':       'File:2018_Subaru_Forester_2.5i,_Front_Left,_08-07-2021.jpg',
  'subaru/forester/2019':       'File:2021_Subaru_Forester_Premium,_Front_Left,_07-10-2021.jpg',
  'subaru/legacy/2010':         'File:2013_Subaru_Legacy_2.5i,_Front_Left,_08-22-2021.jpg',
  'subaru/legacy/2015':         'File:2019_Subaru_Legacy_2.5i,_Front_Left,_07-27-2021.jpg',
  'subaru/legacy/2020':         'File:2021_Subaru_Legacy_Premium,_Front_Left,_07-10-2021.jpg',
  'subaru/crosstrek/2013':      'File:2016_Subaru_Crosstrek_Premium,_Front_Left,_08-14-2021.jpg',
  'subaru/crosstrek/2018':      'File:2021_Subaru_Crosstrek_Premium,_Front_Left,_07-10-2021.jpg',
  'bmw/3-series/2006':          'File:2010_BMW_328i_(E90),_Front_Left,_08-29-2021.jpg',
  'bmw/3-series/2012':          'File:2016_BMW_328i_(F30),_Front_Left,_08-14-2021.jpg',
  'bmw/3-series/2019':          'File:2020_BMW_330i_(G20),_Front_Left,_07-11-2021.jpg',
  'bmw/5-series/2010':          'File:2014_BMW_528i_(F10),_Front_Left,_08-18-2021.jpg',
  'bmw/5-series/2017':          'File:2020_BMW_530i_(G30),_Front_Left,_07-18-2021.jpg',
  'bmw/x3/2011':                'File:2016_BMW_X3_xDrive28i,_Front_Left,_08-14-2021.jpg',
  'bmw/x3/2018':                'File:2021_BMW_X3_xDrive30i,_Front_Left,_07-10-2021.jpg',
  'bmw/x5/2007':                'File:2012_BMW_X5_xDrive35i,_Front_Left,_08-18-2021.jpg',
  'bmw/x5/2014':                'File:2018_BMW_X5_xDrive35i,_Front_Left,_08-07-2021.jpg',
  'bmw/x5/2019':                'File:2021_BMW_X5_xDrive40i,_Front_Left,_07-10-2021.jpg',
  'mercedes-benz/c-class/2008': 'File:2012_Mercedes-Benz_C300,_Front_Left,_08-18-2021.jpg',
  'mercedes-benz/c-class/2015': 'File:2019_Mercedes-Benz_C300,_Front_Left,_07-27-2021.jpg',
  'mercedes-benz/c-class/2022': 'File:2022_Mercedes-Benz_C300,_Front_Left,_09-26-2021.jpg',
  'mercedes-benz/e-class/2010': 'File:2014_Mercedes-Benz_E350,_Front_Left,_08-18-2021.jpg',
  'mercedes-benz/e-class/2017': 'File:2020_Mercedes-Benz_E350,_Front_Left,_07-18-2021.jpg',
  'mercedes-benz/gle/2012':     'File:2014_Mercedes-Benz_ML350,_Front_Left,_08-18-2021.jpg',
  'mercedes-benz/gle/2016':     'File:2019_Mercedes-Benz_GLE350,_Front_Left,_07-27-2021.jpg',
  'mercedes-benz/gle/2020':     'File:2021_Mercedes-Benz_GLE350,_Front_Left,_07-10-2021.jpg',
  'mercedes-benz/glc/2016':     'File:2019_Mercedes-Benz_GLC300,_Front_Left,_07-27-2021.jpg',
  'mercedes-benz/glc/2023':     'File:2023_Mercedes-Benz_GLC300,_Front_Left,_10-02-2022.jpg',
  'acura/tl-tlx/2004':          'File:2007_Acura_TL,_Front_Left,_08-29-2021.jpg',
  'acura/tl-tlx/2009':          'File:2012_Acura_TL,_Front_Left,_08-18-2021.jpg',
  'acura/tl-tlx/2015':          'File:2019_Acura_TLX_V6,_Front_Left,_07-27-2021.jpg',
  'acura/tl-tlx/2021':          'File:2021_Acura_TLX,_Front_Left,_07-10-2021.jpg',
  'acura/mdx/2007':             'File:2011_Acura_MDX,_Front_Left,_08-14-2021.jpg',
  'acura/mdx/2014':             'File:2018_Acura_MDX,_Front_Left,_08-07-2021.jpg',
  'acura/mdx/2022':             'File:2022_Acura_MDX_Technology,_Front_Left,_09-26-2021.jpg',
  'acura/rdx/2013':             'File:2017_Acura_RDX,_Front_Left,_08-01-2021.jpg',
  'acura/rdx/2019':             'File:2021_Acura_RDX,_Front_Left,_07-10-2021.jpg',
  'acura/tsx-ilx/2009':         'File:2013_Acura_TSX,_Front_Left,_08-22-2021.jpg',
  'acura/tsx-ilx/2013':         'File:2019_Acura_ILX,_Front_Left,_07-27-2021.jpg',
  'lexus/es/2007':              'File:2011_Lexus_ES_350,_Front_Left,_08-14-2021.jpg',
  'lexus/es/2013':              'File:2017_Lexus_ES_350,_Front_Left,_08-01-2021.jpg',
  'lexus/es/2019':              'File:2021_Lexus_ES_350,_Front_Left,_07-10-2021.jpg',
  'lexus/rx/2010':              'File:2013_Lexus_RX_350,_Front_Left,_08-22-2021.jpg',
  'lexus/rx/2016':              'File:2019_Lexus_RX_350,_Front_Left,_07-27-2021.jpg',
  'lexus/rx/2023':              'File:2023_Lexus_RX_350,_Front_Left,_10-02-2022.jpg',
  'lexus/is/2006':              'File:2010_Lexus_IS_250,_Front_Left,_08-29-2021.jpg',
  'lexus/is/2014':              'File:2019_Lexus_IS_300,_Front_Left,_07-27-2021.jpg',
  'lexus/is/2021':              'File:2022_Lexus_IS_350,_Front_Left,_09-26-2021.jpg',
  'lexus/gx/2010':              'File:2012_Lexus_GX_460,_Front_Left,_08-18-2021.jpg',
  'lexus/gx/2014':              'File:2019_Lexus_GX_460,_Front_Left,_07-31-2021.jpg',
  'lexus/nx/2015':              'File:2018_Lexus_NX_300,_Front_Left,_08-07-2021.jpg',
  'lexus/nx/2022':              'File:2022_Lexus_NX_350,_Front_Left,_09-26-2021.jpg',
  'infiniti/g35-g37-q50/2007':  'File:2010_Infiniti_G37_Sedan,_Front_Left,_08-29-2021.jpg',
  'infiniti/g35-g37-q50/2009':  'File:2012_Infiniti_G37_Sedan,_Front_Left,_08-18-2021.jpg',
  'infiniti/g35-g37-q50/2014':  'File:2018_Infiniti_Q50_3.0t,_Front_Left,_08-07-2021.jpg',
  'infiniti/g35-g37-q50/2018':  'File:2021_Infiniti_Q50_3.0t,_Front_Left,_07-10-2021.jpg',
  'infiniti/qx60/2013':         'File:2018_Infiniti_QX60,_Front_Left,_08-07-2021.jpg',
  'infiniti/qx60/2022':         'File:2022_Infiniti_QX60_Luxe,_Front_Left,_09-26-2021.jpg',
  'infiniti/qx80/2013':         'File:2017_Infiniti_QX80,_Front_Left,_08-01-2021.jpg',
  'infiniti/qx80/2017':         'File:2021_Infiniti_QX80,_Front_Left,_07-10-2021.jpg',
  'infiniti/fx35-qx70/2009':    'File:2012_Infiniti_FX35,_Front_Left,_08-18-2021.jpg',
  'infiniti/fx35-qx70/2014':    'File:2017_Infiniti_QX70,_Front_Left,_08-01-2021.jpg',
  'cadillac/cts/2008':          'File:2012_Cadillac_CTS,_Front_Left,_08-18-2021.jpg',
  'cadillac/cts/2014':          'File:2018_Cadillac_CTS,_Front_Left,_08-07-2021.jpg',
  'cadillac/ats/2013':          'File:2017_Cadillac_ATS,_Front_Left,_08-01-2021.jpg',
  'cadillac/escalade/2007':     'File:2013_Cadillac_Escalade_ESV,_Front_Left,_08-22-2021.jpg',
  'cadillac/escalade/2015':     'File:2019_Cadillac_Escalade_ESV,_Front_Left,_07-31-2021.jpg',
  'cadillac/escalade/2021':     'File:2021_Cadillac_Escalade,_Front_Left,_07-10-2021.jpg',
  'cadillac/srx-xt5/2010':      'File:2015_Cadillac_SRX,_Front_Left,_08-14-2021.jpg',
  'cadillac/srx-xt5/2017':      'File:2021_Cadillac_XT5,_Front_Left,_07-10-2021.jpg',
  'cadillac/xts/2013':          'File:2017_Cadillac_XTS,_Front_Left,_08-01-2021.jpg',
  'lincoln/mkz/2013':           'File:2016_Lincoln_MKZ,_Front_Left,_08-14-2021.jpg',
  'lincoln/mkz/2017':           'File:2019_Lincoln_MKZ,_Front_Left,_07-27-2021.jpg',
  'lincoln/mkx-nautilus/2011':  'File:2015_Lincoln_MKX,_Front_Left,_08-14-2021.jpg',
  'lincoln/mkx-nautilus/2016':  'File:2018_Lincoln_MKX,_Front_Left,_08-07-2021.jpg',
  'lincoln/mkx-nautilus/2019':  'File:2021_Lincoln_Nautilus,_Front_Left,_07-10-2021.jpg',
  'lincoln/navigator/2007':     'File:2012_Lincoln_Navigator,_Front_Left,_08-18-2021.jpg',
  'lincoln/navigator/2015':     'File:2017_Lincoln_Navigator,_Front_Left,_08-01-2021.jpg',
  'lincoln/navigator/2018':     'File:2021_Lincoln_Navigator,_Front_Left,_07-10-2021.jpg',
  'lincoln/continental/2017':   'File:2019_Lincoln_Continental,_Front_Left,_07-27-2021.jpg',
  'lincoln/mkt/2010':           'File:2017_Lincoln_MKT,_Front_Left,_08-01-2021.jpg',
  'mazda/mazda3/2010':          'File:2013_Mazda3_i_Touring,_Front_Left,_08-22-2021.jpg',
  'mazda/mazda3/2014':          'File:2018_Mazda3_i_Grand_Touring,_Front_Left,_08-07-2021.jpg',
  'mazda/mazda3/2019':          'File:2021_Mazda3_Select,_Front_Left,_07-10-2021.jpg',
  'mazda/mazda6/2014':          'File:2017_Mazda6_Grand_Touring,_Front_Left,_08-01-2021.jpg',
  'mazda/mazda6/2018':          'File:2021_Mazda6_Grand_Touring,_Front_Left,_07-10-2021.jpg',
  'mazda/cx-5/2013':            'File:2016_Mazda_CX-5_Grand_Touring,_Front_Left,_08-14-2021.jpg',
  'mazda/cx-5/2017':            'File:2021_Mazda_CX-5_Grand_Touring,_Front_Left,_07-10-2021.jpg',
  'mazda/cx-5/2023':            'File:2023_Mazda_CX-5_Carbon_Turbo,_Front_Left,_10-02-2022.jpg',
  'mazda/cx-9/2016':            'File:2020_Mazda_CX-9_Grand_Touring,_Front_Left,_07-11-2021.jpg',
  'mazda/mx-5-miata/2006':      'File:2013_Mazda_MX-5_Miata_Club,_Front_Left,_08-22-2021.jpg',
  'mazda/mx-5-miata/2016':      'File:2019_Mazda_MX-5_Miata_Grand_Touring,_Front_Left,_07-27-2021.jpg',
  'volkswagen/jetta/2011':      'File:2014_Volkswagen_Jetta_SE,_Front_Left,_08-18-2021.jpg',
  'volkswagen/jetta/2019':      'File:2021_Volkswagen_Jetta_SE,_Front_Left,_07-10-2021.jpg',
  'volkswagen/passat/2012':     'File:2016_Volkswagen_Passat_SE,_Front_Left,_08-14-2021.jpg',
  'volkswagen/passat/2020':     'File:2021_Volkswagen_Passat_SE,_Front_Left,_07-10-2021.jpg',
  'volkswagen/tiguan/2009':     'File:2015_Volkswagen_Tiguan_SE,_Front_Left,_08-14-2021.jpg',
  'volkswagen/tiguan/2018':     'File:2021_Volkswagen_Tiguan_SE,_Front_Left,_07-10-2021.jpg',
  'volkswagen/atlas/2018':      'File:2020_Volkswagen_Atlas_SE,_Front_Left,_07-11-2021.jpg',
  'volkswagen/atlas/2024':      'File:2024_Volkswagen_Atlas_SE,_Front_Left,_10-01-2023.jpg',
  'volkswagen/gti/2010':        'File:2013_Volkswagen_GTI,_Front_Left,_08-22-2021.jpg',
  'volkswagen/gti/2015':        'File:2019_Volkswagen_GTI_SE,_Front_Left,_07-27-2021.jpg',
  'volkswagen/gti/2022':        'File:2022_Volkswagen_GTI_SE,_Front_Left,_09-26-2021.jpg',
  'audi/a4/2009':               'File:2014_Audi_A4_Premium,_Front_Left,_08-18-2021.jpg',
  'audi/a4/2017':               'File:2020_Audi_A4_Premium,_Front_Left,_07-11-2021.jpg',
  'audi/a6/2012':               'File:2016_Audi_A6_Premium_Plus,_Front_Left,_08-14-2021.jpg',
  'audi/a6/2019':               'File:2021_Audi_A6_Premium,_Front_Left,_07-10-2021.jpg',
  'audi/q5/2009':               'File:2015_Audi_Q5_Premium_Plus,_Front_Left,_08-14-2021.jpg',
  'audi/q5/2018':               'File:2021_Audi_Q5_Premium,_Front_Left,_07-10-2021.jpg',
  'audi/q7/2007':               'File:2014_Audi_Q7_Premium,_Front_Left,_08-18-2021.jpg',
  'audi/q7/2017':               'File:2021_Audi_Q7_Premium,_Front_Left,_07-10-2021.jpg',
  'audi/a3/2015':               'File:2018_Audi_A3_Premium,_Front_Left,_08-07-2021.jpg',
  'audi/a3/2022':               'File:2022_Audi_A3_Premium,_Front_Left,_09-26-2021.jpg',
  'mitsubishi/outlander/2014':  'File:2018_Mitsubishi_Outlander_SE,_Front_Left,_08-07-2021.jpg',
  'mitsubishi/outlander/2022':  'File:2022_Mitsubishi_Outlander_SE,_Front_Left,_09-26-2021.jpg',
  'mitsubishi/eclipse-cross/2018': 'File:2020_Mitsubishi_Eclipse_Cross_LE,_Front_Left,_07-11-2021.jpg',
  'mitsubishi/eclipse-cross/2022': 'File:2022_Mitsubishi_Eclipse_Cross_LE,_Front_Left,_09-26-2021.jpg',
  'mitsubishi/galant/2004':     'File:2011_Mitsubishi_Galant_ES,_Front_Left,_08-29-2021.jpg',
  'mitsubishi/lancer/2008':     'File:2014_Mitsubishi_Lancer_ES,_Front_Left,_08-18-2021.jpg',
  'volvo/xc90/2003':            'File:2013_Volvo_XC90,_Front_Left,_08-22-2021.jpg',
  'volvo/xc90/2016':            'File:2020_Volvo_XC90_T6,_Front_Left,_07-11-2021.jpg',
  'volvo/xc60/2010':            'File:2016_Volvo_XC60_T5,_Front_Left,_08-14-2021.jpg',
  'volvo/xc60/2018':            'File:2021_Volvo_XC60_T5,_Front_Left,_07-10-2021.jpg',
  'volvo/s60/2011':             'File:2016_Volvo_S60_T5,_Front_Left,_08-14-2021.jpg',
  'volvo/s60/2019':             'File:2021_Volvo_S60_T5,_Front_Left,_07-10-2021.jpg',
  'volvo/v60/2015':             'File:2018_Volvo_V60_T5,_Front_Left,_08-07-2021.jpg',
  'volvo/v60/2019':             'File:2021_Volvo_V60_T5,_Front_Left,_07-10-2021.jpg',
  'volvo/xc40/2019':            'File:2021_Volvo_XC40_T5,_Front_Left,_07-10-2021.jpg',
  'land-rover/range-rover-sport/2010': 'File:2013_Land_Rover_Range_Rover_Sport_HSE,_Front_Left,_08-22-2021.jpg',
  'land-rover/range-rover-sport/2014': 'File:2018_Land_Rover_Range_Rover_Sport_HSE,_Front_Left,_08-07-2021.jpg',
  'land-rover/range-rover-sport/2018': 'File:2021_Land_Rover_Range_Rover_Sport_HSE,_Front_Left,_07-10-2021.jpg',
  'land-rover/discovery-lr4/2010':     'File:2013_Land_Rover_LR4,_Front_Left,_08-22-2021.jpg',
  'land-rover/discovery-lr4/2017':     'File:2020_Land_Rover_Discovery_HSE,_Front_Left,_07-11-2021.jpg',
  'land-rover/defender/2020':          'File:2021_Land_Rover_Defender_110_S,_Front_Left,_07-10-2021.jpg',
};

const LOGO_MAP = {
  'chevrolet':     'File:Chevrolet_script_logo.svg',
  'ford':          'File:Ford_Motor_Company_Logo.svg',
  'toyota':        'File:Toyota_logo_(Red).svg',
  'honda':         'File:Honda-logo.svg',
  'dodge':         'File:Dodge_logo.svg',
  'ram':           'File:Ram-logo.svg',
  'nissan':        'File:Nissan_2020_logo.svg',
  'kia':           'File:Kia_logo3.svg',
  'hyundai':       'File:Hyundai_Motor_Company_logo.svg',
  'jeep':          'File:Jeep_logo.svg',
  'gmc':           'File:GMC_logo.svg',
  'buick':         'File:Buick_logo.svg',
  'chrysler':      'File:Chrysler_logo.svg',
  'subaru':        'File:Subaru_logo.svg',
  'bmw':           'File:BMW_logo_(gray).svg',
  'mercedes-benz': 'File:Mercedes-Benz_logo.svg',
  'acura':         'File:Acura_logo.svg',
  'lexus':         'File:Lexus_division_emblem.svg',
  'infiniti':      'File:Infiniti_logo.svg',
  'cadillac':      'File:Cadillac_logo.svg',
  'lincoln':       'File:Lincoln_Motor_Company_logo.svg',
  'mazda':         'File:Mazda_logo.svg',
  'volkswagen':    'File:Volkswagen_logo_2019.svg',
  'audi':          'File:Audi_logo.svg',
  'mitsubishi':    'File:Mitsubishi_logo.svg',
  'volvo':         'File:Volvo_logo.svg',
  'land-rover':    'File:Land_Rover_logo.svg',
};

async function getWikimediaUrl(filename) {
  const encoded = encodeURIComponent(filename.replace('File:', ''));
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encoded}&prop=imageinfo&iiprop=url&format=json&origin=*`;
  const response = await fetch(apiUrl, { headers: { 'User-Agent': 'BuyBoxBuilder/1.0' } });
  const data = await response.json();
  const pages = data.query.pages;
  const page = Object.values(pages)[0];
  if (page.imageinfo && page.imageinfo[0]) return page.imageinfo[0].url;
  throw new Error(`No image info found for: ${filename}`);
}

async function downloadUrl(url, destPath) {
  const response = await fetch(url, { headers: { 'User-Agent': 'BuyBoxBuilder/1.0' } });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(buffer));
}

async function processModels() {
  console.log(`\nBuy Box Builder — Image ${PLACEHOLDER_MODE ? 'Placeholder Generator' : 'Downloader'}`);
  console.log('='.repeat(60));

  let success = 0, failed = 0, skipped = 0;
  const failures = [];

  for (const [key] of Object.entries(IMAGE_MAP)) {
    const [makeId, modelId, yearStart] = key.split('/');
    const ext = PLACEHOLDER_MODE ? 'svg' : 'jpg';
    const filename = `${makeId}-${modelId}-${yearStart}.${ext}`;
    const destPath = path.join(OUTPUT_DIR, filename);

    if (fs.existsSync(destPath)) {
      skipped++;
      continue;
    }

    if (PLACEHOLDER_MODE) {
      const modelName = modelId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const svgContent = makePlaceholderSVG(makeId, modelName, yearStart, yearStart, 9999);
      fs.writeFileSync(destPath, svgContent);
      console.log(`  PLACEHOLDER  ${filename}`);
      success++;
    } else {
      try {
        const wikimediaFile = IMAGE_MAP[key];
        const imageUrl = await getWikimediaUrl(wikimediaFile);
        await downloadUrl(imageUrl, destPath);
        console.log(`  DOWNLOADED  ${filename}`);
        success++;
        await new Promise(r => setTimeout(r, 300));
      } catch (err) {
        console.log(`  FAILED     ${filename} — ${err.message}`);
        failures.push({ key, filename, error: err.message });
        failed++;
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('Processing Make Logos...');
  for (const [makeId] of Object.entries(LOGO_MAP)) {
    const filename = `${makeId}.svg`;
    const destPath = path.join(LOGO_DIR, filename);
    if (fs.existsSync(destPath)) { skipped++; continue; }

    if (PLACEHOLDER_MODE) {
      const makeName = makeId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      fs.writeFileSync(destPath, makePlaceholderLogoSVG(makeId, makeName));
      console.log(`  PLACEHOLDER LOGO  ${filename}`);
      success++;
    } else {
      try {
        const wikimediaFile = LOGO_MAP[makeId];
        const imageUrl = await getWikimediaUrl(wikimediaFile);
        await downloadUrl(imageUrl, destPath);
        console.log(`  LOGO  ${filename}`);
        success++;
        await new Promise(r => setTimeout(r, 300));
      } catch (err) {
        console.log(`  LOGO FAILED  ${filename} — ${err.message}`);
        failures.push({ key: makeId, filename, error: err.message });
        failed++;
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\nSuccess: ${success}  |  Skipped: ${skipped}  |  Failed: ${failed}`);

  if (failures.length > 0) {
    console.log('\nFAILED IMAGES:');
    failures.forEach(f => console.log(`   ${f.filename}: ${f.error}`));
    fs.writeFileSync('image-download-failures.json', JSON.stringify(failures, null, 2));
  }

  console.log(`\nDone! Images saved to:`);
  console.log(`   Models: ${OUTPUT_DIR}`);
  console.log(`   Logos:  ${LOGO_DIR}`);
}

processModels().catch(console.error);

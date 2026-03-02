/**
 * Vehicle Buy Box Builder — Model Image Downloader
 * Downloads car images from Wikipedia article primary images.
 *
 * Usage:
 *   PLACEHOLDER_MODE=true node scripts/download-model-images.js   (SVG placeholders)
 *   node scripts/download-model-images.js                          (real photos)
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

// Wikipedia search queries per model — maps to Wikipedia article titles
// Format: 'make/model/yearStart' -> ['search query 1', 'search query 2', ...]
// The script tries each query in order until it finds an article with an image.
const WIKI_SEARCH = {
  // Chevrolet
  'chevrolet/impala/2006': ['Chevrolet Impala ninth generation', 'Chevrolet Impala 2006'],
  'chevrolet/impala/2014': ['Chevrolet Impala tenth generation', 'Chevrolet Impala 2014'],
  'chevrolet/malibu/2008': ['Chevrolet Malibu seventh generation', 'Chevrolet Malibu 2008'],
  'chevrolet/malibu/2013': ['Chevrolet Malibu eighth generation', 'Chevrolet Malibu 2013'],
  'chevrolet/malibu/2016': ['Chevrolet Malibu ninth generation', 'Chevrolet Malibu 2016'],
  'chevrolet/silverado-1500/2007': ['Chevrolet Silverado second generation', 'Chevrolet Silverado 2007'],
  'chevrolet/silverado-1500/2014': ['Chevrolet Silverado third generation', 'Chevrolet Silverado 2014'],
  'chevrolet/silverado-1500/2019': ['Chevrolet Silverado fourth generation', 'Chevrolet Silverado 2019'],
  'chevrolet/equinox/2010': ['Chevrolet Equinox second generation', 'Chevrolet Equinox 2010'],
  'chevrolet/equinox/2018': ['Chevrolet Equinox third generation', 'Chevrolet Equinox 2018'],
  'chevrolet/traverse/2009': ['Chevrolet Traverse first generation', 'Chevrolet Traverse 2009'],
  'chevrolet/traverse/2018': ['Chevrolet Traverse second generation', 'Chevrolet Traverse 2018'],
  'chevrolet/cruze/2011': ['Chevrolet Cruze first generation', 'Chevrolet Cruze 2011'],
  'chevrolet/cruze/2016': ['Chevrolet Cruze second generation', 'Chevrolet Cruze 2016'],
  'chevrolet/tahoe/2007': ['Chevrolet Tahoe third generation GMT900', 'Chevrolet Tahoe 2007'],
  'chevrolet/tahoe/2015': ['Chevrolet Tahoe fourth generation', 'Chevrolet Tahoe 2015'],
  'chevrolet/tahoe/2021': ['Chevrolet Tahoe fifth generation', 'Chevrolet Tahoe 2021'],
  // Ford
  'ford/f-150/2009': ['Ford F-Series twelfth generation', 'Ford F-150 2009'],
  'ford/f-150/2015': ['Ford F-Series thirteenth generation', 'Ford F-150 2015'],
  'ford/f-150/2021': ['Ford F-Series fourteenth generation', 'Ford F-150 2021'],
  'ford/fusion/2010': ['Ford Fusion first generation Americas', 'Ford Fusion 2010'],
  'ford/fusion/2013': ['Ford Fusion second generation Americas', 'Ford Fusion 2013'],
  'ford/explorer/2011': ['Ford Explorer fifth generation', 'Ford Explorer 2011'],
  'ford/explorer/2020': ['Ford Explorer sixth generation', 'Ford Explorer 2020'],
  'ford/escape/2008': ['Ford Escape second generation', 'Ford Escape 2008'],
  'ford/escape/2013': ['Ford Escape third generation', 'Ford Escape 2013'],
  'ford/escape/2020': ['Ford Escape fourth generation', 'Ford Escape 2020'],
  'ford/mustang/2005': ['Ford Mustang fifth generation', 'Ford Mustang 2005'],
  'ford/mustang/2015': ['Ford Mustang sixth generation', 'Ford Mustang 2015'],
  'ford/edge/2007': ['Ford Edge first generation', 'Ford Edge 2007'],
  'ford/edge/2015': ['Ford Edge second generation', 'Ford Edge 2015'],
  'ford/focus/2008': ['Ford Focus second generation North America', 'Ford Focus 2008'],
  'ford/focus/2012': ['Ford Focus third generation', 'Ford Focus 2012'],
  // Toyota
  'toyota/camry/2007': ['Toyota Camry XV40', 'Toyota Camry 2007'],
  'toyota/camry/2012': ['Toyota Camry XV50', 'Toyota Camry 2012'],
  'toyota/camry/2018': ['Toyota Camry XV70', 'Toyota Camry 2018'],
  'toyota/corolla/2009': ['Toyota Corolla E140', 'Toyota Corolla 2009'],
  'toyota/corolla/2014': ['Toyota Corolla E170', 'Toyota Corolla 2014'],
  'toyota/corolla/2020': ['Toyota Corolla E210', 'Toyota Corolla 2020'],
  'toyota/highlander/2008': ['Toyota Highlander XU40', 'Toyota Highlander 2008'],
  'toyota/highlander/2014': ['Toyota Highlander XU50', 'Toyota Highlander 2014'],
  'toyota/highlander/2020': ['Toyota Highlander XU70', 'Toyota Highlander 2020'],
  'toyota/rav4/2006': ['Toyota RAV4 third generation XA30', 'Toyota RAV4 2006'],
  'toyota/rav4/2013': ['Toyota RAV4 fourth generation XA40', 'Toyota RAV4 2013'],
  'toyota/rav4/2019': ['Toyota RAV4 fifth generation XA50', 'Toyota RAV4 2019'],
  'toyota/tacoma/2005': ['Toyota Tacoma second generation', 'Toyota Tacoma 2005'],
  'toyota/tacoma/2016': ['Toyota Tacoma third generation', 'Toyota Tacoma 2016'],
  'toyota/sienna/2004': ['Toyota Sienna second generation', 'Toyota Sienna 2004'],
  'toyota/sienna/2011': ['Toyota Sienna third generation', 'Toyota Sienna 2011'],
  'toyota/sienna/2021': ['Toyota Sienna fourth generation', 'Toyota Sienna 2021'],
  // Honda
  'honda/accord/2008': ['Honda Accord eighth generation', 'Honda Accord 2008'],
  'honda/accord/2013': ['Honda Accord ninth generation', 'Honda Accord 2013'],
  'honda/accord/2018': ['Honda Accord tenth generation', 'Honda Accord 2018'],
  'honda/civic/2006': ['Honda Civic eighth generation', 'Honda Civic 2006'],
  'honda/civic/2012': ['Honda Civic ninth generation', 'Honda Civic 2012'],
  'honda/civic/2016': ['Honda Civic tenth generation', 'Honda Civic 2016'],
  'honda/civic/2022': ['Honda Civic eleventh generation', 'Honda Civic 2022'],
  'honda/cr-v/2007': ['Honda CR-V third generation', 'Honda CR-V 2007'],
  'honda/cr-v/2012': ['Honda CR-V fourth generation', 'Honda CR-V 2012'],
  'honda/cr-v/2017': ['Honda CR-V fifth generation', 'Honda CR-V 2017'],
  'honda/pilot/2009': ['Honda Pilot second generation', 'Honda Pilot 2009'],
  'honda/pilot/2016': ['Honda Pilot third generation', 'Honda Pilot 2016'],
  'honda/odyssey/2005': ['Honda Odyssey third generation North America', 'Honda Odyssey 2005'],
  'honda/odyssey/2011': ['Honda Odyssey fourth generation', 'Honda Odyssey 2011'],
  'honda/odyssey/2018': ['Honda Odyssey fifth generation', 'Honda Odyssey 2018'],
  // Dodge
  'dodge/charger/2011': ['Dodge Charger seventh generation', 'Dodge Charger LX 2011'],
  'dodge/charger/2015': ['Dodge Charger seventh generation', 'Dodge Charger LD 2015'],
  'dodge/challenger/2008': ['Dodge Challenger third generation', 'Dodge Challenger 2008'],
  'dodge/challenger/2015': ['Dodge Challenger third generation', 'Dodge Challenger 2015'],
  'dodge/durango/2011': ['Dodge Durango third generation', 'Dodge Durango 2011'],
  'dodge/durango/2014': ['Dodge Durango third generation', 'Dodge Durango 2014'],
  'dodge/durango/2021': ['Dodge Durango third generation', 'Dodge Durango 2021'],
  'dodge/grand-caravan/2008': ['Dodge Grand Caravan fifth generation', 'Dodge Caravan 2008'],
  'dodge/grand-caravan/2011': ['Dodge Grand Caravan fifth generation', 'Dodge Caravan 2011'],
  // Ram
  'ram/ram-1500/2009': ['Ram pickup fourth generation', 'Dodge Ram 1500 2009'],
  'ram/ram-1500/2013': ['Ram pickup fourth generation', 'Ram 1500 2013'],
  'ram/ram-1500/2019': ['Ram pickup fifth generation', 'Ram 1500 2019'],
  'ram/ram-2500/2010': ['Ram 2500 fourth generation', 'Ram 2500 2010'],
  'ram/ram-2500/2014': ['Ram 2500 fourth generation', 'Ram 2500 2014'],
  'ram/ram-2500/2019': ['Ram 2500 fifth generation', 'Ram 2500 2019'],
  'ram/promaster-city/2015': ['Ram ProMaster City', 'Ram ProMaster City 2015'],
  // Nissan
  'nissan/altima/2007': ['Nissan Altima fourth generation L32', 'Nissan Altima 2007'],
  'nissan/altima/2013': ['Nissan Altima fifth generation L33', 'Nissan Altima 2013'],
  'nissan/altima/2019': ['Nissan Altima sixth generation L34', 'Nissan Altima 2019'],
  'nissan/sentra/2013': ['Nissan Sentra seventh generation B17', 'Nissan Sentra 2013'],
  'nissan/sentra/2020': ['Nissan Sentra eighth generation B18', 'Nissan Sentra 2020'],
  'nissan/maxima/2009': ['Nissan Maxima seventh generation A35', 'Nissan Maxima 2009'],
  'nissan/maxima/2016': ['Nissan Maxima eighth generation A36', 'Nissan Maxima 2016'],
  'nissan/rogue/2008': ['Nissan Rogue first generation S35', 'Nissan Rogue 2008'],
  'nissan/rogue/2014': ['Nissan Rogue second generation T32', 'Nissan Rogue 2014'],
  'nissan/rogue/2021': ['Nissan Rogue third generation T33', 'Nissan Rogue 2021'],
  'nissan/murano/2009': ['Nissan Murano second generation Z51', 'Nissan Murano 2009'],
  'nissan/murano/2015': ['Nissan Murano third generation Z52', 'Nissan Murano 2015'],
  'nissan/pathfinder/2005': ['Nissan Pathfinder third generation R51', 'Nissan Pathfinder 2005'],
  'nissan/pathfinder/2013': ['Nissan Pathfinder fourth generation R52', 'Nissan Pathfinder 2013'],
  'nissan/pathfinder/2021': ['Nissan Pathfinder fifth generation R53', 'Nissan Pathfinder 2021'],
  // Kia
  'kia/optima-k5/2011': ['Kia Optima third generation TF', 'Kia Optima 2011'],
  'kia/optima-k5/2016': ['Kia Optima fourth generation JF', 'Kia Optima 2016'],
  'kia/optima-k5/2021': ['Kia K5 first generation DL3', 'Kia K5 2021'],
  'kia/sorento/2011': ['Kia Sorento second generation XM', 'Kia Sorento 2011'],
  'kia/sorento/2016': ['Kia Sorento third generation UM', 'Kia Sorento 2016'],
  'kia/sorento/2021': ['Kia Sorento fourth generation MQ4', 'Kia Sorento 2021'],
  'kia/sportage/2011': ['Kia Sportage third generation SL', 'Kia Sportage 2011'],
  'kia/sportage/2017': ['Kia Sportage fourth generation QL', 'Kia Sportage 2017'],
  'kia/sportage/2022': ['Kia Sportage fifth generation NQ5', 'Kia Sportage 2022'],
  'kia/soul/2010': ['Kia Soul first generation AM', 'Kia Soul 2010'],
  'kia/soul/2014': ['Kia Soul second generation PS', 'Kia Soul 2014'],
  'kia/soul/2020': ['Kia Soul third generation SK3', 'Kia Soul 2020'],
  'kia/forte/2010': ['Kia Forte first generation TD', 'Kia Forte 2010'],
  'kia/forte/2014': ['Kia Forte second generation YD', 'Kia Forte 2014'],
  'kia/forte/2019': ['Kia Forte third generation BD', 'Kia Forte 2019'],
  // Hyundai
  'hyundai/sonata/2011': ['Hyundai Sonata sixth generation YF', 'Hyundai Sonata 2011'],
  'hyundai/sonata/2015': ['Hyundai Sonata seventh generation LF', 'Hyundai Sonata 2015'],
  'hyundai/sonata/2020': ['Hyundai Sonata eighth generation DN8', 'Hyundai Sonata 2020'],
  'hyundai/elantra/2007': ['Hyundai Elantra fourth generation HD', 'Hyundai Elantra 2007'],
  'hyundai/elantra/2011': ['Hyundai Elantra fifth generation MD', 'Hyundai Elantra 2011'],
  'hyundai/elantra/2017': ['Hyundai Elantra sixth generation AD', 'Hyundai Elantra 2017'],
  'hyundai/elantra/2021': ['Hyundai Elantra seventh generation CN7', 'Hyundai Elantra 2021'],
  'hyundai/santa-fe/2007': ['Hyundai Santa Fe second generation CM', 'Hyundai Santa Fe 2007'],
  'hyundai/santa-fe/2013': ['Hyundai Santa Fe third generation DM', 'Hyundai Santa Fe 2013'],
  'hyundai/santa-fe/2019': ['Hyundai Santa Fe fourth generation TM', 'Hyundai Santa Fe 2019'],
  'hyundai/tucson/2010': ['Hyundai Tucson second generation LM', 'Hyundai Tucson 2010'],
  'hyundai/tucson/2016': ['Hyundai Tucson third generation TL', 'Hyundai Tucson 2016'],
  'hyundai/tucson/2021': ['Hyundai Tucson fourth generation NX4', 'Hyundai Tucson 2021'],
  // Jeep
  'jeep/grand-cherokee/2005': ['Jeep Grand Cherokee WK', 'Jeep Grand Cherokee 2005'],
  'jeep/grand-cherokee/2011': ['Jeep Grand Cherokee WK2', 'Jeep Grand Cherokee 2011'],
  'jeep/grand-cherokee/2022': ['Jeep Grand Cherokee WL', 'Jeep Grand Cherokee 2022'],
  'jeep/cherokee/2014': ['Jeep Cherokee KL', 'Jeep Cherokee 2014'],
  'jeep/cherokee/2019': ['Jeep Cherokee KL', 'Jeep Cherokee 2019'],
  'jeep/wrangler/2007': ['Jeep Wrangler JK', 'Jeep Wrangler 2007'],
  'jeep/wrangler/2018': ['Jeep Wrangler JL', 'Jeep Wrangler 2018'],
  'jeep/compass/2007': ['Jeep Compass MK49', 'Jeep Compass 2007'],
  'jeep/compass/2017': ['Jeep Compass MP', 'Jeep Compass 2017'],
  // GMC
  'gmc/sierra-1500/2007': ['GMC Sierra second generation', 'GMC Sierra 2007'],
  'gmc/sierra-1500/2014': ['GMC Sierra third generation', 'GMC Sierra 2014'],
  'gmc/sierra-1500/2019': ['GMC Sierra fourth generation', 'GMC Sierra 2019'],
  'gmc/terrain/2010': ['GMC Terrain first generation', 'GMC Terrain 2010'],
  'gmc/terrain/2018': ['GMC Terrain second generation', 'GMC Terrain 2018'],
  'gmc/acadia/2007': ['GMC Acadia first generation', 'GMC Acadia 2007'],
  'gmc/acadia/2017': ['GMC Acadia second generation', 'GMC Acadia 2017'],
  'gmc/yukon/2007': ['GMC Yukon third generation GMT900', 'GMC Yukon 2007'],
  'gmc/yukon/2015': ['GMC Yukon fourth generation', 'GMC Yukon 2015'],
  'gmc/yukon/2021': ['GMC Yukon fifth generation', 'GMC Yukon 2021'],
  // Buick
  'buick/lacrosse/2010': ['Buick LaCrosse second generation', 'Buick LaCrosse 2010'],
  'buick/lacrosse/2017': ['Buick LaCrosse third generation', 'Buick LaCrosse 2017'],
  'buick/enclave/2008': ['Buick Enclave first generation', 'Buick Enclave 2008'],
  'buick/enclave/2018': ['Buick Enclave second generation', 'Buick Enclave 2018'],
  'buick/verano/2012': ['Buick Verano', 'Buick Verano 2012'],
  'buick/regal/2011': ['Buick Regal fifth generation', 'Buick Regal 2011'],
  'buick/regal/2018': ['Buick Regal sixth generation', 'Buick Regal 2018'],
  // Chrysler
  'chrysler/300/2005': ['Chrysler 300 first generation LX', 'Chrysler 300 2005'],
  'chrysler/300/2011': ['Chrysler 300 second generation', 'Chrysler 300 2011'],
  'chrysler/300/2015': ['Chrysler 300 second generation', 'Chrysler 300 2015'],
  'chrysler/town-country-pacifica/2008': ['Chrysler Town and Country fifth generation', 'Chrysler Town Country 2008'],
  'chrysler/town-country-pacifica/2017': ['Chrysler Pacifica minivan', 'Chrysler Pacifica 2017'],
  // Subaru
  'subaru/outback/2010': ['Subaru Outback fourth generation', 'Subaru Outback 2010'],
  'subaru/outback/2015': ['Subaru Outback fifth generation', 'Subaru Outback 2015'],
  'subaru/outback/2020': ['Subaru Outback sixth generation', 'Subaru Outback 2020'],
  'subaru/forester/2009': ['Subaru Forester third generation SH', 'Subaru Forester 2009'],
  'subaru/forester/2014': ['Subaru Forester fourth generation SJ', 'Subaru Forester 2014'],
  'subaru/forester/2019': ['Subaru Forester fifth generation SK', 'Subaru Forester 2019'],
  'subaru/legacy/2010': ['Subaru Legacy fifth generation', 'Subaru Legacy 2010'],
  'subaru/legacy/2015': ['Subaru Legacy sixth generation', 'Subaru Legacy 2015'],
  'subaru/legacy/2020': ['Subaru Legacy seventh generation', 'Subaru Legacy 2020'],
  'subaru/crosstrek/2013': ['Subaru Crosstrek first generation', 'Subaru XV Crosstrek 2013'],
  'subaru/crosstrek/2018': ['Subaru Crosstrek second generation', 'Subaru Crosstrek 2018'],
  // BMW
  'bmw/3-series/2006': ['BMW 3 Series E90', 'BMW E90 3 Series'],
  'bmw/3-series/2012': ['BMW 3 Series F30', 'BMW F30 3 Series'],
  'bmw/3-series/2019': ['BMW 3 Series G20', 'BMW G20 3 Series'],
  'bmw/5-series/2010': ['BMW 5 Series F10', 'BMW F10 5 Series'],
  'bmw/5-series/2017': ['BMW 5 Series G30', 'BMW G30 5 Series'],
  'bmw/x3/2011': ['BMW X3 F25', 'BMW X3 second generation'],
  'bmw/x3/2018': ['BMW X3 G01', 'BMW X3 third generation'],
  'bmw/x5/2007': ['BMW X5 E70', 'BMW X5 second generation'],
  'bmw/x5/2014': ['BMW X5 F15', 'BMW X5 third generation'],
  'bmw/x5/2019': ['BMW X5 G05', 'BMW X5 fourth generation'],
  // Mercedes-Benz
  'mercedes-benz/c-class/2008': ['Mercedes-Benz C-Class W204', 'Mercedes-Benz W204'],
  'mercedes-benz/c-class/2015': ['Mercedes-Benz C-Class W205', 'Mercedes-Benz W205'],
  'mercedes-benz/c-class/2022': ['Mercedes-Benz C-Class W206', 'Mercedes-Benz W206'],
  'mercedes-benz/e-class/2010': ['Mercedes-Benz E-Class W212', 'Mercedes-Benz W212'],
  'mercedes-benz/e-class/2017': ['Mercedes-Benz E-Class W213', 'Mercedes-Benz W213'],
  'mercedes-benz/gle/2012': ['Mercedes-Benz M-Class W166', 'Mercedes-Benz ML W166'],
  'mercedes-benz/gle/2016': ['Mercedes-Benz GLE-Class W166', 'Mercedes-Benz GLE 2016'],
  'mercedes-benz/gle/2020': ['Mercedes-Benz GLE-Class V167', 'Mercedes-Benz GLE V167'],
  'mercedes-benz/glc/2016': ['Mercedes-Benz GLC-Class X253', 'Mercedes-Benz GLC 2016'],
  'mercedes-benz/glc/2023': ['Mercedes-Benz GLC-Class X254', 'Mercedes-Benz GLC 2023'],
  // Acura
  'acura/tl-tlx/2004': ['Acura TL third generation', 'Acura TL 2004'],
  'acura/tl-tlx/2009': ['Acura TL fourth generation', 'Acura TL 2009'],
  'acura/tl-tlx/2015': ['Acura TLX first generation', 'Acura TLX 2015'],
  'acura/tl-tlx/2021': ['Acura TLX second generation', 'Acura TLX 2021'],
  'acura/mdx/2007': ['Acura MDX second generation', 'Acura MDX 2007'],
  'acura/mdx/2014': ['Acura MDX third generation', 'Acura MDX 2014'],
  'acura/mdx/2022': ['Acura MDX fourth generation', 'Acura MDX 2022'],
  'acura/rdx/2013': ['Acura RDX second generation', 'Acura RDX 2013'],
  'acura/rdx/2019': ['Acura RDX third generation', 'Acura RDX 2019'],
  'acura/tsx-ilx/2009': ['Acura TSX second generation', 'Acura TSX 2009'],
  'acura/tsx-ilx/2013': ['Acura ILX first generation', 'Acura ILX 2013'],
  // Lexus
  'lexus/es/2007': ['Lexus ES XV40', 'Lexus ES 350 2007'],
  'lexus/es/2013': ['Lexus ES XV60', 'Lexus ES 350 2013'],
  'lexus/es/2019': ['Lexus ES seventh generation', 'Lexus ES 350 2019'],
  'lexus/rx/2010': ['Lexus RX AL10', 'Lexus RX 350 2010'],
  'lexus/rx/2016': ['Lexus RX AL20', 'Lexus RX 350 2016'],
  'lexus/rx/2023': ['Lexus RX fifth generation', 'Lexus RX 2023'],
  'lexus/is/2006': ['Lexus IS XE20', 'Lexus IS 250 2006'],
  'lexus/is/2014': ['Lexus IS XE30', 'Lexus IS 300 2014'],
  'lexus/is/2021': ['Lexus IS XE30 facelift', 'Lexus IS 350 2021'],
  'lexus/gx/2010': ['Lexus GX J150', 'Lexus GX 460 2010'],
  'lexus/gx/2014': ['Lexus GX J150', 'Lexus GX 460 2014'],
  'lexus/nx/2015': ['Lexus NX AZ10', 'Lexus NX 2015'],
  'lexus/nx/2022': ['Lexus NX AZ20', 'Lexus NX 2022'],
  // Infiniti
  'infiniti/g35-g37-q50/2007': ['Infiniti G37', 'Infiniti G35 2007'],
  'infiniti/g35-g37-q50/2009': ['Infiniti G37 sedan', 'Infiniti G37 2009'],
  'infiniti/g35-g37-q50/2014': ['Infiniti Q50 first generation', 'Infiniti Q50 2014'],
  'infiniti/g35-g37-q50/2018': ['Infiniti Q50 first generation', 'Infiniti Q50 2018'],
  'infiniti/qx60/2013': ['Infiniti QX60 first generation', 'Infiniti QX60 2013'],
  'infiniti/qx60/2022': ['Infiniti QX60 second generation', 'Infiniti QX60 2022'],
  'infiniti/qx80/2013': ['Infiniti QX80 first generation', 'Infiniti QX80 2013'],
  'infiniti/qx80/2017': ['Infiniti QX80 first generation', 'Infiniti QX80 2017'],
  'infiniti/fx35-qx70/2009': ['Infiniti FX second generation', 'Infiniti FX35 2009'],
  'infiniti/fx35-qx70/2014': ['Infiniti QX70', 'Infiniti QX70 2014'],
  // Cadillac
  'cadillac/cts/2008': ['Cadillac CTS second generation', 'Cadillac CTS 2008'],
  'cadillac/cts/2014': ['Cadillac CTS third generation', 'Cadillac CTS 2014'],
  'cadillac/ats/2013': ['Cadillac ATS', 'Cadillac ATS 2013'],
  'cadillac/escalade/2007': ['Cadillac Escalade third generation', 'Cadillac Escalade 2007'],
  'cadillac/escalade/2015': ['Cadillac Escalade fourth generation', 'Cadillac Escalade 2015'],
  'cadillac/escalade/2021': ['Cadillac Escalade fifth generation', 'Cadillac Escalade 2021'],
  'cadillac/srx-xt5/2010': ['Cadillac SRX second generation', 'Cadillac SRX 2010'],
  'cadillac/srx-xt5/2017': ['Cadillac XT5 first generation', 'Cadillac XT5 2017'],
  'cadillac/xts/2013': ['Cadillac XTS', 'Cadillac XTS 2013'],
  // Lincoln
  'lincoln/mkz/2013': ['Lincoln MKZ second generation', 'Lincoln MKZ 2013'],
  'lincoln/mkz/2017': ['Lincoln MKZ second generation', 'Lincoln MKZ 2017'],
  'lincoln/mkx-nautilus/2011': ['Lincoln MKX first generation', 'Lincoln MKX 2011'],
  'lincoln/mkx-nautilus/2016': ['Lincoln MKX second generation', 'Lincoln MKX 2016'],
  'lincoln/mkx-nautilus/2019': ['Lincoln Nautilus', 'Lincoln Nautilus 2019'],
  'lincoln/navigator/2007': ['Lincoln Navigator third generation', 'Lincoln Navigator 2007'],
  'lincoln/navigator/2015': ['Lincoln Navigator third generation', 'Lincoln Navigator 2015'],
  'lincoln/navigator/2018': ['Lincoln Navigator fourth generation', 'Lincoln Navigator 2018'],
  'lincoln/continental/2017': ['Lincoln Continental tenth generation', 'Lincoln Continental 2017'],
  'lincoln/mkt/2010': ['Lincoln MKT', 'Lincoln MKT 2010'],
  // Mazda
  'mazda/mazda3/2010': ['Mazda3 second generation BL', 'Mazda3 2010'],
  'mazda/mazda3/2014': ['Mazda3 third generation BM', 'Mazda3 2014'],
  'mazda/mazda3/2019': ['Mazda3 fourth generation BP', 'Mazda3 2019'],
  'mazda/mazda6/2014': ['Mazda6 third generation GJ', 'Mazda6 2014'],
  'mazda/mazda6/2018': ['Mazda6 third generation', 'Mazda6 2018'],
  'mazda/cx-5/2013': ['Mazda CX-5 first generation KE', 'Mazda CX-5 2013'],
  'mazda/cx-5/2017': ['Mazda CX-5 second generation KF', 'Mazda CX-5 2017'],
  'mazda/cx-5/2023': ['Mazda CX-5 second generation', 'Mazda CX-5 2023'],
  'mazda/cx-9/2016': ['Mazda CX-9 second generation', 'Mazda CX-9 2016'],
  'mazda/mx-5-miata/2006': ['Mazda MX-5 NC', 'Mazda MX-5 2006'],
  'mazda/mx-5-miata/2016': ['Mazda MX-5 ND', 'Mazda MX-5 2016'],
  // Volkswagen
  'volkswagen/jetta/2011': ['Volkswagen Jetta sixth generation', 'Volkswagen Jetta 2011'],
  'volkswagen/jetta/2019': ['Volkswagen Jetta seventh generation', 'Volkswagen Jetta 2019'],
  'volkswagen/passat/2012': ['Volkswagen Passat NMS', 'Volkswagen Passat B7 2012'],
  'volkswagen/passat/2020': ['Volkswagen Passat NMS', 'Volkswagen Passat 2020'],
  'volkswagen/tiguan/2009': ['Volkswagen Tiguan first generation', 'Volkswagen Tiguan 2009'],
  'volkswagen/tiguan/2018': ['Volkswagen Tiguan second generation', 'Volkswagen Tiguan 2018'],
  'volkswagen/atlas/2018': ['Volkswagen Atlas first generation', 'Volkswagen Atlas 2018'],
  'volkswagen/atlas/2024': ['Volkswagen Atlas second generation', 'Volkswagen Atlas 2024'],
  'volkswagen/gti/2010': ['Volkswagen Golf Mk6 GTI', 'Volkswagen GTI 2010'],
  'volkswagen/gti/2015': ['Volkswagen Golf Mk7 GTI', 'Volkswagen GTI 2015'],
  'volkswagen/gti/2022': ['Volkswagen Golf Mk8 GTI', 'Volkswagen GTI 2022'],
  // Audi
  'audi/a4/2009': ['Audi A4 B8', 'Audi A4 2009'],
  'audi/a4/2017': ['Audi A4 B9', 'Audi A4 2017'],
  'audi/a6/2012': ['Audi A6 C7', 'Audi A6 2012'],
  'audi/a6/2019': ['Audi A6 C8', 'Audi A6 2019'],
  'audi/q5/2009': ['Audi Q5 8R', 'Audi Q5 first generation'],
  'audi/q5/2018': ['Audi Q5 FY', 'Audi Q5 second generation'],
  'audi/q7/2007': ['Audi Q7 4L', 'Audi Q7 first generation'],
  'audi/q7/2017': ['Audi Q7 4M', 'Audi Q7 second generation'],
  'audi/a3/2015': ['Audi A3 8V', 'Audi A3 third generation'],
  'audi/a3/2022': ['Audi A3 8Y', 'Audi A3 fourth generation'],
  // Mitsubishi
  'mitsubishi/outlander/2014': ['Mitsubishi Outlander third generation', 'Mitsubishi Outlander 2014'],
  'mitsubishi/outlander/2022': ['Mitsubishi Outlander fourth generation', 'Mitsubishi Outlander 2022'],
  'mitsubishi/eclipse-cross/2018': ['Mitsubishi Eclipse Cross', 'Mitsubishi Eclipse Cross 2018'],
  'mitsubishi/eclipse-cross/2022': ['Mitsubishi Eclipse Cross facelift', 'Mitsubishi Eclipse Cross 2022'],
  'mitsubishi/galant/2004': ['Mitsubishi Galant ninth generation', 'Mitsubishi Galant 2004'],
  'mitsubishi/lancer/2008': ['Mitsubishi Lancer eighth generation', 'Mitsubishi Lancer 2008'],
  // Volvo
  'volvo/xc90/2003': ['Volvo XC90 first generation', 'Volvo XC90 2003'],
  'volvo/xc90/2016': ['Volvo XC90 second generation', 'Volvo XC90 2016'],
  'volvo/xc60/2010': ['Volvo XC60 first generation', 'Volvo XC60 2010'],
  'volvo/xc60/2018': ['Volvo XC60 second generation', 'Volvo XC60 2018'],
  'volvo/s60/2011': ['Volvo S60 second generation', 'Volvo S60 2011'],
  'volvo/s60/2019': ['Volvo S60 third generation', 'Volvo S60 2019'],
  'volvo/v60/2015': ['Volvo V60 first generation', 'Volvo V60 2015'],
  'volvo/v60/2019': ['Volvo V60 second generation', 'Volvo V60 2019'],
  'volvo/xc40/2019': ['Volvo XC40', 'Volvo XC40 2019'],
  // Land Rover
  'land-rover/range-rover-sport/2010': ['Range Rover Sport L320', 'Range Rover Sport 2010'],
  'land-rover/range-rover-sport/2014': ['Range Rover Sport L494', 'Range Rover Sport 2014'],
  'land-rover/range-rover-sport/2018': ['Range Rover Sport L494', 'Range Rover Sport 2018'],
  'land-rover/discovery-lr4/2010': ['Land Rover Discovery 4', 'Land Rover LR4 2010'],
  'land-rover/discovery-lr4/2017': ['Land Rover Discovery 5', 'Land Rover Discovery 2017'],
  'land-rover/defender/2020': ['Land Rover Defender L663', 'Land Rover Defender 2020'],
};

const LOGO_SEARCH = {
  'chevrolet':     ['Chevrolet'],
  'ford':          ['Ford Motor Company'],
  'toyota':        ['Toyota'],
  'honda':         ['Honda'],
  'dodge':         ['Dodge automobile'],
  'ram':           ['Ram Trucks'],
  'nissan':        ['Nissan'],
  'kia':           ['Kia Corporation'],
  'hyundai':       ['Hyundai Motor Company'],
  'jeep':          ['Jeep'],
  'gmc':           ['GMC automobile'],
  'buick':         ['Buick'],
  'chrysler':      ['Chrysler'],
  'subaru':        ['Subaru'],
  'bmw':           ['BMW'],
  'mercedes-benz': ['Mercedes-Benz'],
  'acura':         ['Acura'],
  'lexus':         ['Lexus'],
  'infiniti':      ['Infiniti'],
  'cadillac':      ['Cadillac'],
  'lincoln':       ['Lincoln Motor Company'],
  'mazda':         ['Mazda'],
  'volkswagen':    ['Volkswagen'],
  'audi':          ['Audi'],
  'mitsubishi':    ['Mitsubishi Motors'],
  'volvo':         ['Volvo Cars'],
  'land-rover':    ['Land Rover'],
};

const delay = (ms) => new Promise(r => setTimeout(r, ms));

// Browser-like UA required for Wikimedia image downloads
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

/**
 * Search Wikipedia for an article and return a thumbnail image URL (800px).
 * Using thumbnails instead of originals avoids 403 errors from Wikimedia.
 */
async function searchWikipediaImage(query) {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=3&prop=pageimages&piprop=thumbnail&pithumbsize=800&format=json&origin=*`;

  const response = await fetch(searchUrl, { headers: { 'User-Agent': UA } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (!data.query || !data.query.pages) throw new Error('No results');

  const pages = Object.values(data.query.pages);
  for (const page of pages) {
    if (page.thumbnail && page.thumbnail.source) {
      const url = page.thumbnail.source;
      if (url.endsWith('.svg') || url.endsWith('.svg.png') || url.includes('Flag_of') || url.includes('logo') || url.includes('Logo')) continue;
      return url;
    }
  }

  throw new Error('No image found in search results');
}

/**
 * Get logo image from Wikipedia article's infobox
 */
async function searchWikipediaLogo(query) {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=images&format=json&origin=*`;

  const response = await fetch(searchUrl, { headers: { 'User-Agent': UA } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (!data.query || !data.query.pages) throw new Error('No results');

  const pages = Object.values(data.query.pages);
  for (const page of pages) {
    if (!page.images) continue;
    for (const img of page.images) {
      const title = img.title.toLowerCase();
      if (title.includes('logo') && (title.endsWith('.svg') || title.endsWith('.png'))) {
        const fileUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(img.title)}&prop=imageinfo&iiprop=url&iiurlwidth=400&format=json&origin=*`;
        const fileResp = await fetch(fileUrl, { headers: { 'User-Agent': UA } });
        const fileData = await fileResp.json();
        const filePages = Object.values(fileData.query.pages);
        const info = filePages[0]?.imageinfo?.[0];
        // Prefer the thumburl (resized version) to avoid 403s
        if (info?.thumburl) return info.thumburl;
        if (info?.url) return info.url;
      }
    }
  }

  throw new Error('No logo found');
}

async function downloadUrl(url, destPath) {
  const response = await fetch(url, {
    headers: { 'User-Agent': UA },
    redirect: 'follow',
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(buffer));
}

async function processModels() {
  console.log(`\nBuy Box Builder — Image ${PLACEHOLDER_MODE ? 'Placeholder Generator' : 'Downloader (Wikipedia)'}`);
  console.log('='.repeat(60));

  let success = 0, failed = 0, skipped = 0;
  const failures = [];
  const entries = Object.entries(WIKI_SEARCH);

  for (let i = 0; i < entries.length; i++) {
    const [key, queries] = entries[i];
    const [makeId, modelId, yearStart] = key.split('/');
    const ext = PLACEHOLDER_MODE ? 'svg' : 'jpg';
    const filename = `${makeId}-${modelId}-${yearStart}.${ext}`;
    const destPath = path.join(OUTPUT_DIR, filename);

    // Skip if already exists (and is not a tiny placeholder when we want real images)
    if (fs.existsSync(destPath)) {
      const stats = fs.statSync(destPath);
      if (PLACEHOLDER_MODE || stats.size > 2000) {
        skipped++;
        continue;
      }
    }

    if (PLACEHOLDER_MODE) {
      const modelName = modelId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const svgContent = makePlaceholderSVG(makeId, modelName, yearStart, yearStart, 9999);
      fs.writeFileSync(destPath, svgContent);
      console.log(`  PLACEHOLDER  ${filename}`);
      success++;
    } else {
      let downloaded = false;
      for (const query of queries) {
        try {
          const imageUrl = await searchWikipediaImage(query);
          await downloadUrl(imageUrl, destPath);
          const size = fs.statSync(destPath).size;
          console.log(`  [${i+1}/${entries.length}] DOWNLOADED  ${filename} (${(size/1024).toFixed(0)}KB)`);
          success++;
          downloaded = true;
          await delay(500); // Be respectful to Wikipedia
          break;
        } catch (err) {
          // Try next query
        }
      }
      if (!downloaded) {
        console.log(`  [${i+1}/${entries.length}] FAILED      ${filename}`);
        failures.push({ key, filename });
        failed++;
        await delay(300);
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('Processing Make Logos...');

  for (const [makeId, queries] of Object.entries(LOGO_SEARCH)) {
    const filename = `${makeId}.svg`;
    const destPath = path.join(LOGO_DIR, filename);

    if (fs.existsSync(destPath) && PLACEHOLDER_MODE) { skipped++; continue; }

    if (PLACEHOLDER_MODE) {
      const makeName = makeId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      fs.writeFileSync(destPath, makePlaceholderLogoSVG(makeId, makeName));
      console.log(`  PLACEHOLDER LOGO  ${filename}`);
      success++;
    } else {
      let downloaded = false;
      for (const query of queries) {
        try {
          const logoUrl = await searchWikipediaLogo(query);
          const ext = logoUrl.endsWith('.svg') ? 'svg' : 'png';
          const logoFilename = `${makeId}.${ext}`;
          const logoPath = path.join(LOGO_DIR, logoFilename);
          await downloadUrl(logoUrl, logoPath);
          console.log(`  LOGO  ${logoFilename}`);
          success++;
          downloaded = true;
          await delay(500);
          break;
        } catch (err) {
          // Try next query
        }
      }
      if (!downloaded) {
        console.log(`  LOGO FAILED  ${filename}`);
        failures.push({ key: makeId, filename });
        failed++;
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\nSuccess: ${success}  |  Skipped: ${skipped}  |  Failed: ${failed}`);

  if (failures.length > 0) {
    console.log('\nFAILED IMAGES:');
    failures.forEach(f => console.log(`   ${f.filename}`));
    fs.writeFileSync('image-download-failures.json', JSON.stringify(failures, null, 2));
  }

  console.log(`\nDone! Images saved to:`);
  console.log(`   Models: ${OUTPUT_DIR}`);
  console.log(`   Logos:  ${LOGO_DIR}`);
}

processModels().catch(console.error);

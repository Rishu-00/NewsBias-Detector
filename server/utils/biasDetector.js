const BIAS_MAP = {
  reuters: 'center', bbc: 'center', apnews: 'center', aljazeera: 'center',
  ndtv: 'center', indiatoday: 'center', timesofindia: 'center', livemint: 'center',
  guardian: 'left', cnn: 'left', msnbc: 'left', nytimes: 'left',
  washingtonpost: 'left', thehindu: 'left', huffpost: 'left',
  foxnews: 'right', breitbart: 'right', nypost: 'right',
  dailymail: 'right', wsj: 'right', republicworld: 'right',
};

function getBias(sourceName = '', sourceUrl = '') {
  const name = sourceName.toLowerCase();
  const url = sourceUrl.toLowerCase();
  for (const [key, bias] of Object.entries(BIAS_MAP)) {
    if (name.includes(key) || url.includes(key)) return bias;
  }
  return 'unknown';
}

module.exports = { getBias };
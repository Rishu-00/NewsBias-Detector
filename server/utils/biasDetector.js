const BIAS_MAP = {
  // CENTER
  'reuters': 'center',
  'bbc': 'center',
  'apnews': 'center',
  'aljazeera': 'center',
  'ndtv': 'center',
  'indiatoday': 'center',
  'india today': 'center',
  'timesofindia': 'center',
  'times of india': 'center',
  'toi': 'center',
  'livemint': 'center',
  'hindustantimes': 'center',
  'hindustan times': 'center',
  'theprint': 'center',
  'the print': 'center',
  'scroll': 'center',
  'wion': 'center',
  'pti': 'center',
  'ani': 'center',
  'menafn': 'center',
  'thestatesman': 'center',
  'the statesman': 'center',
  'deccanherald': 'center',
  'deccan herald': 'center',
  'firstpost': 'center',
  'first post': 'center',
  'moneycontrol': 'center',
  'money control': 'center',
  'economictimes': 'center',
  'economic times': 'center',
  'tribuneindia': 'center',
  'tribune': 'center',
  'business standard': 'center',
  'businessstandard': 'center',

  // LEFT
  'guardian': 'left',
  'the guardian': 'left',
  'cnn': 'left',
  'msnbc': 'left',
  'nytimes': 'left',
  'new york times': 'left',
  'washingtonpost': 'left',
  'washington post': 'left',
  'thehindu': 'left',
  'the hindu': 'left',
  'huffpost': 'left',
  'thewire': 'left',
  'the wire': 'left',
  'outlookindia': 'left',
  'outlook': 'left',
  'chroniclelive': 'left',
  'chronicle': 'left',
  'chennaionline': 'left',
  'chennai online': 'left',
  'newslaundry': 'left',
  'caravan': 'left',
  'caravanmagazine': 'left',

  // RIGHT
  'foxnews': 'right',
  'fox news': 'right',
  'breitbart': 'right',
  'nypost': 'right',
  'new york post': 'right',
  'dailymail': 'right',
  'daily mail': 'right',
  'wsj': 'right',
  'wall street journal': 'right',
  'republicworld': 'right',
  'republic world': 'right',
  'republic': 'right',
  'timesnownews': 'right',
  'times now': 'right',
  'timesnow': 'right',
  'zeenews': 'right',
  'zee news': 'right',
  'opindia': 'right',
  'swarajya': 'right',
  'navbharattimes': 'right',
};

function getBias(sourceName = '', sourceUrl = '') {
  const name = sourceName.toLowerCase().trim();
  const url = sourceUrl.toLowerCase().trim();

  for (const [key, bias] of Object.entries(BIAS_MAP)) {
    if (name.includes(key) || url.includes(key)) {
      return bias;
    }
  }
  return 'unknown';
}

module.exports = { getBias };
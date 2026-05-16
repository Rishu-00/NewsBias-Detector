const BIAS_MAP = {
  // CENTER
  reuters: 'center',
  bbc: 'center',
  apnews: 'center',
  aljazeera: 'center',
  ndtv: 'center',
  indiatoday: 'center',
  timesofindia: 'center',
  toi: 'center',
  livemint: 'center',
  mint: 'center',
  hindustantimes: 'center',
  theprint: 'center',
  scroll: 'center',
  wion: 'center',
  pti: 'center',
  ani: 'center',
  menafn: 'center',
  thestatesman: 'center',
  tribuneindia: 'center',
  deccanherald: 'center',
  firstpost: 'center',
  moneycontrol: 'center',
  economictimes: 'center',

  // LEFT
  guardian: 'left',
  cnn: 'left',
  msnbc: 'left',
  nytimes: 'left',
  washingtonpost: 'left',
  thehindu: 'left',
  huffpost: 'left',
  wire: 'left',
  thewire: 'left',
  outlookindia: 'left',
  chroniclelive: 'left',
  chennaionline: 'left',

  // RIGHT
  foxnews: 'right',
  breitbart: 'right',
  nypost: 'right',
  dailymail: 'right',
  wsj: 'right',
  republicworld: 'right',
  timesnownews: 'right',
  zeenews: 'right',
  opindia: 'right',
  swarajyamag: 'right',
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
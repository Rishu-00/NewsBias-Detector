const NEG_WORDS = ['crisis','collapse','warn','threat','danger','fear','fail',
  'loss','worst','attack','conflict','disaster','violence','death','kill',
  'terror','chaos','decline','recession','catastrophe','devastating','alarming'];

const POS_WORDS = ['growth','success','hope','peace','recovery','improve',
  'win','boost','advance','progress','benefit','achieve','develop','rise',
  'gain','solution','positive','strong','breakthrough','thrive'];

function getSentiment(text = '') {
  const t = text.toLowerCase();
  const negCount = NEG_WORDS.filter((w) => t.includes(w)).length;
  const posCount = POS_WORDS.filter((w) => t.includes(w)).length;
  let sentiment;
  if (negCount > posCount + 1) sentiment = 'negative';
  else if (posCount > negCount + 1) sentiment = 'positive';
  else sentiment = 'neutral';
  const negScore = Math.min(100, Math.round(negCount * 18 + 10));
  return { sentiment, negScore };
}

module.exports = { getSentiment };
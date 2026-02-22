export const INITIALS = ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's', 'y', 'w']

export const FINALS = [
  'a', 'o', 'e', 'i', 'u', 'ü',
  'ai', 'ei', 'ao', 'ou',
  'ia', 'ie', 'iao', 'iu',
  'ua', 'uo', 'uai', 'ui',
  'üe',
  'an', 'en', 'ang', 'eng', 'ong',
  'ian', 'in', 'iang', 'ing', 'iong',
  'uan', 'un', 'uang',
  'üan', 'ün',
]

export const TONES = [
  { num: 1, label: 'ā' },
  { num: 2, label: 'á' },
  { num: 3, label: 'ǎ' },
  { num: 4, label: 'à' },
]

export const VALID_FINALS = {
  b:  ['a', 'ai', 'an', 'ang', 'ao', 'ei', 'en', 'eng', 'i', 'ian', 'iao', 'ie', 'in', 'ing', 'o', 'u'],
  p:  ['a', 'ai', 'an', 'ang', 'ao', 'ei', 'en', 'eng', 'i', 'ian', 'iao', 'ie', 'in', 'ing', 'o', 'ou', 'u'],
  m:  ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'en', 'eng', 'i', 'ian', 'iao', 'ie', 'in', 'ing', 'iu', 'o', 'ou', 'u', 'uo'],
  f:  ['a', 'an', 'ang', 'ei', 'en', 'eng', 'o', 'ou', 'u'],
  d:  ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'en', 'eng', 'i', 'ian', 'iang', 'iao', 'ie', 'ing', 'iu', 'ong', 'ou', 'u', 'uan', 'ui', 'un', 'uo'],
  t:  ['a', 'ai', 'an', 'ang', 'ao', 'e', 'eng', 'i', 'ian', 'iao', 'ie', 'ing', 'ong', 'ou', 'u', 'uan', 'ui', 'un', 'uo'],
  n:  ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'en', 'eng', 'i', 'ia', 'ian', 'iang', 'iao', 'ie', 'in', 'ing', 'iu', 'ong', 'ou', 'u', 'uan', 'ü', 'üe'],
  l:  ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'eng', 'i', 'ia', 'ian', 'iang', 'iao', 'ie', 'in', 'ing', 'iu', 'o', 'ong', 'ou', 'u', 'uan', 'un', 'uo', 'ü', 'üe', 'ün'],
  g:  ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'en', 'eng', 'ong', 'ou', 'u', 'ua', 'uai', 'uan', 'uang', 'ui', 'un', 'uo'],
  k:  ['a', 'ai', 'an', 'ang', 'ao', 'e', 'en', 'eng', 'ong', 'ou', 'u', 'ua', 'uai', 'uan', 'uang', 'ui', 'un', 'uo'],
  h:  ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'en', 'eng', 'ong', 'ou', 'u', 'ua', 'uai', 'uan', 'uang', 'ui', 'un', 'uo'],
  j:  ['i', 'ia', 'ian', 'iang', 'iao', 'ie', 'in', 'ing', 'iong', 'iu', 'ü', 'üan', 'üe', 'ün'],
  q:  ['i', 'ia', 'ian', 'iang', 'iao', 'ie', 'in', 'ing', 'iong', 'iu', 'ü', 'üan', 'üe', 'ün'],
  x:  ['i', 'ia', 'ian', 'iang', 'iao', 'ie', 'in', 'ing', 'iong', 'iu', 'ü', 'üan', 'üe', 'ün'],
  zh: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'en', 'eng', 'i', 'ong', 'ou', 'u', 'ua', 'uai', 'uan', 'uang', 'ui', 'un', 'uo'],
  ch: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'en', 'eng', 'i', 'ong', 'ou', 'u', 'ua', 'uai', 'uan', 'uang', 'ui', 'un', 'uo'],
  sh: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'en', 'eng', 'i', 'ong', 'ou', 'u', 'ua', 'uai', 'uan', 'uang', 'ui', 'un', 'uo'],
  r:  ['an', 'ang', 'ao', 'e', 'ei', 'en', 'eng', 'i', 'ong', 'ou', 'u', 'uan', 'ui', 'un', 'uo'],
  z:  ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'en', 'eng', 'i', 'ong', 'ou', 'u', 'uan', 'ui', 'un', 'uo'],
  c:  ['a', 'ai', 'an', 'ang', 'ao', 'e', 'en', 'eng', 'i', 'ong', 'ou', 'u', 'uan', 'ui', 'un', 'uo'],
  s:  ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'en', 'eng', 'i', 'ong', 'ou', 'u', 'uan', 'ui', 'un', 'uo'],
  y:  ['a', 'an', 'ang', 'ao', 'e', 'i', 'in', 'ing', 'ong', 'ou', 'ü', 'üan', 'üe', 'ün'],
  w:  ['a', 'ai', 'an', 'ang', 'ei', 'en', 'eng', 'o', 'u'],
}

// Converts display final to the actual audio filename segment.
// j/q/x/y: ü→u, üe→ue, üan→uan, ün→un
// n/l:     ü→uu, üe→uue, ün→uun
export function toAudioFinal(initial, final) {
  if (['j', 'q', 'x', 'y'].includes(initial)) {
    return final.replace('üan', 'uan').replace('üe', 'ue').replace('ün', 'un').replace('ü', 'u')
  }
  if (['n', 'l'].includes(initial)) {
    return final.replace('üe', 'uue').replace('ün', 'uun').replace('ü', 'uu')
  }
  return final
}

export function randomPinyin() {
  const initials = Object.keys(VALID_FINALS)
  const initial = initials[Math.floor(Math.random() * initials.length)]
  const finals = VALID_FINALS[initial]
  const final = finals[Math.floor(Math.random() * finals.length)]
  const tone = Math.floor(Math.random() * 4) + 1
  return { initial, final, tone }
}

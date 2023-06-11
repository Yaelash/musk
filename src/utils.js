export const extractTweets = (data) => {
    const { entries } = data.data.user.result.timeline_v2.timeline.instructions[1];

    return entries.filter(entry => entry.entryId.startsWith('tweet-'))
        .map(e => e.content.itemContent.tweet_results.result.legacy.full_text)
}

export const splitTweetsToWords = rawTweets => {
    return rawTweets.reduce((acc, tweet) => {
        return acc.concat(tweet.split(' '))
    }, [])
}

export const normalizeWords  = rawData => {
    return rawData.reduce((acc, item) => {
        acc.push(item.toLowerCase().replace('(', '').replace(')', ''));

        return acc;
    }, [])
}

export const generateWordFrequencies = data => {
  const count = {};
  // [ { text: '', value }, ]

  for (const element of data) {
      if (element !== '') {
          count[element] = count[element]+1 || 1
      }

  }

  return Object.entries(count).reduce((acc, item) => {
      acc.push({ text: item[0], value: item[1] })

    return acc

  }, [])
}

export const options = {
  method: 'GET',
  url: 'https://twitter135.p.rapidapi.com/v2/UserTweets/',
  params: {
    id: '44196397',
    count: '50'
  },
  headers: {
    'X-RapidAPI-Key': 'a5a5b138cfmshc40646057a79610p1acc8ajsn6c2ff447d030',
    'X-RapidAPI-Host': 'twitter135.p.rapidapi.com'
  }
};


const emojiRegex = /\p{Emoji_Presentation}/ug;
const atLeastOneLetterRegex = /^[^A-Za-z]*$/g
const stopWords = ['a','able','about','across','after','all','almost','also','am','among','an','and','any','are','as','at','be','because','been','but','by','can','cannot','could','dear','did','do','does','either','else','ever','every','for','from','get','got','had','has','have','he','her','hers','him','his','how','however','i','if','in','into','is','it','its','just','least','let','like','likely','may','me','might','most','must','my','neither','no','nor','not','of','off','often','on','only','or','other','our','own','rather','said','say','says','she','should','since','so','some','than','that','the','their','them','then','there','these','they','this','tis','to','too','twas','us','wants','was','we','were','what','when','where','which','while','who','whom','why','will','with','would','yet','you','your', '&amp', '&amp;']

const isUrl = (string) => {
  try {
   new URL(string);
    return true;
  } catch (_) {
    return string.includes('https://') || string.includes('http://');
  }
};

export const isWordValid = word => {
    const isStopWord = stopWords.includes(word);
    const isEmoji = emojiRegex.test(word)
    const atLeastOneLetter = atLeastOneLetterRegex.test(word)

    return !isStopWord && !isUrl(word) && !isEmoji && !atLeastOneLetter && word.length > 1

}


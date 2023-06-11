import { useRecoilState, useRecoilValue } from 'recoil';
import {isDarkModeState, tweetsState} from './state';
import { generateWordFrequencies, isWordValid, normalizeWords, splitTweetsToWords } from './utils';
import React, { useEffect } from 'react';
import ReactWordcloud from 'react-wordcloud';
import { fetchDataSelector } from './selectors';
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

export const TweetsCloud = () => {
  const rawTweets = useRecoilValue(fetchDataSelector);
  const [tweets, setTweets] = useRecoilState(tweetsState);
  const isDarkMode = useRecoilValue(isDarkModeState);

  useEffect(() => {
    const words = splitTweetsToWords(rawTweets)
    const normalizedWords = normalizeWords(words);
    const filteredWords = normalizedWords.filter(word => isWordValid(word));
    const wordFrequencies = generateWordFrequencies(filteredWords);

    setTweets(wordFrequencies)
  }, [rawTweets, setTweets])

  if (!tweets.length) {
    return <div style={{ color: isDarkMode ? '#FFF' : '#000'}}>Sorry, something went wrong :( Please try again later.</div>
  }


  return <ReactWordcloud words={tweets} options={{ fontSizes: [20, 180]}} />;
}
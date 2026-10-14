(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ThinkFirst = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var EVIDENCE = ['for example', 'for instance', 'according to', 'study', 'data', 'research', 'evidence', 'statistics', 'such as'];
  var REASONING = ['because', 'therefore', 'since', 'as a result', 'consequently', 'this shows', 'which means', 'thus'];
  var COUNTER = ['however', 'on the other hand', 'although', 'critics', 'some argue', 'in contrast', 'nevertheless', 'while'];

  /** Escape text before inserting into HTML (prevents XSS). */
  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /** Parse JSON safely (e.g. from localStorage). */
  function safeParse(raw, fallback) {
    try {
      var parsed = JSON.parse(raw);
      return parsed === null || parsed === undefined ? fallback : parsed;
    } catch (e) {
      return fallback;
    }
  }

  /** Count words in a string. */
  function countWords(text) {
    if (typeof text !== 'string') return 0;
    var t = text.trim();
    return t ? t.split(/\s+/).length : 0;
  }

  /** Split text into sentences. */
  function splitSentences(text) {
    if (typeof text !== 'string') return [];
    return text.split(/[.!?]+/).map(function (s) { return s.trim(); }).filter(Boolean);
  }

  function containsAny(lower, words) {
    return words.some(function (w) { return lower.indexOf(w) !== -1; });
  }

  /** Analyse a draft and return checks, score and suggestions. */
  function analyzeText(text) {
    var safe = typeof text === 'string' ? text : '';
    var lower = safe.toLowerCase();
    var wordCount = countWords(safe);
    var sentences = splitSentences(safe);
    var sentenceCount = sentences.length;
    var avg = sentenceCount ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0;

    var checks = {
      reasoning: containsAny(lower, REASONING),
      evidence: containsAny(lower, EVIDENCE),
      counterargument: containsAny(lower, COUNTER),
      clarity: sentenceCount > 0 && avg <= 25
    };

    var suggestions = [];
    if (wordCount === 0) {
      suggestions.push('Start writing your own thoughts first.');
    } else {
      if (wordCount < 50) suggestions.push('Develop your idea further; aim for at least 50 words.');
      if (!checks.reasoning) suggestions.push('Explain your reasoning using words like "because" or "therefore".');
      if (!checks.evidence) suggestions.push('Support your claim with an example or evidence.');
      if (!checks.counterargument) suggestions.push('Consider a counterargument (e.g. "however", "some argue").');
      if (!checks.clarity) suggestions.push('Your sentences are long; try shorter, clearer sentences.');
    }

    var passed = Object.keys(checks).filter(function (k) { return checks[k]; }).length;
    var score = wordCount === 0 ? 0 : Math.round((passed / 4) * 100);

    return { wordCount: wordCount, sentenceCount: sentenceCount, avgSentenceLength: avg, checks: checks, score: score, suggestions: suggestions };
  }

  return { escapeHtml: escapeHtml, safeParse: safeParse, countWords: countWords, splitSentences: splitSentences, analyzeText: analyzeText };
});

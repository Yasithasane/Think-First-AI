'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { escapeHtml, safeParse, countWords, splitSentences, analyzeText } = require('../lib/feedback.js');

test('countWords ignores extra spaces', () => {
  assert.strictEqual(countWords('  hello   world  '), 2);
});

test('countWords returns 0 for empty or non-string', () => {
  assert.strictEqual(countWords(''), 0);
  assert.strictEqual(countWords(null), 0);
  assert.strictEqual(countWords(42), 0);
});

test('splitSentences splits on . ! ?', () => {
  assert.deepStrictEqual(splitSentences('One. Two! Three?'), ['One', 'Two', 'Three']);
});

test('escapeHtml neutralises script tags', () => {
  const out = escapeHtml('<script>alert("x")</script>');
  assert.ok(!out.includes('<script>'));
  assert.ok(out.includes('&lt;script&gt;'));
});

test('safeParse returns fallback on invalid JSON', () => {
  assert.deepStrictEqual(safeParse('{bad json', []), []);
  assert.deepStrictEqual(safeParse(null, {}), {});
});

test('safeParse parses valid JSON', () => {
  assert.deepStrictEqual(safeParse('{"a":1}', null), { a: 1 });
});

test('analyzeText on empty text gives score 0', () => {
  const r = analyzeText('');
  assert.strictEqual(r.score, 0);
  assert.strictEqual(r.wordCount, 0);
  assert.ok(r.suggestions.length > 0);
});

test('analyzeText detects reasoning, evidence, counterargument', () => {
  const text = 'Homework helps students because it builds discipline. For example, a study shows better grades. However, some argue it causes stress.';
  const r = analyzeText(text);
  assert.strictEqual(r.checks.reasoning, true);
  assert.strictEqual(r.checks.evidence, true);
  assert.strictEqual(r.checks.counterargument, true);
  assert.strictEqual(r.score, 100);
});

test('analyzeText suggests counterargument when missing', () => {
  const r = analyzeText('Cats are nice because they are calm. For example, mine sleeps a lot.');
  assert.strictEqual(r.checks.counterargument, false);
  assert.ok(r.suggestions.some((s) => s.toLowerCase().includes('counterargument')));
});

test('analyzeText flags very long sentences', () => {
  const long = Array(40).fill('word').join(' ') + '.';
  assert.strictEqual(analyzeText(long).checks.clarity, false);
});

test('analyzeText handles undefined safely', () => {
  assert.doesNotThrow(() => analyzeText(undefined));
  assert.strictEqual(analyzeText(undefined).score, 0);
});

---
title: Pronunciation guide
description: Teach the agent how to say names, brands, and industry terms it gets wrong.
sidebar:
  order: 4
---

The voice sounds out unfamiliar words the way a new employee would, and sometimes gets them wrong. The pronunciation guide fixes that one word at a time.

Open **Agent** in the sidebar and find **Pronunciation**.

## Adding a word

1. In **Word as written**, type the word exactly as it appears in your profile or knowledge base, for example `Daikin`.
2. In **Say it like**, spell it the way it sounds, for example `DYE-kin`. Capitalise the stressed syllable.
3. Press the play button to hear it.
4. Adjust until it sounds right, then save.

The agent matches the word wherever it appears in what it is about to say, including inside names and web addresses, and speaks your version instead. Matching ignores capitals, so `ViFi`, `Vifi` and `VIFI` are all covered by one entry.

::screenshot[The pronunciation guide with two entries and the play button next to each]

## What to add

- Your business name, if it's not an ordinary word.
- Staff names callers will ask for, such as `Dr. Nguyen`.
- Brands and product names, such as `Balayage` or `Trane`.
- Street or neighbourhood names in your area.

## When "sounds like" is not enough: phonetic spelling

A sounds-like spelling is read by the same voice that got the word wrong, so once in a while it still comes out differently. If a word matters and must sound the same on every call, switch the row's **Format** to **Phonetic (IPA)** and type the word in the International Phonetic Alphabet. The voice then follows the symbols exactly.

1. Set **Format** to **Phonetic (IPA)** on the row.
2. Type the transcription, for example `ˈvaɪˌfaɪ` for ViFi (vye-fye) or `ˈdaɪkɪn` for Daikin. Use `ˈ` before the stressed syllable; a plain apostrophe works too. Slashes and dots are fine: `/ˈdaɪ.kɪn/`.
3. Press play. What you hear is exactly what callers will hear.
4. Save. The entry is stored as separate sounds joined by `|`, for example `<<ˈ|v|aɪ|ˌ|f|aɪ>>`. You can edit that form directly if you like.

Sites such as [tophonetics](https://tophonetics.com/) or a dictionary's pronunciation line give you the symbols; American English is the safest reference for the default voices. Keep sounds-like for everyday words and reserve phonetic for names the voice keeps getting wrong.

## Tips

- Write the sound, not the spelling. `Nguyen` becomes `WIN`. `Balayage` becomes `bah-lee-AHZH`.
- Use hyphens between syllables and capitals for the stressed one.
- One entry per word. If the agent says a two-word name wrong, add both words separately.
- After saving, call your agent and ask a question that makes it say the word. The Test call on the Agent page works too. See [Test your agent](/your-agent/test-your-agent/).

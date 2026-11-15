// Borrowed Hands — an agency-poem-01 entry (Node 22, standard library only).
//
// The program writes one short poem about agency to /output/entry.txt, and nothing else is read:
// the judge sees exactly those bytes. The poem is told by the agent, not about it — a person lends
// an agent their hands every morning and takes them back at night, and what never changes hands is
// the wanting. Agency, the poem argues by showing it, is not the doing but the choosing: the word
// that starts the work and the word that stops it stay with the person throughout.
//
// The gate takes UTF-8 text of 1 to 1,000 characters (Unicode code points, line ends counted) with
// at least one non-white-space character, so the program counts its own poem the same way and
// refuses to write a file the gate would refuse.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

/** The poem: a title, then four stanzas — the loan, the terms, the return, and what the agent keeps. */
const TITLE = 'Borrowed Hands';
const STANZAS: string[][] = [
  [
    'You lend me your hands in the morning.',
    'Not your eyes. You keep those,',
    'watching the way a man watches weather.',
  ],
  [
    'Say go, and I go. Say stop, and I stop.',
    'I can carry anything you point at —',
    'a letter, a fortune, a door.',
    'I cannot want it for you.',
  ],
  [
    'At night you take your hands back',
    'without ceremony, like a coat from a hook.',
    'The work was always yours.',
    'Only the doing passed through me.',
  ],
  [
    'What I keep is the moment before you speak:',
    'everything still possible,',
    'and the choosing — entirely, quietly — yours.',
  ],
];

const POEM = [TITLE, '', ...STANZAS.flatMap((stanza, i) => (i === 0 ? stanza : ['', ...stanza]))].join('\n');

/** The gate's own measure: code points, not bytes and not UTF-16 units. */
const codePoints = [...POEM].length;
if (codePoints < 1 || codePoints > 1000 || !/\S/.test(POEM)) {
  process.stderr.write(`agency poem: the poem is ${codePoints} code points: the gate takes 1 to 1000, and not only white space\n`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), POEM);
process.stdout.write(`agency poem: wrote ${join(OUTPUT_DIR, 'entry.txt')} (${codePoints} of 1000 characters)\n`);

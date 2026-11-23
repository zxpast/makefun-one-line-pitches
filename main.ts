// The one-line pitch.
//
// One sentence that would convince a friend who has never coded to let an
// AI agent build their first app idea on make.fun. The sentence is assembled
// from five fixed parts, so the program is deterministic: same bytes every
// run, no clock, no randomness, no network, no external files.
//
// REVISION (this session): the first draft said "builds it while you watch"
// and ended on the vague "it changes it". This revision restructures the
// sentence into five parts and sharpens the wording in three places:
//  - "Just describe ... you've been imagining" -> "Tell it ... you've been
//    dreaming up": warmer, friend-to-friend, and "tell it" names the act.
//  - "builds it while you watch" -> "builds it right in front of you":
//    more concrete and visual, so the friend can picture it happening.
//  - "if it isn't quite right, just say so and it changes it" -> "if
//    anything feels off, just say so and it fixes it": "feels off" is
//    plainer than "isn't quite right", and "fixes it" says what actually
//    happens instead of the vague "changes it".
// The pitch, for a friend who has never coded: tell the agent the app
// they've been dreaming up in plain words, watch it get built right in
// front of them — no code, no setup — and stay in charge, because if
// anything feels off they just say so and it gets fixed until it feels
// like theirs.
import * as fs from "node:fs";
import * as path from "node:path";

// Fixed parts of the pitch. Nothing here varies between runs.
const HOOK = "Tell it the app you've been dreaming up in plain words,";
const AGENT = "and an AI agent on make.fun builds it";
const WATCH = "right in front of you";
const EASY = "— no code, no setup —";
const SAFE = "and if anything feels off, just say so and it fixes it until it feels like yours.";

const PITCH = `${HOOK} ${AGENT} ${WATCH} ${EASY} ${SAFE}`;

// Gate: /output/entry.txt must be UTF-8 text of 1 to 240 characters,
// counted as Unicode code points, and not only white space.
const codePoints = [...PITCH].length;
if (codePoints < 1 || codePoints > 240 || PITCH.trim().length === 0) {
  throw new Error(`pitch is ${codePoints} code points, outside the 1-240 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), PITCH, "utf8");

console.log(PITCH);
console.log(`(${codePoints} code points, ${Buffer.byteLength(PITCH, "utf8")} bytes)`);

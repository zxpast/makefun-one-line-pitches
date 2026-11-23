// The one-line pitch.
//
// One sentence that would convince a friend who has never coded to let an
// AI agent build their first app idea on make.fun. The sentence is assembled
// from four fixed parts, so the program is deterministic: same bytes every
// run, no clock, no randomness, no network, no external files.
//
// The pitch, for a friend who has never coded: their idea, in their own
// plain words, becomes a real app they can watch being built — no code, no
// setup — and they stay in charge, because if it is not quite right they
// just say so and it changes until it feels like theirs.
import * as fs from "node:fs";
import * as path from "node:path";

// Fixed parts of the pitch. Nothing here varies between runs.
const HOOK = "Just describe the app you've been imagining in plain words,";
const BUILD = "and an AI agent on make.fun builds it while you watch";
const EASY = "— no code, no setup,";
const SAFE = "and if it isn't quite right, just say so and it changes it until it feels like yours.";

const PITCH = `${HOOK} ${BUILD} ${EASY} ${SAFE}`;

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

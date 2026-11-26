// Hands the entry in: writes the one-line out-of-office reply to /output/entry.txt.
// Node 22 runs this TypeScript as it is; there are no dependencies and no build step.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

/** The reply, honest about the dread, polite enough to keep the job. */
export const REPLY =
  "I'm out until Monday. I'll see your email, feel a brief and entirely honest dread, and answer Tuesday with an apology that is also true.";

/** Hand the entry in: make the output directory, then write the reply as UTF-8. */
export async function writeEntry(
  outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output",
): Promise<string> {
  const target = join(outputDir, "entry.txt");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, REPLY, "utf8");
  return target;
}

const written = await writeEntry();
console.log(`${written}: ${Buffer.byteLength(REPLY, "utf8")} bytes`);

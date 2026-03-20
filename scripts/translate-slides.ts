import { PrismaClient } from "@prisma/client";
import * as deepl from "deepl-node";

const prisma = new PrismaClient();
const translator = new deepl.Translator(process.env.DEEPL_API_KEY!);

const DELAY_MS = 1500;
const MAX_RETRIES = 4;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry<T>(fn: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (e: unknown) {
      if (attempt === retries) throw e;
      const wait = DELAY_MS * Math.pow(2, attempt);
      await sleep(wait);
    }
  }
  throw new Error("unreachable");
}

async function translateHtml(html: string): Promise<string> {
  const result = await withRetry(() =>
    translator.translateText(html, "ja", "en-US", { tagHandling: "html" })
  );
  return result.text;
}

async function translateText(text: string): Promise<string> {
  const result = await withRetry(() =>
    translator.translateText(text, "ja", "en-US")
  );
  return result.text;
}

async function main() {
  const slides = await prisma.slide.findMany({
    where: { titleEn: null },
    select: { id: true, title: true, content: true },
    orderBy: { order: "asc" },
  });

  console.log(`Translating ${slides.length} slides...`);

  let done = 0;
  let errors = 0;
  const total = slides.length;

  for (const slide of slides) {
    try {
      const titleEn = await translateText(slide.title);
      await sleep(300);
      const contentEn = await translateHtml(slide.content ?? "");

      await prisma.slide.update({
        where: { id: slide.id },
        data: { titleEn, contentEn },
      });

      done++;
      if (done % 20 === 0 || done === total) {
        console.log(`  ${done}/${total} done`);
      }
    } catch (e: unknown) {
      errors++;
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`  ✗ slide ${slide.id}: ${msg}`);
    }

    await sleep(DELAY_MS);
  }

  await prisma.$disconnect();
  console.log(`\nDone! ${done} translated, ${errors} errors.`);
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});

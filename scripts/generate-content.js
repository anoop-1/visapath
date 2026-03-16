#!/usr/bin/env node
/**
 * VisaPath Content Generator
 *
 * ONE-TIME script that generates all visa pair JSON files using Claude API.
 * Generates ~37,000 pairs for ~195 countries. Cost: ~$15-25 total.
 * After generation, zero AI cost forever — all content is static JSON.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-xxx node scripts/generate-content.js          # All pairs
 *   ANTHROPIC_API_KEY=sk-ant-xxx node scripts/generate-content.js --top=500  # Top 500 pairs first
 *   ANTHROPIC_API_KEY=sk-ant-xxx node scripts/generate-content.js --from=india  # All pairs from India
 *   ANTHROPIC_API_KEY=sk-ant-xxx node scripts/generate-content.js --resume    # Resume from last checkpoint
 */

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
const { getAllPairs, getCountry, countries, makePairSlug } = require('../src/data/countries');

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'data', 'visa-pairs');
const CHECKPOINT_FILE = path.join(__dirname, '..', '.generation-checkpoint.json');
const BATCH_SIZE = 5; // Concurrent requests
const DELAY_BETWEEN_BATCHES = 1000; // ms

// Parse CLI args
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, val] = arg.replace('--', '').split('=');
  acc[key] = val || true;
  return acc;
}, {});

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Priority pairs — these get generated first (highest traffic potential)
const PRIORITY_FROM_COUNTRIES = [
  'india', 'china', 'nigeria', 'philippines', 'pakistan',
  'bangladesh', 'indonesia', 'vietnam', 'egypt', 'brazil',
  'mexico', 'turkey', 'iran', 'russia', 'south-africa',
  'colombia', 'usa', 'uk', 'canada', 'australia',
  'germany', 'france', 'japan', 'south-korea', 'saudi-arabia',
  'uae', 'thailand', 'malaysia', 'nepal', 'sri-lanka',
];

const PRIORITY_TO_COUNTRIES = [
  'usa', 'canada', 'uk', 'australia', 'germany',
  'france', 'japan', 'uae', 'saudi-arabia', 'singapore',
  'new-zealand', 'italy', 'spain', 'netherlands', 'switzerland',
  'south-korea', 'thailand', 'malaysia', 'turkey', 'qatar',
];

function buildPrompt(from, to) {
  return `Generate a comprehensive visa information JSON for a ${from.demonym} passport holder traveling to ${to.name}.

Return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{
  "from": "${from.code}",
  "to": "${to.code}",
  "slug": "${makePairSlug(from, to)}",
  "lastUpdated": "2026-03-01",
  "visaRequired": true/false,
  "visaType": "Type of visa needed (or 'Visa-free' / 'eVisa' / 'Visa on Arrival')",
  "stayDuration": "Maximum allowed stay duration",
  "processingTime": "Typical processing time",
  "visaFee": "Fee in local currency with USD equivalent",
  "eVisaAvailable": true/false,
  "eVisaUrl": "Official eVisa URL if available, empty string if not",
  "summary": "2-3 sentence overview of visa situation for this pair. Be specific and factual.",
  "requirements": ["List of 5-8 specific document requirements"],
  "steps": ["5-8 step-by-step application process"],
  "tips": ["4-5 practical tips for applicants"],
  "commonReasons": ["4-6 common travel purposes"],
  "embassyInfo": {
    "name": "Name of ${to.name} embassy/consulate in ${from.capital}",
    "address": "Address",
    "phone": "Phone number",
    "website": "Official consular website URL"
  },
  "faqs": [
    {"question": "Common question 1?", "answer": "Detailed answer"},
    {"question": "Common question 2?", "answer": "Detailed answer"},
    {"question": "Common question 3?", "answer": "Detailed answer"}
  ],
  "relatedPairs": ["4 related pair slugs"],
  "seo": {
    "title": "SEO-optimized title under 60 chars including year 2026",
    "description": "SEO meta description under 160 chars with key info",
    "keywords": ["5-6 long-tail keywords for this pair"]
  }
}

Important:
- Be factual about visa requirements as of early 2026
- If the pair is visa-free, set visaRequired: false and adjust content accordingly
- Use realistic embassy addresses and phone numbers
- Include country-specific nuances (e.g., GCC visa policies, Schengen area rules)
- For eVisa countries, include the official application URL
- Related pairs should be realistic slugs in format "demonym-to-country-slug"`;
}

async function generatePair(from, to) {
  const slug = makePairSlug(from, to);
  const outputPath = path.join(OUTPUT_DIR, `${slug}.json`);

  // Skip if already generated
  if (fs.existsSync(outputPath)) {
    return { slug, status: 'skipped' };
  }

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001', // Cheapest model — perfectly good for structured data
      max_tokens: 2000,
      messages: [
        { role: 'user', content: buildPrompt(from, to) },
      ],
    });

    const text = response.content[0].text.trim();

    // Parse and validate JSON
    let data;
    try {
      // Handle potential markdown code fences
      const cleaned = text.replace(/^```json?\n?/, '').replace(/\n?```$/, '');
      data = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error(`  JSON parse error for ${slug}: ${parseErr.message}`);
      return { slug, status: 'error', error: 'JSON parse failed' };
    }

    // Validate required fields
    if (!data.from || !data.to || !data.summary) {
      console.error(`  Missing required fields for ${slug}`);
      return { slug, status: 'error', error: 'Missing fields' };
    }

    // Ensure slug is correct
    data.slug = slug;

    // Write to file
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    return { slug, status: 'generated' };
  } catch (err) {
    if (err.status === 429) {
      // Rate limited — wait and retry
      console.log(`  Rate limited, waiting 30s...`);
      await sleep(30000);
      return generatePair(from, to); // Retry
    }
    console.error(`  API error for ${slug}: ${err.message}`);
    return { slug, status: 'error', error: err.message };
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getPairsToGenerate() {
  let allPairs = getAllPairs();

  // Filter by --from flag
  if (args.from) {
    const fromCountry = getCountry(args.from);
    if (!fromCountry) {
      console.error(`Country not found: ${args.from}`);
      process.exit(1);
    }
    allPairs = allPairs.filter(p => p.from.slug === args.from);
  }

  // Sort by priority
  allPairs.sort((a, b) => {
    const aPriority = (PRIORITY_FROM_COUNTRIES.indexOf(a.from.slug) !== -1 ? 1 : 0) +
                      (PRIORITY_TO_COUNTRIES.indexOf(a.to.slug) !== -1 ? 1 : 0);
    const bPriority = (PRIORITY_FROM_COUNTRIES.indexOf(b.from.slug) !== -1 ? 1 : 0) +
                      (PRIORITY_TO_COUNTRIES.indexOf(b.to.slug) !== -1 ? 1 : 0);
    return bPriority - aPriority;
  });

  // Limit by --top flag
  if (args.top) {
    allPairs = allPairs.slice(0, parseInt(args.top));
  }

  return allPairs;
}

function loadCheckpoint() {
  try {
    if (fs.existsSync(CHECKPOINT_FILE)) {
      return JSON.parse(fs.readFileSync(CHECKPOINT_FILE, 'utf-8'));
    }
  } catch {}
  return { completed: [], errors: [], lastIndex: 0 };
}

function saveCheckpoint(checkpoint) {
  fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify(checkpoint, null, 2));
}

async function main() {
  console.log('=== VisaPath Content Generator ===\n');

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY environment variable required');
    console.error('Usage: ANTHROPIC_API_KEY=sk-ant-xxx node scripts/generate-content.js');
    process.exit(1);
  }

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const pairs = getPairsToGenerate();
  console.log(`Total pairs to generate: ${pairs.length}`);

  // Load checkpoint for resume
  let checkpoint = args.resume ? loadCheckpoint() : { completed: [], errors: [], lastIndex: 0 };
  const startIndex = args.resume ? checkpoint.lastIndex : 0;
  const completedSet = new Set(checkpoint.completed);

  let generated = 0;
  let skipped = 0;
  let errors = 0;

  // Process in batches
  for (let i = startIndex; i < pairs.length; i += BATCH_SIZE) {
    const batch = pairs.slice(i, i + BATCH_SIZE);

    // Filter out already completed
    const toProcess = batch.filter(p => !completedSet.has(p.slug));

    if (toProcess.length === 0) {
      skipped += batch.length;
      continue;
    }

    // Run batch concurrently
    const results = await Promise.all(
      toProcess.map(p => generatePair(p.from, p.to))
    );

    for (const result of results) {
      if (result.status === 'generated') {
        generated++;
        checkpoint.completed.push(result.slug);
        completedSet.add(result.slug);
        process.stdout.write(`\r  Generated: ${generated} | Skipped: ${skipped} | Errors: ${errors} | Progress: ${i + BATCH_SIZE}/${pairs.length}`);
      } else if (result.status === 'skipped') {
        skipped++;
      } else {
        errors++;
        checkpoint.errors.push({ slug: result.slug, error: result.error });
      }
    }

    // Save checkpoint every 50 pairs
    if (generated % 50 === 0) {
      checkpoint.lastIndex = i;
      saveCheckpoint(checkpoint);
    }

    // Rate limit delay
    await sleep(DELAY_BETWEEN_BATCHES);
  }

  // Final checkpoint
  checkpoint.lastIndex = pairs.length;
  saveCheckpoint(checkpoint);

  console.log(`\n\n=== Generation Complete ===`);
  console.log(`Generated: ${generated}`);
  console.log(`Skipped (already exists): ${skipped}`);
  console.log(`Errors: ${errors}`);

  if (errors > 0) {
    console.log(`\nFailed pairs saved to checkpoint. Run with --resume to retry.`);
  }

  // Count total files
  const totalFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.json')).length;
  console.log(`\nTotal visa pair files: ${totalFiles}`);
}

main().catch(console.error);

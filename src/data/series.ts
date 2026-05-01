/**
 * Series registry — single source of truth for all multi-article series.
 *
 * When a new article in a series publishes:
 * 1. Flip the pillar's `published` to true
 * 2. Add the `slug` (matches the article's markdown filename)
 * 3. Add the `publishDate` (ISO date)
 * 4. Lock the `finalTitle` (if different from workingTitle)
 *
 * On redeploy, every article in the series that renders <PillarBlock />
 * will instantly pick up the updated links. This is the rabbit-hole mechanic:
 * zero manual edits to prior articles — one file change propagates to all.
 */

export interface SeriesPillar {
  /** Position in the series (0 = gateway, 1-9 = investigations for HH firehose) */
  position: number;
  /** Article slug — empty string until the article publishes */
  slug: string;
  /** Placeholder title shown before the article publishes and finalTitle is locked */
  workingTitle: string;
  /** Locked title set when the article publishes (overrides workingTitle in display) */
  finalTitle?: string;
  /** True when the article is live on the site */
  published: boolean;
  /** ISO publish date, set when published */
  publishDate?: string;
  /** Category bucket this article lives in (from the blog taxonomy) */
  category: string;
  /** Compact label for the pillar tile (titles would break the grid layout) */
  shortLabel: string;
}

export interface Series {
  slug: string;
  name: string;
  tagline: string;
  pillars: SeriesPillar[];
}

export const seriesRegistry: Record<string, Series> = {
  'hh-firehose': {
    slug: 'hh-firehose',
    name: 'The Fewer Sweaty Days Investigation Series',
    tagline:
      "If you have hyperhidrosis, you've probably been handed one answer at a time and told that's all there is. This series is the opposite of that.",
    pillars: [
      {
        position: 0,
        slug: '9-things-about-hyperhidrosis-nobodys-investigating',
        workingTitle: "9 Things About Hyperhidrosis Nobody's Investigating",
        finalTitle: "9 Things About Hyperhidrosis Nobody's Investigating (But Should Be)",
        published: true,
        publishDate: '2026-05-01',
        category: 'Start Here',
        shortLabel: 'The Gateway',
      },
      {
        position: 1,
        slug: '',
        workingTitle: '"Take This Medication" — The HH Drug Escalation Pipeline',
        published: false,
        category: 'Treatment & Medications',
        shortLabel: 'The Drug Pipeline',
      },
      {
        position: 2,
        slug: '',
        workingTitle: '"Surgery Is the Last Resort Cure" — What ETS Actually Does',
        published: false,
        category: 'Treatment & Medications',
        shortLabel: 'The ETS Lie',
      },
      {
        position: 3,
        slug: '',
        workingTitle: '"Is It the Anxiety or the Sweating?"',
        published: false,
        category: 'Nervous System',
        shortLabel: 'Chicken & Egg',
      },
      {
        position: 4,
        slug: '',
        workingTitle: '"It\'s Genetic — There\'s Nothing You Can Do"',
        published: false,
        category: 'Root Causes',
        shortLabel: 'The Genetic Myth',
      },
      {
        position: 5,
        slug: '',
        workingTitle: '"Hyperhidrosis Is a Condition" — Or Is It a Symptom?',
        published: false,
        category: 'Root Causes',
        shortLabel: 'Condition or Symptom',
      },
      {
        position: 6,
        slug: '',
        workingTitle: '"It\'s a Cosmetic/Minor Condition" — The Invisible Disease',
        published: false,
        category: 'Mindset & Identity',
        shortLabel: 'The Invisible Disease',
      },
      {
        position: 7,
        slug: '',
        workingTitle: '"These Medications Are Safe" — The Risk Profile Nobody Discusses',
        published: false,
        category: 'Treatment & Medications',
        shortLabel: 'The Safety Lie',
      },
      {
        position: 8,
        slug: '',
        workingTitle: '"You\'ll Just Have to Manage It Forever"',
        published: false,
        category: 'Paths Forward',
        shortLabel: 'The Remission Case',
      },
      {
        position: 9,
        slug: '',
        workingTitle: '"Everyone Sweats — Stop Making It a Big Deal"',
        published: false,
        category: 'Daily Life',
        shortLabel: 'The Real Cost',
      },
    ],
  },
};

export function getSeries(slug: string): Series | undefined {
  return seriesRegistry[slug];
}

import { Link } from 'react-router-dom';
import { getSeries } from '../../data/series';

interface PillarBlockProps {
  seriesSlug: string;
  currentPosition: number;
}

/**
 * Series TOC displayed at the bottom of every article in a series.
 * Shows all pillars with "you are here" markers, linked published articles,
 * and "coming soon" states for unpublished ones.
 *
 * The rabbit-hole mechanic: reading series.ts is the only source of truth,
 * so publishing a new article automatically updates every prior article's
 * PillarBlock on redeploy — zero manual backlink edits.
 */
export default function PillarBlock({ seriesSlug, currentPosition }: PillarBlockProps) {
  const series = getSeries(seriesSlug);
  if (!series) return null;

  return (
    <div className="pillar-block-wrapper">
      <div className="pillar-block-header">
        <h3 className="pillar-block-title">{series.name}</h3>
        <p className="pillar-block-tagline">{series.tagline}</p>
      </div>

      <div className="pillar-grid">
        {series.pillars.map((pillar) => {
          const isCurrent = pillar.position === currentPosition;
          const displayTitle = pillar.finalTitle || pillar.workingTitle;

          const tileInner = (
            <div
              className={`pillar-tile ${isCurrent ? 'active' : ''}`}
              title={displayTitle}
            >
              <div className="pillar-tile-num">
                {pillar.position === 0 ? 'START' : `0${pillar.position}`}
              </div>
              <div className="pillar-tile-name">{pillar.shortLabel}</div>
              {isCurrent && <div className="pillar-tile-current">you are here</div>}
              {!pillar.published && !isCurrent && (
                <div className="pillar-tile-status">coming soon</div>
              )}
            </div>
          );

          // Wrap in Link only if published, not current, and slug exists
          if (pillar.published && !isCurrent && pillar.slug) {
            return (
              <Link
                key={pillar.position}
                to={`/blog/${pillar.slug}`}
                data-cursor-hover
                className="pillar-tile-link"
              >
                {tileInner}
              </Link>
            );
          }

          return (
            <div key={pillar.position} className="pillar-tile-wrapper">
              {tileInner}
            </div>
          );
        })}
      </div>
    </div>
  );
}

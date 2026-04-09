import { Link } from 'react-router-dom';

export default function AuthorCard() {
  return (
    <div className="blog-author-card">
      <img src="/images/mike-vera-profile.png" alt="Mike Vera" className="blog-author-avatar" />
      <div className="blog-author-info">
        <h4>Written by Mike Vera</h4>
        <p>
          NBC-HWC Certified Health & Wellness Coach. Psychology degree from Temple University.
          Master's in Exercise Science. Helping people with hyperhidrosis address the pattern underneath.
        </p>
      </div>
      <Link to="/work-with-me" className="cta-btn-secondary" data-cursor-hover>
        Work With Me
      </Link>
    </div>
  );
}

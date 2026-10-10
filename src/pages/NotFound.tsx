import { Link } from 'react-router-dom';
import SeoHead from '../components/seo/SeoHead';

export default function NotFound() {
  return (
    <div>
      <SeoHead
        title="Page not found"
        description="That page doesn't exist. Head back to the blog or the home page."
        path="/404"
      />
      <meta name="robots" content="noindex" />
      <section className="blog-hero">
        <div className="section-inner">
          <div className="section-label">404</div>
          <h1 className="blog-hero-title">That page doesn't exist</h1>
          <p className="blog-hero-sub">
            The link may be old or mistyped. Try the <Link to="/blog">blog</Link> or go back{' '}
            <Link to="/">home</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}

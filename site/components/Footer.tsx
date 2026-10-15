import Link from "next/link";
import { areas, services } from "@/lib/data";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <div className="logo">{site.name}<span>Columbus, Ohio</span></div>
            <ul>
              <li><a href={site.phoneHref}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li>{site.address}</li>
              <li>{site.hours}</li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><Link href={`/roofing-services/${s.slug}`}>{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Service Areas</h4>
            <ul>
              {areas.map((a) => (
                <li key={a.slug}><Link href={`/locations/${a.slug}`}>{a.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/projects">Projects</Link></li>
              <li><Link href="/reviews">Reviews</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/blog/faqs">FAQs</Link></li>
              <li><Link href="/contact-us">Contact</Link></li>
              <li><Link href="/request-estimate">Request an Estimate</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}

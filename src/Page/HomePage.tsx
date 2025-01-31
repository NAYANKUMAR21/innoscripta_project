import { Link } from 'react-router';

const links = [
  {
    to: '/Source/VITE_GUARDIAN_API_KEY/VITE_GUARDIAN_API',
    label: 'Guardian',
    tag: 'Always factual',
  },
  {
    to: '/Source/VITE_NYT_API_KEY/VITE_NYT_API',
    label: 'New York Time',
    tag: "All the News That's Fit to Print.",
  },
  {
    to: '/Source/VITE_NEWS_API_KEY/VITE_NEWS_API',
    label: 'News API',
    tag: 'Always factual',
  },
];

function HomePage() {
  return (
    <div>
      <ul className="max-w-[1400px] mx-auto grid grid-cols-3 justify-between">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to}>
              <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-24">
                <img
                  src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
                  alt="University of Southern California"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-3xl font-bold text-white">
                  {link.label}
                </h3>
                <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                  {link.tag}
                </div>
              </article>
              {/* {link.label} */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default HomePage;

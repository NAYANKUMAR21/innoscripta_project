import React from 'react';

export type Article = {
  title: string;
  source: string;
  publishedAt: string;
  url: string;
  image?: string;
  category?: string;
};

export interface NewsCardProps {
  article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  if (
    !article ||
    !article.title ||
    !article.url ||
    !article.source ||
    !article.publishedAt
  ) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      {/* {article.image && (
        <>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        </>
      )} */}
      <div className="p-4">
        {/* New category display */}
        {article.category && (
          <span className="inline-block bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
            {article.category}
          </span>
        )}
        <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
        <p className="text-sm text-gray-500">
          {article.source} •{' '}
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
        <div className="mt-4">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

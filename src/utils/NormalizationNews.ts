export default function NormalizeNewsArticle(
  article: {
    // Common fields
    title?: string;
    webTitle?: string;
    publishedAt?: string;
    webPublicationDate?: string;
    updated_date?: string;
    url?: string;
    webUrl?: string;
    urlToImage?: string;
    multimedia?: { url: string }[];

    // NYT specific fields
    abstract?: string;
    web_url?: string;
    snippet?: string;
    lead_paragraph?: string;
    print_section?: string;
    print_page?: string;
    pub_date?: string;
    document_type?: string;
    type?: string;
    news_desk?: string;
    section_name?: string;
    word_count?: number;
    _id?: string;
    uri?: string;
    headline?: {
      main?: string;
      print_headline?: string;
    };

    // Guardian specific fields
    id?: string;
    sectionId?: string;
    sectionName?: string;
    apiUrl?: string;
    isHosted?: boolean;
    pillarId?: string;
    pillarName?: string;

    // NewsAPI specific fields
    source?: {
      id: string | null;
      name: string;
    };
    author?: string;
    description?: string;
    content?: string;
  },
  source: string,
  category: string
) {
  return {
    // Core fields
    title:
      article.title ||
      article.webTitle ||
      article.headline?.main ||
      article.abstract,

    source: source || article.source?.name || article.pillarName,

    publishedAt:
      article.publishedAt ||
      article.webPublicationDate ||
      article.updated_date ||
      article.pub_date,

    url: article.url || article.webUrl || article.web_url || article.apiUrl,

    image: article.urlToImage || (article.multimedia?.[0]?.url ?? null),

    category:
      category ||
      article.section_name ||
      article.sectionName ||
      article.news_desk ||
      article.pillarName,

    // Enhanced metadata
    snippet:
      article.snippet ||
      article.description ||
      article.lead_paragraph ||
      article.abstract ||
      article.content,

    articleId: article._id || article.uri || article.id,

    // Additional metadata
    wordCount: article.word_count,
    author: article.author,

    printDetails:
      article.print_section && article.print_page
        ? {
            section: article.print_section,
            page: article.print_page,
          }
        : null,

    documentType: article.document_type || article.type,

    sourceMetadata: {
      isHosted: article.isHosted,
      pillarId: article.pillarId,

      sourceId: article.source?.id,

      sectionId: article.sectionId,
    },
  };
}

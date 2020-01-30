interface Frontmatter {
  date: string;
  title: string;
  category: string;
  tags: string[];
  banner?: string;
  excerpt: string;
  slug?: string;
}

export default Frontmatter;

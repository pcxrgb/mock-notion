export type DocType = "Document" | "List" | "Database";
export type RecentDoc = {
  title: string;
  type: DocType;
  lastAccessed: Date;
};

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};

export const documents: RecentDoc[] = [
  { title: "Q3 Product Development …", type: "Document", lastAccessed: daysAgo(0) },
  { title: "Feature Specification …", type: "Document", lastAccessed: daysAgo(1) },
  { title: "Product Roadmap Q1 …", type: "Document", lastAccessed: daysAgo(2) },
  { title: "User Flow & Interaction …", type: "List", lastAccessed: daysAgo(3) },
  { title: "Company Database Overview", type: "Database", lastAccessed: daysAgo(12) },
];

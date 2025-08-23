export type Project = {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  code?: string;
  demo?: string;
};
export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  url?: string;
  image?: string;
};
export type Experience = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

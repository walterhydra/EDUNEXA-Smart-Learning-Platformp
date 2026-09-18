
export interface Mentor {
  id: string;
  name: string;
  email: string;
  image: string;
  contactNumber: string;
  bio: string;
  skills: string[];
  expertise: string[];
  background: string;
  rate: string;
  available: boolean;
}

export const mentors: Mentor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    contactNumber: "+1 (555) 123-4567",
    bio: "Experienced tech leader with 15+ years in software development and engineering management. Passionate about helping aspiring developers advance their careers.",
    skills: ["Software Development", "Leadership", "Career Planning"],
    expertise: ["Web Development", "Machine Learning", "Engineering Management"],
    background: "Ph.D. in Computer Science, Former CTO at TechGrowth, 15+ years in the industry",
    rate: "$150/hour",
    available: true
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    contactNumber: "+1 (555) 234-5678",
    bio: "Product Manager with experience at Fortune 500 companies and startups. Specializing in product strategy and market research.",
    skills: ["Product Management", "Market Research", "UX Design"],
    expertise: ["Product Strategy", "Growth Hacking", "User Research"],
    background: "MBA from Stanford, 10+ years in Product Management at top tech companies",
    rate: "$125/hour",
    available: true
  },
  {
    id: "3",
    name: "Ava Williams",
    email: "ava.williams@example.com",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    contactNumber: "+1 (555) 345-6789",
    bio: "Data Scientist with expertise in AI and machine learning. Helping professionals transition into data science careers.",
    skills: ["Data Science", "Machine Learning", "Statistical Analysis"],
    expertise: ["Python", "Data Visualization", "Predictive Modeling"],
    background: "M.S. in Statistics, 8+ years working with data in healthcare and finance",
    rate: "$140/hour",
    available: false
  },
  {
    id: "4",
    name: "James Rodriguez",
    email: "james.rodriguez@example.com",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    contactNumber: "+1 (555) 456-7890",
    bio: "Marketing executive with background in digital marketing and brand strategy. Helping professionals develop their marketing skills.",
    skills: ["Digital Marketing", "Content Strategy", "SEO"],
    expertise: ["Social Media Marketing", "Growth Marketing", "Brand Development"],
    background: "Former CMO at GrowthBrand, 12+ years in marketing leadership",
    rate: "$120/hour",
    available: true
  },
  {
    id: "5",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    contactNumber: "+1 (555) 567-8901",
    bio: "UX Designer with a focus on user research and accessible design. Helping designers advance their careers and build impressive portfolios.",
    skills: ["UX Design", "User Research", "Accessibility"],
    expertise: ["Figma", "Usability Testing", "Design Systems"],
    background: "MFA in Design, Previously Design Lead at DesignWorks",
    rate: "$135/hour",
    available: true
  },
  {
    id: "6",
    name: "Robert Chang",
    email: "robert.chang@example.com",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    contactNumber: "+1 (555) 678-9012",
    bio: "Finance professional with experience in investment banking and financial planning. Helping individuals with career transitions in finance.",
    skills: ["Financial Analysis", "Investment Banking", "Career Transitions"],
    expertise: ["Financial Modeling", "Venture Capital", "Investment Strategy"],
    background: "MBA in Finance, 15+ years in investment banking and VC",
    rate: "$160/hour",
    available: false
  }
];

export type Category =
  | "Health"
  | "Agriculture"
  | "Education"
  | "E-commerce"
  | "AI Tools"
  | "Finance"
  | "Other";

export interface Project {
  name: string;
  student: string;
  url: string;
  slug: string;
  category: Category;
}

const RAW: Omit<Project, "category">[] = [
  { name: "Scoopella", student: "Nusrat Jahan", url: "https://scoop-sweet-smooth.lovable.app", slug: "scoopella" },
  { name: "CodeSense AI", student: "A. K. M. Masudur Rahman", url: "https://codesenseai.lovable.app", slug: "codesense-ai" },
  { name: "Voyagra", student: "Mst. Eshrat Jahan Esha", url: "https://your-ai-journey-architect.lovable.app/", slug: "voyagra" },
  { name: "FoodFusion", student: "Most. Mahafuza Afrose", url: "https://flavor-whiz.lovable.app/", slug: "foodfusion" },
  { name: "Gear Quest Pro", student: "G M Fakhrul Islam", url: "https://gear-quest-pro.lovable.app", slug: "gear-quest-pro" },
  { name: "Storyweave AI", student: "Nahid Hasan Arif", url: "https://child-story-weave-ai.lovable.app/", slug: "storyweave-ai" },
  { name: "LuminaLink", student: "Md. Shoyeb-Ur-Rahman Mallik", url: "https://bandwidth-bridge-mallik.lovable.app", slug: "luminalink" },
  { name: "Ayat Aid", student: "Md. Labib Ahsan", url: "https://ayat-aid-ai.lovable.app/", slug: "ayat-aid" },
  { name: "Inside Your Mind", student: "Sarah Jebin Lithe", url: "https://inside-my-mind.lovable.app/", slug: "inside-your-mind" },
  { name: "DailyHisab", student: "Md. Tanvirul Islam", url: "https://mealhisab.lovable.app/", slug: "dailyhisab" },
  { name: "ThreadTrust", student: "Tanvir Fatemi", url: "https://threadtrust.lovable.app/", slug: "threadtrust" },
  { name: "Cartify", student: "Suvo Luxmi Ghosh", url: "https://cartify-super-shop.lovable.app", slug: "cartify" },
  { name: "AgroBridge BD", student: "Umme Sabicun Shila Sabrina", url: "https://agrobridge-bd-connect.lovable.app", slug: "agrobridge-bd" },
  { name: "VECTRA INTERIORS", student: "Md. Abdullah", url: "https://room-sync-ar.lovable.app/", slug: "vectra-interiors" },
  { name: "Vital Campus", student: "Tamzid Shafaiat", url: "https://smart-university-health-system.lovable.app", slug: "vital-campus" },
  { name: "CurioStream", student: "Sumiya Naznin Haque", url: "https://spatial-zen-gallery.lovable.app/", slug: "curiostream" },
  { name: "Automobile Manufacturing", student: "Md. Robius Sany Siam", url: "https://veloce-dynamics.lovable.app/", slug: "automobile-manufacturing" },
  { name: "Health Monitored", student: "Nibadita Roy Nipa", url: "https://helthmonitored.lovable.app", slug: "health-monitored" },
  { name: "Study Planner", student: "Swapnil Sett", url: "https://crisp-study-plan.lovable.app/dashboard", slug: "study-planner" },
  { name: "TalentForge", student: "Masuma Sadia Sagota", url: "https://nexus-talent-engine.lovable.app", slug: "talentforge" },
  { name: "MediMate", student: "MST. Sumya Jafrin", url: "https://medimatehealthcompanion.lovable.app", slug: "medimate" },
  { name: "Fast Courier Service", student: "Tanvir Hasan Priom", url: "https://priom-fast-courier.lovable.app", slug: "fast-courier-service" },
  { name: "Urban Living Concierge", student: "Nazmun Naher Anika", url: "https://urbanharvest-ai-concierge.lovable.app/", slug: "urban-living-concierge" },
  { name: "FoodSnap", student: "Maisha Tasfia", url: "https://palate-pointers.lovable.app", slug: "foodsnap" },
  { name: "Medichine Idea", student: "Shidhanto Kundu", url: "https://medichine-idea-engine-48.lovable.app/", slug: "medichine-idea" },
  { name: "AgroSync AI", student: "Abdul Kaium Ahmed Sumon", url: "https://agrosyncai.lovable.app/", slug: "agrosync-ai" },
  { name: "UniSys", student: "Ariful Islam Nobin", url: "https://oneunisys.lovable.app/", slug: "unisys" },
  { name: "FreshCart", student: "MD EMAM MASUM", url: "https://freshcart-220201056-masum-3.lovable.app/", slug: "freshcart" },
  { name: "Password Manager", student: "Md Mominul Islam", url: "https://smart-password-manager4.lovable.app", slug: "password-manager" },
  { name: "BazaarBD", student: "Zihan Hossain", url: "https://shuru-dhaka-shop.lovable.app/", slug: "bazaarbd" },
  { name: "MediSync AI", student: "Miftahul Jannat", url: "https://medimind-link.lovable.app", slug: "medisync-ai" },
  { name: "Rentify", student: "Syed Rifat", url: "https://rentify-q.lovable.app", slug: "rentify" },
  { name: "Noorbazaar", student: "Jannatul suraiya", url: "https://noorbazaar-aura-boutique.lovable.app", slug: "noorbazaar" },
];

const RULES: [Category, string[]][] = [
  ["Health", ["medi", "health", "vital", "hospital", "mind"]],
  ["Agriculture", ["agro", "farm", "harvest", "crop"]],
  ["Education", ["study", "university", "campus", "unisys", "academy", "coaching", "admission"]],
  ["E-commerce", ["shop", "cart", "store", "bazaar", "grocery", "courier", "rentify", "food", "gear", "scoop", "hair", "noorbazar"]],
  ["AI Tools", ["ai", "codesense", "storyweave", "talentforge", "curiostream"]],
  ["Finance", ["hisab", "password", "finance", "budget"]],
];

function categorize(name: string): Category {
  const n = name.toLowerCase();
  for (const [cat, kws] of RULES) {
    if (kws.some((k) => n.includes(k))) return cat;
  }
  return "Other";
}

export const PROJECTS: Project[] = RAW.map((p) => ({ ...p, category: categorize(p.name) }));

export const CATEGORIES: ("All" | Category)[] = [
  "All",
  "Health",
  "Agriculture",
  "Education",
  "E-commerce",
  "AI Tools",
  "Finance",
  "Other",
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Health: "bg-rose-50 text-rose-700 ring-rose-200",
  Agriculture: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Education: "bg-amber-50 text-amber-700 ring-amber-200",
  "E-commerce": "bg-blue-50 text-blue-700 ring-blue-200",
  "AI Tools": "bg-indigo-50 text-indigo-700 ring-indigo-200",
  Finance: "bg-teal-50 text-teal-700 ring-teal-200",
  Other: "bg-gray-100 text-gray-700 ring-gray-200",
};

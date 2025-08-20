export interface SkillSection {
  title: string;
  skills: string;
}

export interface UserProfile {
  username: string;
  avatar: string;
  bio: string;
  skillSections: SkillSection[];
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  light: string;
}

import { LucideIcon } from "lucide-react";

export interface ServiceItem {
  title: string;
  subtitle: string;
  description?: string;
  items: string[];
  icon: LucideIcon;
  image: string;
  gallery?: string[];
}

export interface ValueItem {
  title: string;
  englishTitle: string;
  icon: LucideIcon;
}

export interface WorkflowStep {
  step: number;
  title: string;
  englishTitle: string;
  description: string;
  englishDesc: string;
  icon: LucideIcon;
}
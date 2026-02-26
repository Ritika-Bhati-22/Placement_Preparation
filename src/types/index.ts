export interface Message {
  type: "user" | "ai";
  text: string;
}

export interface DSAProblem {
  t: string;
  s: string;
  diff: string;
  topic: string;
  p: string;
  c: string;
}

export interface PrepQuestion {
  c: string;
  t: string;
  a: string;
}

export interface PrepTopic {
  title: string;
  qs: PrepQuestion[];
}

export interface StatCardProps {
  label: string;
  value: string | number;
  change: string;
  color: "blue" | "purple" | "green" | "amber" | "red";
}

export interface InfoBoxProps {
  color: "blue" | "green" | "amber" | "red" | "purple";
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export interface BtnProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "purple" | "green";
  onClick?: () => void;
  style?: React.CSSProperties;
  full?: boolean;
}

export interface ChipProps {
  children: React.ReactNode;
  color?: string;
  borderColor?: string;
  onClick?: () => void;
}

export interface TabsProps {
  items: string[];
  active: string;
  onChange: (tab: string) => void;
}

export interface RingChartProps {
  value: number;
  color: string;
  size?: number;
}

export interface MCQQuestionProps {
  tags: [string, string][];
  q: string;
  opts: string[];
  correct: number;
  onAnswer: (correct: boolean) => void;
}

export interface NavProps {
  active: string;
  onNav: (page: string) => void;
}

export interface SidebarProps {
  active: string;
  onNav: (page: string) => void;
}
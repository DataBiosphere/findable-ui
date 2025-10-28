interface BaseFrontmatterProps {
  description: string;
  hidden?: boolean;
  title: string;
}

export type FrontmatterProps<F extends object> = BaseFrontmatterProps & F;

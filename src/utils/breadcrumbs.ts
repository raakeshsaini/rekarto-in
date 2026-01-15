type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbConfig = {
  type: "blog" | "city" | "concept";
  title: string;
  slug?: string;
};

export function buildBreadcrumbs(config: BreadcrumbConfig): Crumb[] {
  const base: Crumb[] = [{ label: "Home", href: "/" }];

  switch (config.type) {
    case "blog":
      return [
        ...base,
        { label: "Blog", href: "/blog" },
        { label: config.title },
      ];

    case "city":
      return [
        ...base,
        { label: "Cities", href: "/find-city-partner" },
        { label: config.title },
      ];

    case "concept":
      return [
        ...base,
        { label: "Concepts", href: "/concept" },
        { label: config.title },
      ];

    default:
      return base;
  }
}

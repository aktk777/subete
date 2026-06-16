// tools/<slug>/content.mdx を React コンポーネントとして import するための型宣言。
declare module "*.mdx" {
  import type { ComponentType } from "react";
  const MDXComponent: ComponentType;
  export default MDXComponent;
}
declare module "*.md" {
  import type { ComponentType } from "react";
  const MDXComponent: ComponentType;
  export default MDXComponent;
}

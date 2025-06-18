import { type ComponentProps } from "react";

const PageContainer = ({ children }: ComponentProps<"main">) => {
  return (
    <main className="px-4 md:px-5 py-4 md:py-5 overflow-x-hidden">
      <a id="main_content" />
      {children}
    </main>
  );
};

export default PageContainer;

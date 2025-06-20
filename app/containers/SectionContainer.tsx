import type { SectionContainerProps } from "~/types/container.types";
const sectionVariantMap = {
  SECTION: "border-b-2 text-xl sm:text-2xl mb-3 ",
  PAGE: "font-medium text-3xl capitalize first-letter:text-4xl",
};
const SectionContainer = ({
  header,
  children,
  className = "",
  variant = "SECTION",
}: SectionContainerProps) => {
  return (
    <section className={`pb-4 ${className}`}>
      {header ? (
        <h1 className={`pb-1 ${sectionVariantMap[variant]}`}>{header}</h1>
      ) : null}
      {children}
    </section>
  );
};

export default SectionContainer;

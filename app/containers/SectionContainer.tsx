import type { SectionContainerProps } from "~/types/common.type";

const SectionContainer = ({
  header,
  children,
  className = "",
}: SectionContainerProps) => {
  return (
    <section className={`pb-4 ${className}`}>
      {header ? (
        <h1 className="mb-3 pb-1 border-b-2 text-2xl">{header}</h1>
      ) : null}
      {children}
    </section>
  );
};

export default SectionContainer;

import { Fragment } from "react/jsx-runtime";

const Loader = ({ variant }: { variant: "SECTION" | "SINGLE" }) => {
  return (
    <Fragment>
      {variant === "SECTION" ? (
        <div className="flex flex-col gap-2">
          <div className="mb-1 border-b-2 border-b-black">
            <div className="bg-stone-300 mb-3 rounded-md w-16 h-6 animate-pulse" />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <div className="bg-stone-300 mb-1 rounded-md w-14 h-4 animate-pulse" />
              <div className="bg-stone-300 rounded-md w-18 h-3 animate-pulse" />
            </div>
            <div>
              <div className="bg-stone-300 mb-1 rounded-md w-14 h-4 animate-pulse" />
              <div className="bg-stone-300 rounded-md w-18 h-3 animate-pulse" />
            </div>
          </div>
        </div>
      ) : null}
      {variant === "SINGLE" ? (
        <div className="bg-stone-300 rounded-md w-20 h-4 animate-pulse" />
      ) : null}
    </Fragment>
  );
};

export default Loader;

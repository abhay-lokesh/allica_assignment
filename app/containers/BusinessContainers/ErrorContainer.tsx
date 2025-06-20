import { CloudAlert } from "lucide-react";

const ErrorContainer = ({
  error,
}: {
  error: { type: string; message: string };
}) => {
  return (
    <section className="flex flex-col justify-center items-center gap-2 w-full h-[80vh]">
      <CloudAlert color="red" size={36} />
      <p className="text-lg">{error?.message}</p>
    </section>
  );
};

export default ErrorContainer;

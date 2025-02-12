import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Loader className="animate-spin" />
    </div>
  );
};

export default Loading;

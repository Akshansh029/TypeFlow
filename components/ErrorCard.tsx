import { CardWrapper } from "./CardWrapper";
import { FaExclamationTriangle } from "react-icons/fa";

export const ErrorCard = () => {
  return (
    <CardWrapper
      heading="Error"
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-center">
        <FaExclamationTriangle className="w-10 h-10 text-destructive" />
      </div>
    </CardWrapper>
  );
};

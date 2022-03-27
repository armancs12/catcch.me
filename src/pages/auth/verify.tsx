import { asUnauthenticated } from "@client/auth";
import Box from "@client/components/Box";

const VerifyPage = () => {
  return (
    <Box
      title="Check your email"
      description="A sign in link has been sent to your email address."
    />
  );
};

export default asUnauthenticated(VerifyPage);

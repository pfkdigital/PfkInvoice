import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PFK Invoice | Sign Up Page",
  description: "Sign up to PFK Invoice",
};

export default function Page() {
  return (
    <div
      className={"w-full h-screen flex justify-center items-center bg-navyBlue"}
    >
      <SignUp
        appearance={{
          elements: {
            card: {
              backgroundColor: "#16181F",
            },
            formFieldInput: {
              backgroundColor: "#121318",
            },
            formButtonPrimary: {
              backgroundColor: "#0084FF",
              "&:hover": {
                backgroundColor: "#00519D",
              },
            },
            footerActionText: {
              color: "#C7C7C7",
            },
            footerActionLink: {
              color: "#0084FF",
              "&:hover": {
                color: "#00519D",
              },
            },
            headerTitle: {
              color: "#FFFFFF",
            },
            headerSubtitle: {
              color: "#C7C7C7",
            },
            socialButtons: {},
          },
        }}
      />
    </div>
  );
}

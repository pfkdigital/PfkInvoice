import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/alert-dialog";
import { Button } from "@/components/button";
import Image from "next/image";
import { SignOutButton, useClerk } from "@clerk/nextjs";

const SignOutIcon = () => {
  const { signOut } = useClerk();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <Image
            src={"/logout.svg"}
            alt={"logout-icon"}
            width={24}
            height={18}
            className={"cursor-pointer"}
          />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to sign out ?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={""}>Cancel</AlertDialogCancel>
          <SignOutButton signOutCallback={() => signOut()}>
            <AlertDialogAction>Sign out</AlertDialogAction>
          </SignOutButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignOutIcon;

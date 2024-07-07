"use client";

import { Button } from "@/components/button";
import { toast } from "sonner";
import GoBackIcon from "@/ui/GoBackIcon/GoBackIcon";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import EditIcon from "../../../public/edit.svg";
import { useRouter } from "next/navigation";

type ClientTitleBarProps = {
  type: "create" | "edit" | "view";
  clientId?: number;
};

const ClientTitleBar = ({ type, clientId }: ClientTitleBarProps) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const isViewMode = type === "view";
  const isEditMode = type === "edit";
  const goBackLinkHref = isEditMode ? `/clients/${clientId}` : "/clients";

  useEffect(() => {
    let titlePrefix = "";
    if (isViewMode) {
      titlePrefix = `Client ${clientId}`;
    } else if (isEditMode) {
      titlePrefix = `Edit Client`;
    } else {
      titlePrefix = "Create Client";
    }
    setTitle(titlePrefix);
  }, [type, clientId, isViewMode, isEditMode]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/clients/${clientId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      toast.success(result.message);
    } catch (error) {
      console.error(error);
      toast.error(
        "An error occurred while deleting the client. Please try again.",
      );
    }
    router.push("/clients");
  };

  return (
    <div className="py-4 flex justify-start items-center">
      <GoBackIcon href={goBackLinkHref} />
      <p className="text-cloudGray text-s text-lg w-auto">{title}</p>
      <div className="ml-auto flex items-center md:flex md:justify-end">
        {type !== "view" && (
          <Button type="submit" size="sm" form="client-form">
            Save
          </Button>
        )}
        {isEditMode && (
          <Button
            className={"ml-2.5"}
            variant="destructive"
            size="sm"
            onClick={handleDelete}
          >
            <span className="text-snowWhite">Delete</span>
          </Button>
        )}
        {isViewMode && (
          <Link
            href={`/clients/edit/${clientId}`}
            className={"ml-auto md:w-[91px] md:flex md:justify-center"}
          >
            <Button>
              <Image
                src={EditIcon}
                alt={"edit-icon"}
                width={15}
                height={15}
                className={"mr-2"}
              />
              Edit
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ClientTitleBar;

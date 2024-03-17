"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import GoBackIcon from "@/ui/GoBackIcon/GoBackIcon";
import CancelButton from "@/ui/CancelButton/CancelButton";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import EditIcon from "../../../public/edit.svg";
import { useRouter } from "next/navigation";

type ClientTitleBarProps = {
  type: "create" | "edit" | "view";
  clientId?: number;
  deleted?: boolean;
  setDeleted?: (deleted: boolean) => void;
};

const ClientTitleBar = ({
  deleted,
  setDeleted,
  type,
  clientId,
}: ClientTitleBarProps) => {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const isViewMode = type === "view";
  const isEditMode = type === "edit";
  const goBackLinkHref = `/clients${
    isViewMode || deleted ? "" : `/${clientId}`
  }`;

  useEffect(() => {
    let titlePrefix = "Create Client";
    if (isViewMode) {
      titlePrefix = `Client ${clientId}`;
    } else if (deleted) {
      titlePrefix = `Client ${clientId} Deleted`;
    } else if (isEditMode) {
      titlePrefix = `Edit Client: ${clientId}`;
    }
    setTitle(titlePrefix);
  }, [type, clientId, deleted]);

  const handleClientDelete = async () => {
    try {
      const response = await fetch(`/api/clients/${clientId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      toast.success(result.message);
      setDeleted?.(true);
    } catch (error) {
      toast.error(
        "An error occurred while deleting the client. Please try again.",
      );
    }
    router.push("/clients");
  };

  return (
    <div className="py-4 flex justify-start items-center">
      <GoBackIcon href={goBackLinkHref} />
      <p className="text-cloudGray text-s text-lg md:hidden">
        {type} / {clientId} / {type === "edit" ? "Edit" : "Create"}
      </p>
      <p className="text-cloudGray text-s text-lg w-auto">{title}</p>
      <div className="ml-auto flex items-center md:flex md:justify-end">
        {type !== "view" && (
          <Button
            className="mr-2.5"
            type="submit"
            size="sm"
            form="client-form"
            disabled={deleted}
          >
            Save
          </Button>
        )}
        {isEditMode && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClientDelete}
            disabled={deleted}
          >
            <span className="text-snowWhite">Delete</span>
          </Button>
        )}
        {!isEditMode && !isViewMode && <CancelButton />}
        {isViewMode && (
          <Link
            href={`/clients/edit/${clientId}`}
            className={"ml-auto hidden md:w-[91px] md:flex md:justify-center"}
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

import { memo } from "react";
import Link from "next/link";
import { Button } from "@/components/button";
import Image from "next/image";
import PlusIcon from "@/../public/plus.svg";

const ControlRow = () => (
  <div className="w-full flex justify-between items-center mb-5">
    <div className="w-auto md:w-[100px]">
      <Link href="/clients/new">
        <Button size="sm">
          <Image
            src={PlusIcon}
            alt="Add Client"
            height={15}
            width={15}
            className="mr-[5px]"
          />
          Client
        </Button>
      </Link>
    </div>
  </div>
);

export default memo(ControlRow);

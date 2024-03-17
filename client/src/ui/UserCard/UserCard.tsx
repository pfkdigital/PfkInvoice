import React from "react";
import Image from "next/image";

type UserCardProps = {
  username: string;
  imageUrl: string;
};

function UserCard({ username, imageUrl }: UserCardProps) {
  return (
    <div className={"mb-10"}>
      <div className={"flex"}>
        <div className={"mr-[15px]"}>
          <Image
            src={imageUrl}
            alt={"profile-pics"}
            width={50}
            height={50}
            className={"rounded-full"}
          />
        </div>
        <div>
          <p className={"text-[16px] leading-5 text-snowWhite mb-[5px]"}>
            {username}
          </p>
          <p className={"text-snowWhite text-xs italic"}>Online</p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;

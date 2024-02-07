import React from "react";
import Image from "next/image";

type UserCardProps = {
  userName: string;
  imageUrl: string;
};

function UserCard() {
  return (
    <div className={"mb-10"}>
      <div className={"flex"}>
        <div className={"rounded mr-[15px]"}>
          <Image
            src={"/profilepic.svg"}
            alt={"profile-pics"}
            width={50}
            height={50}
          />
        </div>
        <div>
          <p className={"text-[16px] leading-5 text-snowWhite mb-[5px]"}>
            Nuh Ali
          </p>
          <p className={"text-snowWhite text-xs italic"}>Online</p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;

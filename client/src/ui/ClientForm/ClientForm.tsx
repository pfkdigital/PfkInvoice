"use client";

import React, { useState } from "react";
import { ClientDTOType, ClientWithInvoices } from "@/types/client.types";

type ClientFormProps = {
  id?: number;
  type: "edit" | "create";
  editClient?: (clientId: number, updatedClient: ClientDTOType) => void;
  createClient?: (data: ClientDTOType) => void;
  client?: ClientWithInvoices;
};

const ClientForm = ({
  client,
  id,
  type,
  editClient,
  createClient,
}: ClientFormProps) => {
  // Define a single state object to store form input values
  const [formData, setFormData] = useState<ClientDTOType>({
    clientName: "",
    clientEmail: "",
    clientAddress: {
      street: "",
      city: "",
      postcode: "",
      country: "",
    },
  });

  // Function to handle changes in regular fields
  const handleRegularInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle changes in address fields
  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const addressField = name.replace("clientAddress.", "");
    setFormData({
      ...formData,
      clientAddress: {
        ...formData.clientAddress,
        [addressField]: value,
      },
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "edit" && editClient && id) {
      editClient(id, formData);
    } else if (type === "create" && createClient) {
      createClient(formData);
    }
  };

  return (
    <div className={"px-2.5 md:pb-5 md:px-0"}>
      <form
        action=""
        className={"flex-col"}
        id={"client-form"}
        onSubmit={handleSubmit}
      >
        <div className={"my-1.25 md:hidden"}>
          <p className={"text-base text-cloudGray"}>Client: {id}</p>
        </div>
        <div
          className={
            "grid grid-rows-2 gap-y-1.5 mt-2.5 mb-5 md:grid-cols-2 md:gap-x-7 md:grid-rows-1 md:mb-7"
          }
        >
          <input
            type="text"
            name="clientName"
            placeholder={client.clientName}
            value={formData.clientName}
            onChange={handleRegularInputChange}
            className={
              "rounded-[10px] h-[30px] pl-4 bg-eclipse text-snowWhite text-xs md:bg-midnight md:h-10"
            }
          />
          <input
            type="text"
            name="clientEmail"
            placeholder={client.clientEmail}
            value={formData.clientEmail}
            onChange={handleRegularInputChange}
            className={
              "rounded-[10px] h-[30px] pl-4 bg-eclipse text-snowWhite text-xs md:bg-midnight md:h-10"
            }
          />
        </div>
        <div className={"my-1.25"}>
          <p className={"text-base text-cloudGray"}>Address</p>
        </div>
        <div
          className={
            "grid grid-rows-4 gap-y-1.5 mt-2.5 md:grid-cols-2 md:grid-rows-2 md:gap-x-7 md:gap-y-2.5"
          }
        >
          <input
            type="text"
            name="clientAddress.street"
            placeholder={client.clientAddress.street}
            value={formData.clientAddress.street}
            onChange={handleAddressInputChange}
            className={
              "rounded-[10px] h-[30px] pl-4 bg-eclipse text-snowWhite text-xs md:bg-midnight md:h-10"
            }
          />
          <input
            type="text"
            name="clientAddress.city"
            placeholder={client.clientAddress.city}
            value={formData.clientAddress.city}
            onChange={handleAddressInputChange}
            className={
              "rounded-[10px] h-[30px] pl-4 bg-eclipse text-snowWhite text-xs md:bg-midnight md:h-10"
            }
          />
          <input
            type="text"
            name="clientAddress.postcode"
            placeholder={client.clientAddress.postcode}
            value={formData.clientAddress.postcode}
            onChange={handleAddressInputChange}
            className={
              "rounded-[10px] h-[30px] pl-4 bg-eclipse text-snowWhite text-xs md:bg-midnight md:h-10"
            }
          />
          <input
            type="text"
            name="clientAddress.country"
            placeholder={client.clientAddress.country}
            value={formData.clientAddress.country}
            onChange={handleAddressInputChange}
            className={
              "rounded-[10px] h-[30px] pl-4 bg-eclipse text-snowWhite text-xs md:bg-midnight md:h-10"
            }
          />
        </div>
      </form>
    </div>
  );
};

export default ClientForm;

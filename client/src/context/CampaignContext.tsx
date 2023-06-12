/* eslint-disable @typescript-eslint/no-empty-function */
import { PropsWithChildren, createContext, useContext, useState } from "react";
import {
  useContractWrite,
  useContract,
  useAddress,
  useMetamask,
  SmartContract,
} from "@thirdweb-dev/react";
import { contractAddress } from "../utils/constants";
import { ethers } from "ethers";
import { MetaMaskWallet } from "@thirdweb-dev/wallets";

export type Donation = {};

export type Campaign = CampaignRequest & {
  id?: number;
  owner?: string;
  amountCollected?: string;
  contributors?: string[];
  contributions?: string[];
};

export type CampaignRequest = {
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
};

type CampaignContextType = {
  connect: (
    connectOptions?:
      | {
          chainId?: number | undefined;
        }
      | undefined
  ) => Promise<MetaMaskWallet>;
  address?: string;
  contract?: SmartContract<ethers.BaseContract>;
  getCampaigns: () => Promise<Campaign[]>;
  getUserCampaigns: () => Promise<Campaign[]>;
  createCampaign: (transaction: Campaign) => Promise<void>;
  makeDonation: (pId: string, amount: string) => Promise<void>;
  getDonations: (pId: string) => Promise<Donation[]>;
  // campaigns: Campaign[];
};

const CampaignContext = createContext<CampaignContextType>({
  connect: async (
    connectOptions?:
      | {
          chainId?: number | undefined;
        }
      | undefined
  ) => new MetaMaskWallet({}),
  address: "",
  contract: undefined,
  getUserCampaigns: async () => [],
  getCampaigns: async () => [],
  createCampaign: async () => {},
  makeDonation: async () => {},
  getDonations: async () => [],
  // campaigns: [],
});

export const CampaignProvider = ({ children }: PropsWithChildren) => {
  const { data: contract } = useContract(contractAddress);
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const address = useAddress();
  const connect = useMetamask();

  const saveCampaign = async (request: CampaignRequest) => {
    try {
      console.log("saveCampaign: ", request);
      const response = await createCampaign({
        args: [
          address, // owner
          request.title, // title
          request.description, // description
          ethers.utils.parseUnits(request.target, 18), // target
          new Date(request.deadline).getTime(), // deadline,
          request.image, // image
        ],
      });

      console.log("contract call success", response);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async (): Promise<Campaign[]> => {
    try {
      if (contract) {
        const campaigns = await contract.call("getCampaigns");
        console.log("campaigns: ", campaigns);
        const transformedCampaigns = campaigns.map(
          (campaign: any, i: number) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(
              campaign.amountCollected.toString()
            ),
            image: campaign.image,
            id: i,
            pId: i,
          })
        );
        console.log("Transformed: ", transformedCampaigns);
        // setCampaigns(campaigns);
        return transformedCampaigns;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getUserCampaigns = async (): Promise<Campaign[]> => {
    try {
      const campaigns = await getCampaigns();
      console.log("campaigns: ", campaigns);
      return campaigns.filter(
        (campaign: Campaign) => campaign.owner === address
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const makeDonation = async (pId: string, amount: string): Promise<void> => {
    try {
      if (contract) {
        const response = await contract.call("donateToCampaign", [pId], {
          value: ethers.utils.parseEther(amount),
        });
        console.log("makeDonation Success: ", response);
      }
    } catch (error) {
      console.log("makeDonation Error: ", error);
    }
  };

  const getDonations = async (pId: string) => {
    if (!contract) {
      return [];
    }
    const donations = await contract.call("getDonators", [pId]);
    console.log("getDonations Success: ", donations);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <CampaignContext.Provider
      value={{
        connect,
        address,
        contract,
        getCampaigns,
        // campaigns,
        getUserCampaigns,
        createCampaign: saveCampaign,
        makeDonation,
        getDonations,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaignContext = () => useContext(CampaignContext);

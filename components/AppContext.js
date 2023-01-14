import React, { createContext, useContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import abi from "../constants/abi";
import { ethers } from "ethers";

const integratingContext = createContext();
const injected = new InjectedConnector();

export const IntegratingProvider = ({ children }) => {
  const { active, activate, library: provider } = useWeb3React();
  const [contract, setContract] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    Contract();
  }, [active]);

  const Contract = async () => {
    if (active) {
      const signer = provider.getSigner();
      const contractAddress = "0x6760A450bD7da795471949249e6cE004912bA8B3";
      const contract = new ethers.Contract(contractAddress, abi.abi, signer);
      const wallet = await signer.getAddress();
      setAddress(wallet);
      try {
        setContract(contract);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const connect = async () => {
    try {
      await activate(injected);
    } catch (e) {
      console.log(e.message);
    }
  };

  const publishCampaign = async (form) => {
    try {
      const data = await contract.createCampaign(
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image
      );
    } catch (error) {
      console.log("contract call failed", error);
    }
  };
  const getCampaigns = async () => {
    const campaigns = await contract.getCampaigns();
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));
    return parsedCampaigns;
  };
  const getDonations = async () => {
    const donations = await contract.getDonators("0");
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
  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );
    return filteredCampaigns;
  };
  const donate = async (pId, amount) => {
    try {
      const data = await contract.donateToCampaign(pId, {
        value: ethers.utils.parseEther(amount),
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <integratingContext.Provider
      value={{
        connect,
        active,
        contract,
        createCampaign: publishCampaign,
        address,
        getDonations,
        getCampaigns,
        getUserCampaigns,
        donate,
      }}
    >
      {children}
    </integratingContext.Provider>
  );
};
export const useTasks = () => {
  return useContext(integratingContext);
};

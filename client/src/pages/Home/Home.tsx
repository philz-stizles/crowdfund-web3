import { useCallback, useEffect, useState } from "react";
import { Campaigns } from "../../components";
import { Campaign, useCampaignContext } from "../../context/CampaignContext";

const Home = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { address, contract, getCampaigns } = useCampaignContext();

  const fetchCampaigns = useCallback(async () => {
    try {
      setIsLoading(true);
      const campaigns = await getCampaigns();
      setCampaigns(campaigns);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [address, contract]); // why add address as dependency

  useEffect(() => {
    console.log("Home: ", contract);
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <Campaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;

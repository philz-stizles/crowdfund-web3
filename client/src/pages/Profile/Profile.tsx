import { useCallback, useEffect, useState } from "react";
import { Campaign, useCampaignContext } from "../../context/CampaignContext";
import { Campaigns } from "../../components";

const Profile = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { address, contract, getUserCampaigns } = useCampaignContext();

  const fetchUserCampaigns = useCallback(async () => {
    try {
      setIsLoading(true);
      const campaigns = await getUserCampaigns();
      setCampaigns(campaigns);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [address, contract]); // why add address as dependency

  useEffect(() => {
    if (contract) fetchUserCampaigns();
  }, [address, contract]);

  return (
    <Campaigns
      title="Your Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Profile;

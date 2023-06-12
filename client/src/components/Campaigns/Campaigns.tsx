import { useCallback } from "react";
import { loader } from "../../assets";
import { Campaign } from "../../context/CampaignContext";
import FundCard from "../FundCard/FundCard";
import { useNavigate } from "react-router";

type Props = {
  title: string;
  isLoading: boolean;
  campaigns: Campaign[];
};

const Campaigns = ({ title, isLoading, campaigns }: Props) => {
  const navigate = useNavigate();
  const navigateHandler = useCallback((campaign: Campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  }, []);

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.id}
              {...campaign}
              onClick={navigateHandler.bind(this, campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default Campaigns;

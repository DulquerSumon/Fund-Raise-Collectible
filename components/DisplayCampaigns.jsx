import Link from "next/link";
import React from "react";
import { FundCard } from "../components";
const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src="/loader.svg"
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}
        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet.
          </p>
        )}
        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            // <Link href={`/CampaignDetails/${campaign.title}`}>
            <Link
              key={campaign.id}
              href={{
                pathname: `/campaign-details/${campaign.title}`,
                query: campaign,
              }}
            >
              <FundCard
                key={campaign.id}
                {...campaign}
                // handleClick={() => handleNavigate(campaign)}
                cam={campaign}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;

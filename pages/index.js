import { useState, useEffect } from "react";
import Link from "next/link";
import { SideBar, Navbar, DisplayCampaigns } from "../components";
import { useTasks } from "../components/AppContext";

export default function Home() {
  const { address, contract, active, connect, getCampaigns } = useTasks();
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (active) {
      fetchCampaigns();
    } else {
      connect();
    }
  }, [address, contract]);

  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <SideBar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Link href={`/CampaignDetails/${campaigns.title}`}>
          <DisplayCampaigns
            title="All Campaigns"
            isLoading={isLoading}
            campaigns={campaigns}
          />
        </Link>
      </div>
    </div>
  );
}

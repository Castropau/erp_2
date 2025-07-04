// pages/tabs/[tab].js
"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tab = pathname?.split("/").pop();

  const [activeTab, setActiveTab] = useState("one");

  useEffect(() => {
    if (tab) {
      setActiveTab(tab as string);
    }
  }, [tab]);

  const handleTabClick = (newTab: string) => {
    setActiveTab(newTab);
    router.push(`/tabs/${newTab}`);
  };

  return (
    <div>
      <div className="tab-container">
        <button
          className={activeTab === "one" ? "active" : ""}
          onClick={() => handleTabClick("one")}
        >
          Tab One
        </button>
        <button
          className={activeTab === "two" ? "active" : ""}
          onClick={() => handleTabClick("two")}
        >
          Tab Two
        </button>
      </div>

      <div className="content">
        {activeTab === "one" && <p>Content for Tab One</p>}
        {activeTab === "two" && <p>Content for Tab Two</p>}
      </div>
    </div>
  );
};

export default Page;

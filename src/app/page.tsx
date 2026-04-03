'use client';
import React, { useEffect } from "react";
import TabBar from "../components/TabBar";
import { useDashboardStore } from "../state/dashboardStore";
import RecentList from "../components/RecentList";
import UpcomingEvents from "../components/UpcomingEvents";

export default function HomePage() {
  const { recent, events, loading, load } = useDashboardStore();
  useEffect(() => {
    load();
  }, [load]);
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-auto">
        <div className="h-full w-full flex items-center justify-center">
          <div 
            data-enable-xr="true"
            style={{["--xr-background-material" as any]: "regular"}}
            className="w-screen h-screen p-12 flex flex-col items-center shadow border border-white/10 overflow-hidden"
          >
            <h1 className="text-5xl font-bold text-white">Dashboard</h1>
            <div className="relative mt-6 w-full max-w-[1200px] flex-1 min-h-0 flex flex-col gap-8">
              <RecentList recent={recent} loading={loading} />
              <UpcomingEvents events={events} loading={loading} />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed top-1/2 left-10 -translate-y-1/2">
        <div className="tabbar-overlay">
          <TabBar />
        </div>
      </div>
    </div>
  );
}

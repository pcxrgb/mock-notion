'use client';
import React from "react";
import iconRecent from "../assets/icons/icon-recent.svg";
import avatar from "../assets/images/avatar-default.png";
import type { RecentPage } from "../state/dashboardStore";

type Props = {
  recent: RecentPage[];
  loading: boolean;
};

export default function RecentList({ recent, loading }: Props) {
  return (
    <section>
      <div className="flex items-center gap-2 text-neutral-300">
        <img src={(iconRecent as any).src ?? (iconRecent as any)} alt="" className="w-5 h-5" />
        <p className="text-[17px]">Recently visited</p>
      </div>
      <div className="mt-4 w-full overflow-x-auto pr-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-stretch gap-3 w-max">
          {recent.map((d) => (
            <div
              key={d.id}
              className="shrink-0 rounded-2xl bg-white/10 backdrop-blur p-4 w-[168px] h-[205px] flex flex-col"
            >
              <div className="w-[46px] h-[46px] rounded-xl bg-white/20" />
              <p className="mt-4 ml-1 text-[17px] font-semibold text-white/95 leading-5 w-[140px]">
                {d.title || "Untitled"}
              </p>
              <div className="mt-auto flex items-center justify-between pr-1 pl-1">
                <img
                  src={(avatar as any).src ?? (avatar as any)}
                  alt=""
                  className="w-6 h-6 rounded-full object-cover"
                />
                <p className="text-[17px] font-semibold text-neutral-400 w-[106px] text-right">
                  {new Date(d.lastEdited).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          {loading && recent.length === 0 && (
            <div className="shrink-0 rounded-2xl bg-white/10 backdrop-blur p-4 w-[168px] h-[205px] flex items-center justify-center">
              <p className="text-neutral-300">Loading…</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

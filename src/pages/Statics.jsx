import React, { useContext, useEffect, useState } from "react";
import { useCollection } from "../hooks/useCollection";
import BarChart from "../components/BarChart";
import BarChartCus from "../components/BarChartRev";
import UserStats from "../components/UserStats";
import { GlobalContext } from "../context/useContextGlobal";

export default function Statics() {
    const { user } = useContext(GlobalContext);
    const { data } = useCollection("eda", ["uid", "==", user.uid]);

    // Ma'lumotlarni to'g'ri kelayotganligini tekshirish uchun
    useEffect(() => {
        console.log("Fetched data:", data);
    }, [data]);

    let categories = [];

    if (data && data.length > 0) {
        data.forEach((item) => {
            categories.push(item.category);
        });
    }

    return (
        <div className="flex flex-col max-w-[1400px] mx-auto mt-20 gap-10">
            <h1 className="text-5xl font-bold text-center text-accent">About User </h1>
            <UserStats user={user} />
            <h1 className="text-5xl font-bold text-center text-warning">Statics of Foods </h1>
            <div className="">
                <h1>Foods price stats</h1>
                <BarChart data={data} />
                <BarChartCus categories={categories} />
            </div>
        </div>
    );
}

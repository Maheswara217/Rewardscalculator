import React, { useEffect, useState } from "react";
import AllTransactionsTable from "../AllTransactions";
import CustomerMonthlyRewardsTable from "../CustomerMonthlyRewardsTable";
import TotalRewardsTable from "../TotalRewardsTable";
import { mockData } from "../../utils/data";
import { calculateRewardPoints } from "../../utils/utils";

const mockApiCall = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData);
        }, 1000);
    });
};

const RewardsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [rewards, setRewards] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        mockApiCall().then((data) => {
            setTransactions(data);
            const rewardPoints = calculateRewardPoints(data);
            setRewards(rewardPoints);
            setLoading(false);
        });
    }, []);

    return (
        <div>
            <h1>Customer Rewards Program</h1>
            <AllTransactionsTable transactions={transactions} />
            <CustomerMonthlyRewardsTable rewards={rewards} />
            <TotalRewardsTable rewards={rewards} />

        </div>
    );
};

export default RewardsPage;
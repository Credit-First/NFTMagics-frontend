import React from "react";
import { styled } from "@mui/system";
import {
    Grid,
    Paper,
} from "@mui/material";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import Config from '@/config/app';
import BigNumber from 'bignumber.js';
import { selectPriceHistory } from '@/store/selectors';
import { useSelector } from "react-redux";

const BIG_TEN = new BigNumber(10);

const ChartPaper = styled(Paper)(() => ({
    width: '100%',
    padding: '30px 0px',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))',
    '& .recharts-container': {
        flexGrow: 1,
        overflowY: 'hidden',
    }
}));

function HistoryChart(props: any) {
    const priceHistory = useSelector(selectPriceHistory);
    const { type = 'All' } = props;

    // const data = () => {
    //     const result = [];
    //     for (let i = 0; i < 11; i++) {
    //         const obj = {
    //             duration: "All",
    //             date: new Date(2022, i, 1).toDateString().slice(4),
    //             price: Math.floor(Math.random() * 500) + 30,
    //         };
    //         result.push(obj);
    //     }
    //     for (let i = 0; i < 11; i++) {
    //         const obj = {
    //             duration: "Last 7 Days",
    //             date: new Date(2022, i, 1).toDateString().slice(4),
    //             price: Math.floor(Math.random() * 500) + 30,
    //         };
    //         result.push(obj);
    //     }

    //     return result;
    // };

    function formatDate(date:any) {
        var d = new Date(date);
        if(!date) d = new Date();

        var month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }


    return (
        <div className="history-chart">
            <ChartPaper>
                <div className="recharts-container">
                    <ResponsiveContainer aspect={3} minWidth={100} minHeight={100}>
                        <LineChart
                            data={priceHistory.map((_item: any) => {
                                let price = new BigNumber(0);
                                if(_item.token == '') {
                                    price = new BigNumber(_item.price).multipliedBy(430).div(BIG_TEN.pow(18));
                                }
                                if(_item.token == Config.Token.BNB) {
                                    price = new BigNumber(_item.price).multipliedBy(430).div(BIG_TEN.pow(18));
                                }
                                if(_item.token == Config.Token.AYRA) {
                                    price = new BigNumber(_item.price).multipliedBy(5).div(BIG_TEN.pow(20));
                                    console.log(price.toString())
                                }
                                if(_item.token == Config.Token.ITHD) {
                                    price = new BigNumber(_item.price).multipliedBy(4.2).div(BIG_TEN.pow(20));
                                    console.log(price.toString())
                                }
                                let item = {
                                    duration: 'All',
                                    date: formatDate(_item.date),
                                    price: price.toString() || 0
                                }
                                return item;
                            })}
                            margin={{
                                top: 5,
                                right: 10,
                                left: 10,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="price" stroke="#00887A" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </ChartPaper>
        </div>
    );
}

export default HistoryChart;
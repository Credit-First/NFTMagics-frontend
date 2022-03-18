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
    const { type = 'All Time' } = props;

    const data = () => {
        const result = [];
        for (let i = 0; i < 11; i++) {
            const obj = {
                duration: "All Time",
                date: new Date(2022, i, 1).toDateString().slice(4),
                storage: Math.floor(Math.random() * 500) + 30,
            };
            result.push(obj);
        }
        for (let i = 0; i < 11; i++) {
            const obj = {
                duration: "Last 7 Days",
                date: new Date(2022, i, 1).toDateString().slice(4),
                storage: Math.floor(Math.random() * 500) + 30,
            };
            result.push(obj);
        }
        for (let i = 0; i < 11; i++) {
            const obj = {
                duration: "Last 14 Days",
                date: new Date(2022, i, 1).toDateString().slice(4),
                storage: Math.floor(Math.random() * 500) + 30,
            };
            result.push(obj);
        }
        for (let i = 0; i < 11; i++) {
            const obj = {
                duration: "Last 30 Days",
                date: new Date(2022, i, 1).toDateString().slice(4),
                storage: Math.floor(Math.random() * 500) + 30,
            };
            result.push(obj);
        }
        for (let i = 0; i < 11; i++) {
            const obj = {
                duration: "Last 60 Days",
                date: new Date(2022, i, 1).toDateString().slice(4),
                storage: Math.floor(Math.random() * 500) + 30,
            };
            result.push(obj);
        }

        return result;
    };

    return (
        <div className="history-chart">
            <ChartPaper>
                <div className="recharts-container">
                    <ResponsiveContainer aspect={3} width="99%" minWidth="0">
                        <LineChart
                            data={data().filter((x) => x.duration === type)}
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
                            <Line type="monotone" dataKey="storage" stroke="#00887A" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </ChartPaper>
        </div>
    );
}

export default HistoryChart;
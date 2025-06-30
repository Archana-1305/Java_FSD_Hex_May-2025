import { useEffect, useState } from "react";
import { Chart } from 'primereact/chart';
import axios from "axios";

const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function StatsPieChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const getStats = async () => {
            let response = await axios.get(
                'http://localhost:8080/api/payslips/stats/monthly-approved-netpay',
                { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
            );
            const labels = response.data.map(item =>
                `${monthNames[item.month - 1]} ${item.year}`
            );
            const netPays = response.data.map(item => item.totalNetPay);

            // Custom colors to match your dashboard
            const backgroundColors = [
                "#EAB308", // yellow
                "#3C82F6", // blue
                "#22D3EE", // cyan
                "#A78BFA", // purple
                "#F87171", // red
                "#34D399", // green
                "#818CF8", // indigo
                "#F472B6", // pink
                "#F97316", // orange
                "#2DD4BF", // teal
                "#60A5FA"  // sky
            ].slice(0, labels.length);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        data: netPays,
                        backgroundColor: backgroundColors,
                        borderColor: "#fff",
                        borderWidth: 3
                    }
                ]
            });

            setChartOptions({
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: "#fff",
                            font: {
                                size: 20,
                                weight: 700,
                                family: "inherit"
                            },
                            padding: 24
                        },
                        position: "top",
                        align: "center"
                    }
                }
            });
        };
        getStats();
    }, []);

    return (
        <div
            style={{
                background: "#1A2042",
                borderRadius: "2.2em",
                margin: "2em auto",
                padding: "2.6em 0 2em 0",
                maxWidth: 900,
                minWidth: 340,
                minHeight: 500,
                boxShadow: "0 2px 32px rgba(0,0,0,0.20)",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <h2 style={{
                textAlign: "center",
                marginBottom: "1.5em",
                fontWeight: 700,
                fontSize: "2.2em",
                letterSpacing: "0.02em"
            }}>
                Monthly Net Pay Distribution
            </h2>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                minHeight: 480
            }}>
                <Chart
                    type="pie"
                    data={chartData}
                    options={chartOptions}
                    style={{ width: 340, height: 340, maxWidth: 450, maxHeight: 450, margin: "0 auto" }}
                    className="w-full"
                />
            </div>
        </div>
    );
}

export default StatsPieChart;
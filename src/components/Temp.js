import React, { useEffect, useState } from "react";
import "../styles/stats.css";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../baseUrl";

const Temp = ({ userId }) => {
  const [queryParameters] = useSearchParams();
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  const fetchData = async () => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    let query = queryParameters.get("filter");
    if (query === "none") {
      try {
        const incomeRes = await axios.get(
          `${BASE_URL}/api/income/${userId}?month=${currentYear}-${currentMonth}`
        );
        setIncome(incomeRes.data);
        const expenseRes = await axios.get(
          `${BASE_URL}/api/expense/${userId}?month=${currentYear}-${currentMonth}`
        );
        setExpense(expenseRes.data);
      } catch (err) {
        alert(err.message)
      }
    } else {
      try {
        const incomeRes = await axios.get(
          `${BASE_URL}/api/income/${userId}?${query}`
        );
        setIncome(incomeRes.data);
        const expenseRes = await axios.get(
          `${BASE_URL}/api/expense/${userId}?${query}`
        );
        setExpense(expenseRes.data);
      } catch (err) {
        alert(err.message)
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  var newIncome = new Array(31).fill(0);
  var newExpense = new Array(31).fill(0);

  const [compData, setCompData] = useState({
    labels: Array.from({ length: 31 }, (_, index) => index + 1),
    datasets: [
      {
        label: "Total Income",
        data: newIncome,
      },
    ],
  });
  const [incomeData, setIncomeData] = useState({
    labels: Array.from({ length: 31 }, (_, index) => index + 1),
    datasets: [
      {
        label: "Total Income",
        data: newIncome,
      },
    ],
  });
  const [expenseData, setExpenseData] = useState({
    labels: Array.from({ length: 31 }, (_, index) => index + 1),
    datasets: [
      {
        label: "Total Expense",
        data: newExpense,
      },
    ],
  });

  useEffect(() => {
    income?.map((data) => {
      return (newIncome[data.day - 1] += data.amount);
    });
    expense?.map((data) => {
      return (newExpense[data.day - 1] += data.amount);
    });
    setCompData({
      labels: Array.from({ length: 31 }, (_, index) => index + 1),
      datasets: [
        {
          label: "Total Income",
          data: newIncome,
          backgroundColor: ["#2323ddb7"],
        },
        {
          label: "Total Expense",
          data: newExpense,
          backgroundColor: ["#ff4646"],
        },
      ],
    });
    setIncomeData({
      labels: Array.from({ length: 31 }, (_, index) => index + 1),
      datasets: [
        {
          label: "Total Income",
          data: newIncome,
          backgroundColor: ["#2323ddb7"],
        },
      ],
    });
    setExpenseData({
      labels: Array.from({ length: 31 }, (_, index) => index + 1),
      datasets: [
        {
          label: "Total Expense",
          data: newExpense,
          backgroundColor: ["#ff4646"],
        },
      ],
    });
  }, [income, expense]);

  let totalIncome = 0;
  income.map((i) => {
    return (totalIncome += i.amount);
  });
  let totalExpense = 0;
  expense.map((i) => {
    return (totalExpense += i.amount);
  });

  return (
    <>
      <div className="stats_cont">
        <div className="stats_header">
          <div className="stats_head_inner">
            <p className="head_heading">Income</p>
            <p className="head_content">+₹ {totalIncome}</p>
          </div>
          <div className="stats_head_inner">
            <p className="head_heading">Expense</p>
            <p className="head_content">-₹ {totalExpense}</p>
          </div>
        </div>
        <div className="stats_body">
          <div className="bar_chart">
            <BarChart incomeData={compData} />
          </div>
          <div className="pie_chart">
            <PieChart data={incomeData} name="Income" />
            <PieChart data={expenseData} name="Expense" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Temp;

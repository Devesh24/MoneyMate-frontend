import Notrans from "./Notrans";
import Summary from "./Summary";
import Break from "./Break";
import Category from "./Category";
import Transaction from "./Transaction";
import { useEffect, useState } from "react";
import useCatFetch from "../useCatFetch";
import axios from "axios";
import BASE_URL from "../baseUrl";

const Transactions = ({handleClick, userId, name}) => {

  const { data } = useCatFetch();
  const [period, setPeriod] = useState("current");
  const [filter, setFilter] = useState("none");
  const [filterVal, setFilterVal] = useState("");
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const fetchData = async () => {
    setPeriod("current");
    setFilter("none");
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
      console.log(err);
    }
  };
  const fetchLastMonthData = async () => {
    setPeriod("last");
    setFilter("none");
    try {
      const incomeRes = await axios.get(
        `${BASE_URL}/api/income/${userId}?month=${currentYear}-${
          currentMonth - 1
        }`
      );
      setIncome(incomeRes.data);
      const expenseRes = await axios.get(
        `${BASE_URL}/api/expense/${userId}?month=${currentYear}-${
          currentMonth - 1
        }`
      );
      setExpense(expenseRes.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchFilterData = async () => {
    setPeriod("filter");
    if (filter === "none") {
      alert("No Filter Applied. Please Apply a Filter.");
      return;
    }
    try {
      const incomeRes = await axios.get(
        `${BASE_URL}/api/income/${userId}?${filter}=${filterVal}`
      );
      setIncome(incomeRes.data);
      const expenseRes = await axios.get(
        `${BASE_URL}/api/expense/${userId}?${filter}=${filterVal}`
      );
      setExpense(expenseRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const mergedArray = income.concat(expense).map((obj) => {
    if (income.includes(obj)) {
      obj.type = "income";
    } else {
      obj.type = "expense";
    }
    return obj;
  });

  const sortBycategoryCurr = mergedArray.reduce((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = {
        transactions: [],
        total: 0,
      };
    }
    if (transaction.type === "income") {
      acc[transaction.category].total += transaction.amount;
    } else {
      acc[transaction.category].total -= transaction.amount;
    }
    acc[transaction.category].transactions.push(transaction);
    acc[transaction.category].transactions.sort((a, b) => {
      const date1 = new Date(a.year, a.month - 1, a.day).toLocaleString(
        "en-US"
      );
      const date2 = new Date(b.year, b.month - 1, b.day).toLocaleString(
        "en-US"
      );
      return new Date(date2) - new Date(date1);
    });
    return acc;
  }, {});
  const sortBycategoryCurArray = Object.entries(sortBycategoryCurr).map(
    ([category, transactions]) => ({ category, transactions })
  );

  const activestyle = {
    color: "#9044ee",
    borderBottom: "3px solid #9044ee",
  };

  const [summaryString, setSummaryString] = useState("")
  useEffect(() => {
    if(period === "current")
    {
      setSummaryString(`month=${currentYear}-${currentMonth}`)
    }
    else if(period === "last")
    {
      setSummaryString(`month=${currentYear}-${currentMonth-1}`)
    }
    else
    {
      setSummaryString(`${filter}=${filterVal}`)
    }
  },[period, filterVal])

  return (
    <>
        <div className="trans_cont">
        <div className="trans_period">
          <div
            className="inner_period_btn"
            onClick={fetchLastMonthData}
            style={period === "last" ? activestyle : {}}
          >
            LAST MONTH
          </div>
          <div
            className="inner_period_btn"
            onClick={fetchData}
            style={period === "current" ? activestyle : {}}
          >
            THIS MONTH
          </div>
          <div
            className="inner_period_btn dropdown-center"
            style={period === "filter" ? activestyle : {}}
          >
            <div
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              FILTER ({filterVal})
            </div>
            <div
              className="dropdown-menu accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    Filter by Date
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <label htmlFor="filterdate">Enter the date:</label>
                    <input
                      type="date"
                      name="date"
                      id="filterdate"
                      onChange={(e) => {
                        setFilter("date");
                        setFilterVal(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Filter by Month
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <label htmlFor="filtermonth">Choose the Month:</label>
                    <input
                      type="month"
                      name="month"
                      id="filtermonth"
                      onChange={(e) => {
                        setFilter("month");
                        setFilterVal(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    Filter by Range
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <label htmlFor="filterstart">Choose the StartDate:</label>
                    <input
                      type="date"
                      name="rangestart"
                      id="filterstart"
                      onChange={(e) => console.log(e.target.value)}
                    />
                    <label htmlFor="filterend">Choose the EndDate:</label>
                    <input
                      type="date"
                      name="rangeend"
                      id="filterend"
                      onChange={(e) => console.log(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-2 pe-2 d-flex justify-content-end">
                <button
                  className="btn btn-success"
                  onClick={fetchFilterData}
                  data-bs-toggle="collapse"
                  data-bs-target=".dropdown-menu"
                >
                  APPLY
                </button>
              </div>
            </div>
          </div>
        </div>
        {!income[0] && !expense[0] ? (
          <Notrans />
        ) : (
          <>
            <Summary trans={mergedArray} filter={period==="filter" ? filter : "month"} summaryString={summaryString} />
            {sortBycategoryCurArray.map((val) => {
              const catdata = {
                title: val.category,
                transNo: val.transactions.transactions.length,
                total: val.transactions.total,
                icon: data[0]
                  ? data.find((i) => i.title === val.category).icon
                  : "./assets/icons/icon_138.png",
              };
              return (
                <>
                  <Break title="" />
                  <Category page="trans" data={catdata} />
                  {val.transactions.transactions.map((i) => {
                    return (
                      <Transaction
                        handleClick={handleClick}
                        transData={{ ...i, icon: catdata.icon }}
                        name={name}
                        id={userId}
                      />
                    );
                  })}
                </>
              );
            })}
          </>
        )}
      </div>
    </>
  )
}

export default Transactions
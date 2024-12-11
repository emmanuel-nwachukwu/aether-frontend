import { Table, Tag } from "antd";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/useGlobalContext";
import { endpoints } from "../api/endpoints";

const Transaction = () => {
  const { fetchData, loading, setLoading } = useContext(GlobalContext);
  const [transactions, setTransactions] = useState([]); // State to store fetched data

  const columns = [
    {
      title: "ID",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "Asset",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "description",
      key: "description",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        const date = new Date(text); // Convert to Date object
        const formattedDate = `${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${date
          .getDate()
          .toString()
          .padStart(2, "0")}/${date.getFullYear()}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Amount (USD)",
      dataIndex: "price",
      key: "price",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (orderStatus) => {
        let color;
        if (orderStatus === "completed") {
          color = "green";
        } else if (orderStatus === "failed") {
          color = "volcano";
        } else {
          color = "blue";
        }

        return (
          <Tag color={color} key={orderStatus}>
            {orderStatus.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const fetchedData = await fetchData(endpoints.asset.history);

        // Sort transactions in descending order by createdAt
        const sortedData = fetchedData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setTransactions(sortedData);
        // fetchedData.map((Data) => {
        //   console.log(Data);
        // });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);



  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-10">Transactions</h1>
      <div className="block">
        <Table columns={columns} loading={loading} dataSource={transactions} />
      </div>
    </div>
  );
};

export default Transaction;

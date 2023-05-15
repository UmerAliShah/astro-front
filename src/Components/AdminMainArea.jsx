import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
const AdminMainArea = () => {
  const [keys, setKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [values, setValues] = useState();
  const [status, setStatus] = useState();

  const fetchKeys = async (page = currentPage, view = "", status = "") => {
    const res = await apiClient.get(
      `/codes?page=${page}&status=${`activated`}`
    );
    if (res.status === 200) {
      setKeys(res.data.keys);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
      setValues({
        daily: res.data.totalactivatedToday,
        weekly: res.data.activatedThisWeek,
        monthly: res.data.activatedThisMonth,
        total: res.data.totalActivated,
      });
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handleView = (value) => {
    let status = "activated";
    if (value === "Day") {
      status = "activated&day=true";
    } else if (value === "Week") {
      status = "activated&week=true";
    } else if (value === "Month") {
      status = "activated&month=true";
    }
    fetchKeys(1, status);
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
    fetchKeys(value);
  };

  const renderTableRows = () => {
    return keys.map((key, index) => {
      const originalIndex = index;
      index = (currentPage - 1) * pageSize + originalIndex + 1;
      return (
        <tr key={key._id}>
          <td>{index}</td>
          <td>{key.key}</td>
          <td>{key.batchId.BatchID}</td>
          <td>
            {key.activated ? new Date(key.activated).toLocaleString() : "N/A"}
          </td>
        </tr>
      );
    });
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item${currentPage === i ? " active" : ""}`}
        >
          <a href="#" className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </a>
        </li>
      );
    }
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">{pages}</ul>
      </nav>
    );
  };
  return (
    <>
      <div class="container-fluid my-5">
        <div class="row text-white text-center">
          <div class=" py-5 col-sm fs-3 mx-1 bg-primary">
            <b> Activated Today: {values?.daily}</b>
          </div>
          <div class="py-5 col-sm fs-3 mx-1 bg-primary">
            <b> Activated this week: {values?.weekly}</b>
          </div>
          <div class="py-5 col-sm fs-3 mx-1 bg-primary">
            <b> Activated this month: {values?.monthly}</b>
          </div>
          <div class="py-5 col-sm fs-3 mx-1 text-primary bg-white border border-primary">
            <b>Total Activated: {values?.total}</b>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="d-flex align-items-center justify-content-center">
          <div className="text-center mb-4">
            <button
              className="btn text-primary py-2 mx-2 px-4 border border-primary"
              onClick={() => handleView("Day")}
            >
              <b> Day</b>
            </button>
            <button
              className="btn text-primary py-2 mx-2 px-4 border border-primary"
              onClick={() => handleView("Week")}
            >
              <b> Week</b>
            </button>
            <button
              className="btn text-primary py-2 mx-2 px-4 border border-primary"
              onClick={() => handleView("month")}
            >
              <b> Month</b>
            </button>
          </div>
        </div>
        <table class="table border border-primary">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Key</th>
              <th scope="col">Batch ID</th>
              <th scope="col">Activated</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
        {renderPagination()}
      </div>
    </>
  );
};
export default AdminMainArea;

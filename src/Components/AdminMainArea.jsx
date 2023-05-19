import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import "../App.css";
import * as XLSX from "xlsx/xlsx";
import { Table } from "react-bootstrap";
const AdminMainArea = () => {
  const [keys, setKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [values, setValues] = useState();
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchKeys = async (status) => {
    setLoading(true);
    const res = await apiClient.get(`/codes?status=activated&${status}`);
    if (res.status === 200) {
      setLoading(false);
      setKeys(res.data.keys);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
      setValues({
        daily: res.data.activatedToday,
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
    let status = "";
    if (value === "Day") {
      setActive("day");
      status = "day=true";
    } else if (value === "Week") {
      setActive("week");
      status = "week=true";
    } else if (value === "Month") {
      setActive("month");
      status = "month=true";
    } else if (value === "all") {
      setActive("all");
      status = "";
    }
    fetchKeys(status);
  };

  const exportCodes = () => {
    const data = [["Index", "Verification Code", "Batch ID"]];
    keys?.forEach((code, index) => {
      const rowData = [index + 1, code.key, code.batchId.BatchID];
      data.push(rowData);
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Verification Codes");
    XLSX.writeFile(wb, "verification_codes.xlsx");
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
          <td>{key.batchId?.BatchID}</td>
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
      <div class="container-fluid my-5" style={{ overflowY: "scroll" }}>
        <div class="row text-white">
          <div
            class="col-sm mx-1 text-dark border border-1"
            style={{ background: "#E5E6E7" }}
          >
            <h6 className="pt-1">
              <b>Activated Today:</b>
            </h6>
            <span className="d-flex justify-content-center align-items-center fs-1 py-4">
              <b>{values?.daily || 0}</b>
            </span>
          </div>
          <div
            class="col-sm mx-1 text-dark border border-1"
            style={{ background: "#E5E6E7" }}
          >
            <h6 className="pt-1">
              <b>Activated this week:</b>
            </h6>
            <span className="d-flex justify-content-center align-items-center fs-1 py-4">
              <b> {values?.weekly || 0}</b>
            </span>
          </div>
          <div
            class="col-sm mx-1 text-dark border border-1"
            style={{ background: "#E5E6E7" }}
          >
            <h6 className="pt-1">
              <b>Activated this month:</b>
            </h6>
            <span className="d-flex justify-content-center align-items-center fs-1 py-4">
              <b> {values?.monthly || 0}</b>
            </span>
          </div>
          <div
            class="col-sm mx-1 text-dark border border-1"
            style={{ background: "#E5E6E7" }}
          >
            <h6 className="pt-1">
              <b>Total Activated:</b>
            </h6>
            <span className="d-flex justify-content-center align-items-center fs-1 py-4">
              <b> {values?.total}</b>
            </span>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row align-items-center my-4">
          <div className="col-8 d-flex justify-content-end">
            <button
              className={` btn  py-2 mx-2 px-4 border border-primary ${
                active === "day" ? "active text-light" : "text-primary"
              }`}
              onClick={() => handleView("Day")}
            >
              <b> Day</b>
            </button>
            <button
              className={`btn  py-2 mx-2 px-4 border border-primary ${
                active === "week" ? "active text-light" : "text-primary"
              }`}
              onClick={() => handleView("Week")}
            >
              <b> Week</b>
            </button>
            <button
              className={`btn  py-2 mx-2 px-4 border border-primary ${
                active === "month" ? "active text-light" : "text-primary"
              }`}
              onClick={() => handleView("Month")}
            >
              <b> Month</b>
            </button>
            <button
              className={`btn py-2 mx-2 px-4 border border-primary ${
                active === "all" ? "active text-light" : "text-primary"
              }`}
              onClick={() => handleView("all")}
            >
              <b> All</b>
            </button>
          </div>
          <div className="col-4 d-flex justify-content-end">
            <button
              className={`justify-content-end d-flex btn border border-primary ${
                active === "all" ? "active text-light" : "text-primary"
              }`}
              onClick={() => exportCodes()}
            >
              <b> Export All</b>
            </button>
          </div>
        </div>
        {loading && (
          <div className="d-flex align-items-center justify-content-center">
            <span class="spinner-border" role="status">
              <span class="sr-only"></span>
            </span>
          </div>
        )}
        <Table variant="light" striped bordered hover>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Key</th>
              <th scope="col">Batch ID</th>
              <th scope="col">Activated</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </Table>
        {renderPagination()}
      </div>
    </>
  );
};
export default AdminMainArea;

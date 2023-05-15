import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import * as XLSX from "xlsx/xlsx";

const AllKeys = () => {
  const [keys, setKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("");
  const [status, setStatus] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [products, setProducts] = useState();
  const [flavour, setFlavour] = useState();

  const fetchKeys = async (
    page = currentPage,
    sort = "",
    status = "",
    flavour = ""
  ) => {
    const res = await apiClient.get(
      `/codes?page=${page}&sort=${sort}&status=${status}&flavour=${flavour}`
    );
    if (res.status === 200) {
      setKeys(res.data.keys);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    }
  };

  const fetchProducts = async () => {
    const res = await apiClient.get("/product");
    if (res.status === 200) {
      setProducts(res.data);
    }
  };

  useEffect(() => {
    fetchKeys();
    fetchProducts();
  }, []);

  const handleStatus = (value) => {
    setStatus(value);
    fetchKeys(1, sort, value, flavour);
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
    fetchKeys(value, sort, status, flavour);
  };

  const handleDelete = async (id) => {
    try {
      const response = await apiClient.delete(`/codes/${id}`);
      if (!response.status === 200) {
        throw new Error(response.statusText);
      }
      if (response.status == 200) {
        fetchKeys();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const exportAll = async () => {
    const allKeys = await apiClient.get("/codes/all");
    console.log(allKeys, "allkeys");
    if (allKeys.status === 200) {
      const data = [["Index", "Verification Code", "Batch ID"]];
      allKeys?.data?.forEach((code, index) => {
        const rowData = [index + 1, code.key, code.batchId.BatchID];
        data.push(rowData);
      });
      console.log(data, "data");
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, "Verification Codes");
      XLSX.writeFile(wb, "verification_codes.xlsx");
    }
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
          <td>
            {!key.activated && (
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(key._id)}
              >
                Delete
              </button>
            )}
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
    <div className="container">
      <h2 className="text-center fs-1 mb-3">
        <b>Product Keys</b>
      </h2>
      <div className="d-flex align-items-center justify-content-center">
        <div className="text-center mb-4">
          <button
            className="btn text-primary py-2 mx-2 px-4 border border-primary"
            onClick={() => handleStatus("")}
          >
            <b>All</b>
          </button>
          <button
            className="btn text-primary py-2 mx-2 px-4 border border-primary"
            onClick={() => handleStatus("activated")}
          >
            <b>Activated</b>
          </button>
          <button
            className="btn text-primary py-2 mx-2 px-4 border border-primary"
            onClick={() => handleStatus("unactivated")}
          >
            <b> Unactivated</b>
          </button>
          <select
            className="btn text-primary py-2 mx-2 px-4 border border-primary"
            aria-label="Default select example"
            onChange={(e) => {
              if (e.target.value === "currentPage") {
                exportCodes();
              } else if (e.target.value === "all") {
                exportAll();
              }
            }}
          >
            <option value="currentPage">Export this page only</option>
            <option value="all">Export all</option>
          </select>
        </div>
      </div>
      {products && (
        <select
          class="form-select border border-primary mb-2"
          aria-label="Default select example"
          placeholder="Filter By flavour"
          onChange={(e) => {
            const code = e.target.value;
            fetchKeys(1, "", "", code);
            setFlavour(code);
          }}
        >
          <option selected>Select to filter by category</option>
          {products.map((data, index) => (
            <option value={data.code}>{data?.name}</option>
          ))}
        </select>
      )}
      <table class="table border border-primary">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Key</th>
            <th scope="col">Batch ID</th>
            <th scope="col">Activated</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
      {renderPagination()}
    </div>
  );
};

export default AllKeys;

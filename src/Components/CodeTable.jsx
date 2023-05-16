import { Table } from "react-bootstrap";

const VerificationCodesTable = ({ codes, batchID }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Verification Code</th>
          <th>Batch ID</th>
        </tr>
      </thead>
      <tbody>
        {codes?.map((code, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{code}</td>
            <td>{batchID}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default VerificationCodesTable;

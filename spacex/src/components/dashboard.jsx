import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  Paper
} from "@mui/material";

const Dashboard = () => {
  const [launchesList, setLaunchesList] = useState([]);

  useEffect(() => {
    getAllLaunches();
  }, []);

  const getAllLaunches = () => {
    // Use the fetch API to get data from the SpaceX API
    fetch("https://api.spacexdata.com/v3/launches")
      .then((response) => {
        // Check if the response is OK (status 200–299)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Parse the JSON data
        return response.json();
      })
      .then((data) => {
        // Handle the data received from the API
        console.log(data);
        setLaunchesList(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - launchesList.length) : 0;

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper} sx={{ margin: "20px", padding: "20px" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>No</TableCell>
            <TableCell align="center">Launched (UTC)</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Mission</TableCell>
            <TableCell align="center">Orbit</TableCell>
            <TableCell align="center">Launch Status</TableCell>
            <TableCell align="center">Rocket</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? launchesList.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : launchesList
          ).map((row, i) => (
            <TableRow key={i} hover>
              <TableCell component="th" scope="row">
                {row.flight_number}
              </TableCell>
              <TableCell align="center">
                {new Intl.DateTimeFormat("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false
                })
                  .format(new Date(row.launch_date_utc))
                  .replace(", ", " at ")
                  .replace(":00", "")}
              </TableCell>
              <TableCell align="center">
                {row.launch_site?.site_name}
              </TableCell>
              <TableCell align="center">{row.mission_name}</TableCell>
              <TableCell align="center">
                {row.rocket?.second_stage?.payloads[0]?.orbit}
              </TableCell>
              <TableCell align="center">
                {row.launch_success
                  ? "Success"
                  : row.upcoming
                  ? "Upcoming"
                  : "Failed"}
              </TableCell>
              <TableCell align="center">{row.rocket?.rocket_name}</TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={7} />
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
              colSpan={7}
              count={launchesList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page"
                  },
                  native: true
                }
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default Dashboard;

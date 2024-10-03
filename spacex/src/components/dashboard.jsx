import React, { useEffect, useState } from "react";
import {TableContainer,  Table, TableHead, TableBody, TableRow, TableCell, TableFooter, TablePagination} from "@mui/material";
 

const Dashboard = () => {

    const [launchesList, setLaunchesList] = useState([])

    useEffect(()=>{
        getAllLaunches();
    }, [])

    const getAllLaunches = () => {
        // Use the fetch API to get data from the SpaceX API
        fetch("https://api.spacexdata.com/v3/launches")
          .then((response) => {
            // Check if the response is OK (status 200–299)
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            // Parse the JSON data
            return response.json();
          })
          .then((data) => {
            // Handle the data received from the API
            console.log(data);
            setLaunchesList(data)
            // You can do something with the data here, such as updating the UI
          })
          .catch((error) => {
            // Handle any errors that occur during the fetch
            console.error('There was a problem with the fetch operation:', error);
          });
      };
      

      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
      // Avoid a layout jump when reaching the last page with empty rows.
      const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - launchesList.length) : 0;


        const handleChangeRowsPerPage = (e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          };

          const handleChangePage = (
            event,
            newPage,
          ) => {
            setPage(newPage);
          };

    return (
     
        <TableContainer>
           
            <Table>

                <TableHead>
<TableCell component="th" scope="row">
                No
              </TableCell>
              <TableCell  component="th" scope="row">
              Launched (UTC)
              </TableCell>
              <TableCell  component="th" scope="row">
              Location
              </TableCell>
              <TableCell  component="th" scope="row">
              Mission
              </TableCell>
              <TableCell  component="th" scope="row">
             Orbit
              </TableCell>
              <TableCell  component="th" scope="row">
              Launch Status
              </TableCell>
              <TableCell  component="th" scope="row">
           Rocket
              </TableCell>
              
                </TableHead>
                
                <TableBody>
                {(rowsPerPage > 0
            ? launchesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : launchesList
          ).map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.flight_number}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.launch_date_utc}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.launch_site?.site_name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.mission_name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.rocket?.second_stage?.payloads[0]?.orbit}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.launch_success ? "Success" : row.upcoming? "Upcoming":"Failed"}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.rocket?.rocket_name}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
                </TableBody>
                <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
              colSpan={3}
              count={launchesList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            //   ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
            </Table>
        </TableContainer>
        
    )


}

export default Dashboard;
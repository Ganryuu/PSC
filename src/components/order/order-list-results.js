import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
	Avatar,
	Box,
	Card,
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";

export const OrderListResults = (props) => {
	const { orders, ...rest } = props;
	console.log(orders);
	const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);

	const handleSelectAll = (event) => {
		let newSelectedCustomerIds;

		if (event.target.checked) {
			newSelectedCustomerIds = orders.map((customer) => customer.id);
		} else {
			newSelectedCustomerIds = [];
		}

		setSelectedCustomerIds(newSelectedCustomerIds);
	};

	const handleSelectOne = (event, id) => {
		const selectedIndex = selectedCustomerIds.indexOf(id);
		let newSelectedCustomerIds = [];

		if (selectedIndex === -1) {
			newSelectedCustomerIds = newSelectedCustomerIds.concat(
				selectedCustomerIds,
				id
			);
		} else if (selectedIndex === 0) {
			newSelectedCustomerIds = newSelectedCustomerIds.concat(
				selectedCustomerIds.slice(1)
			);
		} else if (selectedIndex === selectedCustomerIds.length - 1) {
			newSelectedCustomerIds = newSelectedCustomerIds.concat(
				selectedCustomerIds.slice(0, -1)
			);
		} else if (selectedIndex > 0) {
			newSelectedCustomerIds = newSelectedCustomerIds.concat(
				selectedCustomerIds.slice(0, selectedIndex),
				selectedCustomerIds.slice(selectedIndex + 1)
			);
		}

		setSelectedCustomerIds(newSelectedCustomerIds);
	};

	const handleLimitChange = (event) => {
		setLimit(event.target.value);
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	return (
		<Card {...rest}>
			<PerfectScrollbar>
				<Box sx={{ minWidth: 1050 }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox
										checked={selectedCustomerIds.length === orders.length}
										color="primary"
										indeterminate={
											selectedCustomerIds.length > 0 &&
											selectedCustomerIds.length < orders.length
										}
										onChange={handleSelectAll}
									/>
								</TableCell>
								<TableCell>Title</TableCell>
								<TableCell>Description</TableCell>
								<TableCell>Time</TableCell>
								<TableCell>Type</TableCell>
								<TableCell>State</TableCell>
								<TableCell>Urgency</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders.slice(0, limit).map((order) => (
								<TableRow
									hover
									key={order?.id}
									selected={selectedCustomerIds.indexOf(order?.id) !== -1}
								>
									<TableCell padding="checkbox">
										<Checkbox
											checked={selectedCustomerIds.indexOf(order?.id) !== -1}
											onChange={(event) => handleSelectOne(event, order?.id)}
											value="true"
										/>
									</TableCell>
									<TableCell>{order?.title}</TableCell>
									<TableCell>{order?.description}</TableCell>
									<TableCell>{order?.time}</TableCell>
									<TableCell>{order?.type}</TableCell>
									<TableCell>{order?.state}</TableCell>
									<TableCell>{order?.urgency}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>
			<TablePagination
				component="div"
				count={orders.length}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleLimitChange}
				page={page}
				rowsPerPage={limit}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Card>
	);
};

OrderListResults.propTypes = {
	customers: PropTypes.array.isRequired,
};

import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { OrderListResults } from "src/components/order/order-list-results";

function getCustomers() {
	return axios.get("/dilevry-actions");
}

const Customers = () => {
	const [customers, setCustomers] = useState([
		{
			id: uuid(),
			address: {
				country: "USA",
				state: "West Virginia",
				city: "Parkersburg",
				street: "2849 Fulton Street",
			},
			avatarUrl: "/static/images/avatars/avatar_3.png",
			createdAt: 1555016400000,
			email: "ekaterina.tankova@devias.io",
			name: "Ekaterina Tankova",
			phone: "304-428-3097",
		},
	]);

	useEffect(() => {
		getCustomers().then((res) => setCustomers(res.data));
	}, []);

	return (
		<>
			<Head>
				<title>Customers</title>0 c{" "}
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth={false}>
					<CustomerListToolbar />
					<Box sx={{ mt: 3 }}>
						<CustomerListResults customers={customers} />
					</Box>
				</Container>
			</Box>
		</>
	);
};
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;

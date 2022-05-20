import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
	Box,
	Button,
	Checkbox,
	Container,
	FormHelperText,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DashboardLayout } from "src/components/dashboard-layout";
import GMap from "src/components/GMap";

const RequestMedsForm = () => {
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			policy: false,
			urgency: "",
			location: "",
			MedicationName: "",
		},
		validationSchema: Yup.object({
			// policy: Yup.boolean().oneOf([true], "This field must be checked"),
			urgency: Yup.string().max(255).required("Urgency is required"),
			location: Yup.string().max(255).required("Location is required"),
			MedicationName: Yup.string()
				.max(255)
				.required("Medication Name is required"),
		}),
		onSubmit: () => {
			router.push("/");
		},
	});

	return (
		<>
			<Head>
				<title>Request Medication</title>
			</Head>
			<Box
				component="main"
				sx={{
					alignItems: "center",
					display: "flex",
					flexGrow: 1,
					minHeight: "100%",
				}}
			>
				<Container maxWidth="sm">
					<NextLink href="/" passHref>
						<Button
							component="a"
							startIcon={<ArrowBackIcon fontSize="small" />}
						>
							Dashboard
						</Button>
					</NextLink>
					<form onSubmit={formik.handleSubmit}>
						<Box sx={{ my: 3 }}>
							<Typography color="textPrimary" variant="h4">
								Request Medication
							</Typography>
							{/* <Typography color="textSecondary" gutterBottom variant="body2">
								Use your email to create a new account
							</Typography> */}
						</Box>
						<TextField
							error={Boolean(formik.touched.urgency && formik.errors.urgency)}
							fullWidth
							helperText={formik.touched.urgency && formik.errors.urgency}
							label="Urgency"
							margin="normal"
							name="urgency"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.urgency}
							variant="outlined"
						/>
						<TextField
							error={Boolean(formik.touched.location && formik.errors.location)}
							fullWidth
							helperText={formik.touched.location && formik.errors.location}
							label="Location"
							margin="normal"
							name="location"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.location}
							variant="outlined"
						/>
						<TextField
							error={Boolean(
								formik.touched.MedicationName && formik.errors.MedicationName
							)}
							fullWidth
							helperText={
								formik.touched.MedicationName && formik.errors.MedicationName
							}
							label="Medication Name"
							margin="normal"
							name="MedicationName"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							type="MedicationName"
							value={formik.values.MedicationName}
							variant="outlined"
						/>
						<Box
							sx={{
								alignItems: "center",
								display: "flex",
								ml: -1,
							}}
						>
							<Checkbox
								checked={formik.values.policy}
								name="policy"
								onChange={formik.handleChange}
							/>
							<Typography color="textSecondary" variant="body2">
								I have read the{" "}
								<NextLink href="#" passHref>
									<Link color="primary" underline="always" variant="subtitle2">
										Terms and Conditions
									</Link>
								</NextLink>
							</Typography>
						</Box>
						{Boolean(formik.touched.policy && formik.errors.policy) && (
							<FormHelperText error>{formik.errors.policy}</FormHelperText>
						)}
						<Box sx={{ py: 2 }}>
							<Button
								color="primary"
								disabled={formik.isSubmitting}
								fullWidth
								size="large"
								type="submit"
								variant="contained"
							>
								Submit Request
							</Button>
						</Box>
						{/* <Typography color="textSecondary" variant="body2">
							Have an account?{" "}
							<NextLink href="/login" passHref>
								<Link variant="subtitle2" underline="hover">
									Submit Request
								</Link>
							</NextLink>
						</Typography> */}
					</form>
					<GMap />
				</Container>
			</Box>
		</>
	);
};
RequestMedsForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default RequestMedsForm;

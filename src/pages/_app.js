import { CacheProvider } from "@emotion/react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Head from "next/head";
import { theme } from "../theme";
import { createEmotionCache } from "../utils/create-emotion-cache";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/api/";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>Material Kit Pro</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					{getLayout(<Component {...pageProps} />)}
				</ThemeProvider>
			</LocalizationProvider>
		</CacheProvider>
	);
};

export default App;

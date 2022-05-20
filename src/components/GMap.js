import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";

const containerStyle = {
	width: "400px",
	height: "400px",
};

const center = {
	lat: -3.745,
	lng: -38.523,
};

function MyComponent() {
	const [state, setState] = useState();
	return (
		<LoadScript googleMapsApiKey="AIzaSyD-N4w_YzDDKVUf3pLpB28x1ABFRGyzkgE">
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={10}
				onClick={(obj) => {
					setState({
						lat: obj.latLng.lat(),
						lng: obj.latLng.lng(),
					});
				}}
				onDragEnd={(obj) => console.log(obj)}
			>
				<Marker position={state} />
				{/* Child components, such as markers, info windows, etc. */}
				<></>
			</GoogleMap>
		</LoadScript>
	);
}

export default React.memo(MyComponent);

import React, { Suspense } from "react";
import { Route } from "react-router-dom";

import InLineLoader from "../components/InlineLoader";

const PublicRoute: React.FC<any> = ({ children, ...rest }) => {
	return (
		<Route {...rest}>
			<Suspense fallback={<InLineLoader />}>
				{children}
			</Suspense>
		</Route>
	);
}

export default PublicRoute;

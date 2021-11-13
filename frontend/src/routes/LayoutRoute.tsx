import React, { Suspense } from "react";
import { Route } from "react-router-dom";

import InLineLoader from "../components/InlineLoader";
import Layout from "src/containers/Layout";

export default function PublicRoute({ children, ...rest }) {
    return (
        <Route {...rest}>
            <Suspense fallback={<InLineLoader />}>
                <Layout>
                    {children}
                </Layout>
            </Suspense>
        </Route>
    );
}
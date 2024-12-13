import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { DashboardadFactory } from "./sections/dashboard/DashboardFactory";
import { Layaout } from "./sections/layaout/Layaout";
import { GitHubRepositoryDetailFactory } from "./sections/detail/GitHubRepositoryDetailFactory";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layaout />,
		children: [
			{
				path: "/",
				element: <DashboardadFactory/>,
			},
			{
				path: "/repository/:organization/:name",
				element:  GitHubRepositoryDetailFactory.create(),
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}

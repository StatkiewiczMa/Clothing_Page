import { Outlet } from "react-router-dom";

import DirectoryContainer from "../../components/directory/directory.component";

const Home = () => {
	return (
		<div>
			<Outlet />
			<DirectoryContainer />
		</div>
	);
};

export default Home;

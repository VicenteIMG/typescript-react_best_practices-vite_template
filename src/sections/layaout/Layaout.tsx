import { GiThrustBend } from "react-icons/gi";
import { Outlet } from "react-router-dom";

import styles from "./Layaout.module.scss";
import { ErrorBoundary } from "./ErrorBoundary";

export function Layaout() {
	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<GiThrustBend color="red" />

					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
			<ErrorBoundary>

			<Outlet />
			</ErrorBoundary>
		</>
	);
}

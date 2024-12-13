import { FaCheck, FaLock, FaRegEye, FaRegStar, FaUnlock } from "react-icons/fa";
import { FaCodeFork, FaCodePullRequest, FaXmark } from "react-icons/fa6";
import { VscIssues } from "react-icons/vsc";
import { GitHubRepository } from "../../../domain/GitHubRepository";
import styles from "../repositoryWidget/RepositoryWidget.module.scss"

const isoToReadableDate = (lastUpdateDate: Date): string => {
	const currentDate = new Date();
	const copy = new Date();
	const diffTime = currentDate.getTime() - copy.setTime(lastUpdateDate.getTime());
	const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
};

export function GitHubRepositoryWidget({ repository }: { repository: GitHubRepository }) {
	return (
		<article className={styles.widget}>
			<header className={styles.widget__header}>
				<h2 className={styles.widget__title}>
					<a
						href={`/repository/${repository.id.organization}/${repository.id.name}`}
						target="_blanck"
						title={`${repository.id.organization}/${repository.id.name}`}
						rel="noreferrer"
					>
						{repository.id.organization}/{repository.id.name}
					</a>
				</h2>
				{repository.private ? <FaLock /> : <FaUnlock />}
			</header>
			<div className={styles.widget__body}>
				<div className={styles.widget__status}>
					<p>Last update {isoToReadableDate(repository.updatedAt)}</p>
					{repository.hasWorkflows && (
						<div>{repository.isLastWorkflowSuccess ? <FaCheck /> : <FaXmark />}</div>
					)}
				</div>
				<p className={styles.widget__description}>{repository.description}</p>
			</div>
			<footer className={styles.widget__footer}>
				<div className={styles.widget__stat}>
					<FaRegStar />

					<span>{repository.stars}</span>
				</div>
				<div className={styles.widget__stat}>
					<FaRegEye />

					<span>{repository.watchers}</span>
				</div>
				<div className={styles.widget__stat}>
					<FaCodeFork />

					<span>{repository.forks}</span>
				</div>
				<div className={styles.widget__stat}>
					<VscIssues />

					<span>{repository.issues}</span>
				</div>
				<div className={styles.widget__stat}>
					<FaCodePullRequest />

					<span>{repository.pullRequests}</span>
				</div>
			</footer>
		</article>
	);
}

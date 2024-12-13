import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { FaLock, FaUnlock } from "react-icons/fa";

import { useGitHubRepository } from "./useGitHubRepository";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { GitHubRepositoryPullRequestRepository } from "../../domain/GitHubPullRequestRespository";

import styles from "./GitHubRepositoryDetail.module.scss";
import { WorkFlowRunStatus } from "../../domain/GitHubRepository";
import { PullRequests } from "./PullRequests";
import { useInViewport } from "../layaout/useInViewport";

export function GitHubRepositoryDetail({ 
	gitHubRepositoryRepository,
	gitHubRepositoryPullRequestRepository,
}: { 
	gitHubRepositoryRepository: GitHubRepositoryRepository;
	gitHubRepositoryPullRequestRepository : GitHubRepositoryPullRequestRepository;
}) {
	const { isInViewport, ref } = useInViewport();
	const { organization, name } = useParams() as { organization: string; name: string };
	
	const repositoryId = useMemo(() => ({ name, organization }), [name, organization]);
	const { repositoryData } = useGitHubRepository(gitHubRepositoryRepository, repositoryId);
	
	if (!repositoryData) {
		return <span>No hay</span>;
	}

	return (
		<section className={styles["repository-detail"]}>
			<header className={styles.header}>
				<a href={repositoryData.url} target="_blanck" rel="noreferrer">
					<h2 className={styles.header__title}>
						{repositoryData.id.organization}/{repositoryData.id.name}
					</h2>
				</a>
				{repositoryData.private ? <FaLock /> : <FaUnlock />}
			</header>
			<p>{3/0}</p>
			<p>{repositoryData.description}</p>
			<h3>Repository stats</h3>
			<table className={styles.detail__table}>
				<thead>
					<tr>
						<th>Stars</th>
						<th>Watchers</th>
						<th>Forks</th>
						<th>Issues</th>
						<th>Pull Requests</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{repositoryData.stars}</td>
						<td>{repositoryData.watchers}</td>
						<td>{repositoryData.forks}</td>
						<td>{repositoryData.issues}</td>
						<td>{repositoryData.pullRequests}</td>
					</tr>
				</tbody>
			</table>
			<h3>Workflow runs status</h3>
			{repositoryData.workflowRunsStatus.length > 0 ? (
				<>
					<p>
						Last workflow run: {" "}
						{repositoryData.workflowRunsStatus[0].createdAt.toLocaleDateString("es-ES")}
					</p>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Title</th>
								<th>Date</th>
								<th>Status</th>
								<th>Conclusion</th>
							</tr>
						</thead>
						<tbody>
							{repositoryData.workflowRunsStatus.map((run : WorkFlowRunStatus)  => (
								<tr key={run.id}>
									<td>{run.name}</td>
									<td>
										<a href={run.url} target="_blanck" rel="noreferrer">
											{run.title}
										</a>
									</td>
									<td>{run.createdAt.toLocaleDateString("es-ES")}</td>
									<td>{run.status}</td>
									<td>{run.conclusion}</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			):(
				<p>There are no workflow runs</p>
			)}
			<section ref={ref}>
				{isInViewport && (
					<PullRequests
						repository={gitHubRepositoryPullRequestRepository}
						repositoryId={repositoryId}
					/>
				)}
			</section>
		</section>
	);

}

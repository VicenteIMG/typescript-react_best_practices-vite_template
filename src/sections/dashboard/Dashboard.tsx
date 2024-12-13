import {  useMemo } from "react";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import styles from "./Dashboard.module.scss";
import { RepositoryWidgetsSkeleton } from "./repositoryWidget/RepositoryWidgetsSkeleto";
import { useGitHubRepositories } from "./gitHubRepositoryWidget/useGitHubRepositories";
import { GitHubRepositoryWidget } from "./gitHubRepositoryWidget/GitHubRepositoryWidget";
import { AddRepositoryWidgetForm } from "./repositoryWidget/AddRepositoryWidgetForm";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import { RepositoryWidget } from "../../domain/RepositoryWidget";


export function Dashboard({ 
	gitHubRepositoryRepository,
	repositoryWidgetRepository,
	repositoryWidget,

}: { 
	gitHubRepositoryRepository: GitHubRepositoryRepository;
	repositoryWidgetRepository: RepositoryWidgetRepository;
	repositoryWidget: RepositoryWidget[];
 }) {
	const gitHubRepositoryUrls = useMemo(() => {
		return repositoryWidget.map((widget) => widget.repositoryUrl);
	},[repositoryWidget]); 


	const { gitHubRepositories, isLoading } = useGitHubRepositories(
		gitHubRepositoryRepository, 
		gitHubRepositoryUrls
	);

	return (
		<>
			<section className={styles.container}>
				{isLoading ? (
						<RepositoryWidgetsSkeleton numberOfWidgets={gitHubRepositoryUrls.length}/>
				):(
					gitHubRepositories.map((repository)=>(
						<GitHubRepositoryWidget
							key={`${repository.id.organization}/${repository.id.name}`}
							repository={repository}
							/>
					))
				)}
				<AddRepositoryWidgetForm repository={repositoryWidgetRepository} />
			</section>
			
			
			{!isLoading &&
			 gitHubRepositories.length === 0 && (
				<div className={styles.empty}>
					<span>No hay widgets configurados.</span>
				</div>
			
			)}
		</>
	);

}

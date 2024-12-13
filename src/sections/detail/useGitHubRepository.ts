import { useEffect, useState } from "react";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { GitHubRepository, RepositoryId } from "../../domain/GitHubRepository";


export function useGitHubRepository(
	repository: GitHubRepositoryRepository,
	repositoryId: RepositoryId
): {
	repositoryData: GitHubRepository | undefined;
} {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository>();

	useEffect(() => {
		repository.byId(repositoryId).then((repositoryData) => {
			setRepositoryData(repositoryData);
		});
	}, [repository, repositoryId]);

	return { repositoryData };
}

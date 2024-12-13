import { ReactElement } from "react";

import { config } from "../../devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastucture/GitHubApiGitHubRepositoryRepository";
import { Dashboard } from "./Dashboard";
import { LocalStorageRepositoryWidgetRepository } from "../../infrastucture/LocalStorageWidgetRepository";
import { useRepositoryWidgetContext } from "./repositoryWidget/RepositoryWidgetContextProvider";

const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);

const repositoryWidgetRepository = new LocalStorageRepositoryWidgetRepository();


export function DashboardadFactory() {
	const { repositoryWidgets } = useRepositoryWidgetContext();

		return(

			<Dashboard 
			gitHubRepositoryRepository={gitHubRepositoryRepository}
			repositoryWidgetRepository={repositoryWidgetRepository}
			repositoryWidget={ repositoryWidgets }
			/>
		); 
	
}

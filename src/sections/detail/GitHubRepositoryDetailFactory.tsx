import React from "react";

import { GitHubRepositoryDetail } from "./GitHubRepositoryDetail";
import { config } from "../../devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastucture/GitHubApiGitHubRepositoryRepository";
import { GitHubApiGitHubRepositoryPullRequestRepository } from "../../infrastucture/GitHubApiGitHubRepositoryPullRequestRepository";


const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(
	config.github_access_token
);
const gitHubRepositoryPullRequestRepository = new GitHubApiGitHubRepositoryPullRequestRepository(
	config.github_access_token
);

export class GitHubRepositoryDetailFactory {
	static create(): React.ReactElement {
		return (
			<GitHubRepositoryDetail
				gitHubRepositoryRepository={gitHubRepositoryRepository}
				gitHubRepositoryPullRequestRepository={gitHubRepositoryPullRequestRepository}
			/>
		);
	}
}
export default getRepos =>
  getRepos.query({
    query: organizationName => `/orgs/${organizationName}/repos`,
  })

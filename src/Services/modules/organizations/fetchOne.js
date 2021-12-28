export default getOrganization =>
  getOrganization.query({
    query: organizationName => `/orgs/${organizationName}`,
  })

import { api } from '../../api'
import fetchOne from './fetchOne'
import fetchRepos from './fetchRepos'

export const githubApi = api.injectEndpoints({
  endpoints: build => ({
    fetchOne: fetchOne(build),
    fetchRepos: fetchRepos(build),
  }),
  overrideExisting: false,
})

export const { useLazyFetchOneQuery, useLazyFetchReposQuery } = githubApi

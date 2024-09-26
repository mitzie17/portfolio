// File helps avoid mistyping terms
// These keys are used to invalidate specific queries so the data that is fetched
// is the most updated and not from the already cached data
export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_USER_ACCOUNT = "createUserAccount",

  // USER KEYS
  GET_CURRENT_USER = "getCurrentUser",
  GET_USERS = "getUsers",
  GET_USER_BY_ID = "getUserById",

  // PROJECT KEYS
  GET_PROJECTS = "getProjects",
  GET_INFINITE_PROJECTS = "getInfiniteProjects",
  GET_RECENT_PROJECTS = "getRecentProjects",
  GET_PROJECT_BY_ID = "getProjectById",
  GET_USER_PROJECTS = "getUserProjects",
  GET_FILE_PREVIEW = "getFilePreview",

  //  SEARCH KEYS
  SEARCH_PROJECTS = "getSearchProjects",
}

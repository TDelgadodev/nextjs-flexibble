export const projectsQuery = `
  query getProjects($category: String) {
    projects(filter: { category: $category }) {
      id
      title
      description
      liveSiteUrl
      githubUrl
      category
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;

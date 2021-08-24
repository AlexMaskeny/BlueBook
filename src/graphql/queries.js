/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getList = /* GraphQL */ `
  query GetList($id: ID!) {
    getList(id: $id) {
      id
      post_id
      title
      name
      content
      address
      categories
      phone
      cover
      logo
      website
      email
      featured
      geo_lat
      geo_long
      createdAt
      updatedAt
    }
  }
`;

export const getListsById = /* GraphQL */ `
  query getListsById($ids: [ID]!) {
    getListsById(ids: $ids) {
      id
      post_id
      title
      name
      content
      address
      categories
      phone
      cover
      logo
      website
      email
      featured
    }
  }
`

export const listLists = /* GraphQL */ `
  query ListLists(
    $filter: ModelListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        name
        content
        address
        categories
        phone
        cover
        logo
        website
        email
        featured
      }
    }
  }
`;

export const getCategoriesByParent = /* GraphQL */ `
  query getCategoriesByParent($parentId: String!) {
    getCategoriesByParent(parentId: $parentId) {
      categories {
        id
        name
        slug
        parent
        count
        image
      }
    }
  }
`

export const getCategories = /* GraphQL */ `
  query GetCategories($id: ID!) {
    getCategories(id: $id) {
      id
      name
      slug
      parent
      count
      image
    }
  }
`;
export const listCategoriess = /* GraphQL */ `
  query ListCategoriess(
    $filter: ModelCategoriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategoriess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        slug
        parent
        count
        image
      }
    }
  }
`;

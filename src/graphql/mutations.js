/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createList = /* GraphQL */ `
  mutation CreateList(
    $input: CreateListInput!
    $condition: ModelListConditionInput
  ) {
    createList(input: $input, condition: $condition) {
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
export const updateList = /* GraphQL */ `
  mutation UpdateList(
    $input: UpdateListInput!
    $condition: ModelListConditionInput
  ) {
    updateList(input: $input, condition: $condition) {
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
export const deleteList = /* GraphQL */ `
  mutation DeleteList(
    $input: DeleteListInput!
    $condition: ModelListConditionInput
  ) {
    deleteList(input: $input, condition: $condition) {
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
export const createCategories = /* GraphQL */ `
  mutation CreateCategories(
    $input: CreateCategoriesInput!
    $condition: ModelCategoriesConditionInput
  ) {
    createCategories(input: $input, condition: $condition) {
      id
      term_id
      name
      slug
      parent
      count
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateCategories = /* GraphQL */ `
  mutation UpdateCategories(
    $input: UpdateCategoriesInput!
    $condition: ModelCategoriesConditionInput
  ) {
    updateCategories(input: $input, condition: $condition) {
      id
      term_id
      name
      slug
      parent
      count
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteCategories = /* GraphQL */ `
  mutation DeleteCategories(
    $input: DeleteCategoriesInput!
    $condition: ModelCategoriesConditionInput
  ) {
    deleteCategories(input: $input, condition: $condition) {
      id
      term_id
      name
      slug
      parent
      count
      image
      createdAt
      updatedAt
    }
  }
`;

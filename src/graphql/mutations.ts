/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo($title: String!) {
    createTodo(title: $title) {
      done
      id
      title
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      done
      id
      title
    }
  }
`;
export const updateTodoDoneStatus = /* GraphQL */ `
  mutation UpdateTodoDoneStatus($done: Boolean!, $id: ID!) {
    updateTodoDoneStatus(done: $done, id: $id) {
      done
      id
      title
    }
  }
`;

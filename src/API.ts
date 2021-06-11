/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Todo = {
  __typename: "Todo",
  done: boolean,
  id: string,
  title: string,
};

export type CreateTodoMutationVariables = {
  title: string,
};

export type CreateTodoMutation = {
  createTodo:  {
    __typename: "Todo",
    done: boolean,
    id: string,
    title: string,
  },
};

export type DeleteTodoMutationVariables = {
  id: string,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    done: boolean,
    id: string,
    title: string,
  } | null,
};

export type UpdateTodoDoneStatusMutationVariables = {
  done: boolean,
  id: string,
};

export type UpdateTodoDoneStatusMutation = {
  updateTodoDoneStatus?:  {
    __typename: "Todo",
    done: boolean,
    id: string,
    title: string,
  } | null,
};

export type GetTodosQuery = {
  getTodos:  Array< {
    __typename: "Todo",
    done: boolean,
    id: string,
    title: string,
  } >,
};

import React, { useContext, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { AmplifyIdentityContext } from "../utils/AmplifyIdentityContextProvider";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikMuiTextField from "./FormikMuiTextField";
import { Button } from "gatsby-theme-material-ui";
// import { gql, useMutation, useQuery } from "@apollo/client";
import Error from "./Error";
import Loader from "./Loader";

interface Todo {
  id: string;
  title: string;
  done: boolean;
}

// const ADD_TODO = gql`
//   mutation AddTodo($title: String!) {
//     addTodo(title: $title) {
//       id
//       title
//       done
//     }
//   }
// `;

// const UPDATE_TODO_DONE = gql`
//   mutation UpdateTodoDone($id: ID!) {
//     updateTodoDone(id: $id) {
//       id
//       title
//       done
//     }
//   }
// `;

// const GET_TODOS = gql`
//   query GetTodos {
//     todos {
//       id
//       title
//       done
//     }
//   }
// `;

const Dashboard = (props: RouteComponentProps) => {
  const { user } = useContext(AmplifyIdentityContext);
  // const [addTodo, { loading: addTodoLoading }] = useMutation(ADD_TODO);
  // const [updateTodoDone, { loading: updateTodoDoneLoading }] =
  //   useMutation(UPDATE_TODO_DONE);
  // const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const handleCreateTodo = async (
    values: {
      title: string;
      done: boolean;
    },
    formikHelpers: FormikHelpers<{
      title: string;
      done: boolean;
    }>
  ) => {
    try {
      // await addTodo({ variables: { title: values.title } });
      formikHelpers.resetForm();
      // await refetch();
    } catch (error) {
      console.log("Create/Edit Todo", error);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const handleToggle = async (todo: Todo) => {
    // await updateTodoDone({ variables: { id: todo.id } });
  };

  return (
    <>
      <div>Welcome to your Todo Dashboard : {user.attributes.email}</div>
    </>
  );
};

export default Dashboard;

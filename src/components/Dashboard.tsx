import React, { useContext, useEffect, useState } from "react";
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
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikMuiTextField from "./FormikMuiTextField";
import { Button } from "gatsby-theme-material-ui";
// import { gql, useMutation, useQuery } from "@apollo/client";
import Error from "./Error";
import Loader from "./Loader";

import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { Todo, GetTodosQuery, CreateTodoMutation } from "../API";
import { Delete } from "@material-ui/icons";

const Dashboard = (props: RouteComponentProps) => {
  const { user } = useContext(AmplifyIdentityContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState<GetTodosQuery>(null);

  const [updateTodoDoneLoading, setUpdateTodoDoneLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    try {
      const { data } = (await API.graphql(
        graphqlOperation(queries.getTodos)
      )) as {
        data: GetTodosQuery;
      };
      console.log(data);
      setData(data);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchTodos();
  }, []);

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
    // setLoading(true);
    try {
      const { data } = (await API.graphql(
        graphqlOperation(mutations.createTodo, { title: values.title })
      )) as {
        data: CreateTodoMutation;
      };

      //add the newly created todo to the existing todos
      setData((prev) => {
        return { getTodos: [data.createTodo, ...prev.getTodos] };
      });
      formikHelpers.resetForm();
    } catch (error) {
      console.log("Create/Edit Todo", error);
    } finally {
      formikHelpers.setSubmitting(false);
      // setLoading(false);
    }
  };

  const handleToggle = async (todo: Todo) => {
    await API.graphql(
      graphqlOperation(mutations.updateTodoDoneStatus, {
        done: !todo.done,
        id: todo.id,
      })
    );
    const i = data.getTodos.findIndex((td) => td.id === todo.id);
    data.getTodos[i].done = !data.getTodos[i].done;
    setData(data);
    setUpdateTodoDoneLoading(false);
  };

  const handleDelete = async (todo: Todo) => {
    await API.graphql(
      graphqlOperation(mutations.deleteTodo, {
        id: todo.id,
      })
    );
    data.getTodos = data.getTodos.filter((td) => td.id !== todo.id);
    setData(data);
    setUpdateTodoDoneLoading(false);
  };

  return (
    <>
      <Box>
        <Formik
          initialValues={{ title: "", done: false }}
          validationSchema={Yup.object({
            title: Yup.string().trim().required().min(1).max(50),
          })}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleCreateTodo}
        >
          {(props) => (
            <Form>
              <Grid container spacing={2} justify="center" alignItems="stretch">
                <Grid item xs={6}>
                  <FormikMuiTextField
                    name="title"
                    label="Add Todo"
                    variant="outlined"
                    fullWidth
                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    startIcon={
                      props.isSubmitting && (
                        <CircularProgress color="secondary" size="1rem" />
                      )
                    }
                    disabled={props.isSubmitting}
                    style={{ height: "100%" }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>

              {/* <hr />
              <pre>{JSON.stringify(props.errors, null, 4)}</pre>
              <pre>{JSON.stringify(props.values, null, 4)}</pre> */}
            </Form>
          )}
        </Formik>
      </Box>

      {error && <Error error={error} />}
      {loading && <Loader showCircularProgress={false} />}
      {data && data.getTodos.length > 0 && (
        <Box mt={2}>
          <Card variant="outlined">
            <CardContent>
              <List>
                {data.getTodos
                  // .sort((a, b) => b.id - a.id)
                  .map((todo, index) => (
                    <React.Fragment key={`Todo-${todo.id}`}>
                      <ListItem
                        key={`ListItem-${todo.id}`}
                        button
                        dense
                        onClick={() => {
                          setUpdateTodoDoneLoading(true);
                          setSelectedTodo(todo);
                          handleToggle(todo);
                        }}
                        disabled={updateTodoDoneLoading}
                      >
                        <ListItemIcon>
                          <Checkbox
                            color="primary"
                            edge="start"
                            checked={todo.done}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{
                              "aria-labelledby": todo.id.toString(),
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={todo.title} />
                        <ListItemSecondaryAction>
                          <IconButton
                            aria-label="delete"
                            onClick={() => {
                              setUpdateTodoDoneLoading(true);
                              setSelectedTodo(todo);
                              handleDelete(todo);
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {updateTodoDoneLoading &&
                      selectedTodo &&
                      selectedTodo.id === todo.id ? (
                        <LinearProgress color="secondary" />
                      ) : (
                        index < data.getTodos.length - 1 && (
                          <Divider
                            variant="fullWidth"
                            component="li"
                            key={`Divider-${todo.id}`}
                          />
                        )
                      )}
                    </React.Fragment>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
};

export default Dashboard;

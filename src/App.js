import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  LinearProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import ConfirmDialog from "./components/confirmDialog";

interface Values {
  fname: string;
  lname: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
}

//styles
const useStyles = makeStyles((theme) => ({
  form: {
    display: "grid",
    gridGap: "0.5em",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    width: "600px",
  },
}));

function App() {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [posts, setPosts] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });
  const [formVal, setFormVal] = useState(null);

  //fetch data
  useEffect(() => {
    axios
      .get("/slim/api/users")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //delete item
  const handleDelete = (id, name) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .delete(`/slim/api/users/delete/${id}`)
      .then(function (response) {
        setNotify({
          isOpen: true,
          message: `${name} has been successfully deleted.`,
          type: "success",
        });
      });
  };

  //new item
  const initVal = {
    id: "",
    fname: "",
    lname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    action: "addItem",
  };

  //update item
  const openInPopup = (posts) => {
    setFormVal({
      id: posts.id,
      fname: posts.first_name,
      lname: posts.last_name,
      phone: posts.phone,
      action: "updateItem",
    });
    setOpenPopup(true);
  };

  //close popup
  const closePopup = () => {
    setOpenPopup(false);
    setFormVal(initVal);
  };

  return (
    <React.Fragment>
      <Notification notify={notify} setNotify={setNotify} />

      <Formik
        initialValues={formVal || initVal}
        enableReinitialize
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            setSubmitting(false);
            let action = JSON.stringify(values.action).slice(1, -1);

            //add new item
            if (action == "addItem") {
              axios
                .post("/slim/api/users/add", {
                  //must match with db field names - first_name
                  first_name: values.fname,
                  last_name: values.lname,
                  phone: values.phone,
                  email: values.email,
                  address: values.address,
                  city: values.city,
                  state: values.state,
                })
                .then(function (response) {
                  setOpenPopup(false);
                  setNotify({
                    isOpen: true,
                    message: `${values.fname} has been successfully added.`,
                    type: "success",
                  });
                });
            }
            //update item
            if (action == "updateItem") {
              axios
                .put(`/slim/api/users/update/${values.id}`, {
                  //must match with db field names - first_name
                  first_name: values.fname,
                  last_name: values.lname,
                  phone: values.phone,
                })
                .then(function (response) {
                  setOpenPopup(false);
                  setNotify({
                    isOpen: true,
                    message: `${values.fname} has been successfully updated.`,
                    type: "success",
                  });
                });
            }

            setFormVal(initVal);
            resetForm();

          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Grid container justify="center" style={{ marginTop: "60px" }}>
            <Grid item xs={6}>
              {isSubmitting && <LinearProgress />}
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenPopup(true)}
              >
                Add New
              </Button>

              <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title={
                  <div style={{ display: "flex" }}>
                    <Typography variant="h5" style={{ flexGrow: "1" }}>
                      Add New Item
                    </Typography>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        closePopup();
                      }}
                    >
                      x
                    </Button>
                  </div>
                }
              >
                <Form className={classes.form}>
                  <Field
                    component={TextField}
                    type="text"
                    label="Full Name"
                    name="fname"
                  />
                  <Field
                    component={TextField}
                    type="text"
                    label="Last Name"
                    name="lname"
                  />
                  <Field
                    component={TextField}
                    type="text"
                    label="Phone"
                    name="phone"
                  />
                  <br />
                  <input type="hidden" name="action" />
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    style={{ marginTop: "20px" }}
                  >
                    Submit
                  </Button>
                </Form>
              </Popup>

              <div>
                <Notification notify={notify} setNotify={setNotify} />
                <ConfirmDialog
                  confirmDialog={confirmDialog}
                  setConfirmDialog={setConfirmDialog}
                />
              </div>
              <div style={{ marginTop: "30px" }}>
                <ul>
                  {posts.map((post) => (
                    <li key={post.id} style={{ marginBottom: "25px" }}>
                      {post.first_name}, {post.last_name}, {post.phone}{" "}
                      &nbsp;&nbsp;
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title:
                              "Are you sure you want to delete this record?",
                            subTitle: "You cannot undo this operation",
                            onConfirm: () => {
                              handleDelete(post.id, post.first_name);
                            },
                          });
                        }}
                      >
                        Delete
                      </Button>{" "}
                      &nbsp;{" "}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          openInPopup(post);
                        }}
                      >
                        Update
                      </Button>{" "}
                    </li>
                  ))}
                </ul>
              </div>
            </Grid>
          </Grid>
        )}
      </Formik>
    </React.Fragment>
  );
}

export default App;

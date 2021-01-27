import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress,Grid} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import DataFetch from './dataFetch';
import axios from 'axios';


interface Values {
  fname: string;
  lname: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
}


function App() {
  return (
  	<div>
  	<Formik
      initialValues={{
        fname: '',
        lname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
      }}
      
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);

          //post
         axios.post('/slim/api/users/add', {
         	//must match with db field names - first_name
		    first_name: values.fname,
		    last_name: values.lname,
		    phone: values.phone,
		    email: values.email,
		    address: values.address,
		    city: values.city,
		    state: values.state
		  })
		  .then(function (response) {
		    console.log(response);
		  })
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
      	<Grid container justify="center" style={{marginTop: '60px'}}>
      		<Grid item xs={6}>
      			<Form>
		          <Field
		            component={TextField}
		            type="text"
		            label="Full Name"
		            name="fname"
		          />
		          <br />
		          <Field
		            component={TextField}
		            type="text"
		            label="Last Name"
		            name="lname"
		          />
		          <br />
		          <Field
		            component={TextField}
		            type="text"
		            label="Phone"
		            name="phone"
		          />
		          <br />
		          <Field
		            component={TextField}
		            type="text"
		            label="Email"
		            name="email"
		          />
		          <br />
		          <Field
		            component={TextField}
		            type="text"
		            label="Address"
		            name="address"
		          />
		          <br />
		          <Field
		            component={TextField}
		            type="text"
		            label="City"
		            name="city"
		          />
		          <br />
		          <Field
		            component={TextField}
		            type="text"
		            label="State"
		            name="state"
		          />
		          {isSubmitting && <LinearProgress />}
		          <br />
		          <br />
		          <Button
		            variant="contained"
		            color="primary"
		            disabled={isSubmitting}
		            onClick={submitForm}
		          >
		            Submit
		          </Button>
		          <DataFetch />
		        </Form>
      		</Grid>
      	</Grid>
      )}
    </Formik>
    </div>
  ) ;
}

export default App;

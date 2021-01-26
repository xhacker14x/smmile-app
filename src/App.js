import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress,Grid} from '@material-ui/core';
import { TextField } from 'formik-material-ui';


interface Values {
  title: string;
  body: string;
}

function App() {
  return (
  	<Formik
      initialValues={{
        title: '',
        body: '',
      }}
      
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);

          //post
          fetch('https://jsonplaceholder.typicode.com/posts', {
		  method: 'POST',
		  body: JSON.stringify({
		    title: values.title,
		    body: values.body,
		    userId: 1,
		  }),
		  headers: {
		    'Content-type': 'application/json; charset=UTF-8',
		  },
		})
		  .then((response) => response.json())
		  .then((json) => console.log(json));

        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
      	<Grid container justify="center" style={{marginTop: '100px'}}>
      		<Grid item xs={6}>
      			<Form>
		          <Field
		            component={TextField}
		            type="text"
		            label="Title"
		            name="title"
		          />
		          <br />
		          <Field
		            component={TextField}
		            type="text"
		            label="Body"
		            name="body"
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
		        </Form>
      		</Grid>
      	</Grid>
      )}
    </Formik>
  ) ;
}

export default App;

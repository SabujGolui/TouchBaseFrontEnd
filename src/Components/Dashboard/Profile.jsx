import React from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/profile.scss'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../../helpers/Error';
import { updateUser } from '../../actions/index';

function Profile(props) {

//  This validation schema comes from the Yup library, it checks
//  the Formik values to make sure everything entered suits the database
//  and that the passwords match

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
        .min(1, "Must have a character")
        .max(20, "Must be shorter than 20")
        .required("Must enter a first name"),
        lastname: Yup.string()
        .min(1, "Must have a character")
        .max(20, "Must be shorter than 20")
        .required("Must enter a last name"),
        email: Yup.string()
        .email("Must be a valid email address")
        .required("Must enter an email"),
        age: Yup.number()
        .max(3, "Must be a valid age"),
        location: Yup.string()
        .max(20, "Must be shorter than 20"),
        position: Yup.string()
        .max(20, "Must be shorter than 20"),
        about: Yup.string()
        .max(1000, "Must be under 1000 characters.")
        })

    return(
        <div className="profilePage">
            <div className="profileBlock">
                <h2>Name: {props.firstname} {props.lastname}</h2>
                <h2>email: {props.email}</h2>
                <h2>Age: {props.age}</h2>
                <h2>Location: {props.location}</h2>
                <h2>Position: {props.position}</h2>
                <h2>About: {props.about}</h2>
            </div>
            
    {/* These initial values make up the values necessary to complete the form,
      we update these values using Formik properties. */}

      <Formik 
        initialValues={{ 
          firstname: props.firstname, 
          lastname: props.lastname, 
          email: props.email, 
          age: props.age,
          location: props.location,
          position: props.position,
          about: props.about
        }} 
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          setSubmitting(true);

          const { firstname, lastname, email, age, location, about } = values;

          this.props.updateUser({
            firstname: firstname,
            lastname: lastname,
            email: email,
            age: age,
            location: location,
            about: about
        })

        // successful user update 
        .then(() => {
            console.log("updated!")
              
        })
        .catch((err) => {
            console.error(err)
        })
        }}
      >
        {({ 
          values, 
          errors, 
          touched, 
          handleChange, 
          handleBlur, 
          handleSubmit, 
          isSubmitting 
        }) => (
          <form onSubmit={handleSubmit} className="updateUserForm">
              
              {/* FIRST NAME INPUT */}
              <div className="userInput">
                <input 
                  type="text" 
                  id="firstname" 
                  placeholder={props.firstname}
                  name="firstname"
                  onChange={handleChange}
                  value={values.firstname}
                  onBlur={handleBlur} 
                  className={(touched.firstname && errors.firstname) ? "hasError" : "validInput"}
                />
                <Error touched={touched.firstname} message={errors.firstname} />
              </div>
              
              {/* LAST NAME INPUT */}
              <div className="userInput">
                <input 
                  type="text" 
                  id="lastname" 
                  placeholder={props.lastname}
                  name="lastname"
                  onChange={handleChange}
                  value={values.lastname}
                  onBlur={handleBlur} 
                  className={(touched.lastname && errors.lastname) ? "hasError" : "validInput"}
                />
                <Error touched={touched.lastname} message={errors.lastname} />
              </div>

              {/* EMAIL INPUT */}
              <div className="userInput">
                <input 
                  type="text" 
                  id="email" 
                  placeholder={props.email}
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur} 
                  className={(touched.email && errors.email) ? "hasError" : "validInput"}
                />
                <Error touched={touched.email} message={errors.email} />
              </div>

              {/* AGE INPUT */}
              <div className="userInput">
                <input 
                  type="integer" 
                  id="age" 
                  placeholder={props.age}
                  name="age"
                  onChange={handleChange}
                  value={values.age}
                  onBlur={handleBlur} 
                  className={(touched.age && errors.age) ? "hasError" : "validInput"}
                />
                <Error touched={touched.age} message={errors.age} />
              </div>

              {/* LOCATION INPUT */}
              <div className="userInput">
                <input 
                  type="text" 
                  id="location" 
                  placeholder={props.location}
                  name="location"
                  onChange={handleChange}
                  value={values.location}
                  onBlur={handleBlur} 
                  className={(touched.location && errors.location) ? "hasError" : "validInput"}
                />
                <Error touched={touched.location} message={errors.location} />
              </div>

              {/* POSITION INPUT */}
              <div className="userInput">
                <input 
                  type="text" 
                  id="position" 
                  placeholder={props.position}
                  name="position"
                  onChange={handleChange}
                  value={values.position}
                  onBlur={handleBlur} 
                  className={(touched.position && errors.position) ? "hasError" : "validInput"}
                />
                <Error touched={touched.position} message={errors.position} />
              </div>

              {/* ABOUT INPUT */}
              <div className="userInput">
                <input 
                  type="text" 
                  id="about" 
                  placeholder={props.about}
                  name="about"
                  onChange={handleChange}
                  value={values.about}
                  onBlur={handleBlur} 
                  className={(touched.about && errors.about) ? "hasError" : "validInput"}
                />
                <Error touched={touched.about} message={errors.about} />
              </div>


              <button type="submit" disabled={isSubmitting}>UPDATE USER</button>
          </form>
        )}
      </Formik>
    </div>
        )
    }

// passes the user state from redux into component state

const mapStateToProps = (state) => {
    return {
        firstname: state.user.firstname,
        lastname: state.user.lastname,
        email: state.user.email,
        age: state.user.age,
        location: state.user.location,
        position: state.user.position,
        about: state.user.about
    }
  }

const mapDispatchToProps = {
    updateUser: updateUser
}
  
  export default(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Profile)
  );

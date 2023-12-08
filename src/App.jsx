import Swal from "sweetalert2";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
   const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const company = form.company.value;
      const title = form.title.value;
      const mobile = form.mobile.value;
      const user = { name, company, title, mobile };
      console.log(user);

      fetch("http://localhost:5000/users", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(user),
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data.insertedId) {
               Swal.fire({
                  title: "Contact Saved!",
                  text: "Contact Saved Successfully!",
                  icon: "success",
               });
            } else {
               Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
               });
            }
            form.reset();
         });
   };
   return (
      <>
         <h1 className="text-2xl font-semibold">
            Contact Book For My personal Phone
         </h1>

         <form onSubmit={handleSubmit}>
            <input
               type="text"
               name="name"
               placeholder="Name"
               className="input input-bordered my-3 input-md w-full max-w-xs"
            />{" "}
            <br />
            <input
               type="text"
               name="company"
               placeholder="Company"
               className="input input-bordered my-3 input-md w-full max-w-xs"
            />
            <br />
            <input
               type="text"
               name="title"
               placeholder="Title"
               className="input input-bordered my-3 input-md w-full max-w-xs"
            />
            <br />
            <input
               type="number"
               name="mobile"
               placeholder="Mobile"
               className="input input-bordered my-3 input-md w-full max-w-xs"
            />
            <br />
            <input
               type="submit"
               className="btn btn-primary w-80"
               value="Save"
            />
         </form>
         <hr className="py-3" />
         <Link to={'/users'}>
         <button className="btn btn-primary w-80">Contact List</button>
         </Link>
      </>
   );
}

export default App;

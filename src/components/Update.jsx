import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
   const loadUser = useLoaderData();

   const handleUpdate = (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const company = form.company.value;
      const title = form.title.value;
      const mobile = form.mobile.value;
      const user = { name, company, title, mobile };
      console.log(user);

      fetch(`http://localhost:5000/users/${loadUser._id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(user),
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data.modifiedCount) {
               Swal.fire({
                  title: "Contact Updated!",
                  text: "Contact Update Successfully!",
                  icon: "success",
               });
            } else {
               Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
               });
            }
         });
   };

   return (
      <div>
         <h1 className="text-2xl font-semibold">
            Contact Book For My personal Phone
         </h1>

         <form onSubmit={handleUpdate}>
            <input
               type="text"
               name="name"
               defaultValue={loadUser.name}
               placeholder="Name"
               className="input input-bordered my-3 input-md w-full max-w-xs"
            />{" "}
            <br />
            <input
               type="text"
               name="company"
               defaultValue={loadUser.company}
               placeholder="Company"
               className="input input-bordered my-3 input-md w-full max-w-xs"
            />
            <br />
            <input
               type="text"
               name="title"
               defaultValue={loadUser.title}
               placeholder="Title"
               className="input input-bordered my-3 input-md w-full max-w-xs"
            />
            <br />
            <input
               type="number"
               name="mobile"
               defaultValue={loadUser.mobile}
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
         <Link to={"/users"}>
            <button className="btn btn-primary w-80">Contact List</button>
         </Link>
      </div>
   );
};

export default Update;

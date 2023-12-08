
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
   const loadUser = useLoaderData();
   const [users, setUsers] = useState(loadUser);
   const handleDelete = (_id) => {
      console.log('deleted', _id);

      fetch(`http://localhost:5000/users/${_id}`,{
         method: "DELETE",
      })
      .then(res => res.json())
      .then(data => {
         console.log(data)
         if(data.deletedCount){
            Swal.fire({
               title: "Contact delete!",
               text: "Contact deleted Successfully!",
               icon: "success",
            });
            const remaining = users?.filter(user => user?._id !== _id);
            setUsers(remaining);
         }
      })
   }
   return (
      <div>
         Total Contacts: {users?.length}
         <div className="">
            
               <div className="overflow-x-auto">
                  <table className="table">
                     {/* head */}
                     <thead>
                        <tr>
                           <th>#</th>
                           <th>Name</th>
                           <th>Company</th>
                           <th>Title</th>
                           <th>Mobile No</th>
                           
                        </tr>
                     </thead>
                     <tbody>
                        {
                           users.map((user, index) => <tr key={user._id}>
                              <th>{index + 1}</th>
                              <td>
                                 <div className="flex items-center gap-3">
                                    {/* <div className="avatar">
                                       <div className="mask mask-squircle w-12 h-12">
                                          <img
                                             src="https://cdn1.iconfinder.com/data/icons/online-shopping-2-8/100/Contact-23-512.png"
                                             alt="Avatar Tailwind CSS Component"
                                          />
                                       </div>
                                    </div> */}
                                    <div>
                                       <div className="font-bold">{user?.name}</div>
                                    </div>
                                 </div>
                                 
                              </td>
                              <td>
                                 <div className="">
                                    {user.company}
                                 </div>
                              </td>
                              <td>{user?.title}</td>
                              <td>{user?.mobile}</td>
                              <th>
                                 <Link to={`/update/${user?._id}`}>
                                 <button className="btn btn-ghost btn-xs">
                                    Update
                                 </button>
                                 </Link>
                              </th>
                              <th>
                                 <button onClick={()=>{handleDelete(user?._id)}} className="btn btn-ghost btn-xs">
                                    X
                                 </button>
                              </th>
                           </tr>)
                        }
                     </tbody>
                  </table>
               </div>
            
         </div>
      </div>
   );
};

export default Users;

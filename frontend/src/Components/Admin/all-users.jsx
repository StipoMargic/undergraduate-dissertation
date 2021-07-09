import React, { useContext } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../Context/global";

const AllUsers = () => {
  const { role, users } = useContext(GlobalContext);
  const history = useHistory();

  if (role === undefined || role !== "ROLE_ADMIN") {
    history.push("/");
  }

  return (
    <>
      {users && (
        <div className="container mt-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Active</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => {
                return (
                  <tr key={user.id}>
                    <th scope="row">{idx + 1}</th>
                    <td>{user.attributes.username}</td>
                    <td>
                      <a href={`mailto:${user.attributes.email}`}>
                        {user.attributes.email}
                      </a>
                    </td>
                    <td>
                      {user.attributes.roles[0] === "ROLE_USER"
                        ? "Freelancer"
                        : user.attributes.roles[0] === "ROLE_EMPLOYER"
                        ? "Company"
                        : "Administrator"}
                    </td>
                    <td>
                      {user.attributes.verified === true
                        ? "Verified"
                        : "Not Verified"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default AllUsers;

/* eslint-disable react/prop-types */
import { Spinner, Table } from "reactstrap";
import DeleteIcon from "../Icons/DeleteIcon";
import { sendAllowedList } from "../../db";
import { toast } from "react-toastify";

import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function Delete({ modal, toggle, email, handleClick, loading }) {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Remove</ModalHeader>
      <ModalBody>Are you sure to remove {email} from users list ?</ModalBody>
      <ModalFooter>
        <Button
          color="danger"
          onClick={handleClick}
          tyle={{ minWidth: "140px" }}
          className="px-4 px-2">
          {loading ? <Spinner size="sm" /> : "Remove User"}
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

const OnboardedUsers = ({ users, fetchAgain }) => {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggle = () => setModal(!modal);
  const removeUser = async (c_email) => {
    try {
      setLoading(true);
      const newList = users?.filter((el) => el !== c_email);
      await sendAllowedList([...newList]);
      fetchAgain();
      setLoading(false);
      toast.success("User deleted successfully!", { toastId: "success" });
    } catch (e) {
      toast.error("Something went wrong.", { toastId: "wrong" });
      setLoading(false);
    } finally {
      setModal(false);
    }
  };
  return (
    <>
      <Delete
        modal={modal}
        email={user}
        loading={loading}
        toggle={toggle}
        handleClick={() => removeUser(user)}
      />
      <h4 className="my-2"> Users List</h4>

      {users?.length ? (
        <Table bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((el, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el}</td>
                <td style={{ color: "red" }}>
                  <DeleteIcon
                    className="cursor-pointer"
                    onClick={() => {
                      setUser(el);
                      toggle();
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </>
  );
};

export default OnboardedUsers;

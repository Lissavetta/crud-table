import React from "react";
import './CustomTable.css';
import CustomButton from "../components/CustomButton/CustomButton";

const CustomTable = ({ 
    users, 
    handleEditClick,
    handleDeleteClick
 }) => {
    return (
        <table>
            <th>ID</th>             
            <th>User Name</th>     
            <th>User Surname</th>  
            <th>User Salary</th>   
            <th>Actions</th>      

            <tbody>            
            {users.map((user, index) => ( //достаем каждого юзера по отдельности с помощью метода map и выводим сформированные столбцы на каждый нужный заголовок
                <tr>
                  <td>{index +1}</td> 
                  <td>{user.userName}</td> 
                  <td>{user.userSurname}</td> 
                  <td>{user.userSalary}</td>
                  <td>
                    <div>
                      <CustomButton 
                        label="edit"
                        classNames="edit-action"
                        handleClick={handleEditClick}
                        data={({ index, user })}
                        type="button"
                      />
                      <CustomButton 
                        label="delete"
                        classNames="delete-action"
                        handleClick={handleDeleteClick}
                        data={({ index })}
                        type="button"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
    )
}

export default CustomTable;
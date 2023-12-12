import React, { useState } from 'react';
import './App.css';
import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import CustomTable from '../../CustomTable/CustomTable';


const initialVAlues = { //объект пустых значений для юзера, чтобы очищать информацию с помощью кнопки clean
  userName: '',
  userSurname: '',
  userSalary: ''
}

function App() {                  //компонент App, который возвращает js x разметку - есть теги html
  const [userData, setUserData] = useState(initialVAlues); //хук состояния в реакте useState(для хранения данных и использования данных)
  //здесь хранится информация о пользователях и сетится = обновляться с помощью хука setUserData(функция обновления данных = сетиться = обновлять)
  const [users, setUsers] = useState([]);//ДЛЯ ДОБАВЛЕНИЯ ЮЗЕРОВ - список юзеров, по которому мы можем пробежаться массивом, функция для сета setUsers, внутри useState находится пустой массив, тк еще нет пользователей в таблице
  const [editableUserData, setEditableUserData] = useState({//после нажатия на кнопку add наши юзеры должны поменяться => состояние для хранения информ об изменяемом юзере
    isEdit: false,//нам нужен флаг для отслеживания изменеия (есть оно или нет) isEdit 
    userIndex: null//хранит индекс текущего пользователя, на которого мы нажали
  });



  // console.log('userData: ', userData);

  const handleDeleteClick = ({ index }) => {//функция на удаление элементов по индексу, получаем индекс и очищаем наш массив, реакт перерисуетнаш массив без этого элемента
    setUsers(users.filter((user, userIndex) => userIndex != index));//берем проходим по массиву юзерс, вызываем функцию филтер, достаем из фильтра отдельно каждый элемент (юзерс=>его не используем) и индексюзерс и гооврим, что юзериндекс не должен быть равен индексу
  }

  const isFilledFields = userData.userName && userData.userSurname && userData.userSalary;//проверка заполняемости полей

  const handleDeleteClean = () => setUserData(initialVAlues);//функция на очищение => возвраащает пустые значения
  
  const handleSubmitUser = async (e) => {  //обработчик-функция сетит юзера в массив по кнопке ADD
    //передаем сюда ивент (е), который вызовет функцию preventDefault, которая запрещает перезагружать страницу при добавлении сущностей(юзеров)
    e.preventDefault();//достаем ивент (е), вызывваем функцию preventDefault => страница не будет перезагружаться при нажатии кнопки добавить

    if (isFilledFields) {
      if(editableUserData.isEdit) {//если это изменяемая фигня, то копируем текущих юзеров (editedData) из юзерс, чтобы не изголяться со слайсом, мы сначала делаем нужные изменения, потом кладем их в state
        const editedData = users;
        editedData.splice(editableUserData.userIndex, 1, userData);//обращаемся к editedData и говорим, возьми из editableUserData индекс и замени один элемент на текущий, который у нас есть в юзердате(там уже измененный элемент лежит)

        setUsers(editedData);//добавляем наш новый обновленный массив в массив пользователей
        setEditableUserData({
          isEdit: false, //больше нам не нужно состояние edit, поэтому нужно вернуть состяние пользователя в первоначальный вид
          userIndex: null
        }) 
      } else {
        setUsers((prevState) => [...prevState, userData]); //образщаемся к пустому массиву => обращаемся к пустому значению (предыдущее состояние у нас пустой массив юзеров) и добавляем к нему введенную информацию(текущий юзердата)
      }
      setUserData(initialVAlues)// передача пустых значений, наше начальное состояния еще без ввода информации
    }    
  }

  const handleEditClick = ({ user, index }) => {//функция обработки нажатия на edit, обрабатывает текущего юзеа и его индекс
    setUserData(user);//записываем в сетюзердата наше состояние(информацию - юзерс), которую будем передавать
    setEditableUserData({//состояние, в котором храним инфрмацию об изменяемом юзере
      isEdit: true,//кликаем на эдит, поэтому это правда
      userIndex: index //пишем индекс текущего юзера
    })
  }
  
  const handleInputChange = (e, userName) => setUserData((prevState) => ({
    ...prevState,
    [userName]: e.target.value
  }))

  console.log('userData: ', userData);

  return (
    <div className='wrapper'>
      <div className='wrapper-content'>
        <div className='table-data'>
          <CustomTable 
            users={users}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
        <div>
          <form onSubmit={handleSubmitUser} onReset={handleDeleteClean}>
            <CustomInput 
              placeholder="Write your name"
              handleChange={handleInputChange}
              value={userData.userName}//обращемся к юзер дате и берем значение имени с помощью userName
              fieldName="userName"
            />

            <CustomInput 
              placeholder="Write your surname"
              handleChange={handleInputChange}
              value={userData.userSurname}
              fieldName="userSurname"
            />

            <CustomInput 
              placeholder="Write your salary"
              handleChange={handleInputChange}
              value={userData.userSalary}
              fieldName="userSalary"
            />
            <div className='buttons-wrapper'>
              <CustomButton 
                label="Clean"
                classNames=""
                handleClick={() => {}}
                data={null}
                type="reset"
              />

              <CustomButton 
                label={editableUserData.isEdit ? 'Edit' : 'Add'}//обращение к флагу isEdit из состояния editableUserData, если флаг true, то выводим на кнопку edit и тд.
                classNames=""
                handleClick={() => {}}
                data={null}
                type="submit"
              />

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

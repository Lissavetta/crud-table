import React from 'react';
import ReactDOM from 'react-dom/client';//пакет reactdom, в котором есть метод render, который будет рендерить весь наш компонент <App />
import './index.css';
import './components/App/App'
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));//идентификатор рут должен совпадать с индентефикатором в файле index.html -
//- это главный корневой файл index.html, в который будет собираться наш проект и вкладываться в сам div
root.render( //все, что мы рендерим в этой функции рендер будет вложено в рут(корень) дочерними элементами
  
    <App />
  
);



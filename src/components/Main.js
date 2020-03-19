import React, { useState } from 'react'
import Company from './Company'
import Calendar from './Calendar'
import Employee from './Employee'

const style = {
    main: {
        position: "relative",
        float: "right",
        width: "87vw",
        height: "94vh",
        top: "6vh",
        background: "#F7F5F1",
        zIndex: 1
    }
}

// const item = {
//     id: "123123123asrrerrdsa423",
//     name: "ООУ Кочо Рацин Куманово",
//     address: "ул.Никшичка бр.26, Куманово",
//     director: "Митко Максимовски",
//     telephone: "075 650 952",
//     eMail: "ntk_maks_mitko@yahoo.com"
// }


export default function Main(props) {
    const item = props.item
    return (
        <div style={style.main}>
            {props.render === "company"
            ? <Company
                item={item}
                db={props.db}
                setAlert={props.setAlert}
                setAlertMessage={props.setAlertMessage} 
                setRender={props.setRender}
                setEmployee={props.setEmployee}/>
            : undefined
            }
            {
                props.render === "main"
                ? <Calendar
                    companiesData={props.companiesData}
                    db={props.db}
                    setAlert={props.setAlert}
                    setAlertMessage={props.setAlertMessage}
                    setCompany={props.setCompany} />
                : undefined
            }
            {
                props.render === "employee"
                ? <Employee 
                    db={props.db}
                    setAlert={props.setAlert}
                    setAlertMessage={props.setAlertMessage}
                    setRender={props.setRender}
                    setEmployee={props.setEmployee}
                    item={props.employee}
                    companyName={item.name}/>
                : undefined
            } 
        </div>
    )
}
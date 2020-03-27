import React, { useState, useEffect } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';


const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

const style = {
    calendar: {
        position: "relative",
        width: "98%",
        height: "85%",
        marginTop: "5%",
        borderRadius: "10px",
        boxShadow: "0 1px 1px 0 rgba(60,64,67,.3), 0 1px 1px 1px rgba(60,64,67,.15)",
    },
    nav: {
        height: "3%",
        background: "#16335A",
        textAlign: "center",
        color: "white"
    }, 
    dailyTable: {
        
    }
}


export default function CalendarTable(props) {

    const [date, setDate] = useState(new Date())

    const [content, setContent] = useState()

    const sortArrangements = () => {
        let array = []
        props.tests.map((test) => {
            if(new Date(test.date).getDate() === new Date(date).getDate()) {
                array.push(test)
                setContent(array)
            }
        })
    }


    const addDays = (days) => {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        setDate(new Date(result));
        sortArrangements()
    }

    const addMonths = (months) => {
        let result = new Date(date);
        result.setMonth(result.getMonth() + months);
        setDate(new Date(result));
        sortArrangements()
    }

    return (
        <div style={style.calendar}>
            {
                (props.format === "day")
                ?
                <div>
                    <DialogTitle id="form-dialog-title" style={style.nav}>
                        <ArrowLeftIcon  onClick={() => { addDays(-1)}}/>
                        {`${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`}
                        <ArrowRightIcon onClick={() => { addDays(1)}}/>
                    </DialogTitle>
                        <div style={style.dailyTable}>

                        </div>
                </div>
                
                : undefined
            }
            {
                (props.format === "week")
                ?<DialogTitle id="form-dialog-title" style={style.nav}>
                    <ArrowLeftIcon  onClick={() => { addDays(-7)}}/>
                    {`${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} - `}
                    <ArrowRightIcon onClick={() => { addDays(7)}}/>
                 </DialogTitle>
                : undefined
            }
            {
                (props.format === "month")
                ?<DialogTitle id="form-dialog-title" style={style.nav}>
                    <ArrowLeftIcon  onClick={() => { addMonths(-1)}}/>
                    {`${months[date.getMonth()]} ${date.getFullYear()}`}
                    <ArrowRightIcon onClick={() => { addMonths(1)}}/>
                 </DialogTitle>
                : undefined
            }
            

        </div>
    )
}
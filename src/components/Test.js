import React, { useState } from 'react'

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const style = {
    document: {
        width: "auto",
        height: "auto",
        padding: "6% 25% 6% 10%",
    },

    title: {
        fontSize: "1.3vw",
        textAlign: "center",
        fontWidht: "100"
    },
    centarl: {
        textAlign: "center",
    },
    left: {
        float: "left",
        maxHeight: "15vh",
        lineHeight: ".2vh",
        fontSize: ".8vw",
        textAlign: "center",
        textDecoration: "underline"
    },
    right: {
        float: "right",
        maxHeight: "15vh",
        lineHeight: ".2vh",
        fontSize: ".8vw",
        textAlign: "center",
        textDecoration: "underline"

    }, 
    small: {
        fontSize: ".6vw",
    }
}

export default function Test(props) {

    return(
        <div id={"hello"} style={style.document}>
            <p style={style.left}>
                ПОЛИКЛИНИКА ПЗУ Д-р ЃОШЕ
                <p style={style.small}>(овластена здравствена установа за медицина на труд)</p>
                Октомвриска Револуција бр.24 - Куманово, КУМАНОВО
                <p style={style.small}>(адреса)</p>
            </p>
            <p style={style.right}>
                05.03.2020
                <p style={style.small}>(датум на прегледот)</p>
                -
                <p style={style.small}>(број на амбулантниот протокол)</p>
                3655
                <p style={style.small}>(број на здравствен картон)</p>
            </p>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1 style={style.title}>ИЗВЕШТАЈ ЗА ПЕРИОДИЧЕН/НАСОЧЕН/СИСТЕМАТСКИ ЗДРАВСТВЕН ПРЕГЛЕД</h1>
            <br />
            <br />
            <br />
            <br />
            <p>Врз основа на упатот за претходен преглед бр. ______________ од ___________ година</p>
            <p> Извршен е преглед на НИКИЦА МАКСИМОВСКИ
            </p>
            <p> роден/а  1994  по професија ССС
            </p>
            <p> кој/а работи на работно место ИНФОРМАТИЧАР
            </p>
            <p> Врз основа на извршените прегледи во согласност со правилникот на видот, начинот 
                и обемот на здравствени прегледи на вработените ( Службен весник на РМ бр. 171/10 ) се дава
            </p>
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1 style={style.title}>МИСЛЕЊЕ</h1>

            <p> 1.Патолошки состојби
                (дијагнози)
            </p>
            <p>
                2.Препораки за вработениот
            </p>
            <p>
                3.Препораки за работодавачот и податоци за постоење на професионални болести во врска со работата
            </p>
            <p>
                4.Оценка на работната способност/Наод и МИСЛЕЊЕ.
                Кај именуваниот ПОСТОИ патолошка состојба
                која НЕ ПРЕТСТАВУВА контраиндикација за работа, односно работни задачи.
                <br />
                РАБОТНИКОТ Е СПОСОБЕН 
                ЗА ЗАНИМАЊЕТО КОЕ ГО ОБАВУВА
                <br />
                <br />
                Забелешка:
                <br />
                <br />
                <br />
            </p>
            <p style={style.centarl}>(МП)</p>
            <p style={style.left}>
                Куманово,  05.03.2020
                <p style={style.small}>(место и датум)</p>
            </p>
            <p style={style.right}>
                ________________________
            </p>

        </div>
    )
}
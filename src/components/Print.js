import React, { useState, useEffect} from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Slide } from '@material-ui/core';
import Test from './Test'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import PrintIcon from '@material-ui/icons/Print';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import printjs from 'print-js';


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  test: {
      position: "absolute",
      width: "38vw",
      height: "110vh",
      boder: "solid 1px red",
      zIndex: "55",
      backgroundColor: "#FCFCFC",
      top: "0%",
      right: "0",
      border: "solid 1px",
      overFlowY: "scroll"
  }
});

// Create Document Component
const Print = (props) => {
    const [up, setUp] = useState(false)
    const [pdf, setPdf] = useState()

    useEffect(() => {
        setUp(props.fadeIn)
    })

    const handleClick = () => {
        // html2canvas(document.getElementById("hello"))
        // .then((canvas) => {
        //     const imgData = canvas.toDataURL('image/png');
        //     const pdf = new jsPDF();
        //     pdf.addImage(imgData, 'PNG', 0, 0);
        //     pdf.save("download.pdf");  
        // });

        // var doc = new jsPDF();
        // doc.text(20, 20, document.getElementById("hello").innerText);
        // doc.save('Test.pdf');

        let doc = new jsPDF("p", "pt")
        doc.text(20, 20, document.getElementById("hello").innerHTML);
        doc.setFont("courier")
        doc.text(20, 30, "Say hello to my little friend")

        doc.save("generated.pdf")
        }


    const handlePrint = () => {
        let printJS = printjs
        html2canvas(document.getElementById("hello"))
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            printJS(pdf)
        });
    }
    return (
        <Slide direction="left" in={up} mountOnEnter unmountOnExit>
            {/* <Document>
                <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
                </Page>
            </Document>  */}
            
            <div id="test" style={styles.test}>
            <div id='multipage-print-test'>Test multipage PDF creation...</div>


            <Dialog open={true}  aria-labelledby="form-dialog-title" fullWidth={true} maxWidth = {'md'}>
                <DialogContent >
                    <DialogActions>
                        <Button onClick={props.setPrint} color="primary" startIcon={<KeyboardReturnIcon />}>
                            RETURN
                        </Button>
                        <Button onClick={handleClick} color="primary" startIcon={<GetAppIcon />}>
                            DOWNLOAD
                        </Button>
                        <Button onClick={handlePrint} color="primary" startIcon={<PrintIcon />}>
                            PRINT
                        </Button>
                    </DialogActions>
                    <Test />
                </DialogContent>
            </Dialog>
            </div>
        </Slide>
    )
}

export default Print;
import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import logo from "../assets/img/logo2.png";


import HmacSHA256 from "crypto-js/hmac-sha256";

class PrintoPod extends Component {
  state = {
    nrKodi: "",
    cope: "",
    posts: [],
  };

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
 

  handleClickNewVersion = (e) => {
    const data = {
      nrKodi: this.state.nrKodi,
      Token: HmacSHA256(
        Math.round(new Date().getTime() / 1000).toString(),
        window.UserP.key
      ).toString(),
      username: window.UserP.username,
    };
    if (this.state.nrKodi === "") {
      swal("Ju lutem vendosni numrin e podit!");
    } else {
      
      axios.post(window.UserP.url + "POD/GetKodData", data).then((response) => {
        this.setState({ posts: response.data[0] });
        if (this.state.post !== "undefined") {
          var windowName = "";
          var windowUrl = " ";
          var myWindow = window.open(
            windowUrl,
            windowName,
            "left=0,top=0,right=0,bottom=0,width=600,height=850"
          );
          var JsBarcode = require("jsbarcode");

          var canvas = document.createElement("canvas");
          JsBarcode(canvas, this.state.posts.PODNr, {
           format: "code128",
            width: 1,
            height: 50,
          });
          for (var i = 1; i <= this.state.cope; i++) {
          
             
   myWindow.document.write(             

     "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css'>"+"</link>"+
    "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>"+
     "<script src=https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js'></script>"+
       "<div className='container-fluid'>"+
       "<div className='row content'>"+
       "<div className='col-sm-12' style='text-align:center'>"+
       "<font face='calibri' size='2px'" +
       ">" +
       "<b>" +
       this.state.posts.Marresi +
       "</b>" +
       "<br>" +
       "<b>" +
       this.state.posts.AdresaMarresi.substring(0, 60) +
       "</b>" +
       "<br>" +
       "Vlera Postare : " + 
       this.state.posts.CmimiBaze + 
       "&nbsp" +
       "LEKE" +
       "&nbsp" +
       "&nbsp" +
       "<br>" +
       "Vlera e Pakos : " +
       "&nbsp" +
       this.state.posts.ShumaSherbimeExtra +
       "&nbsp" +
       +
       "LEKE" +
       "&nbsp" +
     
       "<br>" +
       "<b>" +
       "Total :" + 
       this.state.posts.Total+
       "&nbsp" +
       "LEKE" +
       "</b>" +
       "&nbsp" +
       "<br>" +
       "<img src='" +
       canvas.toDataURL("image/png") +
       "'>" +          
       "<br>" +      
       "Pesha" +
       "&nbsp" +
       this.state.posts.Pesha +  "&nbsp" +
       "KG" + "&nbsp" +  "&nbsp" +  "Dergues:" +          
       "&nbsp"  + window.UserP.username.substring(0,7)  +              
       "<br>" +    
      "<b>"+ this.state.posts.Pershkimi  + "</b>"+
       "&nbsp" +
       "</font>" +
       "</div>"+
       "</div>"+
    "</div>"

     
   );                
            
       


          }
       
          myWindow.focus();
        }
        setTimeout(function() {myWindow.print();},500);
      });
    }
  };
  handleClick2 = (e) => {
 //   var d = new Date();

    const data = {
      nrKodi: this.state.nrKodi,

      Token: HmacSHA256(
        Math.round(new Date().getTime() / 1000).toString(),
        window.UserP.key
      ).toString(),

      username: window.UserP.username,
    };
    if (this.state.nrKodi === "") {
      swal("Ju lutem vendosni numrin e podit!");
    } else {
     

      axios.post(window.UserP.url + "POD/GetKodData", data).then((response) => {
        this.setState({ posts: response.data[0] });
        if (this.state.posts !== undefined) {
          var windowName = "";
          var windowUrl = " ";
          var myWindow = window.open(
            windowUrl,
            windowName,
            "left=0,top=0,right=0,bottom=0,width=600,height=850"
          );
          var JsBarcode = require("jsbarcode");

          var canvas = document.createElement("canvas");
          JsBarcode(canvas, this.state.posts.PODNr, {
            format: "CODE39",
            width: 1,
            height: 50,
          });
          for (var i = 1; i <= this.state.cope; i++) {
          
         if (i%2 ==0 ){
          myWindow.document.write(

            "&nbsp" +
           "&nbsp" +
           "&nbsp" +
           "&nbsp" +
           "<table >" +
           "<tr>" +
           "<th >" +
          //  "<font face='calibri'" +
          //  ">" +
           "&nbsp" +
           "<img src='" +
           logo +
           "'>" +
           "&nbsp" +
           "Nenshkrimi: _______________" +
           i +
           "/" +
           this.state.cope +
           "</th>" +
           "  </tr>" +
           "</table>" +
           "<table border='1' style='page-break-after: always' >" +
           "<thead>" +
           "<tr>" +
           "<th class='cell'>" +
           "Dergues" +
           "</th>" +
           " <th class='cell'>" +
           "Info" +
           "</th>" +
           "<th class='-cell'>" +
           "Marres" +
           "</th>" +
           "  </tr>" +
           "  </thead>" +
           "  <tbody>" +
           "<tr class='firstRow'>" +
           "<td class='Dergues:-cell'>" +
           window.UserP.username.substring(0,7)  +
           "</td>" +
           " <td class='Marres:-cell'>" +
           "Emer , Mbiemer" +
           "</td>" +
           " <td class='info:-cell'>" +
           this.state.posts.Marresi  +
           "</td>" +
           "   </tr>" +                 
           "<tr class='firstRow'>" +
           "<td class='Dergues:-cell'>" +
           "</td>" +
           " <td class='Marres:-cell'>" +
           "Adresa" +
           "</td>" +
           "<font face='calibri' size='1px'" +
">" +
           " <td>" +
           this.state.posts.AdresaMarresi.substring(0, 60) + 
           "</td>" +
           "</font>"+
           "   </tr>" +

           "<tr class='firstRow'>" +
           "<td class='Dergues:-cell'>" +
           "</td>" +
           " <td class='Marres:-cell'>" +
           "Qyteti" +
           "</td>" +
           " <td class='info:-cell'>" +
           this.state.posts.AdresaMarresi.substring(this.state.posts.AdresaMarresi.lastIndexOf(" ")+1)+
           "</td>" +
           "   </tr>" +
           "<tr class='firstRow'>" +
           "<td class='Dergues:-cell'>" +
           "" +
           "</td>" +
           " <td class='Marres:-cell'>" +
           "Telefon" +
           "</td>" +
           " <td class='info:-cell'>" +
           this.state.posts.TelMarresi +
           "</td>" +
           "   </tr>" +
           "<tr class='firstRow'>" +
           "<td class='Dergues:-cell'>" +
           "" +
           "</td>" +
           " <td class='Marres:-cell'>" +
           "Vlere Postare" +
           "</td>" +
           " <td class='info:-cell'>" +
          this.state.posts.CmimiBaze +
           "</td>" +
           "   </tr>" +
           "<tr class='firstRow'>" +
           "<td class='Dergues:-cell'>" +
           "" +
           "</td>" +
           " <td class='Marres:-cell'>" +
           "Vlere Derguese" +
           "</td>" +
           " <td class='info:-cell'>" +
           this.state.posts.ShumaSherbimeExtra +
           "</td>" +
           "   </tr>" +
           "<tr class='firstRow'>" +
           "<td class='Dergues:-cell'>" +
           "" +
           "</td>" +
           " <td class='Marres:-cell'>" +
           "Totali" +
           " <td class='info:-cell'>" +
         this.state.posts.Total+
           "</td>" +
           "   </tr>" +
           "<tr class='firstRow'>" +
           "<td class='Dergues:-cell'>" +
           "" +
           "</td>" +
           " <td class='Marres:-cell'>" +
           "Koment" +
           " <td class='info:-cell'>" +
           this.state.posts.Pershkimi.substring(0, 120) +
           "</td>" +
         
           "   </tr>" +
           "<tr class='firstRow'>" +
           "<td class='Dergues:-cell'>" +
           "" +
           "</td>" +
           " <td class='Marres:-cell'>" +
           "Barcode" +
           "</td>" +
           " <td class='info:-cell'>" +
           "<img src='" +
           canvas.toDataURL("image/png") +
           "'>" +
           "</td>" +
           "   </tr>" +
           "<tr class='firstRow'>" +
           "<td class='Dergues:-cell'>" +
           "" +
           "</td>" +
           " <td class='Marres:-cell'>" +
           "Pesha" +
           "</td>" +
           " <td class='info:-cell'>" +
           this.state.posts.Pesha +
           "</td>" +
           "   </tr>" +
           "<tr class='firstRow'>" +
           "<td class='Dergues:-cell'>" +
           "" +
           "</td>" +
           " <td class='Marres:-cell'>" +
           "Data" +
           "</td>" +
           " <td class='info:-cell'>" +
           new Date().toDateString() +
           "</td>" +
           "   </tr>" +
           "  </tbody>" +
           "</table>" +
           "&nbsp" +
           "&nbsp"
         
        
       );
            }
        
          
          else {

            myWindow.document.write(            
              "&nbsp" +
                "&nbsp" +
                "&nbsp" +
                "&nbsp" +               
                 "<table  >" +                         
                "<tr>" +
                "<th >" +
                "<font face='calibri'" +
                ">" +
                "&nbsp" +
                "<img src='" +
                logo +
                "'>" +
                "&nbsp" +
                "Nenshkrimi: _______________" +
                "&nbsp" +
                i +
                "/" +
                this.state.cope +
                "</th>" +
                "  </tr>" +
                "</table>" +
                "<table border='1' >" +
                "<thead>" +
                "<tr>" +
                "<th class='cell'>" +
                "Dergues" +
                "</th>" +
                " <th class='cell'>" +
                "Info" +
                "</th>" +
                "<th class='-cell'>" +
                "Marres" +
                "</th>" +
                "  </tr>" +
                "  </thead>" +
                "  <tbody>" +
                "<tr class='firstRow'>" +
                "<td class='Dergues:-cell'>" +
                window.UserP.username.substring(0,7)  +
                "</td>" +
                " <td class='Marres:-cell'>" +
                "Emer , Mbiemer" +
                "</td>" +
                " <td class='info:-cell'>" +
                this.state.posts.Marresi +
                "</td>" +
                "   </tr>" +
             
                "<tr class='firstRow'>" +
                "<td class='Dergues:-cell'>" +
                "</td>" +
                " <td class='Marres:-cell'>" +
                "Adresa" +
                "</td>" +
                " <td class='info:-cell'>" +
                this.state.posts.AdresaMarresi.substring(0, 60) +
                "</td>" +
                "   </tr>" +
                "<tr class='firstRow'>" +
                "<td class='Dergues:-cell'>" +
                "" +
                "</td>" +
                " <td class='Marres:-cell'>" +
                "Telefon" +
                "</td>" +
                " <td class='info:-cell'>" +
                this.state.posts.TelMarresi +
                "</td>" +
                "   </tr>" +
                "<tr class='firstRow'>" +
                "<td class='Dergues:-cell'>" +
                "" +
                "</td>" +
                " <td class='Marres:-cell'>" +
                "Vlere Postare" +
                "</td>" +
                " <td class='info:-cell'>" +
               this.state.posts.CmimiBaze +
                "</td>" +
                "   </tr>" +
                "<tr class='firstRow'>" +
                "<td class='Dergues:-cell'>" +
                "" +
                "</td>" +
                " <td class='Marres:-cell'>" +
                "Vlere Derguese" +
                "</td>" +
                " <td class='info:-cell'>" +
                this.state.posts.ShumaSherbimeExtra +
                "</td>" +
                "   </tr>" +
                "<tr class='firstRow'>" +
                "<td class='Dergues:-cell'>" +
                "" +
                "</td>" +
                " <td class='Marres:-cell'>" +
                "Totali" +
                " <td class='info:-cell'>" +
              this.state.posts.Total+
                "</td>" +
                "   </tr>" +
                "<tr class='firstRow'>" +
                "<td class='Dergues:-cell'>" +
                "" +
                "</td>" +
                " <td class='Marres:-cell'>" +
                "Koment" +
                " <td class='info:-cell'>" +
                this.state.posts.Pershkimi.substring(0, 120) +
                "</td>" +
              
                "   </tr>" +
                "<tr class='firstRow'>" +
                "<td class='Dergues:-cell'>" +
                "" +
                "</td>" +
                " <td class='Marres:-cell'>" +
                "Barcode" +
                "</td>" +
                " <td class='info:-cell'>" +
                "<img src='" +
                canvas.toDataURL("image/png") +
                "'>" +
                "</td>" +
                "   </tr>" +
                "<tr class='firstRow'>" +
                "<td class='Dergues:-cell'>" +
                "" +
                "</td>" +
                " <td class='Marres:-cell'>" +
                "Pesha" +
                "</td>" +
                " <td class='info:-cell'>" +
                this.state.posts.Pesha +
                "</td>" +
                "   </tr>" +
                "<tr class='firstRow'>" +
                "<td class='Dergues:-cell'>" +
                "" +
                "</td>" +
                " <td class='Marres:-cell'>" +
                "Data" +
                "</td>" +
                " <td class='info:-cell'>" +
                new Date().toDateString() +
                "</td>" +
                "   </tr>" +
                "  </tbody>" +
                "</table>" +
                "&nbsp" +
                "&nbsp" +
                "</font>"
              
            );
          
          }
            myWindow.focus();
          }
          setTimeout(function() {myWindow.print();},500);
        }else{
            swal("Podi nuk ekziston");
        }
      });
    }
  };

  handleClickA = (e) => {
    //   var d = new Date();
       
       const data = {
         nrKodi: this.state.nrKodi,
   
         Token: HmacSHA256(
           Math.round(new Date().getTime() / 1000).toString(),
           window.UserP.key
         ).toString(),
   
         username: window.UserP.username,
       };
       if (this.state.nrKodi === "" ) {
         swal("Ju lutem vendosni numrin e podit!");
       } else {
        
   
         axios.post(window.UserP.url + "POD/GetKodData", data).then((response) => {
            
           this.setState({ posts: response.data[0] });
           if (this.state.posts !== undefined) {
             var windowName = "";
             var windowUrl = " ";
             var myWindow = window.open(
               windowUrl,
               windowName,
               "left=0,top=0,right=0,bottom=0,width=600,height=850"
             );
             var JsBarcode = require("jsbarcode");
          
             var canvas = document.createElement("canvas");
             JsBarcode(canvas, this.state.posts.PODNr, {
               format: "CODE39",
               width: 1,
               height: 50,
             });
             for (var i = 1; i <= this.state.cope; i++) {
               {
               
                 myWindow.document.write(

                      "&nbsp" +
                     "&nbsp" +
                     "&nbsp" +
                     "&nbsp" +
                     "<table >" +
                     "<tr>" +
                     "<th >" +
                    //  "<font face='calibri'" +
                    //  ">" +
                     "&nbsp" +
                     "<img src='" +
                     logo +
                     "'>" +
                     "&nbsp" +
                     "Nenshkrimi: _______________" +
                     i +
                     "/" +
                     this.state.cope +
                     "</th>" +
                     "  </tr>" +
                     "</table>" +
                     "<table border='1'  style='page-break-after: always' >" +
                     "<thead>" +
                     "<tr>" +
                     "<th class='cell'>" +
                     "Dergues" +
                     "</th>" +
                     " <th class='cell'>" +
                     "Info" +
                     "</th>" +
                     "<th class='-cell'>" +
                     "Marres" +
                     "</th>" +
                     "  </tr>" +
                     "  </thead>" +
                     "  <tbody>" +
                     "<tr class='firstRow'>" +
                     "<td class='Dergues:-cell'>" +
                     window.UserP.username.substring(0,7)  +
                     "</td>" +
                     " <td class='Marres:-cell'>" +
                     "Emer , Mbiemer" +
                     "</td>" +
                     " <td class='info:-cell'>" +
                     this.state.posts.Marresi  +
                     "</td>" +
                     "   </tr>" +                 
                     "<tr class='firstRow'>" +
                     "<td class='Dergues:-cell'>" +
                     "</td>" +
                     " <td class='Marres:-cell'>" +
                     "Adresa" +
                     "</td>" +
                     "<font face='calibri' size='1px'" +
        ">" +
                     " <td>" +
                     this.state.posts.AdresaMarresi.substring(0, 60) + 
                     "</td>" +
                     "</font>"+
                     "   </tr>" +

                     "<tr class='firstRow'>" +
                     "<td class='Dergues:-cell'>" +
                     "</td>" +
                     " <td class='Marres:-cell'>" +
                     "Qyteti" +
                     "</td>" +
                     " <td class='info:-cell'>" +
                     this.state.posts.AdresaMarresi.substring(this.state.posts.AdresaMarresi.lastIndexOf(" ")+1)+
                     "</td>" +
                     "   </tr>" +
                     "<tr class='firstRow'>" +
                     "<td class='Dergues:-cell'>" +
                     "" +
                     "</td>" +
                     " <td class='Marres:-cell'>" +
                     "Telefon" +
                     "</td>" +
                     " <td class='info:-cell'>" +
                     this.state.posts.TelMarresi +
                     "</td>" +
                     "   </tr>" +
                     "<tr class='firstRow'>" +
                     "<td class='Dergues:-cell'>" +
                     "" +
                     "</td>" +
                     " <td class='Marres:-cell'>" +
                     "Vlere Postare" +
                     "</td>" +
                     " <td class='info:-cell'>" +
                    this.state.posts.CmimiBaze +
                     "</td>" +
                     "   </tr>" +
                     "<tr class='firstRow'>" +
                     "<td class='Dergues:-cell'>" +
                     "" +
                     "</td>" +
                     " <td class='Marres:-cell'>" +
                     "Vlere Derguese" +
                     "</td>" +
                     " <td class='info:-cell'>" +
                     this.state.posts.ShumaSherbimeExtra +
                     "</td>" +
                     "   </tr>" +
                     "<tr class='firstRow'>" +
                     "<td class='Dergues:-cell'>" +
                     "" +
                     "</td>" +
                     " <td class='Marres:-cell'>" +
                     "Totali" +
                     " <td class='info:-cell'>" +
                   this.state.posts.Total+
                     "</td>" +
                     "   </tr>" +
                     "<tr class='firstRow'>" +
                     "<td class='Dergues:-cell'>" +
                     "" +
                     "</td>" +
                     " <td class='Marres:-cell'>" +
                     "Koment" +
                     " <td class='info:-cell'>" +
                     this.state.posts.Pershkimi.substring(0, 120) +
                     "</td>" +
                   
                     "   </tr>" +
                     "<tr class='firstRow'>" +
                     "<td class='Dergues:-cell'>" +
                     "" +
                     "</td>" +
                     " <td class='Marres:-cell'>" +
                     "Barcode" +
                     "</td>" +
                     " <td class='info:-cell'>" +
                     "<img src='" +
                     canvas.toDataURL("image/png") +
                     "'>" +
                     "</td>" +
                     "   </tr>" +
                     "<tr class='firstRow'>" +
                     "<td class='Dergues:-cell'>" +
                     "" +
                     "</td>" +
                     " <td class='Marres:-cell'>" +
                     "Pesha" +
                     "</td>" +
                     " <td class='info:-cell'>" +
                     this.state.posts.Pesha +
                     "</td>" +
                     "   </tr>" +
                     "<tr class='firstRow'>" +
                     "<td class='Dergues:-cell'>" +
                     "" +
                     "</td>" +
                     " <td class='Marres:-cell'>" +
                     "Data" +
                     "</td>" +
                     " <td class='info:-cell'>" +
                     new Date().toDateString() +
                     "</td>" +
                     "   </tr>" +
                     "  </tbody>" +
                     "</table>" +
                     "&nbsp" +
                     "&nbsp"
                   
                  
                 );
               }
               myWindow.focus();
             }
             setTimeout(function() {myWindow.print();},500);
           }else{
               swal("Podi nuk ekziston");
           }
        
         });
       }
     };


  render() {
    return (
      <div className="Form">
        <div className="card card-body bg-light col-md-3">
          <label className="">Barcode</label>
          <input
            id="nrKodi"
            name="nrKodi"
            value={this.state.nrKodi}
            className="form-control "
            type="text"
            onChange={(e) => this.handleInputChange(e, "nrKodi")}
          />
        </div>
        <div className="card card-body bg-light col-md-3">
          <label className="">Cope</label>
          <input
            id="cope"
            name="cope"
            value={this.state.cope}
            className="form-control "
            type="text"
            onChange={(e) => this.handleInputChange(e, "cope")}
          />
        </div>

        <div className="card card-body bg-light col-md-3">
          <div className="row">
            <button
              className="btn btn-primary ml-3"
              onClick={this.handleClick2}
            >
              <span data-notify="icon" className="pe-7s-print" />
              &nbsp; Printo Fature A4
            </button>
          </div>
        </div>

        <div className="card card-body bg-light col-md-3">
          <div className="row">
            <button
              className="btn btn-primary ml-3"
              onClick={this.handleClickA}
            >
              <span data-notify="icon" className="pe-7s-print" />
              &nbsp; Printo Fature A6
            </button>
          </div>
        </div>
        
      </div>
    );
  }
}

export default PrintoPod;

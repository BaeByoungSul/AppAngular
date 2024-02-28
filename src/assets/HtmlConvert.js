// function greet(){
//     alert("Hello");
//  }
 //alert("Pop up");
//import mammoth from 'mammoth';
//import mammoth, { convertToHtml } from "mammoth";
//import "mammoth/mammoth.browser";
//import "mammoth";

//import * as mammoth from "mammoth";
//export default convertToHtml;
	//const fs = require('fs');
  //import * as fs from 'fs';

//var mammoth = require("mammoth");
//import {convertToHtml} from "mammoth";

// import 를 하면 작동하지 않는데 원인은 모르겠음????
function parseWordDocxFile(inputElement) {
  var files = inputElement.files || [];
  if (!files.length) return;
  var file = files[0];

  console.time();
  var reader = new FileReader();
  reader.onloadend = function(event) {
    var arrayBuffer = reader.result;
    // debugger
    mammoth.convertToHtml({arrayBuffer: arrayBuffer})
          .then(function (resultObject) {
      result1.innerHTML = resultObject.value
      console.log(resultObject.value)
    })
    console.timeEnd();

    // mammoth.extractRawText({arrayBuffer: arrayBuffer}).then(function (resultObject) {
    //   result2.innerHTML = resultObject.value
    //   console.log(resultObject.value)
    // })

    // mammoth.convertToMarkdown({arrayBuffer: arrayBuffer}).then(function (resultObject) {
    //   result3.innerHTML = resultObject.value
    //   console.log(resultObject.value)
    // })
  };
  reader.readAsArrayBuffer(file);
} 

function parseWordDocxFile2(arrayBuffer) {
  console.time();
  
  
  mammoth.convertToHtml({arrayBuffer: arrayBuffer}).then(function (resultObject) {
    result1.innerHTML = resultObject.value
    console.log(resultObject.value)
  })
  console.timeEnd();
  
}   
function myConvertToHtml(arrayBuffer) {
  var rtnHtml  
  mammoth.convertToHtml({arrayBuffer: arrayBuffer}).then(function (resultObject) {
    //console.log(resultObject.value)
    var html = resultObject.value; // The generated HTML
    var messages = resultObject.messages; // Any 
    
    return html;
  }).done( function(res){
      console.log(res)
      return res;
    }
  )

  
  
}   
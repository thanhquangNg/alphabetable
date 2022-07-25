import React,{useState} from "react";



function Form(){
    const [selectChar, setChar] = useState([]);

    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));

    
    const selectionChar = (e) =>{
        if(!selectChar.includes(e.target.id) && selectChar.length<5){
            const elem = document.getElementById(e.target.id);
            elem.style.color = 'red';
            elem.style.fontWeight = 'bold'
        }
        if(selectChar.includes(e.target.id)){
            const elem = document.getElementById(e.target.id);
            elem.style.color = 'black';
            elem.style.fontWeight = 'normal'
            for(var i = 0;i<selectChar.length;i++){
                if(selectChar[i]===e.target.id){
                    selectChar.splice(i,1);
                    setChar([...selectChar])
                }
            }
        }else if(selectChar.length<5){
            setChar([...selectChar,e.target.id]);
        }
    }

    const formValidation = (e)=>{
        e.preventDefault();
        let row = document.getElementById("row").value;
        let column = document.getElementById("column").value;
        //remove previous table
        var content = true;
        //add new
        if(row < 0 || isNaN(row) ||column < 0 || isNaN(column)){
            console.log( Boolean(row))
            console.log(column)
            console.log("no row/column");
            document.getElementById("table").innerHTML = "Invalid number value for row or column";
            content = false;
            
        }
        if(selectChar.length===0){
            console.log("no select");
            document.getElementById("table").innerHTML = "You must choose up to 5 characters";
            content=false;
        }
        if(content){
            document.getElementById("table").innerHTML = "Table generated succesfully!";
            const tbl = document.querySelector("table");
            if(tbl){
            tbl.remove();}
            generateTable(selectChar,row,column);
        }
    }

    function generateTable(arr,row,col){
        const tblcontain = document.getElementById("table");
        const tbl = document.createElement("table");
        const tblBody = document.createElement("tbody"); 
        for(let i = 0;i<row;i++){
            const row = document.createElement("tr");
            // row.setAttribute("border", "2")
            row.setAttribute("class", "fs-1 mx-auto border border-success p-2 mb-2 align-middle");
            for(let j = 0;j<col;j++){
                const cell = document.createElement("td");
                // cell.setAttribute("border", "2");
                cell.setAttribute("class", "fs-1 mx-auto border border-success p-2 mb-2 align-middle px-5 py-3");
                const cellText = document.createTextNode(arr[Math.floor(Math.random()*arr.length)]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        tblcontain.appendChild(tbl);
        // tbl.setAttribute("border", "2");
        tbl.setAttribute("class", "fs-1 mx-auto border border-success p-2 mb-2 align-middle table table-primary table-striped");
    }
   
    return(
        
        <div className='container'>
            {alphabet.map((char,index)=>(
                <p key={index} id={char} className='d-inline-block px-2' onClick={selectionChar} style={{
                    
                    color: (selectChar.includes({char})) ? 'red' : '',
                  }}>{char}</p>
            ))
            }

            <form className="d-flex justify-content-center container" onSubmit={formValidation}>
            <div className="col-auto">
            {/* <label for="inputRow">Rows</label> */}
                <input type="number" className="form-control" id="row" placeholder="Rows"/>
            </div>

             <div className="col-auto">
            {/* <label for="inputPassword2">Columns</label> */}
                <input type="number" className="form-control" id="column" placeholder="Columns"/>
            </div>
            <div className="col-auto">
                <button  type="submit" className="btn btn-primary mb-3">Generate</button>
            </div>
            </form>
            <div id="table" className="container">

            </div>
            

            

        </div>
    )
}
export default Form
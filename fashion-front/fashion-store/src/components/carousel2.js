import React from "react";
import Itemcard from "./itemcard";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cover from "./collectioncover";

function Carousela() {
    return (
        <div className="carousel" style={{marginRight:'40rem '}}>
        <ul class="list-group list-group-horizontal position-relative overflow-auto w-65" style={{marginRight:'0 '}}>
        <li class="list-group-item"><Cover/></li>
        <li class="list-group-item"><Cover/></li>
        <li class="list-group-item"><Cover/></li>
        <li class="list-group-item"><Cover/></li>
        <li class="list-group-item"><Cover/></li>

    </ul>
    </div>
    );
  }
  
  export default Carousela;

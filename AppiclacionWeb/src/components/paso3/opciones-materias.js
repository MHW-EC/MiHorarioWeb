import React from "react";
import {CssBaseline,Container} from "@material-ui/core";
import CardMaterias from "./card-materias";

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        {[0,1,2,3,4,5,6,7,8,9].map(()=> <><CardMaterias />
        <br /></> )}
      </Container>
    </React.Fragment>
  );
}

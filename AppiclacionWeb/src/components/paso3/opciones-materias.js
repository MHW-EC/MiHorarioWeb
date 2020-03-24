import React from "react";
import {CssBaseline,Container} from "@material-ui/core";
import CardMateria from "./card-materia";

export default function SimpleContainer(props) {

  const [materiasSelect] = React.useState(props.materiasSelect);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        { materiasSelect.map((materia)=> 
        <React.Fragment key={materia['codigo']}>
          <CardMateria materia={materia} />
          <br />
        </React.Fragment> )}
      </Container>
    </React.Fragment>
  );
}

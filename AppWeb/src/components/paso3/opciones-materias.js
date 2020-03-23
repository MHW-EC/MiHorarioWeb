import React from "react";
import {CssBaseline,Container} from "@material-ui/core";
import CardMaterias from "./card-materias";

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <CardMaterias />
        <br />
        <CardMaterias />
        <br />
        <CardMaterias />
        <br />
        <CardMaterias />
        <br />
        <CardMaterias />
        <br />
        <CardMaterias />
        <br />
        <CardMaterias />
        <br />
        <CardMaterias />
        <br />
        <CardMaterias />
        <br />
      </Container>
    </React.Fragment>
  );
}

import React from "react";
import PropTypes from "prop-types";
import {withWidth, GridList} from "@material-ui/core";

const getNCOLS = (ancho) => {
	switch (ancho) {
		case "xs":
			return 1
		case 'sm':
			return 1.3
		case 'md':
			return 1.5
		case 'lg':
			return 2
		case 'xl':
      return 2.5
    default:
      return 1
	}
}
function WithWidth2(props) {
  const { width } = props;
  
  return (
    <GridList
    padding={10}
    spacing={10}
    cellHeight={'auto'}
    style={{
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
	}}
    cols={getNCOLS(width)}
    children={props.children}
/> )
}
WithWidth2.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired
};
export default withWidth()(WithWidth2);
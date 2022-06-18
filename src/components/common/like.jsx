import React, { Component } from "react";

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      className={classes}
      aria-hidden
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Like;

// class Like extends React.Component {
//   render() {
//     let classes = "fa fa-heart";
//     if (!this.props.liked) classes += "-o";
//     return (
//       <i
//         className={classes}
//         aria-hidden
//         onClick={this.props.onClick}
//         style={{ cursor: "pointer" }}
//       ></i>
//     );
//   }
// }

// export default Like;

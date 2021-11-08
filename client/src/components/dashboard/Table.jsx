// import React, { Component } from "react";

// import APIHandler from "./../../api/handler";


// export default class Table extends Component {
//   state = {
//     elements: null,
//   };

//   componentDidMount() {
//     APIHandler.get("api/" + this.props.model)
//       .then((res) => {
//           console.log(res)
//           const { data } = res
//           console.log(Array.isArray(data))
//           console.log(data, [data])
//         this.setState({
//             elements: data
//         });
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }

//   render() {
//     const categories = {
//       artists: ["style", "rates"],
//       albums: ["releaseDate", "label","rates"],
//       labels: ["country", "city"],
//     };
//     console.log('STATE: ', this.state.elements)
//     if (!this.state.elements) return <div className="loading">Loading...</div>
//     return (
//       <>
//         <h1 className="title medium">Admin {this.props.model} + </h1>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>name</th>
//               {
//                 this.props.model === "styles" ? <th>color</th> : categories[this.props.model].map((category, index) => {
//                     return <th key={index}> { category === "releaseDate" ? "release" : {category} } </th>
//                 })
//               }
//               <th>edit</th>
//               <th>trash</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.elements.map((element) => {
//                 console.log('el ',element)
//               return (
//                 <tr key={element._id}>
//                   <td>{this.props.model === "albums" ? element.title : element.name}</td>
//                   {   this.props.model === "styles" ? <td className="color-box" style={{backgroundColor: element.color }}></td> :
//                       categories[this.props.model].map((category , i) => {
//                           return  <td key={element._id + String(i)}> {
//                               element[category] === 'rates' ? "unrated" : element[category] === "style" ? element[category].name : element[category]
//                               } </td>
//                       })
//                   }
//                   <td><i className="fas fa-edit"></i></td>
//                   <td><i className="fas fa-times"></i></td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </>
//     );
//   }
// }
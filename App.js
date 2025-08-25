import React from "react";
import ReactDOM from "react-dom/client";

// const Title =() => (
//     <h1 className="head">
//         Namaste React using JSX
//     </h1>
// );

// const HeadingComponent =() =>(
//     <div id="container">
//         <Title/>
//         <h1 className="heading">Namaste React using React Functional Component</h1>
//     </div>
// );

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<HeadingComponent></HeadingComponent>);


const header = React.createElement("div",{className:"title"},
    [React.createElement("h1",{key:1},"I am a H1"),
React.createElement("h2",{key:2},"I am a H2"),
React.createElement("h3",{key:3},"I am a H3")
    ]
);

const header2 = (
    <div className="title">
        <h1>H1</h1>
        <h2 style={{color:"red"}}>H2</h2>
        <h3>H3</h3>
    </div>
);

const Header3 = () => (
     <div className="title">
      {header2}
        <h1>H1</h1>
        <h2>H2</h2>
        <h3>H3</h3>
    </div>
);


//Assignment Question 2
const HeaderComponent = () => (
     <div className="header">
        <img className="logo" src="https://images.unsplash.com/photo-1620288627223-53302f4e8c74?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
        
        </img>
        <div className="search-bar">
<input type="text" placeholder="Search-ME"></input>
        </div>
        <img className="user-icon" src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png">
        
        </img>
        </div>
   
)


const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(header2);
// root.render(<Header3/>);
root.render(<HeaderComponent/>)



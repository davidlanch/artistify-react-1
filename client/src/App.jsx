import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
// pages components
import Home from "./views/Home";
import Artists from "./views/Artists";
import Artist from "./views/Artist";
import Albums from "./views/Albums";
import Album from "./views/Album";
import Contact from "./views/Contact";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";
import Table from "./components/dashboard/Table"
import ArtistsTable from "./components/dashboard/ArtistsTable"
// partials
import HeaderMain from "./components/template/HeaderMain";
import FooterMain from "./components/template/FooterMain";
import NavMobile from "./components/nav/NavMobile";

export default function App() {
  const [navMobileStatus, setNavMobileStatus] = useState(false);

  const handleNavMobileStatus = () => {
    setNavMobileStatus(!navMobileStatus);
  };

  return (
    <React.Fragment>
      <HeaderMain navMobileClbk={handleNavMobileStatus} />
      <NavMobile
        navMobileStatus={navMobileStatus}
        navMobileClbk={handleNavMobileStatus}
      />
      <main id="content_main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/artists" component={Artists} />
          <Route path="/artists/:id" component={Artist} />
          <Route exact path="/albums" component={Albums} />
          <Route path="/albums/:id" component={Album} />
          <Route path="/contact-us" component={Contact} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/admin/artists" component={ArtistsTable}/>
           <Route path="/admin/albums" render={(props) => {
            return (<Table {...props} model="albums"/>)
          }}/>
           <Route path="/admin/labels" render={(props) => {
            return (<Table {...props} model="labels"/>)
          }}/>
           <Route path="/admin/styles" render={(props) => {
            return (<Table {...props} model="styles"/>)
          }}/>

          {/* handling 404 pages (if no matched route above this component triggers) */}
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
      <FooterMain />
    </React.Fragment>
  );
}

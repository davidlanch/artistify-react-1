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
import ArtistsTable from "./components/dashboard/ArtistsTable"
import AlbumsTable from "./components/dashboard/AlbumsTable";
import LabelsTable from "./components/dashboard/LabelsTable";
import StylesTable from "./components/dashboard/StylesTable";
// forms
import NewAlbum from "./components/form/NewAlbum.jsx";
import NewArtist from "./components/form/NewArtist.jsx";
import NewStyle from "./components/form/NewStyle.jsx";
import NewLabel from "./components/form/NewLabel.jsx";
import EditAlbum from "./components/form/EditAlbum.jsx";
import EditArtist from "./components/form/EditArtist.jsx";
import EditStyle from "./components/form/EditStyle.jsx";
import EditLabel from "./components/form/EditLabel.jsx";

// partials
import HeaderMain from "./components/template/HeaderMain";
import FooterMain from "./components/template/FooterMain";
import NavMobile from "./components/nav/NavMobile";

// auth
import { ProtectedRoute } from "./auth/ProtectedRoute";
import Signin from "./components/form/Signin";
import Signup from "./components/form/Signup";

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
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />

          <Route exact path="/artists" component={Artists} />
          <ProtectedRoute path="/artists/:id" component={Artist} />
          <Route exact path="/albums" component={Albums} />
          <ProtectedRoute path="/albums/:id" component={Album} />
          <Route path="/contact-us" component={Contact} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/admin/artists" component={ArtistsTable}/>
          <ProtectedRoute exact path="/admin/albums" component={AlbumsTable}/>
          <ProtectedRoute exact path="/admin/labels" component={LabelsTable}/>
          <ProtectedRoute exact path="/admin/styles" component={StylesTable}/>         
          
          {/* create and edit routes */}
          <ProtectedRoute exact path="/admin/albums/create" component={NewAlbum} />
          <ProtectedRoute exact path="/admin/artists/create" component={NewArtist} />
          <ProtectedRoute exact path="/admin/styles/create" component={NewStyle} />
          <ProtectedRoute exact path="/admin/labels/create" component={NewLabel} />

          <ProtectedRoute path="/admin/albums/:id/edit" component={EditAlbum} />
          <ProtectedRoute path="/admin/albums/edit" component={EditAlbum} />
          
          <ProtectedRoute path="/admin/styles/:id/edit" component={EditStyle} />
          <ProtectedRoute path="/admin/labels/:id/edit" component={EditLabel} />
          <ProtectedRoute
                  path="/admin/artists/:id/edit"
                  render={(props) => {
                    console.log(props, 'props in app');
                    return (
                      <EditArtist
                        {...props}
                      />
                    );
                  }}
                />

            {/* <Route path="/admin/albums" render={(props) => {
          return (<Table {...props} model="albums"/>)
          }}/>
           <Route path="/admin/labels" render={(props) => {
            return (<Table {...props} model="labels"/>)
          }}/>
           <Route path="/admin/styles" render={(props) => {
            return (<Table {...props} model="styles"/>)
          }}/> */}

          {/* handling 404 pages (if no matched route above this component triggers) */}
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
      <FooterMain />
    </React.Fragment>
  );
}

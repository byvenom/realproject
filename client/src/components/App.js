import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadVideoPage from "./views/UploadVideoPage/UploadVideoPage";
import VideoDetailPage from './views/VideoDetailPage/VideoDetailPage';
import SubscriptionPage from './views/SubscriptionPage/SubscriptionPage';
import MoviePage from './views/MoviePage/MoviePage'
import MovieDetail from './views/MovieDetail/MovieDetail'
import FavoritePage from './views/FavoritePage/FavoritePage'
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(UploadVideoPage, true)} />
          <Route exact path="/video/detail/:videoId" component={Auth(VideoDetailPage, null)} />
          <Route exact path="/video/subscription" component={Auth(SubscriptionPage, null)} />
          {/* 유튜브 클론 */}
          <Route exact path="/movie" component={Auth(MoviePage, null)} />
          <Route exact path="/movie/detail/:movieId" component={Auth(MovieDetail, null)} />
          <Route exact path="/movie/favorite" component={Auth(FavoritePage, true)} />

        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;

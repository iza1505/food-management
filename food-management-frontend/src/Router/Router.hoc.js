
import React, {Component} from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Detector } from "react-detect-offline";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Router extends Component {
    render() {
      return (
        <BrowserRouter>
          <Route
            render={({ location }) => (
              <>
                <Detector render={({ online }) => (!online ? <NetworkNotification /> : null)} />
                <TransitionGroup>
                  <CSSTransition key={location.key} timeout={300} classNames="fade">
                    <Switch location={location}>
                      {routes.map(elem =>
                        elem.public === true ? (
                          <Route key={elem.path} exact {...elem} />
                        ) : (
                          <PrivateRoute key={elem.path} exact {...elem} />
                        )
                      )}
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              </>
            )}
          />
        </BrowserRouter>
      );
    }
  }
  
  export default Router;
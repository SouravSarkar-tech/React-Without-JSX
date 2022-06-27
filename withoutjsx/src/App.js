import React from "react";
import './App.css'
import * as rhh from "react-hyperscript-helpers";


let inc = (val) => () => val;

let { h, div, button, span, hr } = rhh;

const useStatic = (any) => {
  return React.useMemo(any, []);
}

export default function App() {
  let [state, setState] = React.useState(0);

  let handlers = useStatic(function () {
    return {
      reset: function () {
        setState(inc(0));
      },
      increment: function () {
        setState((prevState) => prevState + 1);
      }
    };
  });

  React.useEffect(function () {
    setInterval(handlers.increment, 1000);
  }, []);

  return div([
    span([`Countdown: ${state}`]),
    hr(),
    div([h(button, { onClick: handlers.reset }, ["Reset To Default"])]),
    hr(),
    div([
      button(
        {
          onClick: handlers.increment
        },
        ["Increment the Value By One"]
      )
    ])
  ]);
}



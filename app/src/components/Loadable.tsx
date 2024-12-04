import React, { ComponentType, Suspense } from "react";
import Loader from "./Loader";

const Loadable = <P extends object>(Component: ComponentType<P>) => {
  const WrapperComponent: React.FC<P> = (props) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

  return WrapperComponent;
};

export default Loadable;

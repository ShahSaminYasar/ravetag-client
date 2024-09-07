import { useContext } from "react";
import { ValuesContext } from "../../providers/ValuesProvider";

export const useValues = () => {
  return useContext(ValuesContext);
};

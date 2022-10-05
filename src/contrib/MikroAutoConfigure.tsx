import React, { useEffect } from "react";
import { useFakts } from "fakts";
import { useHerre } from "herre";
import { useMikro } from "../mikro/MikroContext";
import result from "../api/mikro/fragments";

export const MikroAutoConfigure: React.FC<{}> = (props) => {
  const { configure } = useMikro();
  const { token } = useHerre();
  const { fakts } = useFakts();

  useEffect(() => {
    if (token && fakts.mikro) {
      configure({
        secure: fakts.mikro.secure,
        datalayer: fakts.mikro.datalayer,
        wsEndpointUrl: fakts.mikro.ws_endpoint_url,
        endpointUrl: fakts.mikro.endpoint_url,
        possibleTypes: result.possibleTypes,
        retrieveToken: () => token,
        s3resolve: (path?: string | null) => {
          if (path) {
            return fakts.s3.resolve(path);
          }
          return "fallback";
        },
      });
    }
  }, [token, fakts]);

  return <> </>;
};

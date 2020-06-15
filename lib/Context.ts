import * as React from "react";

import { MqttContext } from "./types";

export default React.createContext<MqttContext<any>>({} as MqttContext<any>);

import { drizzleZeroConfig } from "drizzle-zero";

import { scenes, scripts } from "./src/schema";

export default drizzleZeroConfig(
  { scenes, scripts },
  {
    suppressDefaultsWarning: true,
    tables: {
      scenes: {
        body: true,
        heading: true,
        id: true,
        ord: true,
        scriptId: true,
        updatedAt: true,
      },
      scripts: {
        createdAt: true,
        id: true,
        title: true,
      },
    },
  }
);

import { useZero, useQuery } from "@rocicorp/zero/react";
import type { Schema } from "@script/db/zero-schema.gen";
import { createFileRoute } from "@tanstack/react-router";
import { nanoid } from "nanoid";

const SCRIPT_ID = "00000000-0000-0000-0000-000000000001";

const ScenesComponent = () => {
  const z = useZero<Schema>();

  const [scenes] = useQuery(
    z.query.scenes.where("scriptId", "=", SCRIPT_ID).orderBy("ord", "asc")
  );

  const addScene = () => {
    let maxOrd = -1;
    for (const s of scenes) {
      if (s.ord > maxOrd) {
        maxOrd = s.ord;
      }
    }
    z.mutate.scenes.insert({
      body: "",
      heading: `Scene ${maxOrd + 2}`,
      id: nanoid(),
      ord: maxOrd + 1,
      scriptId: SCRIPT_ID,
      updatedAt: Date.now(),
    });
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-medium text-lg">Scenes ({scenes.length})</h1>
        <button
          className="rounded border px-3 py-1 text-sm hover:bg-accent"
          onClick={addScene}
          type="button"
        >
          + Add scene
        </button>
      </div>
      <div className="grid gap-3">
        {scenes.map((scene) => (
          <div className="rounded-lg border p-3" key={scene.id}>
            <input
              className="mb-2 w-full bg-transparent font-medium text-sm outline-none"
              defaultValue={scene.heading ?? ""}
              onBlur={(e) =>
                z.mutate.scenes.update({
                  heading: e.target.value,
                  id: scene.id,
                  updatedAt: Date.now(),
                })
              }
            />
            <textarea
              className="w-full resize-y bg-transparent text-sm outline-none"
              defaultValue={scene.body ?? ""}
              onBlur={(e) =>
                z.mutate.scenes.update({
                  body: e.target.value,
                  id: scene.id,
                  updatedAt: Date.now(),
                })
              }
              rows={4}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/scenes")({
  component: ScenesComponent,
});

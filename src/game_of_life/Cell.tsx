import * as React from "react";

export type position = [number, number];

export interface CellType {
  pos: position;
  alive: boolean;
}

export default function Cell({
  handler,
  alive,
}: {
  alive: boolean;
  handler: () => void;
}): React.ReactElement {
  return (
    <>
      <div
        className={alive ? "LivingCell" : "DeadCell"}
        onClick={handler}
      ></div>
    </>
  );
}

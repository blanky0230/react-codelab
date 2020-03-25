import * as React from "react";
import { useState, useEffect } from "react";
import Cell, { CellType, position } from "./Cell";

const toggleCell = (pos: position, cells: Map<string, CellType>): Map<string, CellType> => {
  const cell = cells.get(JSON.stringify(pos));
  if (!cells.has(JSON.stringify(pos)) && undefined === cell) {
    return cells;
  }
  const newCell = { pos: pos, alive: !cell?.alive };
  return (new Map<string, CellType>(cells)).set(JSON.stringify(pos), newCell);
};

const cellsAsArray = (cellMap: Map<string, CellType>): Array<CellType> => {
  const result = new Array<CellType>();
  cellMap.forEach((v) => result.push(v));
  return result;
};


const retrieveNeighbours = (cell: CellType, cells: Map<string, CellType>): Array<CellType> => {
    const neighbours = new Array<CellType>();
    const [boundX, boundY] = cell.pos
    for (let i = boundX -1; i <= boundX + 1; i++) {
        for (let j = boundY -1; j <= boundY +1; j++) {
            const cursor = JSON.stringify([i, j] as position);
            const neighbour = cells.get(cursor);
            if(neighbour === cell || neighbour === undefined) {
                continue;
            }
            neighbours.push(neighbour);
        }
    }
    return neighbours;
}

const mustToggle = (cell: CellType, cells: Map<string, CellType>): boolean => {
  const aliveNeighbours = retrieveNeighbours(cell, cells).filter(n => n.alive);
  if (cell.alive) {
    if (aliveNeighbours.length < 2 || aliveNeighbours.length > 3) {
      return true;
    }
    return false;
  }
  if (aliveNeighbours.length === 3) {
    return true;
  }
  return false;
};

const update = (cells: Map<string, CellType>): Map<string, CellType> => {
  return cellsAsArray(cells)
    .filter(cu => mustToggle(cu, cells))
    .map(c => {
      return { pos: c.pos, alive: !c.alive } as CellType;
    })
    .reduce(
      (map, cell) => map.set(JSON.stringify(cell.pos), cell),
      new Map<string, CellType>(cells.entries())
    );
};


function createEmptyCells(
  columns: number,
  rows: number
): Map<string, CellType> {
  const board = new Map<string, CellType>();
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      const pos = [x, y] as position;
      board.set(JSON.stringify(pos), { pos: pos, alive: false } as CellType);
    }
  }
  return board;
}

function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = React.useRef(callback);

  useEffect( () => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect( () => {
    function tick(): void {
      savedCallback.current();
    }
    if(delay !== null) {
      let id = setInterval(tick, delay);
      return (): void => clearInterval(id);
    }
  });
}

export default function World({ width = 40, height = 40 }): React.ReactElement {
  const [generation, setGeneration] = useState(0);
  const [cells, setCells] = useState(createEmptyCells(width, height));
  const [isAuto, setIsAuto] = useState(false);
  const [delay, setDelay] = useState(1);

  const toggleAuto = (): void => setIsAuto(!isAuto);
  useInterval( () => {
    setGeneration(generation +1);
    setCells(update(cells));
  }, isAuto ? delay * 1000 : null);

  return (
    <div>
      <h1>Generation: {generation}</h1>
      <div
      className="World"
      style={{
        gridTemplateColumns: new Array<string>(width).fill("20px").join(" "),
        gridTemplateRows: new Array<string>(height).fill("20px").join(" "),
      }}>
      {cellsAsArray(cells).map((c) => (
        <Cell
          key={JSON.stringify(c.pos)}
          alive={c.alive}
          handler={(): void => setCells(toggleCell(c.pos, cells))}
        ></Cell>
      ))}
      </div>
    <button onClick={(): void => { setGeneration(generation+1); setCells(update(cells));}}>Iterate</button>
    <button onClick={toggleAuto}>{isAuto ? 'Stop' : 'Start'}</button>
    <button onClick={ (): void => { setGeneration(0); setCells(createEmptyCells(width, height)); setIsAuto(false); setDelay(1) }}>RESET</button>
    <input type="number" onChange={(event) => setDelay(Number(event.target.value))} value={delay}></input>
    </div>
  );
}

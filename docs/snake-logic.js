export const DIRECTIONS = {
  UP: [-1, 0],
  DOWN: [1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1],
};

const KEY_TO_DIRECTION = {
  w: DIRECTIONS.UP,
  a: DIRECTIONS.LEFT,
  s: DIRECTIONS.DOWN,
  d: DIRECTIONS.RIGHT,
  ArrowUp: DIRECTIONS.UP,
  ArrowLeft: DIRECTIONS.LEFT,
  ArrowDown: DIRECTIONS.DOWN,
  ArrowRight: DIRECTIONS.RIGHT,
};

function createInitialSnakeBody(headRow, headColumn) {
  return [
    [headRow, headColumn],
    [headRow, headColumn - 1],
    [headRow, headColumn - 2],
  ];
}

export function createSnake(gridSize, snakeBodySize = 3) {
  const headRow = Math.floor(gridSize / 2);
  const headColumn = Math.floor(gridSize / 2);
  const body = createInitialSnakeBody(headRow, headColumn);

  return {
    body,
    direction: DIRECTIONS.RIGHT,
  };
}

export function moveSnake(snake) {
  const [rowMovement, columnMovement] = snake.direction;
  const [currentHeadRow, currentHeadColumn] = snake.body[0];

  const newHeadPosition = [currentHeadRow + rowMovement, currentHeadColumn + columnMovement];
  const bodyWithLastSegmentRemoved = snake.body.slice(0, -1);
  const newBody = [newHeadPosition, ...bodyWithLastSegmentRemoved];

  return {
    ...snake,
    body: newBody,
  };
}

export function setDirection(snake, keypress) {
  const requestedDirection = KEY_TO_DIRECTION[keypress];
  if (!requestedDirection) return snake;

  const [currentDirectionRow, currentDirectionColumn] = snake.direction;
  const [requestedDirectionRow, requestedDirectionColumn] = requestedDirection;

  const isOppositeDirection =
    currentDirectionRow === -requestedDirectionRow && currentDirectionColumn === -requestedDirectionColumn;
  if (isOppositeDirection) return snake;

  return {
    ...snake,
    direction: requestedDirection,
  };
}

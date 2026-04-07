(function () {
  const BOARD_SIZE = 20;
  const CELL_PADDING = 1.5;
  const MAX_BUFFERED_TURNS = 2;
  const INITIAL_DIRECTION = "right";
  const SPEEDS = {
    calm: 220,
    normal: 150,
    turbo: 95,
  };
  const STATUS_TEXT = {
    ready: "Ready",
    running: "Running",
    paused: "Paused",
    gameover: "Game Over",
  };
  const DIRECTIONS = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };

  const elements = {
    canvas: document.getElementById("game-canvas"),
    boardFrame: document.getElementById("board-frame"),
    scoreValue: document.getElementById("score-value"),
    statusValue: document.getElementById("status-value"),
    speedValue: document.getElementById("speed-value"),
    statusChip: document.getElementById("status-chip"),
    boardMessage: document.getElementById("board-message"),
    difficultySelect: document.getElementById("difficulty-select"),
    startButton: document.getElementById("start-button"),
    pauseButton: document.getElementById("pause-button"),
    restartButton: document.getElementById("restart-button"),
    touchButtons: Array.from(document.querySelectorAll("[data-direction]")),
  };

  const ctx = elements.canvas.getContext("2d");
  let tickHandle = null;
  let resizeObserver = null;

  const state = {
    snake: createInitialSnake(),
    direction: INITIAL_DIRECTION,
    queuedDirections: [],
    food: null,
    score: 0,
    status: "ready",
    difficulty: "normal",
    speed: SPEEDS.normal,
    boardMessage: "Press Start or Space to begin.",
    testFoodQueue: [],
  };

  function createInitialSnake() {
    return [
      { x: 5, y: 10 },
      { x: 4, y: 10 },
      { x: 3, y: 10 },
    ];
  }

  function cloneSegments(segments) {
    return segments.map((segment) => ({ ...segment }));
  }

  function resizeCanvas() {
    const frameRect = elements.boardFrame.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const size = Math.max(200, Math.floor(Math.min(frameRect.width, frameRect.height)));
    elements.canvas.width = Math.floor(size * dpr);
    elements.canvas.height = Math.floor(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    render();
  }

  function setupResizeHandling() {
    resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(elements.boardFrame);
    window.addEventListener("orientationchange", resizeCanvas);
  }

  function getSpeedLabel(level) {
    return level.charAt(0).toUpperCase() + level.slice(1);
  }

  function setBoardMessage(message) {
    state.boardMessage = message;
    elements.boardMessage.textContent = message;
  }

  function updateUi() {
    const statusText = STATUS_TEXT[state.status];
    elements.scoreValue.textContent = String(state.score);
    elements.statusValue.textContent = statusText;
    elements.statusChip.textContent = statusText;
    elements.speedValue.textContent = getSpeedLabel(state.difficulty);
    elements.difficultySelect.value = state.difficulty;
    elements.pauseButton.textContent = state.status === "paused" ? "Resume" : "Pause";
    elements.pauseButton.disabled =
      state.status !== "running" && state.status !== "paused";
    elements.startButton.disabled = state.status === "running";
    setBoardMessage(state.boardMessage);
  }

  function clearTick() {
    if (tickHandle) {
      window.clearTimeout(tickHandle);
      tickHandle = null;
    }
  }

  function scheduleNextTick() {
    clearTick();
    if (state.status !== "running") {
      return;
    }

    tickHandle = window.setTimeout(() => {
      advanceGame();
      if (state.status === "running") {
        scheduleNextTick();
      }
    }, state.speed);
  }

  function positionsMatch(a, b) {
    return a.x === b.x && a.y === b.y;
  }

  function isOpposite(first, second) {
    return (
      (first === "up" && second === "down") ||
      (first === "down" && second === "up") ||
      (first === "left" && second === "right") ||
      (first === "right" && second === "left")
    );
  }

  function getPlannedDirection() {
    return state.queuedDirections.length
      ? state.queuedDirections[state.queuedDirections.length - 1]
      : state.direction;
  }

  function queueDirection(nextDirection) {
    if (!DIRECTIONS[nextDirection]) {
      return false;
    }

    const plannedDirection = getPlannedDirection();
    if (
      nextDirection === plannedDirection ||
      isOpposite(nextDirection, plannedDirection)
    ) {
      return false;
    }

    state.queuedDirections.push(nextDirection);
    state.queuedDirections = state.queuedDirections.slice(-MAX_BUFFERED_TURNS);
    return true;
  }

  function getRandomCell() {
    return {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  }

  function isCellOccupied(cell, snake) {
    return snake.some((segment) => positionsMatch(segment, cell));
  }

  function spawnFood(snake = state.snake) {
    while (state.testFoodQueue.length > 0) {
      const queuedFood = state.testFoodQueue.shift();
      if (!isCellOccupied(queuedFood, snake)) {
        return queuedFood;
      }
    }

    let attempts = 0;
    while (attempts < BOARD_SIZE * BOARD_SIZE * 2) {
      const candidate = getRandomCell();
      if (!isCellOccupied(candidate, snake)) {
        return candidate;
      }
      attempts += 1;
    }

    return null;
  }

  function resetBoard() {
    clearTick();
    state.snake = createInitialSnake();
    state.direction = INITIAL_DIRECTION;
    state.queuedDirections = [];
    state.score = 0;
    state.status = "ready";
    state.boardMessage = "Press Start or Space to begin.";
    state.food = spawnFood(state.snake);
    updateUi();
    render();
  }

  function finishGame(message) {
    clearTick();
    state.status = "gameover";
    state.boardMessage = message;
    updateUi();
    render();
  }

  function startGame() {
    if (state.status === "running") {
      return;
    }

    if (state.status === "gameover") {
      resetBoard();
    }

    state.status = "running";
    state.boardMessage = "Stay sharp and avoid the walls.";
    updateUi();
    render();
    scheduleNextTick();
  }

  function pauseGame() {
    if (state.status !== "running") {
      return;
    }

    clearTick();
    state.status = "paused";
    state.boardMessage = "Paused. Press Space or Resume to continue.";
    updateUi();
    render();
  }

  function resumeGame() {
    if (state.status !== "paused") {
      return;
    }

    state.status = "running";
    state.boardMessage = "Back in motion.";
    updateUi();
    render();
    scheduleNextTick();
  }

  function restartGame() {
    resetBoard();
  }

  function setDifficulty(level) {
    if (!SPEEDS[level]) {
      return;
    }

    state.difficulty = level;
    state.speed = SPEEDS[level];
    state.boardMessage =
      state.status === "running"
        ? `Difficulty switched to ${getSpeedLabel(level)}.`
        : "Difficulty updated. Press Start when ready.";
    updateUi();
    render();
    if (state.status === "running") {
      scheduleNextTick();
    }
  }

  function advanceGame() {
    const directionName = state.queuedDirections.shift() || state.direction;
    state.direction = directionName;
    const delta = DIRECTIONS[directionName];
    const head = state.snake[0];
    const nextHead = { x: head.x + delta.x, y: head.y + delta.y };

    if (
      nextHead.x < 0 ||
      nextHead.x >= BOARD_SIZE ||
      nextHead.y < 0 ||
      nextHead.y >= BOARD_SIZE
    ) {
      finishGame("Game over. The snake hit the wall.");
      return;
    }

    const willEat = state.food && positionsMatch(nextHead, state.food);
    const collisionBody = willEat ? state.snake : state.snake.slice(0, -1);
    if (isCellOccupied(nextHead, collisionBody)) {
      finishGame("Game over. The snake ran into itself.");
      return;
    }

    const nextSnake = [nextHead, ...cloneSegments(state.snake)];
    if (willEat) {
      state.score += 1;
      state.food = spawnFood(nextSnake);
      state.boardMessage = "Nice catch. Keep going.";
    } else {
      nextSnake.pop();
    }

    state.snake = nextSnake;
    updateUi();
    render();
  }

  function drawRoundedCell(x, y, size, color, radius) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x, y, size, size, radius);
    ctx.fill();
  }

  function renderGrid(boardSizePx, cellSize) {
    ctx.strokeStyle = "rgba(248, 242, 220, 0.06)";
    ctx.lineWidth = 1;
    for (let index = 0; index <= BOARD_SIZE; index += 1) {
      const offset = index * cellSize;
      ctx.beginPath();
      ctx.moveTo(offset, 0);
      ctx.lineTo(offset, boardSizePx);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, offset);
      ctx.lineTo(boardSizePx, offset);
      ctx.stroke();
    }
  }

  function renderOverlay(boardSizePx) {
    if (state.status === "running") {
      return;
    }

    ctx.fillStyle = "rgba(7, 12, 9, 0.38)";
    ctx.fillRect(0, 0, boardSizePx, boardSizePx);

    ctx.fillStyle = "#f8f2dc";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "700 28px Avenir Next";
    ctx.fillText(STATUS_TEXT[state.status], boardSizePx / 2, boardSizePx / 2 - 18);
    ctx.font = "16px Avenir Next";
    ctx.fillText(state.boardMessage, boardSizePx / 2, boardSizePx / 2 + 18, boardSizePx - 32);
  }

  function render() {
    const boardSizePx = elements.canvas.width / (window.devicePixelRatio || 1);
    const cellSize = boardSizePx / BOARD_SIZE;

    ctx.clearRect(0, 0, boardSizePx, boardSizePx);
    ctx.fillStyle = "#112117";
    ctx.fillRect(0, 0, boardSizePx, boardSizePx);

    renderGrid(boardSizePx, cellSize);

    if (state.food) {
      ctx.fillStyle = "#ff8966";
      ctx.beginPath();
      ctx.arc(
        state.food.x * cellSize + cellSize / 2,
        state.food.y * cellSize + cellSize / 2,
        cellSize * 0.32,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    state.snake.forEach((segment, index) => {
      const x = segment.x * cellSize + CELL_PADDING;
      const y = segment.y * cellSize + CELL_PADDING;
      const size = cellSize - CELL_PADDING * 2;
      const fill = index === 0 ? "#d1ff66" : "#8ce048";
      drawRoundedCell(x, y, size, fill, Math.max(4, cellSize * 0.18));

      if (index === 0) {
        const eyeOffset = cellSize * 0.18;
        ctx.fillStyle = "#18311c";
        ctx.beginPath();
        ctx.arc(x + size * 0.34, y + eyeOffset + 2, 2.4, 0, Math.PI * 2);
        ctx.arc(x + size * 0.66, y + eyeOffset + 2, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    renderOverlay(boardSizePx);
  }

  function handleDirectionCommand(direction) {
    queueDirection(direction);
  }

  function handleKeyboard(event) {
    const keyToDirection = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      KeyW: "up",
      KeyS: "down",
      KeyA: "left",
      KeyD: "right",
    };

    if (event.code === "Space") {
      event.preventDefault();
      if (state.status === "ready" || state.status === "gameover") {
        startGame();
      } else if (state.status === "running") {
        pauseGame();
      } else if (state.status === "paused") {
        resumeGame();
      }
      return;
    }

    if (event.code === "KeyR") {
      event.preventDefault();
      restartGame();
      return;
    }

    const direction = keyToDirection[event.code];
    if (direction) {
      event.preventDefault();
      handleDirectionCommand(direction);
    }
  }

  function bindEvents() {
    elements.startButton.addEventListener("click", startGame);
    elements.pauseButton.addEventListener("click", () => {
      if (state.status === "running") {
        pauseGame();
      } else if (state.status === "paused") {
        resumeGame();
      }
    });
    elements.restartButton.addEventListener("click", restartGame);
    elements.difficultySelect.addEventListener("change", (event) => {
      setDifficulty(event.target.value);
    });
    elements.touchButtons.forEach((button) => {
      button.addEventListener("click", () => {
        handleDirectionCommand(button.dataset.direction);
      });
    });
    window.addEventListener("keydown", handleKeyboard);
  }

  function setCustomState(snapshot) {
    clearTick();
    state.snake = snapshot.snake ? cloneSegments(snapshot.snake) : createInitialSnake();
    state.direction = snapshot.direction || INITIAL_DIRECTION;
    state.queuedDirections = snapshot.queuedDirections
      ? [...snapshot.queuedDirections]
      : [];
    state.food = snapshot.food ? { ...snapshot.food } : spawnFood(state.snake);
    state.score = snapshot.score || 0;
    state.status = snapshot.status || "ready";
    state.boardMessage = snapshot.boardMessage || "Test state applied.";
    if (snapshot.difficulty && SPEEDS[snapshot.difficulty]) {
      state.difficulty = snapshot.difficulty;
      state.speed = SPEEDS[snapshot.difficulty];
    }
    updateUi();
    render();
  }

  function getSnapshot() {
    return {
      snake: cloneSegments(state.snake),
      direction: state.direction,
      queuedDirections: [...state.queuedDirections],
      food: state.food ? { ...state.food } : null,
      score: state.score,
      status: state.status,
      difficulty: state.difficulty,
      speed: state.speed,
      boardMessage: state.boardMessage,
    };
  }

  function boot() {
    bindEvents();
    setupResizeHandling();
    state.food = spawnFood(state.snake);
    updateUi();
    resizeCanvas();

    window.__snakeGameTestApi = {
      start: startGame,
      pause: pauseGame,
      resume: resumeGame,
      restart: restartGame,
      setDifficulty,
      setFoodQueue(foodQueue) {
        state.testFoodQueue = foodQueue.map((item) => ({ ...item }));
      },
      setCustomState,
      step() {
        clearTick();
        if (state.status !== "gameover") {
          state.status = "running";
          advanceGame();
        }
      },
      getSnapshot,
    };
  }

  boot();
})();

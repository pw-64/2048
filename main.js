let cells = [
    null, null, null, null,
    null, null, null, null,
    null, null, null, null,
    null, null, null, null,
];

// let cells_previous = [];

let spawn_button,
    info_element,
    count_2048 = 0,
    show_help = false,
    turns_count = 0;

$(document).ready(() => {
    spawn_button = $("#spawn");
    info_element = $("#info")[0];
    const starting_cells_count = Math.floor(Math.random() * 4) + 1; // between 1 and 4 (both inclusive) cells containing 1 when starting
    for (let i = 0; i < starting_cells_count; i++) {Spawn();}
});

$(document).keydown(e => {
    switch(e.which) {
        case 37: MoveLeft();  break;
        case 38: MoveUp();    break;
        case 39: MoveRight(); break;
        case 40: MoveDown();  break;
        default: return;
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

// if a 2048 is clicked, remove it from the grid but keep the score by incrementing count_2048
function CellClicked(cell) {
    if (cells[cell - 1] === 2048) {++count_2048; cells[cell - 1] = null;}
    Update();
}

function SetCell(number, value) {cells[number - 1] = value;}

function GameOverCheck() {
    // console.log(
    //     "current:", cells,
    //     "\nprevious:", cells_previous
    // )
    // // if all the cells are the same as the previous, the game is over
    // if (cells.every((value, index) => value === cells_previous[index])) {
    //     $("#controls")[0].innerHTML = "<p style='color: red; font-weight: 200'>Game Over</p>";
    // }
    // cells_previous = cells.map(cell => cell); // update the contents of cells_previous

    // if there are no empty tiles
    if (GetRandomEmptyCell() === -1) {
        let possible_merges = 0;
        for (let i = 0; i < 16; i ++) { // for every cell in the grid
            if (i > 3 && cells[i] === cells[i-4]) {++possible_merges;} // in the last 3 columns and the above value matches
            if (i < 10 && cells[i] === cells[i+4]) {++possible_merges;} // in the first 3 rows and the below value matches
            if ([0,1,2,4,5,6,8,9,10,12,13,14].includes(i) && cells[i] === cells[i+1]) {++possible_merges;} // in the first 3 columns and the right value matches
            if ([1,2,3,5,6,7,9,10,11,13,14,15].includes(i) && cells[i] === cells[i-1]) {++possible_merges;} // in the last 3 columns and the left value matches
        }
        if (possible_merges === 0) {$("#controls")[0].innerHTML = "<p style='color: red; font-weight: 200'>Game Over</p>";}
    }
}

function Update() {
    let i = 0;
    cells.forEach(value => {
        const cell = $("#current_cell_" + ++i)[0];
        cell.textContent = value;
        cell.setAttribute("value", value);
    });
    // if (GetRandomEmptyCell() === -1) {spawn_button.hide();}
    // else {spawn_button.show();}
    info_element.innerHTML =
        "Score: " + (count_2048 * 2048 + cells.reduce((sum, this_value) => {return sum + this_value;}))
        + "<br>Turns: " + turns_count
        + "<br>Highest Piece: " + (count_2048 > 0 ? 2048 : Math.max(...cells));
}

function GetRandomEmptyCell() {
    let empty_cells = [];
    let i = 1;
    cells.forEach(cell => {if (cell === null) {empty_cells.push(i);} i++;});
    return (empty_cells.length === 0) ? -1 : empty_cells[Math.floor(Math.random() * empty_cells.length)];
}

function Spawn() {
    const cell = GetRandomEmptyCell();
    if (cell === -1) {return;}
    SetCell(cell, 1);
    Update();
}

function MoveUp() {
    for (let _ = 0; _ < 4; _ ++) { // repeat the below 4 times to properly move and compute the final grid
        for (let i = 15; i > 3; i --) { // for each cell in the bottom 3 rows
            if (i > 15 || i < 0) {break;} // break once reached the end
            if (cells[i] === cells[i - 4] && cells[i] !== null && cells[i] !== 2048) { // if this cell equals the cell above it, is not null, and isn't a final (2048) tile
                cells[i] = null; // clear this cell
                cells[i - 4] *= 2; // double the value of the cell above
            } else if (cells[i - 4] === null) { // or, if the cell above is empty
                cells[i - 4] = cells[i]; // set the above cell to this cell
                cells[i] = null; // clear this cell
            }
        }
    }
    GameOverCheck();
    ++turns_count;
    Spawn();
}

function MoveDown() {
    for (let _ = 0; _ < 3; _ ++) { // repeat the below 4 times to properly move and compute the final grid
        for (let i = 0; i < 12; i++) { // for each cell in the top 3 rows
            if (i > 15 || i < 0) {break;} // break once reached the end
            if (cells[i] === cells[i + 4] && cells[i] !== null && cells[i] !== 2048) { // if this cell equals the cell below it, is not null, and isn't a final (2048) tile
                cells[i] = null; // clear this cell
                cells[i + 4] *= 2; // double the value of the cell below
            } else if (cells[i + 4] === null) { // or, if the cell below is empty
                cells[i + 4] = cells[i]; // set the below cell to this cell
                cells[i] = null; // clear this cell
            }
        }
    }
    GameOverCheck();
    ++turns_count;
    Spawn();
}

function MoveLeft() {
    for (let _ = 0; _ < 3; _ ++) { // repeat the below 4 times to properly move and compute the final grid
        for (let i = 0; i <= 15; i ++) {
            if (i === 0 || i === 4 || i === 8 || i === 12) {++i;} // if currently in the first column, increment the counter
            if (i > 15 || i < 0) {break;} // break once reached the end
            if (cells[i] === cells[i - 1] && cells[i] !== null && cells[i] !== 2048) { // if this cell equals the left cell, is not null, and isn't a final (2048) tile
                cells[i] = null; // clear this cell
                cells[i - 1] *= 2; // double the value of the left cell
            } else if (cells[i - 1] === null) { // or, if the left cell is empty
                cells[i - 1] = cells[i]; // set the left cell to this cell
                cells[i] = null; // clear this cell
            }
        }
    }
    GameOverCheck();
    ++turns_count;
    Spawn();
}

function MoveRight() {
    for (let _ = 0; _ < 3; _ ++) { // repeat the below 4 times to properly move and compute the final grid
        for (let i = 0; i <= 15; i ++) {
            if (i === 3 || i === 7 || i === 11 || i === 15) {i++;} // if currently in the last column, increment the counter
            if (i > 15 || i < 0) {break;} // break once reached the end
            if (cells[i] === cells[i + 1] && cells[i] !== null && cells[i] !== 2048) { // if this cell equals the left cell, is not null, and isn't a final (2048) tile
                cells[i] = null; // clear this cell
                cells[i + 1] *= 2; // double the value of the left cell
            } else if (cells[i + 1] === null) { // or, if the left cell is empty
                cells[i + 1] = cells[i]; // set the left cell to this cell
                cells[i] = null; // clear this cell
            }
        }
    }
    GameOverCheck();
    ++turns_count;
    Spawn();
}
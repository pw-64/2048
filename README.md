# 2048
The 2048 game written from scratch in HTML, JS and CSS

## Overview and my comments
2048 is a game where you have to move tiles around, and by merging tiles with the same value you get a tile with the combined value. You keep merging until either the board runs out of space and you have no merges left, or you reach 2048. There is more info revealed by the "How To Play" button if you are a beginner. However, I find the best way to learn new things is just to give it a try, why not? 

I started this on the morning of 6th September 2023 as I have finished my assigned summer holiday work and was looking for a little side project I could focus on to keep my mind running. It is now 10.05 PM the same day and I have just finished the game-over function and done a lot of testing playthroughs.

It seems to work well without any issues, although if you find anything don't be afraid to open an issue, as I do browse github a couple times a week to see if anything interesting pops up in the repos I follow, so I should respond fairly quickly.

I hope you enjoy playing it :)

## Adjusting to your liking

### Adding numbers beyond 2048
- Add another color in the css
- Change the trigger value for `CellClicked()`
- In `Update()` change `count_2048 * XXX` to the highest value
- In the `MoveXXX()` functions, you need to modify the if statement that checks for `cells[i] !== 2048`


### Expanding the grid
- Add more `null`s to cells[]
- (Optional) Increase `starting_cells_count` random range
- In `GameOverCheck()` adjust the checked cells in the if statements (the comments at the end of the lines say what each is for)
- In the `MoveXXX()` functions, you need to modify the if statements that check which column/row the current cell is in, also the outer loop which re-runs the computations incase there were any merged cells, which may not have been moved (or in the case of MoveUp and MoveLeft where the direction is the opposite of the array iteration)

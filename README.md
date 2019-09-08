**Project 6 - Treehouse Front End Web Deveopment Techdegree**    
***Game Show App***

For this project, we were given html and css files for a phrase guessing game.  The index.html file included the basic content for an overlay, header, phrase, an on screen qwerty keyboard, and a scoreboard area with hearts to represent lives.  The instructions were to use javascript and create an array of phrases, randomly select one of those phrases when the start button is clicked, and then display it in the "phrase" div.  We also needed to add interactivity with the qwerty keyboard so that when a letter was pressed, that letter would be displayed in the phrase and the key on the keyboard would be disabled.  

If the letter was in the phrase, the "chosen" class gets added to the key, and then we check to see if all letters are displayed and the game is over.  If the letter is not in the phrase, I added the "wrong" class to the key, change one of the hearts to be smaller and grey, and check to see if this is the 5th wrong guess.  When the game is over, either won or lost, the gameOver method gets called which redisplays the overlay with either a win or loss message.  


***Exceeds Expectations***
* Transitions have been added to the phrase for when correct letters are displayed.  The letters rotate and the background color changes
* The "start game" button is changed to say either "Play Again?" if they won or "Try Again?" if they lost. All game elements are reset so that clicking the button starts a new game. 

***Extra Additions***
* In order to make the site more responsive, before adding the phrase letters to the `<ul>`,  I added them to a `<div>` that contains just 1 word in the phrase.  That `<div>` then gets added to the `<ul>`.  This way, if the width of the display changes, words move to the next line as an entire word, not as individual letters
* I added additional logic to getting a random phrase, that goes through the entire array of phrases before it will repeat one.  
* I added a scoreboard tracker to track wins and losses.  
* Updated a lot of the styling, including a subtle background with a gradient overlay, borders and shows for the phrase letters, and colors/borders/hover effects for the keyboard. 
<script lang="ts">
    import { QuestionType, State, Question, generateRandomNumbers } from "./util.svelte";
    import QuestionBox from "./QuestionBox.svelte";

    let addSubtractLower: number = $state(2);
    let addSubtractUpper: number = $state(100);
    let multiplyDivideLower: number = $state(2);
    let multiplyDivideUpper: number = $state(20);
    
    let score: number = $state(0);
    let timePassed: number = $state(0);
    let gameDuration: number = $state(30);
    let playerAnswer: string = $state("");
    let gameState: State = $state(State.Before);
    let currentQuestion = $state(new Question(10, 2, QuestionType.Addition));
    let correctness: boolean = $derived(Number(playerAnswer) === Number(currentQuestion.getCorrectAnswer()) || false);
    let stillPlaying: boolean = $derived(Number(timePassed) < Number(gameDuration));
    
    getNewQuestion();
    
    $effect(() => {
        if (correctness === true) {
            score += 1;
            getNewQuestion();
        }
    });

    let intervalId: number;
    const incrementTimePassed = () => {
        timePassed += 1;
    };
    $effect(() => {
        if (gameState === State.Playing) {
            intervalId = setInterval(incrementTimePassed, 1000);
        }
    });

    function resetGame() {
        score = 0;
        timePassed = 0;
        gameState = State.Before;
        clearInterval(intervalId);
        getNewQuestion();
    }

    function getNewQuestion() {
        let {randomNumber1, randomNumber2, problemType} = generateRandomNumbers(addSubtractLower, addSubtractUpper, multiplyDivideLower, multiplyDivideUpper);
        currentQuestion = new Question(randomNumber1, randomNumber2, problemType);
        playerAnswer = "";
    }
</script>

<main>
    {#if gameState === State.Before}
        <div id="welcome">
            <h1>Arithmetic Game</h1>
            <p>The Arithmetic Game is a fast-paced speed drill where you are given a specified time period to solve as many arithmetic problems as you can.</p>
        </div>
        <div class="frontpage-centered">
            <label for="addSubtractLower">Addition and Subtraction: </label>
            <input type="number" id="addSubtractLower" bind:value={addSubtractLower}>
            <label for="addSubtractUpper">to: </label>
            <input type="number" id="addSubtractUpper" bind:value={addSubtractUpper}>
        </div>
        <div class="frontpage-centered">
            <label for="multiplyDivideLower">Multiplication and Division: </label>
            <input type="number" id="multiplyDivideLower" bind:value={multiplyDivideLower}>
            <label for="multiplyDivideUpper"> to: </label>
            <input type="number" id="multiplyDivideUpper" bind:value={multiplyDivideUpper}>
        </div>
        <div class="frontpage-centered">
            <label for="gameTime">Duration: </label>
            <select name="time" id="gameTime" bind:value={gameDuration}>
                <option value="30">30 seconds</option>
                <option value="60">60 seconds</option>
                <option value="120">120 seconds</option>
                <option value="300">300 seconds</option>
                <option value="600">600 seconds</option>
            </select>
        </div>
        <div class="frontpage-centered">
            <button onclick={() => {gameState = State.Playing}} type="submit">Start</button>
        </div>
    {:else if gameState === State.Playing && stillPlaying === true}
        <div>
            <p class="top-left">Score: {score}</p>
            <p class="top-right">Time Remaining: {gameDuration - timePassed}</p>
        </div>
        <div class="game-centered question-box">
            <QuestionBox leftNum={currentQuestion.getLeftNumber()} rightNum={currentQuestion.getRightNumber()} questionType={currentQuestion.getProblemType()}></QuestionBox>
            <input type="text" id="playerAnswer" bind:value={playerAnswer}>
        </div>
    {:else}
        <div class="game-centered question-box">
            <h2 class="game-centered">Score: {score}</h2>
        </div>
        <div class="frontpage-centered">
            <button onclick={resetGame}>Play Again?</button>
        </div>
    {/if}
</main>

<style>
    :global(body) { 
        margin: 0; padding: 0; 
    }
    .game-centered.question-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 20px;
        gap: 5px; 
        margin-left: 0px;
        margin-right: 0px;
        padding-left: 0px;
        padding-right: 0px;
    }
    .question-box {
        background-color: #dddddd;
        width: 100%; 
    }
    .top-left {
        float: left;
        padding-left: 10px;
    }
    .top-right {
        float: right;
        padding-right: 10px;
    }
    .frontpage-centered {
        max-width: fit-content;
        margin-left: auto;
        margin-right: auto;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
    }
    .game-centered {
        margin-left: auto;
        margin-right: auto;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
    }
    input {
        width: 50px;
        height: 15px;
    }
    button {
		background-color: rgb(50, 50, 255);
		border: none;
		border-radius: 10px;
		padding: 0.25rem 1rem;
		cursor: pointer;
		font-size: var(--size-5);
		color: white;
	}
    #welcome {
        width: 440px;
        padding: 20px;
        margin: 0 auto;
        background-color: #dddddd;
        overflow: hidden;
        zoom: 1;
    }
    main {
        margin-left: 0px;
        margin-right: 0px;
        padding-left: 0px;
        padding-right: 0px;
        font: 14px "Helvetica Neue", Arial, Helvetica, sans-serif;
    }
    #playerAnswer {
        width: 80px; 
        height: 30px; 
        font-size: 12px; 
        padding: 5px;
    }
</style>
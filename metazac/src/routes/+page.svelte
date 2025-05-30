<script lang="ts">
	import { QuestionType, State, Question, generateRandomNumbers } from '../lib/util.svelte';
	import QuestionBox from '../lib/components/QuestionBox.svelte';
	import Welcome from '$lib/components/Welcome.svelte';

	let addNum1Tuple = $state([2, 100]); // arithmetic operations
	let addNum2Tuple = $state([2, 100]);
	let addTrue = $state(true);
	let subtractTrue = $state(true);
	let multiplyNum1Tuple = $state([2, 12]);
	let multiplyNum2Tuple = $state([2, 100]);
	let multiplyTrue = $state(true);
	let divisionTrue = $state(true);
	let expoBaseTuple = $state([2, 20]); // algebraic operations
	let exponentTuple = $state([2, 4]);
	let exponentTrue = $state(true);
	let logTrue = $state(true);
	let dividendTuple = $state([2, 100]);
	let divisorTuple = $state([2, 20]);
	let modulusTrue = $state(true); // maybe add other operations in the future

	let score: number = $state(0);
	let timePassed: number = $state(0);
	let gameDuration: number = $state(120);
	let playerAnswer: string = $state('');
	let gameState: State = $state(State.Before);
	let currentQuestion = $state(new Question(10, 2, QuestionType.Addition));
	let correctness: boolean = $derived(
		Number(playerAnswer) === Number(currentQuestion.getCorrectAnswer()) || false
	);
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
		let { randomNumber1, randomNumber2, problemType } = generateRandomNumbers(
			addNum1Tuple,
			addNum2Tuple,
			multiplyNum1Tuple,
			multiplyNum2Tuple,
			expoBaseTuple,
			exponentTuple,
			dividendTuple,
			divisorTuple,
			[addTrue, subtractTrue, multiplyTrue, divisionTrue, exponentTrue, logTrue, modulusTrue]
		);
		currentQuestion = new Question(randomNumber1, randomNumber2, problemType);
		playerAnswer = '';
	}
</script>

<main>
	{#if gameState === State.Before}
		<div class="frontpage-centered">
			<Welcome
				bind:addNum1Tuple
				bind:addNum2Tuple
				bind:addTrue
				bind:subtractTrue
				bind:multiplyNum1Tuple
				bind:multiplyNum2Tuple
				bind:multiplyTrue
				bind:divisionTrue
				bind:expoBaseTuple
				bind:exponentTuple
				bind:exponentTrue
				bind:logTrue
				bind:dividendTuple
				bind:divisorTuple
				bind:modulusTrue
				bind:gameState
				bind:gameDuration
			/>
			<button
				onclick={() => {
					gameState = State.Playing;
				}}
				type="submit">Start</button
			>
		</div>
	{:else if gameState === State.Playing && stillPlaying === true}
		<div>
			<p class="top-left">Score: {score}</p>
			<p class="top-right">Time Remaining: {gameDuration - timePassed}</p>
		</div>
		<div class="game-centered question-box">
			<QuestionBox
				leftNum={currentQuestion.getLeftNumber()}
				rightNum={currentQuestion.getRightNumber()}
				questionType={currentQuestion.getProblemType()}
			></QuestionBox>
			<input type="text" id="playerAnswer" bind:value={playerAnswer} />
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
		margin: 0;
		padding: 0;
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
	main {
		margin-left: 0px;
		margin-right: 0px;
		padding-left: 0px;
		padding-right: 0px;
		font:
			14px 'Helvetica Neue',
			Arial,
			Helvetica,
			sans-serif;
	}
	#playerAnswer {
		width: 80px;
		height: 30px;
		font-size: 12px;
		padding: 5px;
	}
</style>

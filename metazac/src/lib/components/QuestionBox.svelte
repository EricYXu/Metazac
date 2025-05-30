<script>
	import { QuestionType } from '../util.svelte';
	let { leftNum, rightNum, questionType } = $props();
	let symbol = $derived.by(() => {
		if (questionType === QuestionType.Addition) {
			return '+';
		} else if (questionType === QuestionType.Subtraction) {
			return '-';
		} else if (questionType === QuestionType.Multiplication) {
			return '×';
		} else {
			return '÷';
		}
	});
</script>

{#if questionType === QuestionType.Addition || questionType === QuestionType.Subtraction || questionType === QuestionType.Multiplication || questionType === QuestionType.Division}
	<div id="question-box" class="centered">
		<h1>{leftNum} {symbol} {rightNum} =</h1>
	</div>
{:else if questionType === QuestionType.Exponentiation}
	<div id="question-box" class="centered">
		<h1>{leftNum} <sup>{rightNum}</sup> =</h1>
	</div>
{:else if questionType === QuestionType.Logarithm}
	<div id="question-box" class="centered">
		<h1>log <sub>{rightNum}</sub> {leftNum} =</h1>
	</div>
{:else}
	<div id="question-box" class="centered">
		<h1>{leftNum} ≡ ? (mod {rightNum})</h1>
	</div>
{/if}

<style>
	#question-box {
		background-color: #dddddd;
		font-size: 18px;
		padding: 10px 20px;
		width: auto;
		display: inline-block;
	}
	.centered {
		justify-content: center;
		align-items: center;
		padding: 0;
	}
	div {
		padding: 0;
		margin: 0;
	}
</style>

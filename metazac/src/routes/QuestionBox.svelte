<script>
	import { QuestionType } from "./util.svelte";
    let {leftNum, rightNum, questionType} = $props();
    let symbol = $derived.by(() => {
        if (questionType === QuestionType.Addition) {
            return "+";
        }
        else if (questionType === QuestionType.Subtraction) {
            return "-";
        }
        else if (questionType === QuestionType.Multiplication) {
            return "×";
        }
        else {
            return "÷";
        }
    });
</script>

<div id="question-box" class="centered">
    <h1>{leftNum} {symbol} {rightNum} = </h1>
</div>

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
<script>
	import { State } from '../util.svelte';

	let {
		addNum1Tuple = $bindable([2, 100]), // arithmetic operations
		addNum2Tuple = $bindable([2, 100]),
		addTrue = $bindable(true),
		subtractTrue = $bindable(true),
		multiplyNum1Tuple = $bindable([2, 12]),
		multiplyNum2Tuple = $bindable([2, 100]),
		multiplyTrue = $bindable(true),
		divisionTrue = $bindable(true),
		expoBaseTuple = $bindable([2, 20]), // algebraic operations
		exponentTuple = $bindable([2, 4]),
		exponentTrue = $bindable(false),
		logTrue = $bindable(false),
		dividendTuple = $bindable([2, 100]),
		divisorTuple = $bindable([2, 20]),
		modulusTrue = $bindable(false), // maybe add other operations in the future
		gameState = $bindable(State.Before),
		gameDuration = $bindable(120)
	} = $props();
</script>

<div class="container">
	<h1>Arithmetic Game</h1>
	<p>
		The Arithmetic Game is a fast-paced speed drill where you are given two minutes to solve as many
		math problems as you can.
	</p>

	<div>
		<label><input type="checkbox" bind:checked={addTrue} /> Addition: </label>
		<div class="range">
			Range: (<input type="number" bind:value={addNum1Tuple[0]} /> to
			<input type="number" bind:value={addNum1Tuple[1]} />) + (<input
				type="number"
				bind:value={addNum2Tuple[0]}
			/>
			to <input type="number" bind:value={addNum2Tuple[1]} />)
		</div>

		<label><input type="checkbox" bind:checked={subtractTrue} /> Subtraction: </label>
		<div class="note">Addition problems in reverse.</div>

		<label><input type="checkbox" bind:checked={multiplyTrue} /> Multiplication: </label>
		<div class="range">
			Range: (<input type="number" bind:value={multiplyNum1Tuple[0]} /> to
			<input type="number" bind:value={multiplyNum1Tuple[1]} />) × (<input
				type="number"
				bind:value={multiplyNum2Tuple[0]}
			/>
			to <input type="number" bind:value={multiplyNum2Tuple[1]} />)
		</div>

		<label><input type="checkbox" bind:checked={divisionTrue} /> Division: </label>
		<div class="note">Multiplication problems in reverse.</div>

		<label><input type="checkbox" bind:checked={exponentTrue} /> Exponentiation: </label>
		<div class="range">
			Range: (<input type="number" bind:value={expoBaseTuple[0]} /> to
			<input type="number" bind:value={expoBaseTuple[1]} />) ^ (<input
				type="number"
				bind:value={exponentTuple[0]}
			/>
			to <input type="number" bind:value={exponentTuple[1]} />)
		</div>

		<label><input type="checkbox" bind:checked={logTrue} /> Logarithms: </label>
		<div class="note">Exponentiation problems in reverse.</div>

		<label><input type="checkbox" bind:checked={modulusTrue} /> Modulus: </label>
		<div class="range">
			Range: (<input type="number" bind:value={dividendTuple[0]} /> to
			<input type="number" bind:value={dividendTuple[1]} />) ≡ ? (mod
			<input type="number" bind:value={divisorTuple[0]} />
			to <input type="number" bind:value={divisorTuple[1]} />)
		</div>

		<div class="duration">
			Duration:
			<select bind:value={gameDuration}>
				<option value="30">30 seconds</option>
				<option value="60">60 seconds</option>
				<option value="120">120 seconds</option>
				<option value="300">300 seconds</option>
				<option value="600">600 seconds</option>
			</select>
		</div>
	</div>
</div>

<style>
	.container {
		background-color: #dddddd;
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		max-width: 600px;
		width: 100%;
		margin: 0 auto;
	}
	.range {
		margin-left: 3rem;
		margin-bottom: 0.5rem;
	}
	.duration {
		margin-top: 1rem;
	}
	.note {
		margin-left: 3rem;
		margin-bottom: 1rem;
	}
	input {
		width: 50px;
		height: 15px;
	}
</style>
